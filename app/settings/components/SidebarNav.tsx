"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  onClick: (e: any) => void; // Add onClick prop
}

export function SidebarNav({ className, items, onClick, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col space-y-1 pt-4", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick} // Handle the click event
          className=""
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}