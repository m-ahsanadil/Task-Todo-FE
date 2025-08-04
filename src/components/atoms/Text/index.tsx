import { ReactNode, ElementType } from "react";

interface TextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'xs' | 'caption';
  color?: 'default' | 'muted' | 'light' | 'white' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  as?: ElementType;
}

const Text = ({
  children,
  variant = 'body',
  color = 'default',
  weight = 'normal',
  align = 'left',
  className = '',
  as = 'p',
  ...props
}: TextProps) => {
  const Component = as;

  const variants = {
    h1: 'text-4xl lg:text-5xl font-bold leading-tight',
    h2: 'text-3xl lg:text-4xl font-bold leading-tight',
    h3: 'text-2xl lg:text-3xl font-semibold leading-tight',
    h4: 'text-xl lg:text-2xl font-semibold leading-tight',
    h5: 'text-lg lg:text-xl font-semibold leading-tight',
    h6: 'text-base lg:text-lg font-semibold leading-tight',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    xs: 'text-xs leading-relaxed',
    caption: 'text-xs uppercase tracking-wide font-medium'
  };

  const colors = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    light: 'text-gray-500',
    white: 'text-white',
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    success: 'text-success-600',
    danger: 'text-danger-600',
    warning: 'text-warning-600',
    info: 'text-info-600'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const classes = `
    ${variants[variant] || variants.body}
    ${colors[color] || colors.default}
    ${weights[weight]}
    ${alignments[align]}
    ${className}
  `.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;