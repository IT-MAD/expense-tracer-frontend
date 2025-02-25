import React from "react";
import { Field, ErrorMessage } from "formik";
import { useSettings } from "../context/SettingsContext";

const FormField = ({ label, name, type = "text", as, children }) => {
  const { theme, language } = useSettings(); // Get theme & language settings

  const translations = {
    en: {
      selectCategory: "Select Category",
      food: "Food",
      utilities: "Utilities",
      health: "Health",
      transport: "Transport",
      entertainment: "Entertainment",
      other: "Other",
    },
    ar: {
      selectCategory: "اختر الفئة",
      food: "طعام",
      utilities: "المرافق",
      health: "الصحة",
      transport: "المواصلات",
      entertainment: "الترفيه",
      other: "أخرى",
    },
  };

  const t = translations[language] || translations["en"]; // Default to English if undefined

  return (
    <div>
      <label
        className={`block font-medium transition-all duration-300 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {label}
      </label>

      {as === "select" ? (
        <Field
          name={name}
          as={as}
          className={`w-full p-2 rounded-lg transition-all duration-300 border 
            ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }
          `}
        >
          <option value="">{t.selectCategory}</option>
          <option value="Food">{t.food}</option>
          <option value="Utilities">{t.utilities}</option>
          <option value="Health">{t.health}</option>
          <option value="Transport">{t.transport}</option>
          <option value="Entertainment">{t.entertainment}</option>
          <option value="Other">{t.other}</option>
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          className={`w-full p-2 rounded-lg transition-all duration-300 border 
            ${
              theme === "dark"
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }
          `}
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default FormField;
