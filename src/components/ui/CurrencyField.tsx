interface CurrencyFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  readOnly?: boolean;
  hint?: string;
}

export function CurrencyField({ label, value, onChange, min = 0, max, readOnly, hint }: CurrencyFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && <span className="ml-1 text-xs text-gray-400 font-normal">({hint})</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
          className={`w-full pl-7 pr-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            readOnly
              ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed'
              : 'border-gray-300 bg-white'
          }`}
        />
      </div>
    </div>
  );
}
