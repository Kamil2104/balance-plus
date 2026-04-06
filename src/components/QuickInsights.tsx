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
      <div className="flex flex-col gap-2 text-sm text-white/75">
        <div className="flex justify-between">
          <span>Highest bucket</span>
          <span className="font-semibold">{topLabel}</span>
        </div>
        <div className="flex justify-between">
          <span>Liquid ratio (Main + Cash)</span>
          <span className="font-semibold">{liquidRatio}</span>
        </div>
        <div className="flex justify-between">
          <span>USD exposure</span>
          <span className="font-semibold">{usdExposure}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;

