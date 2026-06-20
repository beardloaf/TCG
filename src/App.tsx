import { useSimulator } from './hooks/useSimulator';
import { LocationMarket } from './components/sections/LocationMarket';
import { StartupCosts } from './components/sections/StartupCosts';
import { MonthlyFixed } from './components/sections/MonthlyFixed';
import { MembershipModel } from './components/sections/MembershipModel';
import { RevenueStreams } from './components/sections/RevenueStreams';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { LOCATION_DEFAULTS } from './constants/defaults';

export default function App() {
  const sim = useSimulator();
  const { inputs, results } = sim;
  const locationLabel = LOCATION_DEFAULTS[inputs.location.location].label;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 no-print">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">TCG Store Simulator</h1>
            <p className="text-xs text-gray-500">{locationLabel} — Hudson Valley, NY</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#results"
              className="sm:hidden text-sm text-indigo-600 font-medium border border-indigo-200 rounded-lg px-3 py-1.5"
            >
              See Results
            </a>
            <button
              onClick={() => window.print()}
              className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 no-print">
            <LocationMarket
              inputs={inputs.location}
              monthlyRent={inputs.fixed.rent}
              onSetLocation={sim.setLocation}
              onUpdate={sim.updateLocation}
            />
            <StartupCosts
              startup={inputs.startup}
              totalCapitalNeeded={results.totalCapitalNeeded}
              onUpdate={sim.updateStartup}
            />
            <MonthlyFixed
              fixed={inputs.fixed}
              rentIsOverridden={inputs.rentIsOverridden}
              onUpdate={sim.updateFixed}
              onResetRent={sim.resetRentOverride}
            />
            <MembershipModel
              tiers={inputs.membership.tiers}
              onUpdateTier={sim.updateTier}
              onAddTier={sim.addTier}
              onRemoveTier={sim.removeTier}
            />
            <RevenueStreams
              revenue={inputs.revenue}
              onUpdate={sim.updateRevenue}
            />
          </div>

          <div className="lg:col-span-3 print-full">
            <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto print-no-sticky">
              <ResultsDashboard
                results={results}
                tiers={inputs.membership.tiers}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="no-print border-t border-gray-200 mt-8 py-4 px-4 text-center text-xs text-gray-400 max-w-screen-xl mx-auto">
        Projections are estimates only — not financial advice. Actual results depend on local market conditions.
        Consult a CPA or your regional SBDC before investing.
      </footer>
    </div>
  );
}
