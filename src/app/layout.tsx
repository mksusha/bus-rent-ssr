import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GTMTracker from "../components/GTMTracker";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <head />
        <body>
        <GTMTracker />
        {children}
        </body>
        </html>
    );
}
