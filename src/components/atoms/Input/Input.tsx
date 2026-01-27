import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
            <input
                className={`w-full px-4 py-3 border rounded-md bg-background color-foreground text-sm transition-all outline-none 
                    ${error ? 'border-error ring-error/10 ring-2' : 'border-border focus:border-primary focus:ring-primary/10 focus:ring-2'} 
                    ${className}`}
                {...props}
            />
            {error && <span className="text-[10px] color-error">{error}</span>}
        </div>
    );
};
