// lib/gtm.ts
export const GTM_ID = "GTM-MKM7CDQH";

export const pageview = (url: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event: "page_view",
            page: url,
        });
    }
};
