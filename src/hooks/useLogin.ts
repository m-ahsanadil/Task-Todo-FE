import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "../types/base.types";
import { isLocalStorageAvailable, setLocalStorage } from "../utils/localStorageHelper";
import { STORAGE_KEYS } from "../lib/constants";
import { LoginRequest, LoginResponse } from "../types/login.types";
import { AUTH_ENDPOINTS } from "../lib/endpoints";
import { useToast } from "../lib/toast-context";
import { useNavigate } from "react-router-dom";

interface UseLoginReturn {
    form: LoginRequest;
    error: string;
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setForm: React.Dispatch<React.SetStateAction<LoginRequest>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useLogin = (): UseLoginReturn => {
    const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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
            setError("");
            showToast({
                title: "Logging in...",
                description: "Please wait while we sign you in.",
                type: "loading"
            });

            const res: LoginResponse = await axios.post(AUTH_ENDPOINTS.LOGIN, form);

            const token = res.data.data.token;
            const successMessage = res.message || "Logged in successfully! Redirecting to dashboard...";
            if (token) {
                setLocalStorage(STORAGE_KEYS.TODO_TOKEN, token);
                showToast({
                    title: "Success!",
                    description: successMessage,
                    type: "success"
                });
                navigate("/dashboard");
            }

        } catch (err: any) {
            const error = err as AxiosError<ApiErrorResponse>;
            const errorMessage =
                error.response?.data?.error?.errors || "Failed to login. Please try again.";
            showToast({
                title: "Login Failed",
                description: errorMessage,
                type: "error"
            });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        error,
        loading,
        handleChange,
        handleLogin,
        setForm,
        setError
    }
}