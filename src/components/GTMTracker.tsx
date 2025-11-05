"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageview, GTM_ID } from "../lib/gtm";

export default function GTMTracker() {
    const pathname = usePathname() || "/";

    useEffect(() => {
        // проверяем, что GTM загружен
        const initGTM = () => {
            if (!(window as any).dataLayer) {
                (window as any).dataLayer = [];
                const gtmScript = document.createElement("script");
                gtmScript.async = true;
                gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
                document.head.appendChild(gtmScript);
            }
        };

        initGTM();
        pageview(pathname);
    }, [pathname]);

    return (
        <>
            {/* Noscript iframe для GTM */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
        </>
    );
}
