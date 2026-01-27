import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'error';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-700 transform hover:-translate-y-px hover:shadow-md',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: 'bg-transparent text-muted-foreground border border-border hover:bg-neutral-100 hover:text-foreground',
        error: 'bg-error text-white'
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all cursor-pointer gap-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="w-4 h-4 border-2 border-current border-b-transparent rounded-full animate-spin inline-block"></span>
            ) : children}
        </button>
    );
};
