// src/components/RequestBlock.tsx
import { useState, useEffect } from "react";

declare global {
    interface Window {
        dataLayer: Array<Record<string, unknown>>;
    }
}

export default function RequestBlock() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        from: "",
        to: "",
        date: "",
        time: "",
        email: "",
        passengers: "",
        tripType: "В одну сторону",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (window.dataLayer) {
            window.dataLayer.push({
                event: "form_field_change",
                field_name: name,
                field_value: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.name || !form.phone) {
            setStatus("error");
            return;
        }

        if (window.dataLayer) {
            window.dataLayer.push({
                event: "form_submit",
                form_name: "RequestBlock",
            });
        }

        try {
            setStatus("loading");

            const formData = new FormData();
            formData.append("_subject", "Заявка на аренду автобуса");

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await fetch("https://formspree.io/f/manpollk", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                setForm({
                    name: "",
                    phone: "",
                    city: "",
                    from: "",
                    to: "",
                    date: "",
                    time: "",
                    email: "",
                    passengers: "",
                    tripType: "В одну сторону",
                });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    useEffect(() => {
        if (status !== "idle") {
            const timer = setTimeout(() => setStatus("idle"), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackEl = target.closest(".track-click") as HTMLElement | null;
            if (trackEl && window.dataLayer) {
                window.dataLayer.push({
                    event: "click",
                    element_tag: trackEl.tagName,
                    element_classes: trackEl.className,
                    element_id: trackEl.id || null,
                    element_text: trackEl.innerText.trim() || null,
                });
                console.log("GTM click:", {
                    event: "click",
                    element_tag: trackEl.tagName,
                    element_classes: trackEl.className,
                    element_id: trackEl.id || null,
                    element_text: trackEl.innerText.trim() || null,
                });
            }
        };

        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, []);


    return (
        <div
            className="mt-20 w-[90%] rounded-3xl p-3 md:p-10 text-white shadow-lg max-w-[1400px] mx-auto"
            style={{
                background: "linear-gradient(90deg, #2c62ff 0%, #9695ff 100%)",
            }}
        >
            <h2 className="text-3xl font-bold text-center mb-8">
                Заполните заявку, и наш менеджер свяжется с вами в ближайшее время
            </h2>

            <form
                onSubmit={handleSubmit}
                className="track-form bg-white/90 backdrop-blur-md text-gray-800 rounded-3xl p-8 shadow-xl mx-auto"
            >
                {status === "success" && (
                    <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 font-medium text-center">
                        ✅ Заявка успешно отправлена!
                    </div>
                )}
                {status === "error" && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 font-medium text-center">
                        ⚠️ Заполните обязательные поля или попробуйте снова.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block mb-2 font-medium text-sm">Имя *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Телефон *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Город</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Откуда</label>
                        <input
                            type="text"
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Куда</label>
                        <input
                            type="text"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Дата</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Время</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm">Кол-во пассажиров</label>
                        <input
                            type="number"
                            name="passengers"
                            value={form.passengers}
                            onChange={handleChange}
                            min="1"
                            className="track-click w-full border border-gray-300 bg-transparent rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6">
                    {["В одну сторону", "Туда-обратно"].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <span
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    form.tripType === option ? "border-blue-600" : "border-gray-400"
                                }`}
                            >
                                {form.tripType === option && <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>}
                            </span>
                            <input
                                type="radio"
                                name="tripType"
                                value={option}
                                checked={form.tripType === option}
                                onChange={handleChange}
                                className="hidden"
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="track-click w-full sm:w-auto px-6 py-2 rounded-2xl border-2 border-blue-600 bg-white/10 text-blue-600 font-semibold text-base md:text-lg hover:bg-blue-600 hover:text-white transition-all shadow-md disabled:opacity-50"
                    >
                        {status === "loading" ? "Отправка..." : "Оставить заявку"}
                    </button>
                </div>
            </form>
        </div>
    );
}
