import { LoginForm } from "../../components/organisms/LoginForm";
import { AuthLayout } from "../../components/templates/AuthLayout";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
    const { form, handleChange, handleLogin, loading, error } = useLogin();

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
