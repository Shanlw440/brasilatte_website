import React, { useEffect, useMemo, useState } from "react";
import Logo from "./assets/BrasilLatte.png";
import UK from "./assets/flags/uk.svg";
import BR from "./assets/flags/br.svg";
import MainPhoto from "./assets/main_photo.JPG?url";
import { messages } from "./i18n";

/** Brand colours */
const brand = { green: "#099E48", yellow: "#FFDD00", blue: "#0A2B7E" };

/** WhatsApp (07594754354 -> E.164 without + or spaces) */
const WHATSAPP_NUMBER = "447594754354";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("brasil_latte_lang") || "en");
  const t = useMemo(() => messages[lang] || messages.en, [lang]);

  const copy = useMemo(
    () =>
      lang === "pt"
        ? {
            heroTitle: "Salgados e padaria brasileira — sob encomenda.",
            heroSubtitle:
              "Pedidos avulsos e eventos. 24 horas pelo WhatsApp. Entrega por distância ou retirada em Kidlington.",
            chips: ["24/7", "Pedidos avulsos & eventos", "Casamentos e chás de bebê"],
            fullMenu: "Cardápio completo",
            fried: "Fritos",
            baked: "Assados",
            boxesTitle: "Caixas de salgados (mix ou um sabor)",
            box50: "50 unidades — £24",
            box100: "100 unidades — £39.90",
            pies: "Tortas (Pies)",
            piesSizes: "Tamanhos: pequena £30 · média £38 · grande £50",
            bakery: "Padaria",
            commercial: "Venda comercial — negociar preço",
            orderHow: "Como pedir",
            deliveryInfo:
              "Faça seu pedido pelo WhatsApp. Entrega (cobrada por distância) ou retirada em 65 Oxford Road, Kidlington, OX5 2BS. Horários combinados pelo WhatsApp.",
            reviewsTitle: "O que falam",
            aboutTitle: "Sobre nós",
            aboutStory: [
              "Sou mineira — terra do pão de queijo e dos salgados bem-feitos. Aprendi sozinha, aos 20 anos, na cozinha de casa, tentando reproduzir os sabores que me lembravam família e festa.",
              "Em 1997 comecei a vender para os vizinhos; deu tão certo que, em 2001, me tornei chef numa empresa, onde passei 10 anos aperfeiçoando massas, recheios e temperos.",
              "Morei 18 anos em Madri, levando comigo o gosto por mesa farta e comida acolhedora. Em 2022 cheguei à Inglaterra e trouxe de Minas a mesma vontade: fazer salgados e doces que dão abraço — para um lanche rápido, uma festa pequena ou um grande evento.",
            ],
            open247: "Atendimento 24 horas por mensagem (respondemos assim que possível).",
            catering: "Casamentos, chás de bebê e eventos — e também pedidos avulsos.",
            veg: "Veg.",
            enquire: "Falar no WhatsApp",
            allergen: "Informações de alérgenos disponíveis mediante solicitação.",
            subtitleHeader: "Savouries & Snacks in Oxfordshire",
          }
        : {
            heroTitle: "Brazilian savoury & bakery — made to order.",
            heroSubtitle:
              "Single orders and events. Message 24/7 on WhatsApp. Delivery charged by distance or pick up in Kidlington.",
            chips: ["24/7", "Single orders & events"],
            fullMenu: "Full menu",
            fried: "Fried",
            baked: "Baked",
            boxesTitle: "Snack boxes (mix or single flavour)",
            box50: "50 pieces — £24",
            box100: "100 pieces — £39.90",
            pies: "Tortas (Pies)",
            piesSizes: "Sizes: Small £30 · Medium £38 · Big £50",
            bakery: "Bakery",
            commercial: "Commercial sale — negotiate price",
            orderHow: "How to order",
            deliveryInfo:
              "Order via WhatsApp. Delivery (charged by distance) or pick up at 65 Oxford Road, Kidlington, OX5 2BS. Delivery/collection times negotiated via WhatsApp.",
            reviewsTitle: "Reviews",
            aboutTitle: "About us",
            aboutStory: [
              "I’m from Minas Gerais — home of pão de queijo and generous savouries. I taught myself at 20, in my own kitchen, chasing the flavours that felt like family gatherings.",
              "In 1997 I began selling to neighbours; by 2001 I was a chef for a company, spending ten years refining doughs, fillings, and seasoning.",
              "I lived 18 years in Madrid, carrying that love for warm, abundant food. In 2022 I moved to England and brought Minas with me: savoury snacks and bakes that feel like a hug — for a quick bite, a small party, or a big celebration.",
            ],
            open247: "Open 24/7 for messages (we’ll reply as soon as we can).",
            catering: "Weddings, baby showers, and events — and single orders too.",
            veg: "Veg.",
            enquire: "Message on WhatsApp",
            allergen: "Allergen information available on request.",
            subtitleHeader: "Savouries & Snacks in Oxfordshire",
          },
    [lang]
  );

  const waText =
    lang === "pt"
      ? "Olá! Gostaria de fazer um pedido. Encontrei o cardápio no site."
      : "Hi! I’d like to place an order. I saw the menu on your website.";
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  useEffect(() => {
    localStorage.setItem("brasil_latte_lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.classList.add("scroll-smooth");
  }, [lang]);

  return (
    <div id="top" className="min-h-screen text-neutral-900">
      <Header lang={lang} setLang={setLang} copy={copy} waLink={waLink} />
      <Hero copy={copy} waLink={waLink} sinceLabel={t.since} />
      <MenuSections lang={lang} copy={copy} />
      <HowToOrder copy={copy} waLink={waLink} />
      <Reviews copy={copy} />
      <About copy={copy} />
      <Footer copy={copy} />
    </div>
  );
}

