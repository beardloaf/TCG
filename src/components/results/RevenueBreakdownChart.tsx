import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { fmtCurrencyK, fmtCurrency } from '../../utils/format';
import { REVENUE_COLORS } from '../../constants/defaults';
import type { SimulationResults } from '../../types/simulator';

interface Props {
  results: SimulationResults;
}

export function RevenueBreakdownChart({ results }: Props) {
  const data = results.monthlySnapshots.map((s) => ({
    month: s.month,
    membership: Math.round(s.membershipRevenue),
    product: Math.round(s.productRevenue),
    event: Math.round(s.eventRevenue),
    draft: Math.round(s.draftRevenue),
    consignment: Math.round(s.consignmentRevenue),
  }));

  const fixedLine = results.monthlySnapshots[0]?.totalFixedCosts ?? 0;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Revenue Breakdown (36 months)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => `Mo.${v}`}
            interval={5}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={fmtCurrencyK}
            width={55}
          />
          <Tooltip
            formatter={(val, name) => [fmtCurrency(Number(val)), String(name)]}
            labelFormatter={(l) => `Month ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine
            y={fixedLine}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{ value: 'Fixed costs', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }}
          />
          <Bar dataKey="membership" stackId="r" fill={REVENUE_COLORS.membership} name="Membership" />
          <Bar dataKey="product" stackId="r" fill={REVENUE_COLORS.product} name="Product" />
          <Bar dataKey="event" stackId="r" fill={REVENUE_COLORS.event} name="Events" />
          <Bar dataKey="draft" stackId="r" fill={REVENUE_COLORS.draft} name="Drafts" />
          <Bar dataKey="consignment" stackId="r" fill={REVENUE_COLORS.consignment} name="Consignment" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
