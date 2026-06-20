import type {
  LocationId,
  StartupCosts,
  MonthlyFixed,
  MembershipTier,
  RevenueStreamInputs,
} from '../types/simulator';

export const LOCATION_DEFAULTS: Record<
  LocationId,
  {
    rentPerSqFtPerYear: number;
    localTCGPopulation: number;
    defaultStoreSizeSqFt: number;
    captureRatePct: number;
    label: string;
    description: string;
  }
> = {
  saugerties: {
    rentPerSqFtPerYear: 15,
    localTCGPopulation: 190,
    defaultStoreSizeSqFt: 1000,
    captureRatePct: 40,
    label: 'Saugerties, NY',
    description: 'Smaller market, lower rent, less competition',
  },
  kingston: {
    rentPerSqFtPerYear: 20,
    localTCGPopulation: 230,
    defaultStoreSizeSqFt: 1200,
    captureRatePct: 25,
    label: 'Kingston, NY',
    description: 'Larger market, active downtown, more foot traffic',
  },
};

export const DEFAULT_STARTUP: StartupCosts = {
  leaseDeposit: 4500,
  buildout: 8000,
  displayCasesAndShelving: 3500,
  initialInventory: 12000,
  posSystem: 1200,
  tablesAndChairs: 2500,
  signageAndBranding: 1500,
  miscContingency: 3000,
};

export const DEFAULT_FIXED: Omit<MonthlyFixed, 'rent'> = {
  utilities: 350,
  insurance: 175,
  wpnLicensingFees: 0,
  ownerDraw: 2000,
  partTimeHours: 20,
  partTimeHourlyRate: 16,
  accounting: 150,
};

export const DEFAULT_TIERS: Omit<MembershipTier, 'id'>[] = [
  {
    name: 'Supporter',
    monthlyPrice: 10,
    annualPrice: 100,
    projectedMemberCount: 30,
    monthsToReach: 6,
    retentionRatePct: 90,
    storeCreditPct: 5,
    eventFeeDiscountPct: 10,
  },
  {
    name: 'Champion',
    monthlyPrice: 25,
    annualPrice: 250,
    projectedMemberCount: 15,
    monthsToReach: 9,
    retentionRatePct: 92,
    storeCreditPct: 10,
    eventFeeDiscountPct: 20,
  },
  {
    name: 'Legend',
    monthlyPrice: 50,
    annualPrice: 500,
    projectedMemberCount: 5,
    monthsToReach: 12,
    retentionRatePct: 95,
    storeCreditPct: 15,
    eventFeeDiscountPct: 50,
  },
];

export const DEFAULT_REVENUE: RevenueStreamInputs = {
  monthlySinglesAndSealedGross: 3000,
  productMarginPct: 38,
  eventsPerMonth: 8,
  avgEventAttendance: 10,
  eventEntryFee: 10,
  draftsPerMonth: 4,
  draftPlayersPerEvent: 8,
  draftFeePerPlayer: 18,
  consignmentSalesGross: 500,
  consignmentCommissionPct: 15,
};

export const TIER_COLORS = ['#6366f1', '#f59e0b', '#10b981'];

export const REVENUE_COLORS = {
  membership: '#6366f1',
  product: '#3b82f6',
  event: '#f59e0b',
  draft: '#10b981',
  consignment: '#ec4899',
};
