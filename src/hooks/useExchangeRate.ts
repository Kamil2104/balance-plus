import { useEffect, useState } from "react";

type NbpRatesResponse = {
  rates?: Array<{
    ask?: number;
  }>;
};

export const useExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchRate = async () => {
      try {
        const res = await fetch("https://api.nbp.pl/api/exchangerates/rates/c/usd?format=json", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error(`NBP returned ${res.status}`);

        const data: NbpRatesResponse = await res.json();
        const ask = data?.rates?.[0]?.ask;

        if (!cancelled && typeof ask === "number" && !Number.isNaN(ask)) {
          setRate(ask);
        }
      } catch (err) {
        console.warn("Failed to fetch USD/PLN selling rate from NBP", err);
        if (!cancelled) setRate(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRate();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading } as const;
};
