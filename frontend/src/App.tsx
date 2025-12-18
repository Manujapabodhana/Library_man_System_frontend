import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
