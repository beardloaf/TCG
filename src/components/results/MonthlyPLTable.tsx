import { fmtCurrency } from '../../utils/format';
import type { SimulationResults } from '../../types/simulator';

interface Props {
  results: SimulationResults;
}

export function MonthlyPLTable({ results }: Props) {
  const { monthlySnapshots, breakEvenMonth } = results;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly P&L — 36 Month Projection</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="sticky left-0 bg-gray-50 px-3 py-2 text-left font-semibold">Mo.</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Membership</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Product</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Events</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Drafts</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Consign.</th>
              <th className="px-3 py-2 text-right whitespace-nowrap font-bold text-gray-700">Total Rev.</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Fixed Costs</th>
              <th className="px-3 py-2 text-right whitespace-nowrap font-bold">Net</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Cumul. CF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {monthlySnapshots.map((s) => {
              const isBE = s.month === breakEvenMonth;
              const rowClass = isBE
                ? 'bg-emerald-50'
                : s.month % 2 === 0
                ? 'bg-white'
                : 'bg-gray-50/50';

              return (
                <tr key={s.month} className={rowClass}>
                  <td className={`sticky left-0 px-3 py-1.5 font-semibold ${isBE ? 'bg-emerald-50' : s.month % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    {s.month}
                    {isBE && (
                      <span className="ml-1 text-emerald-600 font-bold text-xs">✓</span>
                    )}
                  </td>
                  <td className="px-3 py-1.5 text-right text-indigo-700">{fmtCurrency(s.membershipRevenue)}</td>
                  <td className="px-3 py-1.5 text-right">{fmtCurrency(s.productRevenue)}</td>
                  <td className="px-3 py-1.5 text-right">{fmtCurrency(s.eventRevenue)}</td>
                  <td className="px-3 py-1.5 text-right">{fmtCurrency(s.draftRevenue)}</td>
                  <td className="px-3 py-1.5 text-right">{fmtCurrency(s.consignmentRevenue)}</td>
                  <td className="px-3 py-1.5 text-right font-semibold">{fmtCurrency(s.totalRevenue)}</td>
                  <td className="px-3 py-1.5 text-right text-red-600">{fmtCurrency(s.totalFixedCosts)}</td>
                  <td className={`px-3 py-1.5 text-right font-bold ${s.netMonthly >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {fmtCurrency(s.netMonthly)}
                  </td>
                  <td className={`px-3 py-1.5 text-right font-semibold ${s.cumulativeCashFlow >= 0 ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {fmtCurrency(s.cumulativeCashFlow)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {breakEvenMonth && (
        <p className="mt-2 text-xs text-emerald-600 font-medium">
          ✓ Break-even (capital recovery) at month {breakEvenMonth}
        </p>
      )}
    </div>
  );
}
