import { useEffect, useState } from "react";

export const useExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchRate = async () => {
      const tryFetch = async (url: string, extractor: (json: unknown) => number | null) => {
        try {
          const res = await fetch(url);
          const json = await res.json();
          const parsed = extractor(json);
          if (typeof parsed === "number" && !Number.isNaN(parsed)) return parsed;
        } catch (e) {
          console.warn("rate fetch failed for", url, e);
        }
        return null;
      };

      const primary = await tryFetch(
        "https://api.exchangerate.host/latest?base=USD&symbols=PLN",
        (json) => (json as { rates?: Record<string, number> })?.rates?.PLN ?? null,
      );
      if (!cancelled && primary) {
        setRate(primary);
        setLoading(false);
        return;
      }

      const nbp = await tryFetch(
        "https://api.nbp.pl/api/exchangerates/rates/a/usd?format=json",
        (json) => (json as { rates?: Array<{ mid?: number }> })?.rates?.[0]?.mid ?? null,
      );
      if (!cancelled && nbp) {
        setRate(nbp);
        setLoading(false);
        return;
      }

      if (!cancelled) {
        setRate(3.71);
        setLoading(false);
      }
    };

    fetchRate();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading } as const;
};

