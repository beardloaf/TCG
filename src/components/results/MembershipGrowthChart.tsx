import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TIER_COLORS } from '../../constants/defaults';
import type { SimulationResults, MembershipTier } from '../../types/simulator';

interface Props {
  results: SimulationResults;
  tiers: MembershipTier[];
}

export function MembershipGrowthChart({ results, tiers }: Props) {
  const data = results.monthlySnapshots.map((s) => {
    const row: Record<string, number> = { month: s.month };
    s.tierBreakdown.forEach((tb) => {
      row[tb.tierName] = tb.count;
    });
    return row;
  });

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Membership Growth (36 months)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickFormatter={(v) => `Mo.${v}`}
            interval={5}
          />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} width={35} />
          <Tooltip
            formatter={(val, name) => [Number(val), String(name)]}
            labelFormatter={(l) => `Month ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {tiers.map((tier, idx) => (
            <Area
              key={tier.id}
              type="monotone"
              dataKey={tier.name}
              stackId="m"
              stroke={TIER_COLORS[idx % TIER_COLORS.length]}
              fill={TIER_COLORS[idx % TIER_COLORS.length]}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
