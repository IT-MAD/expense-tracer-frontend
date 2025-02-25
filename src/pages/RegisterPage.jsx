import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import FormField from "../components/FormField";
import FormButton from "../components/FormButton";
import API from "../utils/api";
import { useSettings } from "../context/SettingsContext"; // Import theme & language

const RegisterPage = () => {
  const navigate = useNavigate();
  const { theme, language } = useSettings(); // Get theme & language settings

  // Translations
  const translations = {
    en: {
      register: "Register",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      alreadyAccount: "Already have an account?",
      login: "Login",
      success: "registered successfully! 🎉",
      error: "Registration failed. Please try again.",
      required: "Required",
      invalidEmail: "Invalid email address",
      passwordMin: "Password must be at least 8 characters long",
      passwordUppercase: "Password must contain at least one uppercase letter",
      passwordNumber: "Password must contain at least one number",
      passwordMatch: "Passwords must match",
    },
    ar: {
      register: "إنشاء حساب",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      alreadyAccount: "هل لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      success: "تم التسجيل بنجاح! 🎉",
      error: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
      required: "مطلوب",
      invalidEmail: "عنوان البريد الإلكتروني غير صالح",
      passwordMin: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
      passwordUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
      passwordNumber: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
      passwordMatch: "يجب أن تتطابق كلمات المرور",
    },
  };

  const t = translations[language] || translations.en; // Default to English

  const validationSchema = Yup.object({
    name: Yup.string().required(t.required),
    email: Yup.string().email(t.invalidEmail).required(t.required),
    password: Yup.string()
      .min(8, t.passwordMin)
      .matches(/[A-Z]/, t.passwordUppercase)
      .matches(/\d/, t.passwordNumber)
      .required(t.required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t.passwordMatch)
      .required(t.required),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await API.post("/auth/register", values);
      toast.success(`${data.name} ${t.success}`, { autoClose: 3000 }); // ✅ Success notification
      setTimeout(() => navigate("/login"), 3000); // ✅ Redirect after 3 seconds
    } catch (error) {
      toast.error(
        error.response?.data?.message || t.error
      ); // ✅ Error notification
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-300 p-4
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-gray-100"}
      `}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-300
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        `}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">{t.register}</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <FormField label={t.name} name="name" type="text" />
              <FormField label={t.email} name="email" type="email" />
              <FormField label={t.password} name="password" type="password" />
              <FormField
                label={t.confirmPassword}
                name="confirmPassword"
                type="password"
              />
              <FormButton type="submit" isSubmitting={isSubmitting}>
                {t.register}
              </FormButton>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          {t.alreadyAccount}{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline transition-all"
          >
            {t.login}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
