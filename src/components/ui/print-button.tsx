"use client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PrintButtonProps = {};
const PrintButton: React.FC<PrintButtonProps> = () => {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`${pathname}/print`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant={`ghost`}>
              <Printer size={24} />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-primary text-secondary">
          <p>Print All</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default PrintButton;
