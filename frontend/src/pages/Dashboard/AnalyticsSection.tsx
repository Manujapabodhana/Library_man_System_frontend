import { useEffect, useState } from "react";
import { getBooks } from "../../api/BooksApi";

export default function AnalyticsSection() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    booksWithDescription: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const books = await getBooks();
        const uniqueAuthors = new Set(books.map((b) => b.author)).size;
        const withDescription = books.filter((b) => b.description && b.description.trim()).length;

        setStats({
          totalBooks: books.length,
          totalAuthors: uniqueAuthors,
          booksWithDescription: withDescription,
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      color: "#1e293b",
      bg: "#f1f5f9",
    },
    {
      title: "Unique Authors",
      value: stats.totalAuthors,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      title: "With Description",
      value: stats.booksWithDescription,
      color: "#d97706",
      bg: "#fef3c7",
    },
  ];

  return (
    <section>
      <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px 0" }}>
          Analytics
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Overview of your library collection
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "20px",
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
                width: "48px",
                height: "48px",
                borderRadius: "6px",
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2">
                {index === 0 && (
                  <>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </>
                )}
                {index === 1 && (
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                )}
                {index === 2 && (
                  <>
                    <line x1="16" y1="2" x2="16" y2="5" />
                    <line x1="8" y1="2" x2="8" y2="5" />
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </>
                )}
              </svg>
            </div>
            <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {stat.title}
            </h3>
            <p style={{ fontSize: "28px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
