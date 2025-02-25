import React from "react";
import ExpenseItem from "./ExpenseItem";
import { useSettings } from "../context/SettingsContext";

const ExpenseList = ({ expenses, onDeleteSuccess }) => {
  const { theme, language } = useSettings();

  const translations = {
    en: {
      expenses: "Expenses",
      noExpenses: "No expenses found.",
    },
    ar: {
      expenses: "المصروفات",
      noExpenses: "لم يتم العثور على مصروفات.",
    },
  };

  const t = translations[language];

  return (
    <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
    `}>
      <h2 className="text-2xl font-bold mb-5 border-b pb-2 border-gray-300 dark:border-gray-700">
        {t.expenses}
      </h2>

      {expenses.length > 0 ? (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem key={expense._id} expense={expense} onDeleteSuccess={onDeleteSuccess} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium mt-4">
          {t.noExpenses}
        </p>
      )}
    </div>
  );
};

export default ExpenseList;
