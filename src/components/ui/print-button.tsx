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

type PrintButtonProps = {
  assets: string[];
};
const PrintButton: React.FC<PrintButtonProps> = ({ assets }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
                <html>
                    <head>
                        <title>Print All</title>
                    </head>
                    <body>
                        ${assets.map((asset) => `<img src="${asset}" />`).join("")}
                    </body>
                </html>
            `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={`ghost`} onClick={handlePrint}>
            <Printer size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Print All</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default PrintButton;
