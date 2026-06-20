import { SectionCard } from '../ui/SectionCard';
import { SliderField } from '../ui/SliderField';
import { LOCATION_DEFAULTS } from '../../constants/defaults';
import { fmtCurrency } from '../../utils/format';
import type { LocationMarketInputs, LocationId } from '../../types/simulator';

interface Props {
  inputs: LocationMarketInputs;
  monthlyRent: number;
  onSetLocation: (id: LocationId) => void;
  onUpdate: (patch: Partial<LocationMarketInputs>) => void;
}

export function LocationMarket({ inputs, monthlyRent, onSetLocation, onUpdate }: Props) {
  const expectedCustomers = Math.round(inputs.localTCGPopulation * (inputs.captureRatePct / 100));

  return (
    <SectionCard title="Location & Market">
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Select Location</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(['saugerties', 'kingston'] as LocationId[]).map((id) => {
            const loc = LOCATION_DEFAULTS[id];
            const active = inputs.location === id;
            return (
              <button
                key={id}
                onClick={() => onSetLocation(id)}
                className={`rounded-lg border-2 p-3 text-left transition-all ${
                  active
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`text-sm font-semibold ${active ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {loc.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{loc.description}</div>
              </button>
            );
          })}
        </div>

        <SliderField
          label="Store Size"
          value={inputs.storeSizeSqFt}
          min={500}
          max={3000}
          step={100}
          onChange={(v) => onUpdate({ storeSizeSqFt: v })}
          unit=" sqft"
        />

        <SliderField
          label="Rent per sqft / year"
          value={inputs.rentPerSqFtPerYear}
          min={8}
          max={40}
          step={0.5}
          onChange={(v) => onUpdate({ rentPerSqFtPerYear: v })}
          format={(v) => `$${v}/sqft/yr`}
        />

        <div className="rounded-md bg-indigo-50 border border-indigo-100 px-3 py-2 mb-3 text-sm">
          <span className="text-gray-600">Est. monthly rent: </span>
          <span className="font-bold text-indigo-700">{fmtCurrency(monthlyRent)}/mo</span>
        </div>

        <SliderField
          label="Local TCG Player Population"
          value={inputs.localTCGPopulation}
          min={50}
          max={1000}
          step={10}
          onChange={(v) => onUpdate({ localTCGPopulation: v })}
          unit=" players"
        />

        <SliderField
          label="Market Capture Rate"
          value={inputs.captureRatePct}
          min={5}
          max={80}
          step={1}
          onChange={(v) => onUpdate({ captureRatePct: v })}
          unit="%"
        />

        <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm">
          <span className="text-gray-600">Expected customer base: </span>
          <span className="font-bold text-gray-800">{expectedCustomers} people</span>
        </div>
      </div>
    </SectionCard>
  );
}
