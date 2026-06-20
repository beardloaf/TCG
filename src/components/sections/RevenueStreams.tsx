import { SectionCard } from '../ui/SectionCard';
import { CurrencyField } from '../ui/CurrencyField';
import { SliderField } from '../ui/SliderField';
import { fmtCurrency } from '../../utils/format';
import type { RevenueStreamInputs } from '../../types/simulator';

interface Props {
  revenue: RevenueStreamInputs;
  onUpdate: (patch: Partial<RevenueStreamInputs>) => void;
}

export function RevenueStreams({ revenue, onUpdate }: Props) {
  const productNet = revenue.monthlySinglesAndSealedGross * (revenue.productMarginPct / 100);
  const eventNet = revenue.eventsPerMonth * revenue.avgEventAttendance * revenue.eventEntryFee;
  const draftNet = revenue.draftsPerMonth * revenue.draftPlayersPerEvent * revenue.draftFeePerPlayer;
  const consignNet = revenue.consignmentSalesGross * (revenue.consignmentCommissionPct / 100);
  const total = productNet + eventNet + draftNet + consignNet;

  return (
    <SectionCard title="Non-Membership Revenue" summary={`${fmtCurrency(total)}/mo base`}>
      <div className="mt-3 space-y-4">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Singles & Sealed Product</p>
          <CurrencyField
            label="Monthly gross sales"
            value={revenue.monthlySinglesAndSealedGross}
            onChange={(v) => onUpdate({ monthlySinglesAndSealedGross: v })}
          />
          <SliderField
            label="Product margin"
            value={revenue.productMarginPct}
            min={15}
            max={60}
            step={1}
            onChange={(v) => onUpdate({ productMarginPct: v })}
            unit="%"
          />
          <div className="text-xs text-gray-500 mb-1">
            Net product revenue: <span className="font-semibold text-gray-700">{fmtCurrency(productNet)}/mo</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Events (FNM, Prereleases, etc.)</p>
          <div className="grid grid-cols-2 gap-x-3">
            <SliderField
              label="Events / month"
              value={revenue.eventsPerMonth}
              min={0}
              max={20}
              step={1}
              onChange={(v) => onUpdate({ eventsPerMonth: v })}
            />
            <SliderField
              label="Avg attendance"
              value={revenue.avgEventAttendance}
              min={1}
              max={40}
              step={1}
              onChange={(v) => onUpdate({ avgEventAttendance: v })}
            />
          </div>
          <CurrencyField
            label="Entry fee per player"
            value={revenue.eventEntryFee}
            onChange={(v) => onUpdate({ eventEntryFee: v })}
          />
          <div className="text-xs text-gray-500 mb-1">
            Event revenue: <span className="font-semibold text-gray-700">{fmtCurrency(eventNet)}/mo</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Booster Drafts</p>
          <div className="grid grid-cols-3 gap-x-3">
            <SliderField
              label="Drafts / month"
              value={revenue.draftsPerMonth}
              min={0}
              max={16}
              step={1}
              onChange={(v) => onUpdate({ draftsPerMonth: v })}
            />
            <SliderField
              label="Players / draft"
              value={revenue.draftPlayersPerEvent}
              min={4}
              max={16}
              step={1}
              onChange={(v) => onUpdate({ draftPlayersPerEvent: v })}
            />
            <SliderField
              label="Fee / player"
              value={revenue.draftFeePerPlayer}
              min={10}
              max={40}
              step={1}
              onChange={(v) => onUpdate({ draftFeePerPlayer: v })}
              format={(v) => `$${v}`}
            />
          </div>
          <div className="text-xs text-gray-500 mb-1">
            Draft revenue: <span className="font-semibold text-gray-700">{fmtCurrency(draftNet)}/mo</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Consignment / TCGPlayer</p>
          <div className="grid grid-cols-2 gap-x-3">
            <CurrencyField
              label="Monthly gross sales"
              value={revenue.consignmentSalesGross}
              onChange={(v) => onUpdate({ consignmentSalesGross: v })}
            />
            <SliderField
              label="Your commission"
              value={revenue.consignmentCommissionPct}
              min={5}
              max={30}
              step={1}
              onChange={(v) => onUpdate({ consignmentCommissionPct: v })}
              unit="%"
            />
          </div>
          <div className="text-xs text-gray-500">
            Consignment revenue: <span className="font-semibold text-gray-700">{fmtCurrency(consignNet)}/mo</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-semibold">
          <span className="text-gray-700">Total base revenue (no membership)</span>
          <span className="text-gray-900">{fmtCurrency(total)}/mo</span>
        </div>
      </div>
    </SectionCard>
  );
}
