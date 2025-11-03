// src/components/PageTitle.tsx
import Head from "next/head";

type PageTitleProps = {
    title: string;
    description?: string;
};

export default function PageTitle({ title, description }: PageTitleProps) {
    return (
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Head>
    );
}
