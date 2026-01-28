import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "info";
    className?: string;
}

export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
    const variants = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        success: "bg-success/20 text-success border border-success/30",
        warning: "bg-warning/20 text-warning border border-warning/30",
        error: "bg-error/20 text-error border border-error/30",
        info: "bg-info/20 text-info border border-info/30",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
