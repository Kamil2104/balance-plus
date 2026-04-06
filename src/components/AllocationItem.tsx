interface AllocationItemProps {
  name: string;
  value: number;
  percentage: number;
  color: string;
  formatPln: (value: number) => string;
}

const AllocationItem = ({ name, value, percentage, color, formatPln }: AllocationItemProps) => (
  <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-5 py-4 shadow-[0_14px_38px_rgba(0,0,0,0.35)]">
    <div className="flex items-center gap-3">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <div>
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs uppercase tracking-[0.05em] text-white/50">
          {percentage}% of total
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-semibold text-white">{formatPln(value)}</p>
    </div>
  </div>
);

export default AllocationItem;
