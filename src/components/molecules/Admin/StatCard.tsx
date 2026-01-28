import type { LucideIcon } from "lucide-react";
import { Card } from "../../atoms";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: string;
    icon: LucideIcon;
    variant?: "primary" | "info" | "warning" | "error" | "success";
}

export const StatCard = ({
    title,
    value,
    trend,
    icon: Icon,
    variant = "primary"
}: StatCardProps) => {
    const variants = {
        primary: "from-primary/10 to-primary/5 border-primary/20 text-primary",
        info: "from-info/10 to-info/5 border-info/20 text-info",
        warning: "from-warning/10 to-warning/5 border-warning/20 text-warning",
        error: "from-error/10 to-error/5 border-error/20 text-error",
        success: "from-success/10 to-success/5 border-success/20 text-success",
    };

    return (
        <Card className={`bg-gradient-to-br ${variants[variant]} p-6 hover:shadow-md transition-all duration-300`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">
                        {title}
                    </p>
                    <p className="text-3xl font-black mt-2 text-foreground">
                        {value}
                    </p>
                    {trend && (
                        <p className="text-xs mt-2 font-semibold">
                            {trend}
                        </p>
                    )}
                </div>
                <div className={`p-2 rounded-lg bg-background/50 backdrop-blur-sm shadow-sm`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </Card>
    );
};
