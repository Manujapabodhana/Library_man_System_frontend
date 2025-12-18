import { useEffect, useState } from "react";
import type { Book } from "../../types/book";
import { deleteBook, getBooks, updateBook } from "../../api/BooksApi";

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Simple edit state (inline edit)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Book>>({});

  async function refresh() {
    setError("");
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function startEdit(book: Book) {
    setEditingId(book.id);
    setDraft({ ...book });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft({});
  }

  async function saveEdit() {
    if (editingId == null) return;
    const b = draft as Book;

    if (!b.title?.trim()) return setError("Title is required");
    if (!b.author?.trim()) return setError("Author is required");

    try {
      setError("");
      await updateBook(editingId, {
        ...b,
        title: b.title.trim(),
        author: b.author.trim(),
      });
      cancelEdit();
      await refresh();
    } catch (err: any) {
      setError(err.message ?? "Failed to update");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      setError("");
      await deleteBook(id);
      await refresh();
    } catch (err: any) {
      setError(err.message ?? "Failed to delete");
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e2e8f0",
              borderTop: "3px solid #2563eb",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "#64748b", fontSize: "14px" }}>Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a", margin: 0 }}>
            Books Collection
          </h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "14px" }}>
            {books.length} {books.length === 1 ? "book" : "books"} in your library
          </p>
        </div>
        <button
          onClick={refresh}
          style={{
            padding: "8px 16px",
            background: "#1e293b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0f172a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1e293b";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {books.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#f8fafc",
            borderRadius: "6px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
            No books yet
          </h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Start building your library by adding your first book
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {books.map((b) => {
            const isEditing = editingId === b.id;

            return (
              <div
                key={b.id}
                style={{
                  background: "white",
                  border: isEditing ? "2px solid #1e293b" : "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "20px",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.boxShadow = "0 2px 4px 0 rgb(0 0 0 / 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {isEditing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                        Title
                      </label>
                      <input
                        value={(draft.title as string) ?? ""}
                        onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "14px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#1e293b";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#cbd5e1";
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                        Author
                      </label>
                      <input
                        value={(draft.author as string) ?? ""}
                        onChange={(e) => setDraft((p) => ({ ...p, author: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "14px",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#1e293b";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#cbd5e1";
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                        Description
                      </label>
                      <textarea
                        value={(draft.description as string) ?? ""}
                        onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
                        rows={3}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "4px",
                          fontSize: "14px",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#1e293b";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#cbd5e1";
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button
                        onClick={saveEdit}
                        style={{
                          flex: 1,
                          padding: "8px 14px",
                          background: "#059669",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontSize: "13px",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#047857";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#059669";
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{
                          flex: 1,
                          padding: "8px 14px",
                          background: "#f1f5f9",
                          color: "#64748b",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontSize: "13px",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e2e8f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f1f5f9";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: "14px" }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#0f172a",
                          margin: "0 0 6px 0",
                          lineHeight: "1.4",
                        }}
                      >
                        {b.title}
                      </h3>
                      <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 500, margin: 0 }}>
                        {b.author}
                      </p>
                    </div>

                    {b.description && (
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "13px",
                          lineHeight: "1.5",
                          margin: "0 0 16px 0",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {b.description}
                      </p>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        paddingTop: "14px",
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      <button
                        onClick={() => startEdit(b)}
                        style={{
                          flex: 1,
                          padding: "8px 14px",
                          background: "#1e293b",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontSize: "13px",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#0f172a";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#1e293b";
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(b.id)}
                        style={{
                          flex: 1,
                          padding: "8px 14px",
                          background: "transparent",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                          borderRadius: "4px",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontSize: "13px",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#fef2f2";
                          e.currentTarget.style.borderColor = "#dc2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderColor = "#fecaca";
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
