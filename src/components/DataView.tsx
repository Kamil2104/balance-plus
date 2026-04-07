import { useMemo } from "react";

import AllocationItem from "./AllocationItem";
import ColorPalette from "./ColorPalette";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { type BalanceData } from "../utils/storage";
import useSliceColors from "../hooks/useSliceColors";

interface DataViewProps {
  accounts: BalanceData;
  usdPln: number | null;
}

const formatPln = (value: number) =>
  value.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  });

const DataView = ({ accounts, usdPln }: DataViewProps) => {
  const rate = usdPln ?? 3.72; // fallback if rate is not available yet
  const { colors, setColorAt, undo, canUndo } = useSliceColors();

  const lastUpdatedText = accounts.updatedAt
    ? (() => {
        const dt = new Date(accounts.updatedAt);
        const date = dt.toLocaleDateString("en-GB", { dateStyle: "medium" });
        const time = dt.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${date} at ${time}`;
      })()
    : "No data yet";

  const data = useMemo(
    () => [
      { name: "Main", value: accounts.main },
      { name: "Savings", value: accounts.savings },
      { name: "Investments", value: accounts.broker * rate },
      { name: "Cash", value: accounts.cash },
    ],
    [accounts, rate],
  );

  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  return (
    <div className="w-full max-w-4xl min-h-130 rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-white/10 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Portfolio split
          </p>
          <h2 className="text-3xl font-semibold text-white">Data View</h2>
        </div>
        <div className="w-65 rounded-xl border border-white/15 bg-linear-to-br from-black/10 via-white/6 to-black/20 px-4 py-3 shadow-[0_10px_22px_rgba(0,0,0,0.28)] flex items-center justify-between backdrop-blur">
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Total balance</p>
            <div className="text-2xl font-semibold text-white tracking-tight">{formatPln(total)}</div>
            <p className="text-[11px] text-white/55 mt-1">Last updated: {lastUpdatedText}</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_6px_14px_rgba(0,0,0,0.3)]">
            <span className="flex items-end gap-0.5 h-5">
              <span className="w-0.75 h-3 rounded-full" style={{ backgroundColor: "#d6f36b" }} />
              <span className="w-0.75 h-4 rounded-full" style={{ backgroundColor: "#6ee7b7" }} />
              <span className="w-0.75 h-5 rounded-full" style={{ backgroundColor: "#f9c74f" }} />
            </span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="h-full min-h-80 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="sliceGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={135}
                paddingAngle={3}
                stroke="rgba(255,255,255,0.08)"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={colors[index % colors.length]}
                    className="drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(15,15,20,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  color: "#fff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                }}
                formatter={(value) => formatPln(Number(value))}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 12,
                }}
                formatter={(value) => (
                  <span className="text-sm text-white/80">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {data.map((item, idx) => {
            const percentage = total === 0 ? 0 : Math.round((item.value / total) * 100);
            return (
              <AllocationItem
                key={item.name}
                name={item.name}
                value={item.value}
                percentage={percentage}
                color={colors[idx % colors.length]}
                formatPln={formatPln}
              />
            );
          })}
        </div>

        <ColorPalette
          items={data}
          colors={colors}
          onChange={setColorAt}
          onUndo={undo}
          canUndo={canUndo}
        />
      </div>
    </div>
  );
};

export default DataView;
