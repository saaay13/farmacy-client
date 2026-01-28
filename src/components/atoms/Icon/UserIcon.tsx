import { User as UserIconLucide } from "lucide-react"

interface UserIconProps {
    size?: number
    className?: string
}

export const UserIcon = ({ size = 24, className }: UserIconProps) => (
    <UserIconLucide className={`w-${size} h-${size} ${className || ""}`} />
)
