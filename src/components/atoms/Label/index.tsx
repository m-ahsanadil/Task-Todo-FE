import React, { ReactNode } from 'react';

interface LabelProps {
    htmlFor?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}

const Label = ({
    children,
    htmlFor,
    required = false,
    className = '',
    ...props
}: LabelProps) => {
    const classes = `
    block text-sm font-medium text-gray-700 mb-1
    ${className}
  `.trim();

    return (
        <label htmlFor={htmlFor} className={classes} {...props}>
            {children}
            {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
    );
};

export default Label;