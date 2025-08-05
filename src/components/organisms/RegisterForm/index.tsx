import React, { FC } from "react";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";

interface RegisterFormProps {
  form: { name: string; email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  form,
  handleChange,
  handleRegister,
  loading,
  error,
}) => {
  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <form onSubmit={handleRegister}>
      <FormField
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        className="mb-2"
        inputClassName="focus:ring-2 focus:outline-none focus:ring-accent"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="mb-2"
        inputClassName="focus:ring-2 focus:outline-none focus:ring-accent"
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="mb-2"
        inputClassName="focus:ring-2 focus:outline-none focus:ring-accent"
        showPasswordToggle={true}
        showPassword={showPassword}
        onTogglePassword={togglePassword}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button
        size="md"
        loading={loading}
        className="w-full bg-blue-500 text-white"
        type="submit"
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};
