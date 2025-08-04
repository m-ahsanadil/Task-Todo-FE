import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_ENDPOINTS } from "../../lib/endpoints";
import { RegisterForm } from "../../components/organisms/RegisterForm";
import { AuthLayout } from "../../components/templates/AuthLayout";
import { useToast } from "../../lib/toast-context";


export const Register: FC = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();
    console.log("Register form state:", form);
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
            showToast({
                title: "Creating account...",
                description: "Please wait while we set up your account.",
                type: "loading"
            });
            await axios.post(AUTH_ENDPOINTS.REGISTER, form);
            showToast({
                title: "Success!",
                description: "Account created successfully! Please login with your credentials.",
                type: "success"
            });
            setForm({ name: "", email: "", password: "" });
            navigate("/login");
        } catch (err: any) {
            showToast({
                title: "Registration Failed",
                description: err.response?.data?.error?.message || "Failed to register. Please try again.",
                type: "error"
            });
            setError("Failed to register. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthLayout title="Register">
            <RegisterForm
                form={form}
                handleChange={handleChange}
                handleRegister={handleRegister}
                loading={loading}
                error={error}
            />
            <p className="text-sm mt-3 text-center">
                Already have an account?{" "}
                <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate("/")}
                >
                    Login
                </span>
            </p>
        </AuthLayout>
    );
}
