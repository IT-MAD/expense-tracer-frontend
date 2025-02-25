import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSettings } from "../context/SettingsContext";

const ExpensePieChart = ({ data = [] }) => {
  const { theme, language } = useSettings(); // Get theme & language settings

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28"];

  const translations = {
    en: {
      noData: "No expense data available",
      currency: "$",
    },
    ar: {
      noData: "لا توجد بيانات مصاريف",
      currency: "د.إ",
    },
  };

  const t = translations[language] || translations["en"]; // Default to English if undefined

  if (!data.length)
    return (
      <p className={`text-center text-lg font-medium transition-all duration-300 
        ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
      `}>
        {t.noData}
      </p>
    );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          labelStyle={{
            fontSize: "14px",
            fill: theme === "dark" ? "#ddd" : "#333", // Adapt label color
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${t.currency}${value}`}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#222" : "#fff",
            borderColor: theme === "dark" ? "#555" : "#ddd",
            color: theme === "dark" ? "#fff" : "#333",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
