import {
  X,
  Users,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  Snowflake,
  CheckCircle2,
  Activity,
  ExternalLink,
} from "lucide-react";
import type {
  AdminStats,
  SimpleUser,
  TimePoint,
  UserFraudDetail,
  KycDetails,
} from "./Admin";

interface Props {
  stats: AdminStats | null;
  frozenUsers: SimpleUser[];
  pendingKyc: SimpleUser[];
  transactionSeries: TimePoint[];
  fraudSeries: TimePoint[];
  frozenSeries: TimePoint[];
  onViewFraud: (userId: string) => void;
  onViewKyc: (email: string) => void;
  onUnfreeze: (email: string) => void;
  onApproveKyc: (email: string) => void;
  approvingKyc: boolean;
  fraudDetail: UserFraudDetail | null;
  kycDetail: KycDetails | null;
  closeFraud: () => void;
  closeKyc: () => void;
}

const AdminUI = ({
  stats,
  frozenUsers,
  pendingKyc,
  transactionSeries,
  fraudSeries,
  frozenSeries,
  onViewFraud,
  onViewKyc,
  onUnfreeze,
  onApproveKyc,
  approvingKyc,
  fraudDetail,
  kycDetail,
  closeFraud,
  closeKyc,
}: Props) => {
  if (!stats) return null;

  const openPdf = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-14 space-y-16">
      <h1 className="text-3xl font-semibold">Admin Control Panel</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
        <StatCard icon={<Users />} label="Users" value={stats.totalUsers} />
        <StatCard icon={<ShieldAlert />} label="Frozen" value={stats.totalFrozenUsers} />
        <StatCard icon={<AlertTriangle />} label="Fraud Today" value={stats.totalFraudTransactionsToday} danger />
        <StatCard icon={<Users />} label="Tx Today" value={stats.totalTransactionsToday} />
        <StatCard icon={<FileCheck />} label="KYC Pending" value={stats.totalKycPending} />
      </div>

      {/* GRAPHS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Activity size={18} />
          <h2 className="text-xl font-medium">System Activity Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <ChartCard title="Transactions">
            <LineChart data={transactionSeries} color="#2563eb" />
          </ChartCard>
          <ChartCard title="Fraud">
            <LineChart data={fraudSeries} color="#dc2626" />
          </ChartCard>
          <ChartCard title="Frozen">
            <LineChart data={frozenSeries} color="#64748b" />
          </ChartCard>
        </div>
      </section>

      {/* FROZEN USERS */}
      <Card title="Frozen Users" icon={<Snowflake />}>
        {frozenUsers.length === 0 ? (
          <EmptyState icon={<Snowflake />} text="No frozen accounts." />
        ) : (
          frozenUsers.map((u) => (
            <UserRow key={u.userId}>
              <UserInfo name={u.name} email={u.email} />
              <ActionButton text="View Fraud" onClick={() => onViewFraud(u.userId)} />
            </UserRow>
          ))
        )}
      </Card>

      {/* PENDING KYC */}
      <Card title="Pending KYC" icon={<CheckCircle2 />}>
        {pendingKyc.length === 0 ? (
          <EmptyState icon={<CheckCircle2 />} text="All KYC cleared." />
        ) : (
          pendingKyc.map((u) => (
            <UserRow key={u.userId}>
              <UserInfo name={u.name} email={u.email} />
              <ActionButton text="View KYC" primary onClick={() => onViewKyc(u.email)} />
            </UserRow>
          ))
        )}
      </Card>

      {/* FRAUD DETAIL MODAL */}
      {fraudDetail && (
        <Modal title="Fraud Investigation" onClose={closeFraud}>
          <div className="mb-4">
            <p className="font-medium">{fraudDetail.name}</p>
            <p className="text-sm text-slate-500">{fraudDetail.email}</p>
            <p className="text-sm mt-1">
              Balance: ₹{fraudDetail.balance}
            </p>
          </div>

          <div className="space-y-3">
            {fraudDetail.fraudTransactions.map((f) => (
              <div key={f.fraudTransactionId} className="border border-slate-200 rounded-lg p-4">
                <p className="font-medium">₹{f.amount}</p>
                <p className="text-sm text-slate-500">
                  {f.fraudType} — {f.fraudReason}
                </p>
              </div>
            ))}
          </div>

          {fraudDetail.isFrozen && (
            <div className="mt-6">
              <ActionButton danger text="Unfreeze Account" onClick={() => onUnfreeze(fraudDetail.email)} />
            </div>
          )}
        </Modal>
      )}

      {/* KYC DETAIL MODAL */}
      {kycDetail && (
        <Modal title="KYC Review" onClose={closeKyc}>
          <div className="space-y-2 text-sm mb-4">
            <p><strong>Name:</strong> {kycDetail.name}</p>
            <p><strong>Email:</strong> {kycDetail.email}</p>
            <p><strong>Phone:</strong> {kycDetail.phoneNumber}</p>
            <p><strong>Address:</strong> {kycDetail.address}</p>
          </div>

          <div className="flex gap-3 mb-6">
            <PdfButton onClick={() => openPdf(kycDetail.aadharPdfUrl)} label="View Aadhaar PDF" />
            <PdfButton onClick={() => openPdf(kycDetail.panPdfUrl)} label="View PAN PDF" />
          </div>

          <button
            disabled={approvingKyc}
            onClick={() => onApproveKyc(kycDetail.email)}
            className="rounded-lg border border-blue-300 px-5 py-2.5 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-60"
          >
            {approvingKyc ? "Approving…" : "Approve KYC"}
          </button>
        </Modal>
      )}
    </main>
  );
};

