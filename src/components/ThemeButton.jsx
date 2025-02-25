import React from "react";
import { useSettings } from "../context/SettingsContext"; // Import theme & language context

const ThemeButton = ({ label, isActive, onClick }) => {
  const { theme, language } = useSettings(); // Get theme & language

  // Translations
  const translations = {
    en: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    ar: {
      light: "فاتح",
      dark: "داكن",
      system: "النظام",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  const bgColor = isActive
    ? theme === "dark"
      ? "border-blue-400 bg-blue-900 text-white"
      : "border-blue-600 bg-blue-50 text-gray-900"
    : theme === "dark"
    ? "border-gray-600 bg-gray-800 text-white"
    : "border-gray-300 bg-white text-gray-700";

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition duration-300 ${bgColor}`}
    >
      {t[label] || label} {/* Display translated label */}
    </button>
  );
};

export default ThemeButton;
