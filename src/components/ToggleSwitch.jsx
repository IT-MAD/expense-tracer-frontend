import React from "react";
import { useSettings } from "../context/SettingsContext"; // Import theme & language context

const ToggleSwitch = ({ label, isOn, onChange }) => {
  const { theme, language } = useSettings(); // Get theme & language

  // Translations
  const translations = {
    en: {
      darkMode: "Dark Mode",
      notifications: "Notifications",
    },
    ar: {
      darkMode: "الوضع الداكن",
      notifications: "الإشعارات",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  const bgColor = isOn
    ? theme === "dark"
      ? "bg-blue-400"
      : "bg-blue-600"
    : theme === "dark"
    ? "bg-gray-600"
    : "bg-gray-300";

  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 dark:text-gray-300">{t[label] || label}</label>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full p-1 transition-colors ${bgColor}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default ToggleSwitch;
