import { useState } from "react";
import type { CreateBook } from "../../types/book";
import { createBook } from "../../api/BooksApi";

type Props = {
  onCreated?: () => void;
};

export default function AddBookSection({ onCreated }: Props) {
  const [form, setForm] = useState<CreateBook>({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publishedDate: null,
    availableCopies: null,
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof CreateBook>(key: K, value: CreateBook[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Title is required");
    if (!form.author.trim()) return setError("Author is required");

    try {
      setLoading(true);
      await createBook({
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
      });
      setForm({ title: "", author: "", description: "", isbn: "", publishedDate: null, availableCopies: null });
      onCreated?.();
    } catch (err: any) {
      setError(err.message ?? "Failed to create book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px 0" }}>
          Add New Book
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Fill in the details to add a new book to your library
        </p>
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

      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Title <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter book title"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.15s ease",
                background: "white",
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
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Author <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              placeholder="Enter author name"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.15s ease",
                background: "white",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            Description
          </label>
          <textarea
            value={form.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Enter book description (optional)"
            rows={4}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              fontSize: "14px",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "border-color 0.15s ease",
              background: "white",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1e293b";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 24px",
              background: loading ? "#94a3b8" : "#1e293b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              transition: "background 0.15s ease",
              minWidth: "120px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "#0f172a";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "#1e293b";
              }
            }}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm({
                title: "",
                author: "",
                description: "",
                isbn: "",
                publishedDate: null,
                availableCopies: null,
              });
              setError("");
            }}
            style={{
              padding: "10px 24px",
              background: "white",
              color: "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "14px",
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
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}
