import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const Topbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function
  const { theme, language } = useSettings(); // Get theme and language preferences

  // Translations
  const translations = {
    en: {
      title: "Expense Tracker",
      dashboard: "Dashboard",
      expenses: "Expenses",
      settings: "Settings",
      logout: "Logout",
    },
    ar: {
      title: "متتبع المصاريف",
      dashboard: "لوحة التحكم",
      expenses: "المصاريف",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
    },
  };

  const t = translations[language] || translations.en; // Default to English if undefined

  return (
    <header
      className={`py-4 px-6 flex items-center justify-between shadow-md transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gray-800 text-white shadow-gray-900"
            : "bg-white text-gray-800 shadow-gray-200"
        }
      `}
    >
      {/* Left: User's Name or App Title */}
      <div className="text-lg font-semibold">{user ? user.name : t.title}</div>

      {/* Center: Navigation Links */}
      <nav className="flex space-x-6">
        <Link
          to="/dashboard"
          className={`px-4 py-2 rounded-lg transition
            ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {t.dashboard}
        </Link>
        <Link
          to="/expenses"
          className={`px-4 py-2 rounded-lg transition
            ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {t.expenses}
        </Link>
        <Link
          to="/settings"
          className={`px-4 py-2 rounded-lg transition
            ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {t.settings}
        </Link>
      </nav>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
    ${
      theme === "dark"
        ? "text-red-400 bg-gray-700 hover:bg-red-600 hover:text-white"
        : "text-red-600 bg-gray-100 hover:bg-red-500 hover:text-white"
    }
  `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-7.5A2.25 2.25 0 0 0 3.75 5.25v13.5A2.25 2.25 0 0 0 6 21h7.5a2.25 2.25 0 0 0 2.25-2.25V15m-6-3h11.25m0 0-3-3m3 3-3 3"
          />
        </svg>
        {t.logout}
      </button>
    </header>
  );
};

export default Topbar;
