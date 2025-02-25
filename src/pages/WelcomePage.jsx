import React from "react";
import { useAuth } from "../context/AuthContext";

const WelcomePage = () => {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <div className="min-h-screen p-5 bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Expense Tracker</h1>
        <p className="text-gray-600 mt-4">
          Take control of your finances! Our smart Expense Tracker helps you manage your spending, 
          track expenses, and achieve your financial goals effortlessly.
        </p>

        {/* Image */}
        <img 
          src="https://images.pexels.com/photos/30469700/pexels-photo-30469700/free-photo-of-gourmet-plated-fine-dining-experience.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
          alt="Expense Tracker Illustration" 
          className="w-full mt-6 rounded-lg shadow"
        />

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold">📊 Expense Tracking</h3>
            <p className="text-sm mt-2">Log and categorize expenses easily.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold">💰 Budget Planning</h3>
            <p className="text-sm mt-2">Set monthly budgets and stay on track.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold">📅 Financial Reports</h3>
            <p className="text-sm mt-2">Get insightful reports on your spending habits.</p>
          </div>
        </div>

        {/* Hide buttons if the user is logged in */}
        {!user && (
          <div className="mt-8 space-x-4">
            <a 
              href="/login" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a 
              href="/register" 
              className="px-6 py-3 border border-gray-500 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
