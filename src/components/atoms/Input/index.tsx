import React, { ChangeEvent, FocusEvent } from 'react';

export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    id?: string;
    name?: string;
    autoComplete?: string;
    required?: boolean;
}

const Input = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    error = false,
    className = '',
    id,
    name,
    autoComplete,
    required = false,
    ...props
}: InputProps) => {
    const baseClasses = 'input-field w-full px-4 py-2 text-sm sm:text-base md:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 ease-in-out';
    const errorClasses = error ? 'input-error border-red-500 focus:ring-red-500' : 'border-gray-300';
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : '';

    const classes = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${className}
  `.trim();

    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            className={classes}
            autoComplete={autoComplete}
            required={required}
            {...props}
        />
    );
};

export default Input;