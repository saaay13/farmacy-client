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
        <div className="min-h-screen bg-muted/30">
            <AdminSidebar />

            <main className="pl-64 min-h-screen">
                <div className="container mx-auto p-8 max-w-7xl">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
