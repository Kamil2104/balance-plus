export interface BalanceData {
  main: number;
  savings: number;
  broker: number;
  cash: number;
}

export const loadData = (): BalanceData => {
  const data = localStorage.getItem('balanceData');

  if (data) return JSON.parse(data);

  return {
    main: 0,
    savings: 0,
    broker: 0,
    cash: 0,
  };
};

export const saveData = (data: BalanceData) => {
  localStorage.setItem('balanceData', JSON.stringify(data));
};
