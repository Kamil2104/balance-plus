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
    setAccounts((prev) => ({ ...prev, [key]: value }));
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
    </div>
  );
}

export default App;
