import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import useAdmin from "@/hooks/useAdmin"
import useDeliveryman from "@/hooks/useDeliveryman"
import { Link, NavLink } from "react-router-dom"


export function DropdownMenuDemo() {
    const { user, logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isDeliveryman] = useDeliveryman()
    // console.log(isAdmin)

    // const adminDropdown = <>
    // </>

    return (
        <DropdownMenu variant="ghost">
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Avatar className="border-2 border-green-400">
                        <AvatarImage src={user?.photoURL} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <NavLink to={isAdmin ? 'dashboard/statistics' : isDeliveryman ? 'dashboard/myDeliveryList' : "dashboard/userhome"}>
                        <DropdownMenuItem  >
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </NavLink>
                </DropdownMenuGroup>

                <DropdownMenuItem onClick={logout} >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
