import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium transition-all duration-200 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-neutral-800 hover:bg-neutral-900 text-white hover:text-white shadow-sm hover:shadow-md',
    secondary: 'bg-neutral-800 hover:bg-neutral-900 text-white hover:text-white shadow-sm hover:shadow-md',
    outline: 'border-2 border-neutral-800 hover:bg-neutral-800 text-neutral-800 hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
