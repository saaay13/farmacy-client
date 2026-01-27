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
        primary: `
      bg-[var(--primary)] 
      text-[var(--primary-foreground)] 
      hover:bg-[var(--ring)]
      dark:hover:bg-[var(--primary-400)]
    `,
        secondary: `
      bg-[var(--secondary)] 
      text-[var(--secondary-foreground)] 
      hover:bg-[var(--muted)]
      dark:hover:bg-[var(--secondary-400)]
    `,
        ghost: `
      bg-transparent 
      text-[var(--muted-foreground)] 
      border border-[var(--border)] 
      hover:bg-[var(--accent)] 
      hover:text-[var(--accent-foreground)]
    `,
        error: `
      bg-[var(--error)] 
      text-[var(--error-foreground)] 
      hover:bg-[var(--destructive)]
    `,
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-md font-medium
    transition-all
    cursor-pointer
    disabled:opacity-60
    disabled:cursor-not-allowed
  `;

    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="w-4 h-4 border-2 border-current border-b-transparent rounded-full animate-spin inline-block" />
            ) : (
                children
            )}
        </button>
    );
};
