"use client";

import { cn } from "@/lib/utils";
import { Link, PanelsTopLeft } from "lucide-react";
import { Button } from "./button";
import Menu from "./menu";

type SidebarProps = {
  isOpen?: boolean;
  contents: any; // TODO: fix this
};
const Sidebar: React.FC<SidebarProps> = ({ contents, isOpen }) => {
  return (
    <aside
      className={cn(
        // "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        "min-w-48 w-1/6 h-screentransition-[width] ease-in-out duration-300",
      )}
    >
      <div className="w-full h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            // sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
            // className={cn(
            //   // "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
            //   "font-bold text-lg whitespace-nowrap",
            //   // sidebar?.isOpen === false
            //   //   ? "-translate-x-96 opacity-0 hidden"
            //   //   : "translate-x-0 opacity-100"
            // )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        <Menu menuItems={contents} />
      </div>
    </aside>
  );
};

export default Sidebar;
