import React from "react";
import { useSettings } from "../context/SettingsContext";

const SettingsSection = ({ title, children }) => {
  const { theme } = useSettings() || {}; // Ensure theme context is available

  return (
    <div className="mb-8">
      <h3
        className={`text-xl font-semibold mb-4 transition-all duration-300 
          ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
        `}
      >
        {title}
      </h3>
      <div className="p-4 rounded-lg transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
