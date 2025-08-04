import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../../lib/endpoints";
import { LoginResponse } from "../../types/login.types";
import { isLocalStorageAvailable, setLocalStorage } from "../../utils/localStorageHelper";
import { STORAGE_KEYS } from "../../lib/constants";
import { LoginForm } from "../../components/organisms/LoginForm";
import { AuthLayout } from "../../components/templates/AuthLayout";
import { useToast } from "../../lib/toast-context";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (!form.email || !form.password) {
            showToast({
                title: "Validation Error",
                description: "Both fields are required.",
                type: "error"
            });
            return;
        }

        if (!isLocalStorageAvailable()) {
            showToast({
                title: "Storage Error",
                description: "Storage is not available. Please enable cookies/localStorage.",
                type: "error"
            });
            return;
        }

        try {
            setLoading(true);
            showToast({
                title: "Logging in...",
                description: "Please wait while we sign you in.",
                type: "loading"
            });

            const res: LoginResponse = await axios.post(AUTH_ENDPOINTS.LOGIN, form);

            const token = res?.data?.data?.token;
            if (token) {
                setLocalStorage(STORAGE_KEYS.TODO_TOKEN, token);
                showToast({
                    title: "Success!",
                    description: "Login successful! Redirecting to dashboard...",
                    type: "success"
                });
                navigate("/dashboard");
            }

        } catch (err: any) {
            showToast({
                title: "Login Failed",
                description: err.response?.data?.error?.message || "Login failed. Please try again.",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Login">
            <LoginForm
                form={form}
                handleChange={handleChange}
                handleLogin={handleLogin}
                loading={loading}
                error={error}
            />
            <p className="text-sm mt-2">
                Don’t have an account? <a href="/register" className="text-blue-600 underline">Register</a>
            </p>
        </AuthLayout>
    );
}
