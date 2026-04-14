interface LoaderProps {
  message?: string;
}

const Loader = ({ message = "Fetching latest USD/PLN rate…" }: LoaderProps) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative inline-flex items-center justify-center px-6">
          <div className="relative h-28 w-28">
            <div className="absolute inset-0 rounded-full border-4 border-white/12" />
            <div className="absolute inset-1 rounded-full border-4 border-lime-300/90 border-t-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full bg-white/10 blur-lg animate-pulse" />
          </div>
          <div className="absolute px-5 py-2 rounded-full bg-black/70 backdrop-blur text-lg tracking-[0.28em] uppercase text-white/85 shadow-[0_12px_35px_rgba(0,0,0,0.45)] animate-pulse">
            Loading
          </div>
        </div>
        <p className="text-base text-white/75 animate-pulse text-center px-6">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
