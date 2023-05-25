import { useRef } from 'react';
import * as React from 'react';
import { Sticker } from './sticker';
import { Star, Sun, Plant, Flower } from 'assets/images/stickers';

interface StickerPickerProps {
  onInsert: (sticker: Sticker) => void;
}

const stickers: Sticker[] = [
  {
    url: Star,
    width: 130,
  },
  {
    url: Sun,
    width: 150,
  },
  {
    url: Plant,
    width: 110,
  },
  {
    url: Flower,
    width: 100,
  },
];

export default function StickerPicker({ onInsert }: Readonly<StickerPickerProps>): JSX.Element {
  const innerDivRef = useRef(null);

  return (
    <div ref={innerDivRef} className="sticker-picker">
      {stickers.map((sticker) => (
        <button
          key={sticker.url}
          onClick={() => onInsert(sticker)}
          style={{ border: 'none', background: 'none' }}
        >
          <img src={sticker.url} alt="test" style={{ width: sticker.width / 2 }} />
        </button>
      ))}
    </div>
  );
}
