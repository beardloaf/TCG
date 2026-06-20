export function fmtCurrency(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function fmtCurrencyK(n: number): string {
  if (Math.abs(n) >= 1000) {
    return '$' + (n / 1000).toFixed(1) + 'K';
  }
  return fmtCurrency(n);
}

export function fmtPct(n: number): string {
  return n.toFixed(1) + '%';
}

export function fmtMonth(n: number): string {
  return `Mo. ${n}`;
}
