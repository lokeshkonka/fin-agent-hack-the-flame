const AdminLoading = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-14 animate-pulse">
      {/* Title */}
      <div className="h-8 w-64 rounded bg-slate-200" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-slate-300 bg-slate-100"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-52 rounded-xl border border-slate-300 bg-slate-100"
          />
        ))}
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-xl border border-slate-300 bg-slate-100"
          />
        ))}
      </div>
    </main>
  );
};

export default AdminLoading;