/* ================= Header (bigger logo, social icons next to it) ================= */

function Header({ lang, setLang, copy, waLink }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-5 md:py-6 flex items-center gap-3 md:gap-4 relative">
        {/* Left: bigger logo + social icons */}
        <div className="flex items-center gap-2">
          <a href="#top" className="shrink-0 inline-flex items-center" aria-label="Brasilatte home">
            {/* bumped from h-24/28/32 to h-28/32/36 */}
            <img src={Logo} alt="Brasilatte logo" className="h-28 md:h-32 lg:h-36 w-auto" />
          </a>
          <div className="flex items-center gap-1.5 ml-1">
            <a
              href="https://instagram.com/brasilatte"
              aria-label="Instagram @brasilatte"
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-md hover:bg-neutral-100"
              title="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/share/1ZTWWm2Dfe/?mibextid=wwXIfr"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-md hover:bg-neutral-100"
              title="Facebook"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Center: Brasilatte with coloured a’s + 🇧🇷 + subheader */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Br
              <span style={{ color: brand.green }}>a</span>
              sil
              <span style={{ color: brand.yellow }}>a</span>
              tte
            </h1>
            <img src={BR} alt="" className="h-4 md:h-5 w-auto" />
          </div>
          <div className="mt-0.5 text-[11px] md:text-xs text-neutral-600">{copy.subtitleHeader}</div>
        </div>

        {/* Right: language toggle + WhatsApp (no flag) */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <FlagToggle lang={lang} setLang={setLang} />
          <a
            href={waLink}
            className="px-3 py-1.5 rounded-lg text-white text-sm"
            style={{ backgroundColor: brand.green }}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <Ribbon />
    </header>
  );
}

function Ribbon() {
  return <div className="w-full h-[2px] bg-gradient-to-r from-[#099E48] via-[#FFDD00] to-[#0A2B7E]" />;
}

