import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSettings } from "../context/SettingsContext"; // Import theme & language context
import FormButton from "../components/FormButton";
import FormField from "../components/FormField";
import API from "../utils/api";

const AddExpensePage = () => {
  const navigate = useNavigate();
  const { theme, language } = useSettings(); // Get theme & language

  const translations = {
    en: {
      addExpense: "Add Expense",
      title: "Title",
      amount: "Amount ($)",
      category: "Category",
      receipt: "Receipt URL (Optional)",
      selectCategory: "Select Category",
      food: "Food",
      utilities: "Utilities",
      health: "Health",
      transport: "Transport",
      entertainment: "Entertainment",
      other: "Other",
      successMessage: "Expense added successfully 🎉",
      errorMessage: "Failed to add expense.",
    },
    ar: {
      addExpense: "إضافة مصروف",
      title: "العنوان",
      amount: "المبلغ ($)",
      category: "الفئة",
      receipt: "رابط الإيصال (اختياري)",
      selectCategory: "اختر الفئة",
      food: "طعام",
      utilities: "المرافق",
      health: "الصحة",
      transport: "المواصلات",
      entertainment: "الترفيه",
      other: "أخرى",
      successMessage: "تمت إضافة المصروف بنجاح 🎉",
      errorMessage: "فشل في إضافة المصروف.",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  const validationSchema = Yup.object({
    title: Yup.string().required(t.title + " is required"),
    amount: Yup.number()
      .typeError(t.amount + " must be a number")
      .positive(t.amount + " must be positive")
      .required(t.amount + " is required"),
    category: Yup.string().required(t.category + " is required"),
    receiptUrl: Yup.string().url("Invalid URL"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/expense", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${data.title} ${t.successMessage}`);
      resetForm();
      navigate("/expenses"); // Redirect to expense list
    } catch (error) {
      toast.error(error.response?.data?.message || t.errorMessage);
      console.error("Failed to add expense", error);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 transition-all duration-300 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-50"}
      `}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg w-full max-w-lg transition-all duration-300
          ${theme === "dark" ? "bg-gray-800 text-white border border-gray-700 shadow-gray-900/50" : "bg-white text-gray-900 border border-gray-200 shadow-gray-300/50"}
        `}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center`}>
          {t.addExpense}
        </h2>
        <Formik
          initialValues={{
            title: "",
            amount: "",
            category: "",
            receiptUrl: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <FormField label={t.title} name="title" />
              <FormField label={t.amount} name="amount" type="number" />
              <FormField label={t.category} name="category" as="select">
                <option value="">{t.selectCategory}</option>
                <option value="Food">{t.food}</option>
                <option value="Utilities">{t.utilities}</option>
                <option value="Health">{t.health}</option>
                <option value="Transport">{t.transport}</option>
                <option value="Entertainment">{t.entertainment}</option>
                <option value="Other">{t.other}</option>
              </FormField>
              <FormField label={t.receipt} name="receiptUrl" />

              <FormButton type="submit" isSubmitting={isSubmitting}>
                {t.addExpense}
              </FormButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddExpensePage;
