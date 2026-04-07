interface ColorPaletteProps {
  items: { name: string }[];
  colors: string[];
  onChange: (index: number, color: string) => void;
  onUndo: () => void;
  canUndo: boolean;
  className?: string;
}

const ColorPalette = ({
  items,
  colors,
  onChange,
  onUndo,
  canUndo,
  className = "",
}: ColorPaletteProps) => (
  <div
    className={`rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 shadow-inner space-y-1 ${className}`}
  >
    <div className="flex items-center justify-between gap-1.5">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">
        Colors
      </p>
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/85 shadow-[0_5px_10px_rgba(0,0,0,0.2)] hover:border-white/35 hover:bg-white/15 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Cofnij
      </button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
      {items.map((item, idx) => (
        <label
          key={`picker-${item.name}`}
          className="flex items-center gap-1 rounded-md border border-white/10 bg-black/25 px-2 py-1 text-[10px] text-white/80 shadow-[0_5px_10px_rgba(0,0,0,0.18)]"
        >
          <span className="flex-1 truncate">{item.name}</span>
          <input
            type="color"
            aria-label={`Choose color for ${item.name}`}
            value={colors[idx % colors.length]}
            onChange={(e) => onChange(idx, e.target.value)}
            className="h-6 w-6 rounded border border-white/20 bg-transparent p-0"
          />
        </label>
      ))}
    </div>
  </div>
);

export default ColorPalette;
