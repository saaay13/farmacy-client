import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface AlertProps {
    children: ReactNode;
    variant?: "info" | "warning" | "error" | "success";
    title?: string;
    className?: string;
}

export const Alert = ({ children, variant = "info", title, className = "" }: AlertProps) => {
    const variants = {
        info: "bg-info/10 border-info/20 text-info-700 dark:text-info-300",
        warning: "bg-warning/10 border-warning/20 text-warning-700 dark:text-warning-300",
        error: "bg-error/10 border-error/20 text-error-700 dark:text-error-300",
        success: "bg-success/10 border-success/20 text-success-700 dark:text-success-300",
    };

    const icons = {
        info: <Info className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        success: <CheckCircle2 className="w-5 h-5" />,
    };

    return (
        <div className={`flex gap-3 p-4 rounded-lg border ${variants[variant]} ${className}`}>
            <div className="flex-shrink-0 mt-0.5">
                {icons[variant]}
            </div>
            <div className="flex-1">
                {title && <h5 className="font-bold mb-1">{title}</h5>}
                <div className="text-sm opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
};
