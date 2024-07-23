"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import Menu from "./menu";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isOpen?: boolean;
  contents: any; // TODO: fix this
};
const Sidebar: React.FC<SidebarProps> = ({ contents, isOpen }) => {
  const pathname = usePathname();
  const contentsWithActivation = contents.map((content: any) => {
    return {
      ...content,
      activated: decodeURI(pathname).includes(content.slug),
    };
  });
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
            isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="icons/qrint.svg" alt="Qrint" width={24} height={24} />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                // "font-bold text-lg whitespace-nowrap",
                isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100",
              )}
            >
              Qrint
            </h1>
          </Link>
        </Button>
        <Menu menuItems={contentsWithActivation} />
      </div>
    </aside>
  );
};

export default Sidebar;
