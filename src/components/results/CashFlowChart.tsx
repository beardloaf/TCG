import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { fmtCurrencyK, fmtCurrency } from '../../utils/format';
import type { SimulationResults } from '../../types/simulator';

interface Props {
  results: SimulationResults;
}

export function CashFlowChart({ results }: Props) {
  const data = results.monthlySnapshots.map((s) => ({
    month: s.month,
    cf: Math.round(s.cumulativeCashFlow),
    net: Math.round(s.netMonthly),
  }));

  const beMonth = results.breakEvenMonth;
  const beValue = beMonth ? data[beMonth - 1].cf : null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Cumulative Cash Flow (36 months)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
            formatter={(val, name) => [
              fmtCurrency(Number(val)),
              name === 'cf' ? 'Cumulative CF' : 'Monthly Net',
            ]}
            labelFormatter={(l) => `Month ${l}`}
          />
          <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Break-even', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />
          <Line
            type="monotone"
            dataKey="cf"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          {beMonth && beValue !== null && (
            <ReferenceDot
              x={beMonth}
              y={beValue}
              r={6}
              fill="#10b981"
              stroke="white"
              strokeWidth={2}
              label={{ value: `Breakeven!`, fill: '#10b981', fontSize: 10, position: 'insideTopRight' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
