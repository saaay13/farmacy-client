import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../../hooks/useTheme'

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-accent transition"
            aria-label="Cambiar tema"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-foreground" />
            ) : (
                <Moon className="w-5 h-5 text-foreground" />
            )}
        </button>
    )
}
