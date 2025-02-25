import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseList from "../components/ExpenseList";
import API from "../utils/api";
import { useSettings } from "../context/SettingsContext"; // Import SettingsContext

const ExpenseListPage = () => {
  const navigate = useNavigate();
  const { theme, language } = useSettings(); // Get theme & language from context
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/expense", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle delete success and remove expense from the list
  const handleDeleteSuccess = (deletedId) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== deletedId));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter expenses based on selected filters
  const filteredExpenses = expenses.filter((expense) => {
    return (
      (filters.category === "" || expense.category === filters.category) &&
      (filters.startDate === "" || expense.createdAt >= filters.startDate) &&
      (filters.endDate === "" || expense.createdAt <= filters.endDate)
    );
  });

  // Translations for multi-language support
  const translations = {
    en: {
      expenseList: "Expense List",
      addExpense: "+ Add Expense",
    },
    ar: {
      expenseList: "قائمة النفقات",
      addExpense: "+ إضافة نفقات",
    },
  };

  const t = translations[language];

  return (
    <div className={`p-10 min-h-screen flex justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-50 text-black"}`}>
      <div className={`max-w-4xl w-full shadow-lg rounded-xl p-8 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h1 className="text-3xl font-bold mb-6 text-center">{t.expenseList}</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/add-expense")}
            className="px-4 py-2 rounded-lg shadow-md transition 
                       ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700 text-white'}"
          >
            {t.addExpense}
          </button>
        </div>

        <div className="mb-6">
          <ExpenseFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className={`rounded-lg shadow-inner ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
          <ExpenseList expenses={filteredExpenses} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseListPage;
