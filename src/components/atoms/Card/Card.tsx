import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`bg-card border border-border rounded-xl shadow-sm ${className}`}>
            {children}
        </div>
    );
};
