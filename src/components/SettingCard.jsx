import React from "react";
import { useSettings } from "../context/SettingsContext"; // Import theme context

const SettingCard = ({ children }) => {
  const { theme } = useSettings(); // Get theme from context

  const bgColor = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const shadow = theme === "dark" ? "shadow-md shadow-gray-700" : "shadow-lg";

  return (
    <div className={`p-8 rounded-xl w-full max-w-2xl ${bgColor} ${shadow}`}>
      {children}
    </div>
  );
};

export default SettingCard;
