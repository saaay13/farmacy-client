
import { useEffect, useState } from 'react'

export function useTheme() {
    // Inicializar estado leyendo directamente de localStorage para evitar flash
    const [isDark, setIsDark] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            // Si hay preferencia guardada, usarla
            if (saved) {
                return saved === 'dark';
            }
            // Si no, verificar preferencia del sistema
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            return false;
        }
    });

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    }

    return { isDark, toggleTheme }
}
