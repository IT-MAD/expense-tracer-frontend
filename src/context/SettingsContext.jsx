import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // Load settings from localStorage or use defaults
  const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || {
    email: true,
    push: false,
    sms: false,
  };
  
  const storedTheme = localStorage.getItem("theme") || "light";
  const storedLanguage = localStorage.getItem("language") || "en"; // Default to English

  const [notifications, setNotifications] = useState(storedNotifications);
  const [theme, setTheme] = useState(storedTheme);
  const [language, setLanguage] = useState(storedLanguage);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        handleNotificationChange,
        theme,
        handleThemeChange,
        language,
        handleLanguageChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
