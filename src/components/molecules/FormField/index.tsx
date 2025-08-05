import { ChangeEvent, FocusEvent, ReactNode } from "react";
import Label from "../../atoms/Label";
import Input, { InputProps } from "../../atoms/Input";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends InputProps {
    label?: ReactNode;
    name?: string;
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    required?: boolean;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    autoComplete?: string;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const FormField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    error = false,
    required = false,
    className = "",
    labelClassName = "",
    inputClassName = "",
    autoComplete,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
}: FormFieldProps) => {
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`flex flex-col ${className}`}>
            <Label htmlFor={name} required={required} className={labelClassName}>
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    disabled={disabled}
                    error={error}
                    required={required}
                    className={`${inputClassName}`}
                    autoComplete={autoComplete}
                    type={inputType}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormField;