/* ================= REUSABLE ================= */

const PdfButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
  >
    <ExternalLink size={14} />
    {label}
  </button>
);

const StatCard = ({
  icon,
  label,
  value,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  danger?: boolean;
}) => (
  <div className={`rounded-xl border border-slate-200 bg-white p-6 ${danger ? "text-red-600" : ""}`}>
    <div className="flex items-center gap-2 text-sm text-slate-500">
      {icon}
      {label}
    </div>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <h3 className="mb-3 font-medium">{title}</h3>
    {children}
  </div>
);

const LineChart = ({ data, color }: { data: TimePoint[]; color: string }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <svg viewBox="0 0 360 150" className="w-full h-44">
      <line x1="20" y1="120" x2="340" y2="120" stroke="#e2e8f0" />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={data
          .map((d, i) => {
            const x = 20 + (i / 23) * 320;
            const y = 120 - (d.value / max) * 80;
            return `${x},${y}`;
          })
          .join(" ")}
      />
    </svg>
  );
};

const Card = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
    <h3 className="flex items-center gap-2 font-medium">
      {icon}
      {title}
    </h3>
    {children}
  </section>
);

const UserRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between border border-slate-200 rounded-lg px-5 py-4 hover:bg-slate-50">
    {children}
  </div>
);

const UserInfo = ({ name, email }: { name: string; email: string }) => (
  <div>
    <p className="font-medium">{name}</p>
    <p className="text-sm text-slate-500">{email}</p>
  </div>
);

const ActionButton = ({
  text,
  onClick,
  primary,
  danger,
}: {
  text: string;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`rounded-lg border px-5 py-2.5 text-sm ${
      danger
        ? "border-red-300 text-red-600 hover:bg-red-50"
        : primary
        ? "border-blue-300 text-blue-600 hover:bg-blue-50"
        : "border-slate-300 hover:bg-slate-50"
    }`}
  >
    {text}
  </button>
);

const EmptyState = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex flex-col items-center gap-3 py-10 text-slate-500">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100">
      {icon}
    </div>
    <p className="text-sm">{text}</p>
  </div>
);

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative w-full max-w-2xl rounded-xl bg-white p-7">
      <button onClick={onClose} className="absolute right-4 top-4">
        <X size={18} />
      </button>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  </div>
);

export default AdminUI;
