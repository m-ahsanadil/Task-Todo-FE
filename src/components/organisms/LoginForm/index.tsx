import React, { FC } from "react";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";

interface LoginFormProps {
  form: { email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
}

export const LoginForm: FC<LoginFormProps> = ({
  form,
  handleChange,
  handleLogin,
  loading,
  error,
}) => {
  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="mb-2"
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="mb-2"
        showPasswordToggle={true}
        showPassword={showPassword}
        onTogglePassword={togglePassword}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button
        variant="success"
        size="md"
        loading={loading}
        className="bg-green-500 text-white w-full p-2 rounded"
        type="submit"
      >
        {loading ? "Loggingin..." : "Login"}
      </Button>
    </form>
  );
};
