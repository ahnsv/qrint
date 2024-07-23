import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "QRINT - Quicker Print",
  description: "Print quick anywhere",
  openGraph: {
    title: "QRINT - Quicker Print",
    description: "Print quick anywhere",
    images: ["/icons/qrint-64.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("slug, id");
  if (error) {
    console.error(error);
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          notoSansKR.variable,
        )}
      >
        {children}
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
