import { useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AddBookSection from "./Dashboard/AddBookSection";
import BooksSection from "./Dashboard/BooksSection";
import AnalyticsSection from "./Dashboard/AnalyticsSection";
import "../App.css";

type Tab = "books" | "add" | "analytics";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("books");
  const [booksRefreshKey, setBooksRefreshKey] = useState(0);

  function onCreated() {
    // refresh the list after adding
    setBooksRefreshKey((k) => k + 1);
    setTab("books");
  }

  return (
    <div className="app-container" style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Header />
        <Navbar />

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "20px" }}>
          <Sidebar active={tab} onChange={setTab} />

          <main
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "24px",
              minHeight: "600px",
            }}
          >
            {tab === "books" && <BooksSection key={booksRefreshKey} />}
            {tab === "add" && <AddBookSection onCreated={onCreated} />}
            {tab === "analytics" && <AnalyticsSection />}
          </main>
        </div>
      </div>
    </div>
  );
}

