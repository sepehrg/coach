import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { $createStickerNode } from '../nodes/stickerNode';
import StickerPicker from '../components/stickerPicker';
import { Sticker } from '../components/sticker';
import { Sticker as StickerIcon } from 'assets/images/icons';

export default function StickerPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const [expanded, setExpanded] = useState(false);
  const [showStickers, setShowstickers] = useState(false);

  const toggleStickerToolbar = () => {
    setExpanded(!expanded);
    setTimeout(() => setShowstickers(!showStickers), expanded ? 0 : 1000);
  };

  return (
    <div className={`toolbar-sticker ${expanded ? 'expanded' : ''}`}>
      <img
        onClick={toggleStickerToolbar}
        src={StickerIcon}
        alt="sticker"
        className="sticker-icon"
      />
      {showStickers && (
        <StickerPicker
          onInsert={(sticker: Sticker) => {
            editor.update(() => {
              const root = $getRoot();
              const stickerNode = $createStickerNode(0, 0, sticker);
              root.append(stickerNode);
            });
          }}
        />
      )}
    </div>
  );
}
