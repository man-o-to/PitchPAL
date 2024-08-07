"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  activeTab: string; // Add activeTab prop
  onClick: (e: any) => void; // Add onClick prop
}

export function SidebarNav({ className, items, activeTab, onClick, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col space-y-1 pt-4", className)} {...props}>
      {items.map((item) => {
        const tab = item.href.split('/').pop();
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick} // Handle the click event
            className={cn(
              buttonVariants({ variant: "ghost" }),
              activeTab === tab
                ? "bg-secondary hover:bg-secondary"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}