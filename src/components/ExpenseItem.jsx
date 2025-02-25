import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSettings } from "../context/SettingsContext";
import API from "../utils/api";

const ExpenseItem = ({ expense, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const { theme, language } = useSettings();

  const translations = {
    en: {
      deleteConfirm: "Are you sure you want to delete this expense?",
      deleteSuccess: "Expense deleted successfully!",
      deleteError: "Failed to delete expense.",
      category: "Category",
    },
    ar: {
      deleteConfirm: "هل أنت متأكد أنك تريد حذف هذه المصروفات؟",
      deleteSuccess: "تم حذف المصروف بنجاح!",
      deleteError: "فشل في حذف المصروف.",
      category: "الفئة",
    },
  };

  const t = translations[language];

  const handleDelete = async () => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/expense/${expense._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(t.deleteSuccess);
      onDeleteSuccess(expense._id); // Update UI after successful deletion
    } catch (error) {
      toast.error(t.deleteError);
      console.error("Delete error:", error);
    }
  };

  return (
    <div
      className={`p-5 rounded-xl flex justify-between items-center shadow-md transition-all duration-300 
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Expense Details */}
      <div>
        <h3 className="text-lg font-semibold">{expense.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.category}: {expense.category}
        </p>
      </div>

      {/* Amount & Date */}
      <div className="text-right">
        <p className="text-xl font-bold text-red-500">${expense.amount}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(expense.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => navigate(`/edit-expense/${expense._id}`)}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182l-10.5 10.5a4.5 4.5 0 01-1.657 1.062l-4.057 1.353a.75.75 0 01-.94-.94l1.353-4.057a4.5 4.5 0 011.062-1.657l10.5-10.5z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487L20.5 7.125" />
          </svg>
        </button>

        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
