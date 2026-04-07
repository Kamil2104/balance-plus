export interface BalanceData {
  main: number;
  savings: number;
  broker: number;
  cash: number;
  updatedAt: string | null;
}

export const loadData = (): BalanceData => {
  const data = localStorage.getItem('balanceData');

  if (data) {
    const parsed = JSON.parse(data) as Partial<BalanceData>;
    return {
      main: parsed.main ?? 0,
      savings: parsed.savings ?? 0,
      broker: parsed.broker ?? 0,
      cash: parsed.cash ?? 0,
      updatedAt: parsed.updatedAt ?? null,
    };
  }

  return {
    main: 0,
    savings: 0,
    broker: 0,
    cash: 0,
    updatedAt: null,
  };
};

export const saveData = (data: BalanceData) => {
  localStorage.setItem('balanceData', JSON.stringify(data));
};
