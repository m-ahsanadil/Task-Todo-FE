import React from 'react';

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "success" | "danger" | "info" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    onClick,
    type = 'button',
    ...props
}: ButtonProps) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        danger: 'btn-danger',
        info: 'btn-info',
        ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
        link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
    };

    const classes = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size]}
    ${className}
  `.trim();

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            {...props}
        >
            {loading && (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            )}
            {children}
        </button>
    );
};

export default Button;