function FlagToggle({ lang, setLang }) {
  return (
    <div className="inline-flex rounded-full border border-neutral-300 bg-white overflow-hidden text-sm">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1.5 flex items-center gap-2 ${
          lang === "en" ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
        }`}
        aria-pressed={lang === "en"}
        title="English"
      >
        <img src={UK} alt="English (UK)" className="h-4 w-auto" />
        <span>EN</span>
      </button>
      <button
        onClick={() => setLang("pt")}
        className={`px-2 py-1.5 flex items-center gap-2 ${
          lang === "pt" ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
        }`}
        aria-pressed={lang === "pt"}
        title="Português (Brasil)"
      >
        <img src={BR} alt="Português (Brasil)" className="h-4 w-auto" />
        <span>PT-BR</span>
      </button>
    </div>
  );
}

/* ================= Hero ================= */

function Hero({ copy, waLink, sinceLabel }) {
  return (
    <section className="max-w-6xl mx-auto px-3 md:px-4 pt-4 md:pt-6 pb-10 md:pb-12 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
      <div>
        <div className="text-xs uppercase tracking-wider text-neutral-500">{sinceLabel}</div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-1">{copy.heroTitle}</h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-neutral-700">{copy.heroSubtitle}</p>
        <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
          <a
            href={waLink}
            className="px-4 py-2 rounded-xl text-white font-semibold shadow-soft"
            style={{ backgroundColor: brand.green }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order on WhatsApp
          </a>
        </div>
        <div className="mt-5 md:mt-6 flex items-center gap-3 md:gap-4 text-sm text-neutral-600 flex-wrap">
          {copy.chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      {/* Right column: hero photo */}
      <div>
        <div className="rounded-2xl md:rounded-3xl bg-white shadow-soft p-3 md:p-4">
          <div className="rounded-xl md:rounded-2xl overflow-hidden">
            <img
              src={MainPhoto}
              alt="Brasilatte — freshly made Brazilian snacks"
              className="w-full h-[220px] sm:h-[260px] md:h-[340px] lg:h-[400px] object-contain object-center"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Menu ================= */

function MenuSections({ lang, copy }) {
  const fried = [
    { en: "Coxinha de frango (chicken coxinha)", pt: "Coxinha de frango", tag: "" },
    { en: "Bolinha de queijo (cheese balls)", pt: "Bolinha de queijo", tag: copy.veg },
    { en: "Risoles de carne (meat risoles)", pt: "Risoles de carne", tag: "" },
    { en: "Pastel de carne (meat pastel)", pt: "Pastel de carne", tag: "" },
    { en: "Pastel de queijo (cheese pastel)", pt: "Pastel de queijo", tag: copy.veg },
    { en: "Kibe", pt: "Kibe", tag: "" },
  ];

  const baked = [
    { en: "Esfirra de carne — open or closed", pt: "Esfirra de carne — aberta ou fechada" },
    { en: "Empada de frango (chicken empada)", pt: "Empada de frango" },
    { en: "Ham & cheese roll", pt: "Enroladinho de presunto e queijo" },
    { en: "Chicken & cheese roll", pt: "Enroladinho de frango com queijo" },
    { en: "Sausage roll", pt: "Enroladinho de salsicha" },
  ];

  const pies = [
    { en: "Chicken pie (chicken, mozzarella, tomatoes)", pt: "Torta de frango (frango, mozzarella, tomate)", note: copy.piesSizes },
    { en: "Chicken empadão (chicken, mozzarella, requeijão, olives; optional sweetcorn, peas)", pt: "Empadão de frango (frango, mozzarella, requeijão, azeitona; opcional milho, ervilha)", note: copy.piesSizes },
    { en: "Cold pie — chicken or tuna (carrots, mayo, requeijão, batata palha; topped with mash or mayo)", pt: "Torta fria — frango ou atum (cenoura, maionese, requeijão, batata palha; cobertura purê de batata ou maionese)", note: copy.piesSizes },
  ];

  const bakery = [
    { en: "Fatias Húngaras (Hungarian slices)", pt: "Fatias Húngaras", note: "£2 / unit" },
    { en: "Pão de queijo", pt: "Pão de queijo", note: "1 kg baked £22 · frozen £20" },
    { en: "Rosca (sweet ring bread)", pt: "Rosca", note: "£8 / unit" },
    { en: "Biscoito de queijo (cheese biscuit)", pt: "Biscoito de queijo", note: "same price as pão de queijo" },
    { en: "Pão caseiro (homemade bread)", pt: "Pão caseiro", note: "£8 / unit" },
  ];

  const label = (item) => (lang === "pt" ? item.pt : item.en);

  return (
    <section id="menu" className="max-w-6xl mx-auto px-3 md:px-4 py-8">
      <h3 className="text-3xl font-extrabold tracking-tight">{copy.fullMenu}</h3>

      {/* Boxes info (Fried + Baked) */}
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm">
          <div className="font-semibold">{copy.boxesTitle}</div>
          <div className="text-neutral-600">
            {lang === "pt" ? "Fritos • Assados" : "Fried • Baked"}
          </div>
        </div>
        <div className="flex gap-3 text-sm font-semibold">
          <div className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white">{copy.box50}</div>
          <div className="px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200">{copy.box100}</div>
        </div>
      </div>

      {/* Fried */}
      <MenuGrid title={copy.fried} items={fried.map((i) => ({ name: label(i), tag: i.tag }))} />
      {/* Baked */}
      <MenuGrid title={copy.baked} items={baked.map((i) => ({ name: label(i) }))} />
      {/* Pies */}
      <MenuGrid title={copy.pies} subtitle={copy.piesSizes} items={pies.map((p) => ({ name: label(p), note: p.note }))} />
      {/* Bakery */}
      <MenuGrid title={copy.bakery} items={bakery.map((b) => ({ name: label(b), note: b.note }))} />

      {/* Notes */}
      <div className="mt-6 text-sm text-neutral-600">{copy.commercial}</div>
      <div className="text-xs text-neutral-500 mt-1">{copy.allergen}</div>
    </section>
  );
}

function MenuGrid({ title, items, subtitle }) {
  return (
    <section className="mt-8">
      <div className="text-xs uppercase tracking-wider text-neutral-500">{title}</div>
      {subtitle && <div className="mt-1 text-sm text-neutral-600">{subtitle}</div>}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((i) => (
          <div key={i.name} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <div className="aspect-[4/3] bg-neutral-100 grid place-items-center text-neutral-500 text-sm">
              Photo coming soon
            </div>
            <div className="p-4">
              <div className="font-semibold">{i.name}</div>
              {i.note && <div className="text-sm text-neutral-600 mt-1">{i.note}</div>}
              {i.tag && (
                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700">
                  {i.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= How to order ================= */

function HowToOrder({ copy, waLink }) {
  return (
    <section id="howto" className="max-w-6xl mx-auto px-3 md:px-4 py-10">
      <div className="text-xs uppercase tracking-wider text-neutral-500">{copy.orderHow}</div>
      <h3 className="text-2xl font-extrabold tracking-tight mt-1">{copy.enquire}</h3>
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="text-neutral-700">{copy.deliveryInfo}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={waLink}
            className="px-4 py-2 rounded-xl text-white font-semibold shadow-soft"
            style={{ backgroundColor: brand.green }}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              "65 Oxford Road, Kidlington, OX5 2BS"
            )}`}
            className="px-4 py-2 rounded-xl font-semibold"
            style={{ backgroundColor: brand.blue, color: "white" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Maps
          </a>
        </div>
        <p className="mt-3 text-sm text-neutral-500">{copy.open247}</p>
      </div>
    </section>
  );
}

/* ================= Reviews ================= */

function Reviews({ copy }) {
  const reviews =
    copy.reviewsTitle === "Reviews"
      ? [
          { name: "Livia", quote: "The coxinhas are addictive — perfect for parties!" },
          { name: "Marcia", quote: "Tastes like home. The empadão was a hit with the family." },
          { name: "Joe", quote: "Great value snack boxes and fast WhatsApp replies." },
          { name: "Moises", quote: "Pastéis came out crispy and fresh. Will order again." },
        ]
      : [
          { name: "Lívia", quote: "As coxinhas são viciantes — perfeitas para festas!" },
          { name: "Márcia", quote: "Sabor de casa. O empadão fez sucesso na família." },
          { name: "Joe", quote: "Caixas de salgados com ótimo custo-benefício e resposta rápida no WhatsApp." },
          { name: "Moisés", quote: "Os pastéis chegaram crocantes e fresquinhos. Vou pedir de novo." },
        ];

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-3 md:px-4 py-10">
      <div className="text-xs uppercase tracking-wider text-neutral-500">{copy.reviewsTitle}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="italic">“{r.quote}”</p>
            <div className="mt-3 text-sm text-neutral-600">— {r.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= About ================= */

function About({ copy }) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-3 md:px-4 py-10">
      <div className="text-xs uppercase tracking-wider text-neutral-500">{copy.aboutTitle}</div>
      <div className="mt-3 grid md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl md:rounded-3xl bg-white border border-neutral-200 shadow-soft p-3 md:p-4">
          <div className="aspect-[4/3] rounded-xl md:rounded-2xl bg-neutral-100 border border-neutral-200 grid place-items-center text-neutral-500">
            Photo coming soon
          </div>
        </div>
        <div>
          {copy.aboutStory.map((p, idx) => (
            <p key={idx} className={`text-neutral-800 leading-relaxed ${idx > 0 ? "mt-3" : ""}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Footer ================= */

function Footer({ copy }) {
  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold">Brasilatte</div>
          <p className="text-neutral-600 mt-2">
            {copy.open247} {copy.catering}
          </p>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <p className="text-neutral-600 mt-2">
            WhatsApp:{" "}
            <a className="underline" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              07594 754 354
            </a>
          </p>
          <p className="text-neutral-600">Kidlington · OX5</p>
        </div>
        <div>
          <div className="font-semibold">Find us</div>
          <p className="text-neutral-600 mt-2">65 Oxford Road, Kidlington, OX5 2BS</p>
        </div>
        <div>
          <div className="font-semibold">Social</div>
          <p className="text-neutral-600 mt-2">
            <a href="https://instagram.com/brasilatte" target="_blank" rel="noreferrer" className="underline">
              Instagram @brasilatte
            </a>
          </p>
          <p className="text-neutral-600">
            <a
              href="https://www.facebook.com/share/1ZTWWm2Dfe/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Facebook
            </a>
          </p>
        </div>
      </div>

      {/* Attribution */}
      <div className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-4 text-xs text-neutral-500">
          Website created by{" "}
          <a
            className="underline hover:text-neutral-700"
            href="https://shannonwiseanalytics.com/"
            target="_blank"
            rel="noreferrer"
          >
            Shannon Wise
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================= Icons (inline SVGs) ================= */

function InstagramIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.5 17.52 2 11.93 2 6.35 2 1.86 6.5 1.86 12.07c0 4.99 3.64 9.13 8.41 9.93v-7.02H7.9v-2.9h2.37V9.37c0-2.34 1.39-3.63 3.52-3.63.72 0 1.84.12 2.3.24v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62v1.95h2.85l-.46 2.9h-2.39V22c4.77-.8 8.41-4.94 8.41-9.93z" />
    </svg>
  );
}
