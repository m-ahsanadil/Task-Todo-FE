import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components/organisms/RegisterForm";
import { AuthLayout } from "../../components/templates/AuthLayout";
import { useRegister } from "../../hooks/useRegister";


export const Register: FC = () => {
    const navigate = useNavigate();
    const { form, loading, error, handleChange, handleRegister } = useRegister();
 
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
