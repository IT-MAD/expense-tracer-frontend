import React from "react";
import Card from "../components/Card";
import SettingsSection from "../components/SettingsSection";
import ThemeButton from "../components/ThemeButton";
import { useSettings } from "../context/SettingsContext";

const SettingsPage = () => {
  const { theme, handleThemeChange, language, handleLanguageChange } = useSettings() || {}; // Prevent errors if context is missing

  const translations = {
    en: {
      settings: "Settings",
      customize: "Customize your preferences",
      theme: "Theme Preferences",
      light: "Light Theme",
      dark: "Dark Theme",
      language: "Language",
      english: "English",
      arabic: "Arabic",
    },
    ar: {
      settings: "الإعدادات",
      customize: "قم بتخصيص تفضيلاتك",
      theme: "تفضيلات المظهر",
      light: "الوضع الفاتح",
      dark: "الوضع الداكن",
      language: "اللغة",
      english: "الإنجليزية",
      arabic: "العربية",
    },
  };

  const t = translations[language] || translations["en"]; // Default to English if undefined

  return (
    <div
      className={`p-6 min-h-screen flex justify-center items-center transition-all duration-300 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-100 text-gray-800"}
      `}
    >
      <Card
        className={`w-full max-w-lg p-8 shadow-xl rounded-xl border transition-all duration-300
          ${theme === "dark" ? "bg-gray-800 text-white border-gray-700 shadow-gray-900/40" : "bg-white text-gray-900 border-gray-300 shadow-gray-300/40"}
        `}
      >
        {/* Settings Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{t.settings}</h1>
          <p className={`mt-2 text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {t.customize}
          </p>
        </div>

        {/* Theme Preferences */}
        <SettingsSection title={t.theme}>
          <div className="flex justify-center space-x-4 mt-3">
            <ThemeButton
              label={t.light}
              isActive={theme === "light"}
              onClick={() => handleThemeChange("light")}
            />
            <ThemeButton
              label={t.dark}
              isActive={theme === "dark"}
              onClick={() => handleThemeChange("dark")}
            />
          </div>
        </SettingsSection>

        {/* Language Preferences */}
        <SettingsSection title={t.language}>
          <div className="flex justify-center space-x-4 mt-3">
            <ThemeButton
              label={t.english}
              isActive={language === "en"}
              onClick={() => handleLanguageChange("en")}
            />
            <ThemeButton
              label={t.arabic}
              isActive={language === "ar"}
              onClick={() => handleLanguageChange("ar")}
            />
          </div>
        </SettingsSection>
      </Card>
    </div>
  );
};

export default SettingsPage;
