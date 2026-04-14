import InputField from "./InputField";
import BalanceMeta from "./BalanceMeta";
import QuickInsights from "./QuickInsights";

import { type BalanceData } from "../utils/storage";

interface DataInputProps {
  accounts: BalanceData;
  usdPln: number | null;
  onChange: (key: keyof BalanceData, value: number) => void;
}

const formatPln = (value: number) =>
  value.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  });

const DataInput = ({ accounts, onChange, usdPln }: DataInputProps) => {
  const rateReady = usdPln !== null;
  const rate = usdPln ?? 0;
  const brokerPln = rateReady ? rate * accounts.broker : 0;
  const total = rateReady
    ? accounts.main + accounts.savings + accounts.cash + brokerPln
    : 0;

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-full min-h-100 sm:min-h-110 lg:min-h-120 h-full flex flex-col flex-1 gap-5 sm:gap-6 rounded-3xl border border-white/10 bg-linear-to-b from-white/10 via-white/6 to-transparent p-4 sm:p-6 lg:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-lg">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          Balances
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">Account Inputs</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-300/20 via-lime-300/20 to-emerald-300/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-50 border border-emerald-200/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Synced
          </span>
        </div>
        <p className="text-sm text-white/70">
          Enter balances for each account to keep your overview current.
        </p>
        <BalanceMeta dateLabel={dateLabel} rateText={rateReady ? rate.toFixed(2) : ""} />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
        <InputField
          label="Main Account (PLN)"
          value={accounts.main}
          onChange={(v) => onChange("main", v)}
        />
        <InputField
          label="Savings (PLN)"
          value={accounts.savings}
          onChange={(v) => onChange("savings", v)}
        />
        <InputField
          label="Investments (USD)"
          value={accounts.broker}
          onChange={(v) => onChange("broker", v)}
        />
        <InputField
          label="Cash (PLN)"
          value={accounts.cash}
          onChange={(v) => onChange("cash", v)}
        />
      </div>

      <div className="mt-auto space-y-3">
        <QuickInsights
          accounts={accounts}
          total={total}
          brokerPln={brokerPln}
          formatPln={formatPln}
          rateReady={rateReady}
        />
      </div>
    </div>
  );
};

export default DataInput;
