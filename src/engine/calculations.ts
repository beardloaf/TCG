import type {
  SimulatorInputs,
  MonthlyFixed,
  MembershipTier,
  MonthlySnapshot,
  SimulationResults,
} from '../types/simulator';

function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

export function tierMembersAtMonth(month: number, tier: MembershipTier): number {
  const t = month / tier.monthsToReach;
  return Math.floor(tier.projectedMemberCount * smoothstep(t));
}

export function calcMonthlyFixed(fixed: MonthlyFixed): number {
  return (
    fixed.rent +
    fixed.utilities +
    fixed.insurance +
    fixed.wpnLicensingFees +
    fixed.ownerDraw +
    fixed.partTimeHours * fixed.partTimeHourlyRate * 4.33 +
    fixed.accounting
  );
}

export function calcTotalStartupCapital(startup: SimulatorInputs['startup']): number {
  return Object.values(startup).reduce((sum, v) => sum + v, 0);
}

function calcMonthlyRevenue(month: number, inputs: SimulatorInputs) {
  const { membership, revenue } = inputs;

  const tierBreakdown = membership.tiers.map((tier) => {
    const count = tierMembersAtMonth(month, tier);
    return {
      tierId: tier.id,
      tierName: tier.name,
      count,
      revenue: count * tier.monthlyPrice,
    };
  });

  const membershipRevenue = tierBreakdown.reduce((s, t) => s + t.revenue, 0);
  const productRevenue = revenue.monthlySinglesAndSealedGross * (revenue.productMarginPct / 100);
  const eventRevenue = revenue.eventsPerMonth * revenue.avgEventAttendance * revenue.eventEntryFee;
  const draftRevenue =
    revenue.draftsPerMonth * revenue.draftPlayersPerEvent * revenue.draftFeePerPlayer;
  const consignmentRevenue =
    revenue.consignmentSalesGross * (revenue.consignmentCommissionPct / 100);

  const totalRevenue =
    membershipRevenue + productRevenue + eventRevenue + draftRevenue + consignmentRevenue;

  return {
    membershipRevenue,
    productRevenue,
    eventRevenue,
    draftRevenue,
    consignmentRevenue,
    totalRevenue,
    tierBreakdown,
  };
}

function roiAt(month: number, snapshots: MonthlySnapshot[], capital: number): number | null {
  if (month > snapshots.length || capital <= 0) return null;
  const snap = snapshots[month - 1];
  return (snap.cumulativeCashFlow / capital) * 100;
}

export function runSimulation(inputs: SimulatorInputs): SimulationResults {
  const totalStartupCapital = calcTotalStartupCapital(inputs.startup);
  const fixedCosts = calcMonthlyFixed(inputs.fixed);

  const snapshots: MonthlySnapshot[] = [];
  let cumulative = -totalStartupCapital;

  for (let month = 1; month <= 36; month++) {
    const rev = calcMonthlyRevenue(month, inputs);
    const net = rev.totalRevenue - fixedCosts;
    cumulative += net;

    snapshots.push({
      month,
      ...rev,
      totalFixedCosts: fixedCosts,
      netMonthly: net,
      cumulativeCashFlow: cumulative,
      totalMemberCount: rev.tierBreakdown.reduce((s, t) => s + t.count, 0),
    });
  }

  const month1Rev = snapshots[0].totalRevenue;
  const monthlyBurnAtLaunch = Math.max(0, fixedCosts - month1Rev);
  const totalCapitalNeeded = totalStartupCapital + monthlyBurnAtLaunch * 6;

  const breakEvenSnap = snapshots.find((s) => s.cumulativeCashFlow >= 0);
  const breakEvenMonth = breakEvenSnap?.month ?? null;

  return {
    totalStartupCapital,
    totalCapitalNeeded,
    monthlyBurnAtLaunch,
    breakEvenMonth,
    breakEvenMonthlyRevenue: fixedCosts,
    roiAt12Months: roiAt(12, snapshots, totalCapitalNeeded),
    roiAt24Months: roiAt(24, snapshots, totalCapitalNeeded),
    roiAt36Months: roiAt(36, snapshots, totalCapitalNeeded),
    monthlySnapshots: snapshots,
  };
}
