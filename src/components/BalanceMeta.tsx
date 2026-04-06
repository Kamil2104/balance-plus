interface BalanceMetaProps {
  dateLabel: string;
  rateText: string;
}

const BalanceMeta = ({ dateLabel, rateText }: BalanceMetaProps) => (
  <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
    <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_6px_rgba(190,242,100,0.6)]" />
    <span>{dateLabel}</span>
    <span className="text-white/35">•</span>
    <span>USD/PLN: {rateText}</span>
  </div>
);

export default BalanceMeta;

