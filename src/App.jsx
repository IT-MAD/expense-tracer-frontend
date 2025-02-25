import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";

// components
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import TopBar from "./components/TopBar";

// Pages
import AddExpensePage from "./pages/AddExpensePage";
import DashboardPage from "./pages/DashboardPage";
import EditExpensePage from "./pages/EditExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
// import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { SettingsProvider } from "./context/SettingsContext";

function AppContent() {
  const { user } = useAuth(); // ✅ Now inside AuthProvider

  return (
    <>
      {user && <TopBar />}
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpenseListPage />} />
          <Route path="/add-expense" element={<AddExpensePage />} />
          <Route path="/edit-expense/:id" element={<EditExpensePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <ToastContainer />
      <SettingsProvider>
        <ExpenseProvider>
          <AuthProvider>
            <Router>
              <AppContent /> {/* ✅ Moved useAuth inside this component */}
            </Router>
          </AuthProvider>
        </ExpenseProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
