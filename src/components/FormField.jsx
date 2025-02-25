import React from "react";
import { Field, ErrorMessage } from "formik";
import { useSettings } from "../context/SettingsContext";

const FormField = ({ label, name, type = "text", as, children }) => {
  const { theme } = useSettings(); // Get theme settings

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
          {children} {/* Ensures select options are properly rendered */}
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
