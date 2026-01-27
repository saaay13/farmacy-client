
import { useEffect, useState } from 'react'

export function useTheme() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        }
    }, [])

    const toggleTheme = () => {
        const html = document.documentElement

        if (html.classList.contains('dark')) {
            html.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setIsDark(false)
        } else {
            html.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setIsDark(true)
        }
    }

    return { isDark, toggleTheme }
}
