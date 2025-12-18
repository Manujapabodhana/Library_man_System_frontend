type Tab = "books" | "add" | "analytics";

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export default function Sidebar({ active, onChange }: Props) {
  const tabs: { id: Tab; label: string; icon: () => React.JSX.Element }[] = [
    { id: "books", label: "Books", icon: IconBook },
    { id: "add", label: "Add Book", icon: IconPlus },
    { id: "analytics", label: "Analytics", icon: IconChart },
  ];

  return (
    <aside
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        padding: "12px",
        height: "fit-content",
        position: "sticky",
        top: "24px",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                padding: "12px 16px",
                textAlign: "left",
                border: "none",
                background: active === tab.id ? "#f1f5f9" : "transparent",
                color: active === tab.id ? "#0f172a" : "#64748b",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: active === tab.id ? 600 : 500,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.15s ease",
                borderLeft: active === tab.id ? "3px solid #1e293b" : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== tab.id) {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.color = "#475569";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== tab.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

