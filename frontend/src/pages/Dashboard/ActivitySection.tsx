export default function ActivitySection() {
  const activities = [
    {
      id: 1,
      action: "Book Added",
      description: "The Great Gatsby was added to the library",
      time: "2 hours ago",
      type: "add",
      color: "#059669",
    },
    {
      id: 2,
      action: "Book Updated",
      description: "1984 was updated",
      time: "5 hours ago",
      type: "edit",
      color: "#1e293b",
    },
    {
      id: 3,
      action: "Book Deleted",
      description: "Old Book was removed from the library",
      time: "1 day ago",
      type: "delete",
      color: "#dc2626",
    },
  ];

  return (
    <section>
      <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px 0" }}>
          Recent Activity
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Track all activities in your library
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "16px",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                background: `${activity.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activity.color} strokeWidth="2">
                {activity.type === "add" && (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </>
                )}
                {activity.type === "edit" && (
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                )}
                {activity.type === "delete" && (
                  <>
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </>
                )}
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
                  {activity.action}
                </h3>
                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
                  {activity.time}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                {activity.description}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            textAlign: "center",
            padding: "32px 20px",
            background: "#f8fafc",
            borderRadius: "6px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
            Activity logging will be implemented soon
          </p>
        </div>
      </div>
    </section>
  );
}
