export type LocationId = 'saugerties' | 'kingston';

export interface LocationMarketInputs {
  location: LocationId;
  storeSizeSqFt: number;
  rentPerSqFtPerYear: number;
  localTCGPopulation: number;
  captureRatePct: number;
}

export interface StartupCosts {
  leaseDeposit: number;
  buildout: number;
  displayCasesAndShelving: number;
  initialInventory: number;
  posSystem: number;
  tablesAndChairs: number;
  signageAndBranding: number;
  miscContingency: number;
}

export interface MonthlyFixed {
  rent: number;
  utilities: number;
  insurance: number;
  wpnLicensingFees: number;
  ownerDraw: number;
  partTimeHours: number;
  partTimeHourlyRate: number;
  accounting: number;
}

export interface MembershipTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  projectedMemberCount: number;
  monthsToReach: number;
  retentionRatePct: number;
  storeCreditPct: number;
  eventFeeDiscountPct: number;
}

export interface MembershipModelInputs {
  tiers: MembershipTier[];
}

export interface RevenueStreamInputs {
  monthlySinglesAndSealedGross: number;
  productMarginPct: number;
  eventsPerMonth: number;
  avgEventAttendance: number;
  eventEntryFee: number;
  draftsPerMonth: number;
  draftPlayersPerEvent: number;
  draftFeePerPlayer: number;
  consignmentSalesGross: number;
  consignmentCommissionPct: number;
}

export interface SimulatorInputs {
  location: LocationMarketInputs;
  startup: StartupCosts;
  fixed: MonthlyFixed;
  rentIsOverridden: boolean;
  membership: MembershipModelInputs;
  revenue: RevenueStreamInputs;
}

export interface TierSnapshot {
  tierId: string;
  tierName: string;
  count: number;
  revenue: number;
}

export interface MonthlySnapshot {
  month: number;
  membershipRevenue: number;
  productRevenue: number;
  eventRevenue: number;
  draftRevenue: number;
  consignmentRevenue: number;
  totalRevenue: number;
  totalFixedCosts: number;
  netMonthly: number;
  cumulativeCashFlow: number;
  totalMemberCount: number;
  tierBreakdown: TierSnapshot[];
}

export interface SimulationResults {
  totalStartupCapital: number;
  totalCapitalNeeded: number;
  monthlyBurnAtLaunch: number;
  breakEvenMonth: number | null;
  breakEvenMonthlyRevenue: number;
  roiAt12Months: number | null;
  roiAt24Months: number | null;
  roiAt36Months: number | null;
  monthlySnapshots: MonthlySnapshot[];
}
