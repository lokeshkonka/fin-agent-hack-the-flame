const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`
      animate-pulse rounded-xl bg-slate-200
      ${className}
    `}
  />
);

const LoadingDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR PLACEHOLDER */}
      <div className="h-16 bg-white border-b border-slate-200" />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 items-start">
          {/* BALANCE SECTION SKELETON */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 space-y-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-14 w-64" />
            <Skeleton className="h-4 w-80" />

            <div className="rounded-xl bg-blue-50 p-5 space-y-2">
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-6 w-36" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-11 w-32 rounded-2xl" />
              <Skeleton className="h-11 w-32 rounded-2xl" />
            </div>
          </div>

          {/* TRANSACTION LIMIT SKELETON */}
          <div className="flex flex-col gap-6 min-h-[520px]">
            {/* GRAPH */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-[200px] w-full rounded-2xl" />
            </div>

            {/* LIMITS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6">
              <Skeleton className="h-4 w-44" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RECENT TRANSACTIONS ================= */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 space-y-5">
          <Skeleton className="h-5 w-56" />

          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-20 w-full rounded-2xl"
            />
          ))}
        </div>
      </main>

      {/* FOOTER PLACEHOLDER */}
      <div className="h-20" />
    </div>
  );
};

export default LoadingDashboard;
