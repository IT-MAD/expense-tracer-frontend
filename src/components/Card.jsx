import { useSettings } from "../context/SettingsContext";

const Card = ({ title, children }) => {
  const { theme } = useSettings(); // Get theme from context

  return (
    <div
      className={`p-8 rounded-xl shadow-lg w-full max-w-2xl transition-all duration-300
        ${theme === "dark" ? "bg-gray-800 text-white shadow-gray-900/50 border border-gray-700" : "bg-white text-gray-800 shadow-gray-300/50 border border-gray-200"}
      `}
    >
      {title && (
        <h2
          className={`text-2xl font-bold mb-6 transition-all duration-300
            ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
          `}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
