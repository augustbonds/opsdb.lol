import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "opsdb.lol",
  description: "Your Objective Personality Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <Header></Header>
          <div className="flex justify-center">
            <div className="w-[700px] mx-auto bg-gray-100 p-4">
              {children}
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
