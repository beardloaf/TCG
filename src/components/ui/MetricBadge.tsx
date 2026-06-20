type Sentiment = 'positive' | 'negative' | 'neutral' | 'warning';

interface MetricBadgeProps {
  label: string;
  value: string;
  subtext?: string;
  sentiment?: Sentiment;
}

const colors: Record<Sentiment, string> = {
  positive: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  negative: 'bg-red-50 border-red-200 text-red-800',
  neutral: 'bg-gray-50 border-gray-200 text-gray-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
};

const valueColors: Record<Sentiment, string> = {
  positive: 'text-emerald-700',
  negative: 'text-red-700',
  neutral: 'text-gray-900',
  warning: 'text-amber-700',
};

export function MetricBadge({ label, value, subtext, sentiment = 'neutral' }: MetricBadgeProps) {
  return (
    <div className={`rounded-lg border p-3 flex flex-col gap-0.5 ${colors[sentiment]}`}>
      <span className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</span>
      <span className={`text-xl font-bold ${valueColors[sentiment]}`}>{value}</span>
      {subtext && <span className="text-xs opacity-60">{subtext}</span>}
    </div>
  );
}
