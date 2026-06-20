interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  unit?: string;
}

export function SliderField({ label, value, min, max, step = 1, onChange, format, unit }: SliderFieldProps) {
  const display = format ? format(value) : `${value}${unit ?? ''}`;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-indigo-600">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-0.5">
        <span>{format ? format(min) : `${min}${unit ?? ''}`}</span>
        <span>{format ? format(max) : `${max}${unit ?? ''}`}</span>
      </div>
    </div>
  );
}
