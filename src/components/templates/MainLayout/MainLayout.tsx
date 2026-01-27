import type { ReactNode } from 'react';
import { Navbar } from '../../organisms/Navbar/Navbar';
import { Sidebar } from '../../organisms/Sidebar/Sidebar';

interface MainLayoutProps {
    children: ReactNode;
    onLoginClick?: () => void;
}

export const MainLayout = ({ children, onLoginClick }: MainLayoutProps) => {
    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            <Navbar onLoginClick={onLoginClick} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-10 bg-neutral-50 dark:bg-neutral-950">
                    {children}
                </main>
            </div>
        </div>
    );
};
