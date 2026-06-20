import { SectionCard } from '../ui/SectionCard';
import { SliderField } from '../ui/SliderField';
import { CurrencyField } from '../ui/CurrencyField';
import { fmtCurrency } from '../../utils/format';
import { TIER_COLORS } from '../../constants/defaults';
import type { MembershipTier } from '../../types/simulator';

interface Props {
  tiers: MembershipTier[];
  onUpdateTier: (id: string, patch: Partial<MembershipTier>) => void;
  onAddTier: () => void;
  onRemoveTier: (id: string) => void;
}

export function MembershipModel({ tiers, onUpdateTier, onAddTier, onRemoveTier }: Props) {
  const plateauRevenue = tiers.reduce((s, t) => s + t.projectedMemberCount * t.monthlyPrice, 0);

  return (
    <SectionCard title="Membership Model" summary={`${fmtCurrency(plateauRevenue)}/mo at plateau`}>
      <div className="mt-3 space-y-4">
        {tiers.map((tier, idx) => {
          const color = TIER_COLORS[idx % TIER_COLORS.length];
          const plateauMoRevenue = tier.projectedMemberCount * tier.monthlyPrice;

          return (
            <div
              key={tier.id}
              className="rounded-lg border border-gray-200 overflow-hidden"
            >
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => onUpdateTier(tier.id, { name: e.target.value })}
                  className="font-semibold text-sm text-gray-800 bg-transparent border-none outline-none w-32"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{fmtCurrency(plateauMoRevenue)}/mo plateau</span>
                  {tiers.length > 1 && (
                    <button
                      onClick={() => onRemoveTier(tier.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              <div className="px-3 pb-3 pt-2 bg-gray-50">
                <div className="grid grid-cols-2 gap-x-3">
                  <CurrencyField
                    label="Monthly price"
                    value={tier.monthlyPrice}
                    onChange={(v) => onUpdateTier(tier.id, { monthlyPrice: v, annualPrice: v * 10 })}
                  />
                  <CurrencyField
                    label="Annual price"
                    value={tier.annualPrice}
                    onChange={(v) => onUpdateTier(tier.id, { annualPrice: v })}
                    hint="≈10× monthly"
                  />
                </div>

                <SliderField
                  label="Projected member count (plateau)"
                  value={tier.projectedMemberCount}
                  min={1}
                  max={150}
                  step={1}
                  onChange={(v) => onUpdateTier(tier.id, { projectedMemberCount: v })}
                  unit=" members"
                />

                <SliderField
                  label="Months to reach plateau"
                  value={tier.monthsToReach}
                  min={1}
                  max={24}
                  step={1}
                  onChange={(v) => onUpdateTier(tier.id, { monthsToReach: v })}
                  unit=" months"
                />

                <SliderField
                  label="Monthly retention rate"
                  value={tier.retentionRatePct}
                  min={50}
                  max={100}
                  step={1}
                  onChange={(v) => onUpdateTier(tier.id, { retentionRatePct: v })}
                  unit="%"
                />

                <div className="grid grid-cols-2 gap-x-3">
                  <SliderField
                    label="Store credit %"
                    value={tier.storeCreditPct}
                    min={0}
                    max={20}
                    step={1}
                    onChange={(v) => onUpdateTier(tier.id, { storeCreditPct: v })}
                    unit="%"
                  />
                  <SliderField
                    label="Event discount %"
                    value={tier.eventFeeDiscountPct}
                    min={0}
                    max={100}
                    step={5}
                    onChange={(v) => onUpdateTier(tier.id, { eventFeeDiscountPct: v })}
                    unit="%"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {tiers.length < 3 && (
          <button
            onClick={onAddTier}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            + Add Tier
          </button>
        )}

        <div className="pt-1 text-sm text-gray-500">
          Plateau membership revenue:{' '}
          <span className="font-semibold text-indigo-700">{fmtCurrency(plateauRevenue)}/mo</span>
        </div>
      </div>
    </SectionCard>
  );
}
