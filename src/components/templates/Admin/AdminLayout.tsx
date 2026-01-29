import { useEffect } from "react";
import type { ReactNode } from "react";
import { AdminSidebar } from "../../organisms/Admin/AdminSidebar";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | Farmacy Admin`;
        }
    }, [title]);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex">
            {/* Fondo */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--primary-rgb),0.05),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(var(--secondary-rgb),0.03),transparent_50%)]" />

                <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px', color: 'var(--primary)' }} />

                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-white/[0.02]" />
            </div>

            <AdminSidebar />

            <main className="flex-grow pl-64 relative z-10 min-h-screen">
                <div className="container mx-auto p-8 lg:p-12 max-w-7xl">
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
