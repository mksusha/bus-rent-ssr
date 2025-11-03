import React, { Suspense } from "react";
import Header from "../components/Header";
import BusHero from "../components/BusHero";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import SeoHeaders from "../components/SeoHeaders";
import GoogleTagManager from "../components/GoogleTagManager";
import '../app/globals.css'

const Fleet = React.lazy(() => import("../components/Fleet"));
const Advantages = React.lazy(() => import("../components/Advantages"));
const Opportunities = React.lazy(() => import("../components/Opportunities"));
const Partners = React.lazy(() => import("../components/Partners"));

type HomeProps = {
    openModal: () => void;
};

export default function Home({ openModal }: HomeProps) {
    return (
        <>
            <GoogleTagManager />

            <PageTitle
                title="Аренда автобусов в Минске от 70 руб/час"
                description="Аренда автобусов с водителем в Минске — 🚌Mersedes и 🚌Setra. Комфортные автобусы с туалетом, кондиционером и раскладными креслами. Звоните ☎ +375 29 628 90 29. Экскурсии, корпоративы, туры."
            />
            <Header />
            <SeoHeaders />
            <main>
                <BusHero openModal={openModal} />

                <Suspense fallback={null}>
                    <Fleet />
                </Suspense>
                <Suspense fallback={null}>
                    <Advantages />
                </Suspense>
                <Suspense fallback={null}>
                    <Opportunities />
                </Suspense>
                <Suspense fallback={null}>
                    <Partners />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
