import { useEffect, useState } from "react";

import { useExchangeRate } from "./hooks/useExchangeRate";
import { loadData, saveData, type BalanceData } from "./utils/storage";

import Loader from "./components/Loader";
import DataInput from "./components/DataInput";
import DataView from "./components/DataView";

function App() {
  const [accounts, setAccounts] = useState<BalanceData>(loadData());

  const { rate: usdPln, loading } = useExchangeRate();

  useEffect(() => {
    saveData(accounts);
  }, [accounts]);

  const updateAccount = (key: keyof BalanceData, value: number) => {
    setAccounts((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/95 text-white flex items-center justify-center">
        <Loader message="Fetching latest USD/PLN rate…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10 lg:py-14 flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col md:flex-col lg:flex-row items-stretch gap-5 sm:gap-6 lg:gap-7 xl:gap-8">
          <div className="flex-1 basis-0 lg:flex-[0.4] flex">
            <DataInput accounts={accounts} onChange={updateAccount} usdPln={usdPln} />
          </div>
          <div className="flex-1 basis-0 lg:flex-[0.6] flex">
            <DataView accounts={accounts} usdPln={usdPln} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
