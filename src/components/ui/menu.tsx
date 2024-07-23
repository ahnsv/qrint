"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./button";
import Link from "next/link";
import DeletePostButton from "./delete-post-button";
import { cn } from "@/lib/utils";

type MenuProps = {
  menuItems: [
    {
      slug: string;
      activated: boolean;
      label: string;
      href: string;
      icon?: string;
    },
  ];
};
const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  return (
    <nav className="flex flex-col h-full my-2">
      <p className="text-sm font-bold text-slate-500 tracking-tighter">
        Entries
      </p>
      <ul className="flex flex-col mt-2 space-y-1">
        {menuItems?.map((menu) => {
          return (
            <li
              key={menu.slug}
              className={cn(
                "text-sm h-12 w-full rounded-xl pl-2 cursor-pointer hover:bg-slate-100 transition-colors duration-100 ease-linear flex items-center",
                menu.activated ? "bg-slate-100" : "",
              )}
            >
              <a href={`/${menu.slug}`} className="w-full">
                {menu.slug}
              </a>
              <DeletePostButton slug={menu.slug} />
            </li>
          );
        })}
      </ul>
      <div className="new-entry mt-auto">
        <Link href="/new">
          <Button className="w-full">New Entry</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
