import React from 'react';

interface TextareaProps {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    error?: boolean;
    rows?: number;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
}


const Textarea = ({
    placeholder = '',
    value = '',
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    error = false,
    rows = 3,
    className = '',
    id,
    name,
    required = false,
    ...props
}: TextareaProps) => {
    const baseClasses = 'input-field resize-vertical min-h-[80px]';
    const errorClasses = error ? 'input-error' : '';
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

    const classes = `
    ${baseClasses}
    ${errorClasses}
    ${disabledClasses}
    ${className}
  `.trim();

    return (
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={classes}
            required={required}
            {...props}
        />
    );
};

export default Textarea;