import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  const [display, setDisplay] = useState<string>(value === 0 ? "" : String(value));

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_rgba(190,242,100,0.65)]" />
        {label}
      </label>

      <div className="relative group">
        <input
          type="text"
          step="0.01"
          inputMode="decimal"
          value={display}
          onChange={(e) => {
            const raw = e.target.value;
            const filtered = raw.replace(/[^\d.,]/g, "");
            setDisplay(filtered);

            const cleaned = filtered.replace(/,/g, ".");
            const parsed = parseFloat(cleaned);

            if (!Number.isNaN(parsed)) {
              const rounded = Math.round(parsed * 100) / 100;
              onChange(rounded);
            } else if (filtered.trim() === "") {
              onChange(0);
            }
          }}
          className="w-full rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-lg text-white placeholder:text-white/55 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur focus:border-lime-200/80 focus:outline-none focus:ring-2 focus:ring-lime-200/60 transition-all duration-200 group-hover:border-white/25 caret-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="0.00"
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default InputField;
