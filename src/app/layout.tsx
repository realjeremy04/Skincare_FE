import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/app/provider";
import { BookingProvider } from "@/global/bookingContext";
import "./globals.css";
import { AuthProvider } from "@/libs/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crystal Care",
  icons: {
    icon: "/Logo-Noname.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <BookingProvider>
            <AuthProvider>{children}</AuthProvider>
          </BookingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
