"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./button";
import Link from "next/link";

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
    <nav className="flex flex-col h-full">
      <ul className="flex flex-col space-y-1">
        {menuItems?.map((menu) => {
          return (
            <li
              key={menu.slug}
              className="text-sm p-4 px-2 cursor-pointer hover:bg-slate-100 transition-colors duration-100 ease-linear"
            >
              <a href={`/${menu.slug}`}>{menu.slug}</a>
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
