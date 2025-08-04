import React, { ChangeEvent, FocusEvent, ReactNode } from "react";
import Label from "../../atoms/Label";
import Input, { InputProps } from "../../atoms/Input";

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
}: FormFieldProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label htmlFor={name} required={required} className={labelClassName}>
                {label}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
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
            />
        </div>
    );
};

export default FormField;
