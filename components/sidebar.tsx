"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Calendar, MessageSquare, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      label: "Record Tasks",
      icon: Mic,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "My Tasks",
      icon: Calendar,
      href: "/dashboard/tasks",
      active: pathname === "/dashboard/tasks",
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: "/dashboard/chat",
      active: pathname === "/dashboard/chat",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-bold">EchoPilot.AI</h1>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                route.active ? "bg-purple-100 text-purple-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-purple-600" : "text-gray-400")} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 pb-4">
          <Avatar>
            <AvatarImage src={user?.picture || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
