import React from "react";
import { useSettings } from "../context/SettingsContext"; // Import SettingsContext

const ExpenseFilters = ({ filters, onFilterChange }) => {
  const { theme, language } = useSettings(); // Get theme & language from context

  // Translations for language support
  const translations = {
    en: {
      filters: "Filters",
      category: "Category",
      allCategories: "All Categories",
      food: "Food",
      utilities: "Utilities",
      health: "Health",
      transport: "Transport",
      entertainment: "Entertainment",
      other: "Other",
      startDate: "Start Date",
      endDate: "End Date",
    },
    ar: {
      filters: "بحث",
      category: "الفئة",
      allCategories: "كل الفئات",
      food: "طعام",
      utilities: "المرافق",
      health: "الصحة",
      transport: "النقل",
      entertainment: "الترفيه",
      other: "أخرى",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
    },
  };

  const t = translations[language];

  return (
    <div className={`p-6 rounded-lg shadow-md mb-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h2 className="text-lg font-semibold mb-4">{t.filters}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium">{t.category}</label>
          <select
            name="category"
            value={filters.category}
            onChange={onFilterChange}
            className={`mt-1 block w-full p-2 border rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-black"}`}
          >
            <option value="">{t.allCategories}</option>
            <option value="Food">{t.food}</option>
            <option value="Utilities">{t.utilities}</option>
            <option value="Health">{t.health}</option>
            <option value="Transport">{t.transport}</option>
            <option value="Entertainment">{t.entertainment}</option>
            <option value="Other">{t.other}</option>
          </select>
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-sm font-medium">{t.startDate}</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onFilterChange}
            className={`mt-1 block w-full p-2 border rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-black"}`}
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label className="block text-sm font-medium">{t.endDate}</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onFilterChange}
            className={`mt-1 block w-full p-2 border rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-black"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
