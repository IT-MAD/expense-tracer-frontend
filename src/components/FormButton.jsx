import React from "react";
import { useSettings } from "../context/SettingsContext";

const FormButton = ({ type, isSubmitting, children }) => {
  const { theme, language } = useSettings(); // Get theme & language

  const translations = {
    en: { processing: "Processing..." },
    ar: { processing: "جارٍ المعالجة..." },
  };

  const t = translations[language] || translations["en"]; // Default to English

  return (
    <button
      type={type}
      className={`w-full p-2 rounded-lg transition-all duration-300 
        ${
          theme === "dark"
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
      `}
      disabled={isSubmitting}
    >
      {isSubmitting ? t.processing : children}
    </button>
  );
};

export default FormButton;
