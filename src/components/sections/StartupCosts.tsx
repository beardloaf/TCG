import { SectionCard } from '../ui/SectionCard';
import { CurrencyField } from '../ui/CurrencyField';
import { fmtCurrency } from '../../utils/format';
import type { StartupCosts as StartupCostsType } from '../../types/simulator';

interface Props {
  startup: StartupCostsType;
  totalCapitalNeeded: number;
  onUpdate: (patch: Partial<StartupCostsType>) => void;
}

const FIELDS: { key: keyof StartupCostsType; label: string; hint?: string }[] = [
  { key: 'leaseDeposit', label: 'Lease Deposit', hint: 'first + last + security' },
  { key: 'buildout', label: 'Build-out / Renovations' },
  { key: 'displayCasesAndShelving', label: 'Display Cases & Shelving' },
  { key: 'initialInventory', label: 'Initial Inventory', hint: 'singles, packs, sealed' },
  { key: 'posSystem', label: 'POS System & Hardware' },
  { key: 'tablesAndChairs', label: 'Tables & Chairs (play area)' },
  { key: 'signageAndBranding', label: 'Signage & Branding' },
  { key: 'miscContingency', label: 'Misc / Contingency (~10%)' },
];

export function StartupCosts({ startup, totalCapitalNeeded, onUpdate }: Props) {
  const total = Object.values(startup).reduce((s, v) => s + v, 0);

  return (
    <SectionCard title="One-Time Startup Costs" summary={fmtCurrency(total)}>
      <div className="mt-3">
        {FIELDS.map(({ key, label, hint }) => (
          <CurrencyField
            key={key}
            label={label}
            hint={hint}
            value={startup[key]}
            onChange={(v) => onUpdate({ [key]: v })}
          />
        ))}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-gray-700">Total Startup Costs</span>
            <span className="text-gray-900">{fmtCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">With 6-month runway buffer</span>
            <span className="font-bold text-indigo-700">{fmtCurrency(totalCapitalNeeded)}</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
