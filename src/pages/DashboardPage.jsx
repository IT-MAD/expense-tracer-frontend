import React, { useEffect } from "react";
import TransactionList from "../components/TransactionList";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";

// context
import { useAuth } from "../context/AuthContext";
import { useExpense } from "../context/ExpenseContext";
import { useSettings } from "../context/SettingsContext";

const DashboardPage = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const { expenses, monthely, totalExp, totalExpenses, fetchExpenses, monthelyExpenses } = useExpense(); 
  const { theme, language } = useSettings();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      fetchExpenses(token);
      totalExpenses(token);
      monthelyExpenses(token);
    }
  }, [user, fetchExpenses, totalExpenses, monthelyExpenses]);

  const pieData = expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  }));

  const translations = {
    en: {
      dashboard: "Dashboard",
      totalExpenses: "Total Expenses",
      recentTransactions: "Recent Transactions",
      expenseBreakdown: "Expense Breakdown",
      monthlyTrend: "Monthly Expense Trend"
    },
    ar: {
      dashboard: "لوحة التحكم",
      totalExpenses: "إجمالي النفقات",
      recentTransactions: "المعاملات الأخيرة",
      expenseBreakdown: "تفصيل النفقات",
      monthlyTrend: "اتجاه المصاريف الشهرية"
    }
  };

  const t = translations[language];

  return (
    <div className={`p-10 min-h-screen flex justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-50 text-black"}`}>
      <div className="max-w-6xl w-full">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          {t.dashboard}
        </h1>

        {/* Total Expenses Card */}
        <div className={`shadow-lg rounded-xl p-6 flex flex-col items-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">{t.totalExpenses}</h2>
          <p className="text-4xl font-bold text-red-500 mt-2">
            ${totalExp}
          </p>
        </div>

        {/* Grid Layout for Transactions & Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Recent Transactions */}
          <div className={`shadow-lg rounded-xl p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {t.recentTransactions}
            </h2>
            <TransactionList transactions={expenses} theme={theme} />
          </div>

          {/* Expense Breakdown */}
          <div className={`shadow-lg rounded-xl p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {t.expenseBreakdown}
            </h2>
            <ExpensePieChart data={pieData} />
          </div>
        </div>

        {/* Monthly Expense Chart */}
        <div className={`shadow-lg rounded-xl p-6 mt-10 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t.monthlyTrend}
          </h2>
          <MonthlyExpenseChart data={expenses} monthely={monthely} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
