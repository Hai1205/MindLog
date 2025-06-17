import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarContainer from "@/components/navbar/NavbarContainer";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MindLog",
  description: "MindLog is a platform for sharing your thoughts and ideas with the world.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="mdl-js">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>

          {children}
          {/* <Toaster /> */}
        </Providers>
      </body>
    </html>
  );
}
