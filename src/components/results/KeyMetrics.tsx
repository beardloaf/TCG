import { MetricBadge } from '../ui/MetricBadge';
import { fmtCurrency, fmtPct } from '../../utils/format';
import type { SimulationResults } from '../../types/simulator';

interface Props {
  results: SimulationResults;
}

export function KeyMetrics({ results }: Props) {
  const {
    totalStartupCapital,
    totalCapitalNeeded,
    monthlyBurnAtLaunch,
    breakEvenMonth,
    roiAt12Months,
    roiAt36Months,
  } = results;

  const beText = breakEvenMonth ? `Month ${breakEvenMonth}` : 'Not in 3 yrs';
  const beSentiment =
    breakEvenMonth === null ? 'negative' : breakEvenMonth <= 18 ? 'positive' : breakEvenMonth <= 30 ? 'warning' : 'negative';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      <MetricBadge
        label="Startup Capital"
        value={fmtCurrency(totalStartupCapital)}
        subtext="hard costs only"
        sentiment="neutral"
      />
      <MetricBadge
        label="Capital Needed"
        value={fmtCurrency(totalCapitalNeeded)}
        subtext="incl. 6-mo runway"
        sentiment="neutral"
      />
      <MetricBadge
        label="Month 1 Burn"
        value={fmtCurrency(monthlyBurnAtLaunch)}
        subtext="per month shortfall"
        sentiment={monthlyBurnAtLaunch > 0 ? 'negative' : 'positive'}
      />
      <MetricBadge
        label="Break-Even"
        value={beText}
        subtext="capital recovery"
        sentiment={beSentiment}
      />
      <MetricBadge
        label="ROI @ Year 1"
        value={roiAt12Months !== null ? fmtPct(roiAt12Months) : 'n/a'}
        subtext="on total capital"
        sentiment={roiAt12Months !== null && roiAt12Months > 0 ? 'positive' : 'negative'}
      />
      <MetricBadge
        label="ROI @ Year 3"
        value={roiAt36Months !== null ? fmtPct(roiAt36Months) : 'n/a'}
        subtext="on total capital"
        sentiment={roiAt36Months !== null && roiAt36Months > 0 ? 'positive' : 'neutral'}
      />
    </div>
  );
}
