import { useEffect, useState } from "react";

import { useExchangeRate } from "./hooks/useExchangeRate";
import { loadData, saveData, type BalanceData } from "./utils/storage";

import Loader from "./components/Loader";
import DataInput from "./components/DataInput";
import DataView from "./components/DataView";

function App() {
  const [accounts, setAccounts] = useState<BalanceData>(loadData());

  const { rate: usdPln, loading } = useExchangeRate();
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const showViewportWarning = viewport.w < 1200 || viewport.h < 800;

  useEffect(() => {
    saveData(accounts);
  }, [accounts]);

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const updateAccount = (key: keyof BalanceData, value: number) => {
    setAccounts((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="min-h-screen bg-black/95 text-white flex flex-col lg:flex-row items-stretch justify-center gap-10 px-6 py-12">
      {loading ? (
        <Loader message="Fetching latest USD/PLN rate…" />
      ) : (
        <>
          <DataInput accounts={accounts} onChange={updateAccount} usdPln={usdPln} />
          <DataView accounts={accounts} usdPln={usdPln} />
        </>
      )}

      {showViewportWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="max-w-xl rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <p className="text-sm uppercase tracking-[0.22em] text-white/50">Heads up</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Project preview is desktop-only</h3>
            <p className="mt-3 text-white/75">
              This portfolio view was built just for my use and isn&apos;t responsive. Please open on a larger
              screen to see the layout properly.
            </p>
            <p className="mt-3 text-white/60 text-sm">
              Your viewport: {viewport.w}px × {viewport.h}px · Recommended: min 1200px wide, 800px high.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
