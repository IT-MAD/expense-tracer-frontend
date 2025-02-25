import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MonthlyExpenseChart = ({ data, monthely, theme }) => {
  if (!data.length) return <p className="text-center text-gray-500">No data available</p>;

  const textColor = theme === "dark" ? "#ffffff" : "#333333";
  const axisColor = theme === "dark" ? "#cccccc" : "#8884d8";
  const barColor = theme === "dark" ? "#60a5fa" : "#82ca9d";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthely} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
        <XAxis dataKey="month" stroke={axisColor} tick={{ fill: textColor, fontSize: 12 }} />
        <YAxis stroke={axisColor} tick={{ fill: textColor }} />
        <Tooltip 
          contentStyle={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: textColor }} 
          itemStyle={{ color: textColor }} 
        />
        <Legend layout="vertical" align="right" verticalAlign="top" wrapperStyle={{ color: textColor }} />
        <Bar dataKey="amount" fill={barColor} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpenseChart;
