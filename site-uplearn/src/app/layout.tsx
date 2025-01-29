import { Metadata } from "next";
import React, { Suspense } from "react";
import "../client/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "@/src/app/providers";

export const metadata: Metadata = {
  description: "Generated by Mochipan",
  icons: {
    icon: "/favicon.ico",
  },
  title: "uplearn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense>
            <Providers>{children}</Providers>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
