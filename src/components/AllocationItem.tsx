interface AllocationItemProps {
  name: string;
  value: number;
  percentage: number;
  color: string;
  formatPln: (value: number) => string;
}

const AllocationItem = ({ name, value, percentage, color, formatPln }: AllocationItemProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
    <div className="flex items-center gap-2.5">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <div>
        <p className="text-sm font-semibold text-white leading-tight">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.04em] text-white/50 leading-tight">
          {percentage}% of total
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-base font-semibold text-white">{formatPln(value)}</p>
    </div>
  </div>
);

export default AllocationItem;
