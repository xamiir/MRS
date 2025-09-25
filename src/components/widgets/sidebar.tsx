import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboardIcon,
  XIcon,
  BellIcon,
  Users2,
  MenuIcon,
  Shield,
  MapIcon,
} from "lucide-react";
import { PATHS } from "@/routers/paths";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/toggle-mode";
import React, { useState } from "react";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Assets from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";

const mapIcons = (icon: string) => {
  switch (icon) {
    case "dashboard":
      return <LayoutDashboardIcon className="mr-2 h-4 w-4" />;
    case "users":
      return <Users2 className="mr-2 h-4 w-4" />;
    case "shield":
      return <Shield className="mr-2 h-4 w-4" />;
    case "countries":
      return <MapIcon className="mr-2 h-4 w-4" />;
    case "settings":
      return <Settings className="mr-2 h-4 w-4" />;
    default:
      return <LayoutDashboardIcon className="mr-2 h-4 w-4" />;
  }
};

export const Sidebar = observer(function Sidebar() {
  const {
    authStore: { logout },
  } = useStores();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();

  const location = useLocation();

  function getActive(path: string) {
    return path
      ? !!matchPath({ path: path, end: false }, location.pathname)
      : false;
  }

  const menuItems = [
    { path: PATHS.Overview.app, icon: "dashboard", subject: "Dashboard" },
    { path: PATHS.Overview.users.root, icon: "users", subject: "Users" },
    { path: PATHS.Overview.owners.root, icon: "users", subject: "Owners" },
    { path: PATHS.Overview.drivers.root, icon: "users", subject: "Drivers" },
    {
      path: PATHS.Overview.motorcycles.root,
      icon: "settings",
      subject: "Motorcycles",
    },
  ];

  const isDark = useTheme().theme === "dark";

  return (
    <main className="flex h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 border-r border-gray-100 dark:border-gray-800 bg-gray-950 dark:bg-gray-950 left-0 z-50 w-64  p-6 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center  justify-between mb-6">
          <img
            src={Assets.logo}
            alt="logo"
            className="w-16 h-16 rounded-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2">
          {menuItems.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => {
                setSidebarOpen(false);
              }}
            >
              <Button
                variant={
                  getActive(menu.path)
                    ? "secondary"
                    : isDark
                    ? "ghost"
                    : "default"
                }
                className="w-full justify-start capitalize mt-2"
              >
                {mapIcons(menu.icon)}
                {menu.subject}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className="gap-4 flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={Assets.logo}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigate(PATHS.Auth.login);
                setSidebarOpen(false);
              }}
            >
              <BellIcon className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
});
