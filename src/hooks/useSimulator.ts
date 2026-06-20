import { useState, useMemo } from 'react';
import type {
  SimulatorInputs,
  LocationId,
  LocationMarketInputs,
  StartupCosts,
  MonthlyFixed,
  MembershipTier,
  RevenueStreamInputs,
} from '../types/simulator';
import {
  LOCATION_DEFAULTS,
  DEFAULT_STARTUP,
  DEFAULT_FIXED,
  DEFAULT_TIERS,
  DEFAULT_REVENUE,
} from '../constants/defaults';
import { runSimulation } from '../engine/calculations';

let _tierCounter = 0;
function newTierId() {
  return `tier-${++_tierCounter}`;
}

function computeRent(sizeSqFt: number, ratePerSqFtPerYear: number): number {
  return Math.round((sizeSqFt * ratePerSqFtPerYear) / 12);
}

function buildDefaultInputs(locationId: LocationId): SimulatorInputs {
  const loc = LOCATION_DEFAULTS[locationId];
  const rent = computeRent(loc.defaultStoreSizeSqFt, loc.rentPerSqFtPerYear);
  return {
    location: {
      location: locationId,
      storeSizeSqFt: loc.defaultStoreSizeSqFt,
      rentPerSqFtPerYear: loc.rentPerSqFtPerYear,
      localTCGPopulation: loc.localTCGPopulation,
      captureRatePct: loc.captureRatePct,
    },
    startup: { ...DEFAULT_STARTUP, leaseDeposit: rent * 3 },
    fixed: { ...DEFAULT_FIXED, rent },
    rentIsOverridden: false,
    membership: {
      tiers: DEFAULT_TIERS.map((t) => ({ ...t, id: newTierId() })),
    },
    revenue: { ...DEFAULT_REVENUE },
  };
}

export function useSimulator() {
  const [inputs, setInputs] = useState<SimulatorInputs>(() => buildDefaultInputs('saugerties'));

  const results = useMemo(() => runSimulation(inputs), [inputs]);

  function setLocation(id: LocationId) {
    const loc = LOCATION_DEFAULTS[id];
    const rent = computeRent(loc.defaultStoreSizeSqFt, loc.rentPerSqFtPerYear);
    setInputs((prev) => ({
      ...prev,
      location: {
        location: id,
        storeSizeSqFt: loc.defaultStoreSizeSqFt,
        rentPerSqFtPerYear: loc.rentPerSqFtPerYear,
        localTCGPopulation: loc.localTCGPopulation,
        captureRatePct: loc.captureRatePct,
      },
      fixed: { ...prev.fixed, rent },
      rentIsOverridden: false,
    }));
  }

  function updateLocation(patch: Partial<LocationMarketInputs>) {
    setInputs((prev) => {
      const next = { ...prev, location: { ...prev.location, ...patch } };
      if (!prev.rentIsOverridden && (patch.storeSizeSqFt !== undefined || patch.rentPerSqFtPerYear !== undefined)) {
        const rent = computeRent(next.location.storeSizeSqFt, next.location.rentPerSqFtPerYear);
        next.fixed = { ...next.fixed, rent };
      }
      return next;
    });
  }

  function updateStartup(patch: Partial<StartupCosts>) {
    setInputs((prev) => ({ ...prev, startup: { ...prev.startup, ...patch } }));
  }

  function updateFixed(patch: Partial<MonthlyFixed>) {
    setInputs((prev) => ({
      ...prev,
      fixed: { ...prev.fixed, ...patch },
      rentIsOverridden: patch.rent !== undefined ? true : prev.rentIsOverridden,
    }));
  }

  function resetRentOverride() {
    setInputs((prev) => {
      const rent = computeRent(prev.location.storeSizeSqFt, prev.location.rentPerSqFtPerYear);
      return { ...prev, fixed: { ...prev.fixed, rent }, rentIsOverridden: false };
    });
  }

  function updateTier(tierId: string, patch: Partial<MembershipTier>) {
    setInputs((prev) => ({
      ...prev,
      membership: {
        tiers: prev.membership.tiers.map((t) => (t.id === tierId ? { ...t, ...patch } : t)),
      },
    }));
  }

  function addTier() {
    if (inputs.membership.tiers.length >= 3) return;
    const newTier: MembershipTier = {
      id: newTierId(),
      name: 'New Tier',
      monthlyPrice: 15,
      annualPrice: 150,
      projectedMemberCount: 10,
      monthsToReach: 6,
      retentionRatePct: 90,
      storeCreditPct: 5,
      eventFeeDiscountPct: 10,
    };
    setInputs((prev) => ({
      ...prev,
      membership: { tiers: [...prev.membership.tiers, newTier] },
    }));
  }

  function removeTier(tierId: string) {
    if (inputs.membership.tiers.length <= 1) return;
    setInputs((prev) => ({
      ...prev,
      membership: { tiers: prev.membership.tiers.filter((t) => t.id !== tierId) },
    }));
  }

  function updateRevenue(patch: Partial<RevenueStreamInputs>) {
    setInputs((prev) => ({ ...prev, revenue: { ...prev.revenue, ...patch } }));
  }

  return {
    inputs,
    results,
    setLocation,
    updateLocation,
    updateStartup,
    updateFixed,
    resetRentOverride,
    updateTier,
    addTier,
    removeTier,
    updateRevenue,
  };
}
