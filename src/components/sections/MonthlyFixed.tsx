import { SectionCard } from '../ui/SectionCard';
import { CurrencyField } from '../ui/CurrencyField';
import { SliderField } from '../ui/SliderField';
import { fmtCurrency } from '../../utils/format';
import { calcMonthlyFixed } from '../../engine/calculations';
import type { MonthlyFixed as MonthlyFixedType } from '../../types/simulator';

interface Props {
  fixed: MonthlyFixedType;
  rentIsOverridden: boolean;
  onUpdate: (patch: Partial<MonthlyFixedType>) => void;
  onResetRent: () => void;
}

export function MonthlyFixed({ fixed, rentIsOverridden, onUpdate, onResetRent }: Props) {
  const total = calcMonthlyFixed(fixed);
  const laborCost = fixed.partTimeHours * fixed.partTimeHourlyRate * 4.33;

  return (
    <SectionCard title="Monthly Fixed Costs" summary={`${fmtCurrency(total)}/mo`}>
      <div className="mt-3">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">
              Monthly Rent
              {rentIsOverridden && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                  overridden
                </span>
              )}
            </label>
            {rentIsOverridden && (
              <button onClick={onResetRent} className="text-xs text-indigo-600 hover:underline">
                reset
              </button>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              min={0}
              value={fixed.rent}
              onChange={(e) => onUpdate({ rent: Number(e.target.value) })}
              className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        <CurrencyField label="Utilities" value={fixed.utilities} onChange={(v) => onUpdate({ utilities: v })} />
        <CurrencyField label="Business Insurance" value={fixed.insurance} onChange={(v) => onUpdate({ insurance: v })} />
        <CurrencyField label="WPN / Game Licensing" value={fixed.wpnLicensingFees} onChange={(v) => onUpdate({ wpnLicensingFees: v })} hint="WPN is free; optional extras" />
        <CurrencyField label="Owner Draw / Salary" value={fixed.ownerDraw} onChange={(v) => onUpdate({ ownerDraw: v })} />
        <CurrencyField label="Bookkeeping / Accounting" value={fixed.accounting} onChange={(v) => onUpdate({ accounting: v })} />

        <div className="border-t border-gray-100 pt-3 mt-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Part-Time Labor</p>
          <SliderField
            label="Hours per week"
            value={fixed.partTimeHours}
            min={0}
            max={80}
            step={5}
            onChange={(v) => onUpdate({ partTimeHours: v })}
            unit=" hrs/wk"
          />
          <SliderField
            label="Hourly rate"
            value={fixed.partTimeHourlyRate}
            min={12}
            max={30}
            step={0.5}
            onChange={(v) => onUpdate({ partTimeHourlyRate: v })}
            format={(v) => `$${v}/hr`}
          />
          <div className="text-xs text-gray-500 mb-3">
            Monthly labor cost: <span className="font-semibold text-gray-700">{fmtCurrency(laborCost)}</span>
            <span className="text-gray-400"> (×4.33 weeks/mo)</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-semibold">
          <span className="text-gray-700">Total Monthly Fixed</span>
          <span className="text-gray-900">{fmtCurrency(total)}/mo</span>
        </div>
      </div>
    </SectionCard>
  );
}
