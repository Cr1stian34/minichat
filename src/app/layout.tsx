import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./layouts/Navbar";
import { Providers } from "./providers/Providers";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Chat Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-r from-blue-400 to-teal-500`}
      >
        <ReactQueryProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
