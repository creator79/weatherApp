// @ts-nocheck

import { ThemeProvider } from "@/components/theme-provider";
import { LocationContextProvider } from "@/context/ContextProvider";
import { TemperatureProvider } from "@/context/TemperatureProvider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import Home from "./home/page";

const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: " Weather App",
  description: "A Simple Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TemperatureProvider>
          <LocationContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="w-full flex justify-center items-center flex-col">
                <div className="container sticky z-50 bg-background top-0"></div>
                <div className="container">{children}</div>
              </main>
            </ThemeProvider>
          </LocationContextProvider>
        </TemperatureProvider>
      </body>
    </html>
  );
}
