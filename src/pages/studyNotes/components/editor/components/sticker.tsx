import { useEffect, useRef, useLayoutEffect } from 'react';
import { $getNodeByKey, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as React from 'react';
import { $isStickerNode } from '../nodes/stickerNode';

const CAN_USE_DOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

const useLayoutEffectImpl: typeof useLayoutEffect = CAN_USE_DOM ? useLayoutEffect : useEffect;

type Positioning = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  rootElementRect: null | ClientRect;
  x: number;
  y: number;
};

function positionSticker(stickerElem: HTMLElement, positioning: Positioning): void {
  const style = stickerElem.style;
  const top = document.getElementById('note-container')?.getBoundingClientRect().top || 0;

  style.top = Math.abs(top) + positioning.y + 'px';
  style.left = positioning.x + 'px';
}

export interface Sticker {
  url: string;
  width: number;
}

export default function StickerComponent({
  x,
  y,
  nodeKey,
  sticker,
}: {
  sticker: Sticker;
  nodeKey: NodeKey;
  x: number;
  y: number;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const stickerContainerRef = useRef<null | HTMLDivElement>(null);
  const positioningRef = useRef<Positioning>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    rootElementRect: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const position = positioningRef.current;
    position.x = x;
    position.y = y;

    const stickerContainer = stickerContainerRef.current;
    if (stickerContainer !== null) {
      positionSticker(stickerContainer, position);
    }
  }, [x, y]);

  useLayoutEffectImpl(() => {
    const position = positioningRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const { target } = entry;
        position.rootElementRect = target.getBoundingClientRect();
        const stickerContainer = stickerContainerRef.current;
        if (stickerContainer !== null) {
          positionSticker(stickerContainer, position);
        }
      }
    });

    const removeRootListener = editor.registerRootListener((nextRootElem, prevRootElem) => {
      if (prevRootElem !== null) {
        resizeObserver.unobserve(prevRootElem);
      }
      if (nextRootElem !== null) {
        resizeObserver.observe(nextRootElem);
      }
    });

    return () => {
      removeRootListener();
    };
  }, [editor]);

  useEffect(() => {
    const stickerContainer = stickerContainerRef.current;
    if (stickerContainer !== null) {
      // Delay adding transition so we don't trigger the
      // transition on load of the sticker.
      setTimeout(() => {
        stickerContainer.style.setProperty('transition', 'top 0.3s ease 0s, left 0.3s ease 0s');
      }, 500);
    }
  }, []);

  const handlePointerMove = (event: PointerEvent) => {
    const stickerContainer = stickerContainerRef.current;
    const positioning = positioningRef.current;
    const rootElementRect = positioning.rootElementRect;
    if (stickerContainer !== null && positioning.isDragging && rootElementRect !== null) {
      const positioningX = event.pageX - positioning.offsetX - rootElementRect.left;
      const positioningY = event.pageY - positioning.offsetY - rootElementRect.top;
      if (
        positioningX > 0 &&
        positioningY > 0 &&
        positioningX < rootElementRect.width - sticker.width &&
        positioningY < rootElementRect.height + rootElementRect.top
      ) {
        positioning.x = positioningX;
        positioning.y = positioningY;
        positionSticker(stickerContainer, positioning);
      }
    }
  };

  const handlePointerUp = () => {
    const stickerContainer = stickerContainerRef.current;
    const positioning = positioningRef.current;
    if (stickerContainer !== null) {
      positioning.isDragging = false;
      stickerContainer.classList.remove('dragging');
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isStickerNode(node)) {
          node.setPosition(positioning.x, positioning.y);
        }
      });
    }
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  const handleDelete = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isStickerNode(node)) {
        node.remove();
      }
    });
  };

  return (
    <div ref={stickerContainerRef} className="sticker-container">
      <div
        className="sticker"
        onPointerDown={(event) => {
          const stickerContainer = stickerContainerRef.current;
          const stickContainer = stickerContainer;
          const positioning = positioningRef.current;
          if (stickContainer !== null) {
            const { top, left } = stickContainer.getBoundingClientRect();
            positioning.offsetX = event.clientX - left;
            positioning.offsetY = event.clientY - top;
            positioning.isDragging = true;
            stickContainer.classList.add('dragging');
            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('pointerup', handlePointerUp);
            event.preventDefault();
          }
        }}
      >
        <button
          onClick={handleDelete}
          className="delete"
          aria-label="Delete sticker note"
          title="Delete"
        >
          X
        </button>
        <img src={sticker.url} alt="test" style={{ width: sticker.width }} />
      </div>
    </div>
  );
}
