import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "20px 0",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#1e293b",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.025em" }}>
              Library Management System
            </h1>
            <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#64748b" }}>
              Professional Collection Management
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "#0f172a", fontWeight: 500, marginBottom: "2px" }}>
              {user?.username}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
              {user?.email}
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              background: "white",
              color: "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "13px",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#94a3b8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

