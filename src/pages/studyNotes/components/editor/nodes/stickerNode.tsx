import {
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  $setSelection,
  DecoratorNode,
} from 'lexical';

import * as React from 'react';
import { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Sticker } from '../components/sticker';

const StickerComponent = React.lazy(() => import('../components/sticker'));

export type SerializedStickerNode = Spread<
  {
    xOffset: number;
    yOffset: number;
    sticker: Sticker;
    type: 'sticker';
    version: 1;
  },
  SerializedLexicalNode
>;

export class StickerNode extends DecoratorNode<JSX.Element> {
  __x: number;
  __y: number;
  __sticker: Sticker;

  static getType(): string {
    return 'sticker';
  }

  static clone(node: StickerNode): StickerNode {
    return new StickerNode(node.__x, node.__y, node.__sticker, node.__key);
  }
  static importJSON(serializedNode: SerializedStickerNode): StickerNode {
    return new StickerNode(serializedNode.xOffset, serializedNode.yOffset, serializedNode.sticker);
  }

  constructor(x: number, y: number, sticker: Sticker, key?: NodeKey) {
    super(key);
    this.__x = x;
    this.__y = y;
    this.__sticker = sticker;
  }

  exportJSON(): SerializedStickerNode {
    return {
      sticker: this.__sticker,
      type: 'sticker',
      version: 1,
      xOffset: this.__x,
      yOffset: this.__y,
    };
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.style.display = 'contents';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  setPosition(x: number, y: number): void {
    const writable = this.getWritable();
    writable.__x = x;
    writable.__y = y;
    $setSelection(null);
  }

  decorate(): JSX.Element {
    return createPortal(
      <Suspense fallback={null}>
        <StickerComponent
          sticker={this.__sticker}
          x={this.__x}
          y={this.__y}
          nodeKey={this.getKey()}
        />
      </Suspense>,
      document.getElementsByClassName('editor-container')[0] || document.body,
    );
  }

  isIsolated(): true {
    return true;
  }
}

export function $isStickerNode(node: LexicalNode | null | undefined): node is StickerNode {
  return node instanceof StickerNode;
}

export function $createStickerNode(
  xOffset: number,
  yOffset: number,
  sticker: Sticker,
): StickerNode {
  return new StickerNode(xOffset, yOffset, sticker);
}
