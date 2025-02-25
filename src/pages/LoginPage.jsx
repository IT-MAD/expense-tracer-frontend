import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext"; // Import theme & language

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { theme, language } = useSettings(); // Get theme & language settings
  const navigate = useNavigate();

  // Translations
  const translations = {
    en: {
      login: "Login",
      email: "Email",
      password: "Password",
      noAccount: "Don't have an account?",
      register: "Register",
      error: "Invalid email or password",
    },
    ar: {
      login: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      noAccount: "ليس لديك حساب؟",
      register: "سجل الآن",
      error: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(t.error);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}
      `}
    >
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{t.login}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">{t.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-800"}
              `}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-800"}
              `}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            {t.login}
          </button>
        </form>
        <p className="mt-4 text-center">
          {t.noAccount}{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline transition-all"
          >
            {t.register}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
