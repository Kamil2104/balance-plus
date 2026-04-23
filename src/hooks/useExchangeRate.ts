import { useEffect, useState } from "react";

type RatesResponse = {
  rates: Record<string, number>;
};

const CACHE_KEY = "usd_pln_rate_cache";
const CACHE_TTL = 60 * 1000; // 1 minute
const REFRESH_INTERVAL = 60 * 1000; // 1 minute

// Revolut's rate simulation (small spread)
const REVOLUT_SPREAD = 0.002; // 0.2%

export const useExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const getCachedRate = (): number | null => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp > CACHE_TTL) return null;

        return parsed.rate;
      } catch {
        return null;
      }
    };

    const setCachedRate = (rate: number) => {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ rate, timestamp: Date.now() })
        );
      } catch (err) {
        console.warn("Failed to cache rate", err);
      }
    };

    const fetchFromFrankfurter = async (): Promise<number | null> => {
      const res = await fetch(
        "https://api.frankfurter.dev/v1/latest?from=USD&to=PLN"
      );
      if (!res.ok) throw new Error("Frankfurter failed");

      const data: RatesResponse = await res.json();
      return data?.rates?.PLN ?? null;
    };



    const fetchRate = async () => {
      try {
        // 1. cache
        const cached = getCachedRate();
        if (cached) {
          if (!cancelled) {
            setRate(cached);
            setLoading(false);
          }
          return;
        }

        let baseRate: number | null = null;

        // primary API
        baseRate = await fetchFromFrankfurter();

        if (typeof baseRate === "number" && !Number.isNaN(baseRate)) {
          // Revolut's rate simulation (apply small spread)
          const adjusted = baseRate * (1 - REVOLUT_SPREAD);

          if (!cancelled) {
            setRate(adjusted);
            setCachedRate(adjusted);
          }
        } else {
          throw new Error("Invalid rate");
        }
      } catch (err) {
        console.warn("Failed to fetch USD/PLN rate", err);
        if (!cancelled) setRate(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRate();

    const interval = setInterval(fetchRate, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { rate, loading } as const;
};