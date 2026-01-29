import { useState, useRef, useEffect } from "react"
import { UserIcon } from "../../atoms"
import { Link } from "react-router-dom"

interface UserMenuProps {
    userName: string
    avatarUrl?: string
    logout: () => void
    categoryCount?: number
}

export const UserMenu = ({ userName, avatarUrl, logout, categoryCount = 0 }: UserMenuProps) => {

    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Cierre externo
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
                className="flex items-center gap-2 bg-primary text-primary-foreground p-1 pr-3 rounded-full hover:bg-primary/90 transition-all shadow-md group"
            >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-foreground/20 bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon size={5} />
                    )}
                </div>
                <span className="font-semibold text-sm max-w-[100px] truncate">{userName}</span>
                {categoryCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-background">
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
