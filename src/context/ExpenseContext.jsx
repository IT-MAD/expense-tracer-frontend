// context/ExpenseContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../utils/api";

// Create the ExpenseContext
const ExpenseContext = createContext();

// Create the ExpenseProvider component
export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [monthely, setMonthely] = useState([]);
  const [totalExp, setTotalExp] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  // Fetch total expenses
  const totalExpenses = async (token) => {
    try {
      const { data } = await API.get("/expense/total", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalExp(data.totalExpense);
    } catch (error) {
      console.error("Failed to fetch total expenses", error);
    }
  };

  // Fetch expenses based on filters
  const fetchExpenses = async (token, filters = {}) => {
    try {
      const { data: transactions } = await API.get("/expense", {
        headers: { Authorization: `Bearer ${token}` },
        params: filters, // Pass filters as query parameters
      });
      setExpenses(transactions);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  // Fetch monthly expenses
  const monthelyExpenses = async (token) => {
    try {
      const { data } = await API.get("/expense/monthly", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonthely(data);
    } catch (error) {
      console.error("Error fetching monthly expenses", error);
    }
  };

  // Handle expense deletion
  const deleteExpense = async (expenseId, token) => {
    try {
      await API.delete(`/expense/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchExpenses(token, filters);
    totalExpenses(token);
    monthelyExpenses(token);
  }, [filters]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        monthely,
        totalExp,
        filters,
        setExpenses,
        setMonthely,
        setTotalExp,
        totalExpenses,
        fetchExpenses,
        monthelyExpenses,
        deleteExpense,
        handleFilterChange,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use ExpenseContext
export const useExpense = () => useContext(ExpenseContext);
