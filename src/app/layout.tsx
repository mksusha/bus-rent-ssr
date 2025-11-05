import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Аренда автобусов в Минске от 70 руб/час",
    description: "Аренда автобусов с водителем в Минске — Mersedes и Setra. Комфортные автобусы с кондиционером, туалетом и раскладными креслами.",
};

const GTM_ID = "GTM-MKM7CDQH";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <head>
            {/* ✅ Google Tag Manager (head) */}
            <Script id="gtm-script" strategy="afterInteractive">
                {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
            </Script>
        </head>

        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>

        {children}
        </body>
        </html>
    );
}
