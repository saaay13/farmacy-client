import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`bg-card/70 backdrop-blur-md border border-border/50 rounded-[2rem] shadow-xl shadow-primary/5 transition-all duration-300 ${className}`}>
            {children}
        </div>
    );
};
