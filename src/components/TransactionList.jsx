import React from "react";
import { useSettings } from "../context/SettingsContext"; // Import theme & language context

const TransactionList = ({ transactions }) => {
  const { theme, language } = useSettings(); // Get theme & language

  // Translations
  const translations = {
    en: {
      noTransactions: "No transactions found.",
    },
    ar: {
      noTransactions: "لم يتم العثور على معاملات.",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  return (
    <div
      className={`rounded-lg p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">{t.noTransactions}</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((expense, index) => (
            <li key={index} className="flex justify-between py-3">
              <span className="font-medium">{expense.title}</span>
              <span
                className={`font-semibold ${
                  expense.amount >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ${expense.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
