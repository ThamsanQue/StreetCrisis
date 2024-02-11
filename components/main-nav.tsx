"use client";

import { cn } from "@/lib/utils";
import { Collection } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Github, Instagram } from "lucide-react";

interface MainNavProps {
  data: Collection[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `/home/collection/${route.id}`,
    label: route.name,
    active: pathname === `home/collection/${route.id}`,
  }));
  return (
    <NavigationMenu className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md font-medium">
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  route.active ? "text-black" : "text-neutral-500"
                )}
              >
                {route.label}
              </Link>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md font-medium">
            Socials
          </NavigationMenuTrigger>
          <NavigationMenuContent className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
            <Link
              href="https://www.instagram.com/street__crisis/"
              className="text-sm font-medium transition-colors hover:text-black flex items-center"
              target="_blank"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Link>
            <Link
              href="https://www.tiktok.com/@street__crisis"
              className="text-sm font-medium transition-colors hover:text-black flex items-center"
              target="_blank"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Tiktok
            </Link>
            <Link
              href="https://github.com/ThamsanQue/StreetCrisis/"
              className="text-sm font-medium transition-colors hover:text-black flex items-center"
              target="_blank"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
