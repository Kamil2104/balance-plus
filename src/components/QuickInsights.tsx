import { type BalanceData } from "../utils/storage";

interface QuickInsightsProps {
  accounts: BalanceData;
  total: number;
  brokerPln: number;
  formatPln: (value: number) => string;
  rateReady: boolean;
}

const QuickInsights = ({ accounts, total, brokerPln, formatPln, rateReady }: QuickInsightsProps) => {
  const topLabel = (() => {
    const entries = [
      { label: "Main", value: accounts.main },
      { label: "Savings", value: accounts.savings },
      { label: "Investments (PLN)", value: brokerPln },
      { label: "Cash", value: accounts.cash },
    ];
    const top = entries.reduce((a, b) => (b.value > a.value ? b : a));
    return rateReady ? `${top.label} · ${formatPln(top.value)}` : "";
  })();

  const liquidRatio =
    rateReady && total !== 0
      ? `${Math.round(((accounts.main + accounts.cash) / total) * 100)}%`
      : "";

  const usdExposure =
    rateReady && total !== 0 ? `${Math.round((brokerPln / total) * 100)}%` : "";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner space-y-3">
      <p className="text-xs uppercase tracking-[0.18em] text-white/55">Quick insights</p>
      <div className="flex flex-col gap-3 text-sm text-white/75">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0">
          <span className="text-white/75">Highest bucket</span>
          <span className="font-semibold text-white">{topLabel}</span>
        </div>
        <div className="h-px bg-white/8 sm:hidden" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0">
          <span className="text-white/75">Liquid ratio (Main + Cash)</span>
          <span className="font-semibold text-white">{liquidRatio}</span>
        </div>
        <div className="h-px bg-white/8 sm:hidden" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0">
          <span className="text-white/75">USD exposure</span>
          <span className="font-semibold text-white">{usdExposure}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;
