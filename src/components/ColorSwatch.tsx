'use client';

import type { Color } from '@/types';

interface Props {
  colors: Color[];
  selected: string;
  onChange: (colorName: string) => void;
}

export default function ColorSwatch({ colors, selected, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => {
        const isSelected = color.name === selected;
        return (
          <button
            key={color.name}
            onClick={() => onChange(color.name)}
            aria-label={`Select ${color.name}`}
            aria-pressed={isSelected}
            className={`
              w-7 h-7 rounded-full transition-all duration-150
              ${isSelected
                ? 'ring-2 ring-gray-400 ring-offset-2'
                : 'ring-1 ring-gray-200'
              }
            `}
            style={{ backgroundColor: color.hex }}
          />
        );
      })}
    </div>
  );
}