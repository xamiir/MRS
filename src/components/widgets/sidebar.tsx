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
  Bike,
  UserCheck,
  CreditCard,
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
      return <LayoutDashboardIcon className="mr-3 h-5 w-5" />;
    case "users":
      return <Users2 className="mr-3 h-5 w-5" />;
    case "shield":
      return <CreditCard className="mr-3 h-5 w-5" />;
    case "countries":
      return <MapIcon className="mr-3 h-5 w-5" />;
    case "settings":
      return <Bike className="mr-3 h-5 w-5" />;
    case "drivers":
      return <UserCheck className="mr-3 h-5 w-5" />;
    default:
      return <LayoutDashboardIcon className="mr-3 h-5 w-5" />;
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
    { path: PATHS.Overview.drivers.root, icon: "drivers", subject: "Drivers" },
    {
      path: PATHS.Overview.motorcycles.root,
      icon: "settings",
      subject: "Motorcycles",
    },
  ];

  return (
    <main className="flex h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 border-r left-0 z-50 w-72 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-xl flex flex-col",
          "border-gray-200 bg-gradient-to-b from-white to-gray-50 dark:border-gray-700 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <img
                src={Assets.logo}
                alt="logo"
                className="w-12 h-12 rounded-xl shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Motorcycle
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Management System
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-3">
            {menuItems.map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <Button
                  variant={getActive(menu.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start capitalize h-12 text-left font-medium transition-all duration-200 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700 dark:hover:shadow-sm",
                    getActive(menu.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  )}
                >
                  {mapIcons(menu.icon)}
                  {menu.subject}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Motorcycle v1.0.0
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 flex items-center justify-between p-6 shadow-sm">
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
