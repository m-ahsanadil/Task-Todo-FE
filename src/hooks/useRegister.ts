import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiErrorResponse } from "../types/base.types";
import { AUTH_ENDPOINTS } from "../lib/endpoints";
import { useToast } from "../lib/toast-context";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, RegisterSuccessResponse } from "../types/register.types";

interface UseRegisterReturn {
    form: RegisterRequest;
    error: string;
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setForm: React.Dispatch<React.SetStateAction<RegisterRequest>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useRegister = (): UseRegisterReturn => {
    const [form, setForm] = useState<RegisterRequest>({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            showToast({
                title: "Validation Error",
                description: "All fields are required.",
                type: "error"
            });
            return;
        }

        try {
            setLoading(true);
            setError("");
            showToast({
                title: "Creating account...",
                description: "Please wait while we set up your account.",
                type: "loading"
            });
            const res = await axios.post<RegisterSuccessResponse>(
                AUTH_ENDPOINTS.REGISTER,
                form
            );
            const successMessage = res.data.message || "Account created successfully! Please login with your credentials.";

            showToast({
                title: "Success!",
                description: successMessage,
                type: "success"
            });
            setForm({ name: "", email: "", password: "" });
            navigate("/");
        } catch (err: any) {
            const error = err as AxiosError<ApiErrorResponse>;
            const errorMessage =
                error.response?.data?.error?.errors || "Failed to register. Please try again.";

            showToast({
                title: "Registration Failed",
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
        handleRegister,
        setForm,
        setError,
    }
}