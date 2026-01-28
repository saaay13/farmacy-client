import { useState, useRef, useEffect } from "react"
import { UserIcon } from "../../atoms"
import { Link } from "react-router-dom"

interface UserMenuProps {
    userName: string
    logout: () => void
    categoryCount?: number
}

export const UserMenu = ({ userName, logout, categoryCount = 0 }: UserMenuProps) => {

    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
                <UserIcon size={5} />
                <span>{userName}</span>
                {categoryCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-error text-error-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        {categoryCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                    <Link
                        to="/perfil"
                        className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                    >
                        Perfil
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-error hover:bg-error/10 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    )
}
