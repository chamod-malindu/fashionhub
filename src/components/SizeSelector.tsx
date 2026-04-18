'use client';

interface Props {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: Props) {
  return (
    <div className="flex items-center gap-5">
      {sizes.map((size) => {
        const isSelected = size === selected;
        return (
          <button
            key={size}
            onClick={() => onChange(size)}
            aria-pressed={isSelected}
            className={`
              w-10 h-10 rounded-full text-sm font-medium
              transition-all duration-150
              ${isSelected
                ? 'bg-gray-900 text-white'
                : 'bg-transparent text-gray-400 hover:text-gray-700'
              }
            `}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}