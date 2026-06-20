import { KeyMetrics } from './KeyMetrics';
import { CashFlowChart } from './CashFlowChart';
import { RevenueBreakdownChart } from './RevenueBreakdownChart';
import { MembershipGrowthChart } from './MembershipGrowthChart';
import { MonthlyPLTable } from './MonthlyPLTable';
import type { SimulationResults, MembershipTier } from '../../types/simulator';

interface Props {
  results: SimulationResults;
  tiers: MembershipTier[];
}

export function ResultsDashboard({ results, tiers }: Props) {
  return (
    <div id="results" className="space-y-6">
      <KeyMetrics results={results} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <CashFlowChart results={results} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <MembershipGrowthChart results={results} tiers={tiers} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <RevenueBreakdownChart results={results} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <MonthlyPLTable results={results} />
      </div>
    </div>
  );
}
