"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ShieldCheck,
  ArrowRight,
  Building2,
  Landmark,
  Waves,
} from "lucide-react";

type CuratedProperty = {
  title: string;
  architect: string;
  year: string;
  price: string;
  type: string;
  iconType: "glass" | "stone" | "water" | "brutalist";
};

type CityLocation = {
  name: string;
  lat: string;
  lon: string;
  x: number; // Percent on map
  y: number; // Percent on map
  listingsCount: string;
  portfolioValue: string;
  featuredProperty: CuratedProperty;
};

const CITIES: CityLocation[] = [
  {
    name: "Zürich",
    lat: "47.3769° N",
    lon: "8.5417° E",
    x: 51,
    y: 30,
    listingsCount: "04",
    portfolioValue: "CHF 142M",
    featuredProperty: {
      title: "The Hillside Sanctuary",
      architect: "Gigon/Guyer Retrospective",
      year: "MMXV",
      price: "CHF 38,500,000",
      type: "Modernist Villa",
      iconType: "glass",
    },
  },
  {
    name: "Como",
    lat: "45.8118° N",
    lon: "9.0837° E",
    x: 51.5,
    y: 35.5,
    listingsCount: "02",
    portfolioValue: "€ 28M",
    featuredProperty: {
      title: "Villa Monolith",
      architect: "Studio Giuseppe Terragni inspired",
      year: "MCMLXVIII",
      price: "€ 12,400,000",
      type: "Rationalist Estate",
      iconType: "stone",
    },
  },
  {
    name: "Comporta",
    lat: "38.3813° N",
    lon: "8.7844° W",
    x: 46.5,
    y: 41,
    listingsCount: "03",
    portfolioValue: "€ 19M",
    featuredProperty: {
      title: "Cabañas de Arena",
      architect: "Aires Mateus Architects",
      year: "MMXXI",
      price: "€ 6,400,000",
      type: "Dune Cabins",
      iconType: "water",
    },
  },
  {
    name: "Marbella",
    lat: "36.5101° N",
    lon: "4.8824° W",
    x: 47,
    y: 45,
    listingsCount: "01",
    portfolioValue: "€ 12M",
    featuredProperty: {
      title: "The Travertine Pavilion",
      architect: "Fran Silvestre Arquitectos",
      year: "MMXVIII",
      price: "€ 12,000,000",
      type: "Minimalist Villa",
      iconType: "stone",
    },
  },
  {
    name: "Tribeca",
    lat: "40.7163° N",
    lon: "74.0086° W",
    x: 29.5,
    y: 35,
    listingsCount: "06",
    portfolioValue: "$ 240M",
    featuredProperty: {
      title: "The Duplex Glasshouse",
      architect: "Shigeru Ban Associates",
      year: "MMXVI",
      price: "$ 42,000,000",
      type: "Cast-Iron Penthouse",
      iconType: "glass",
    },
  },
  {
    name: "Marrakech",
    lat: "31.6295° N",
    lon: "7.9811° W",
    x: 48,
    y: 52,
    listingsCount: "02",
    portfolioValue: "€ 8.4M",
    featuredProperty: {
      title: "The Ochre Bastion",
      architect: "Studio KO",
      year: "MMXIX",
      price: "€ 4,200,000",
      type: "Desert Oasis",
      iconType: "brutalist",
    },
  },
  {
    name: "São Paulo",
    lat: "23.5558° S",
    lon: "46.6396° W",
    x: 37,
    y: 72,
    listingsCount: "01",
    portfolioValue: "$ 14M",
    featuredProperty: {
      title: "Casa de Concreto",
      architect: "After Isay Weinfeld",
      year: "MMXII",
      price: "$ 14,000,000",
      type: "Brutalist Pavilion",
      iconType: "brutalist",
    },
  },
  {
    name: "Buenos Aires",
    lat: "34.6037° S",
    lon: "58.3816° W",
    x: 33,
    y: 81,
    listingsCount: "01",
    portfolioValue: "$ 9M",
    featuredProperty: {
      title: "The Neoclassical Loft",
      architect: "Heritage retrofitted",
      year: "MCMXXX",
      price: "$ 9,000,000",
      type: "Industrial Masterpiece",
      iconType: "stone",
    },
  },
  {
    name: "Cape Town",
    lat: "33.9249° S",
    lon: "18.4241° E",
    x: 54,
    y: 78,
    listingsCount: "02",
    portfolioValue: "R 78M",
    featuredProperty: {
      title: "The Clifftop Cantilever",
      architect: "SAOTA",
      year: "MMXX",
      price: "$ 8,200,000",
      type: "Cantilevered Villa",
      iconType: "glass",
    },
  },
  {
    name: "Tbilisi",
    lat: "41.7151° N",
    lon: "44.8271° E",
    x: 58,
    y: 33,
    listingsCount: "01",
    portfolioValue: "$ 4.5M",
    featuredProperty: {
      title: "The Forest Monolith",
      architect: "Architects of Invention",
      year: "MMXXII",
      price: "$ 4,500,000",
      type: "Cor-Ten Canopy House",
      iconType: "brutalist",
    },
  },
  {
    name: "Reykjavík",
    lat: "64.1466° N",
    lon: "21.9426° W",
    x: 43.5,
    y: 18,
    listingsCount: "01",
    portfolioValue: "€ 6M",
    featuredProperty: {
      title: "The Volcanic Retreat",
      architect: "Basalt Architects",
      year: "MMXVII",
      price: "€ 6,000,000",
      type: "Basalt Glass Lodge",
      iconType: "glass",
    },
  },
  {
    name: "Queenstown",
    lat: "45.0312° S",
    lon: "168.6626° E",
    x: 88,
    y: 82,
    listingsCount: "01",
    portfolioValue: "NZ$ 22M",
    featuredProperty: {
      title: "Lake Wakatipu Ridge",
      architect: "Fearon Hay Architects",
      year: "MMXIX",
      price: "NZ$ 22,000,000",
      type: "Alpine Pavilion",
      iconType: "stone",
    },
  },
];

// Elegant drafting-style minimalistic world map contours
function ArchitecturalWorldMap() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 w-full h-full text-[var(--color-line-strong)]"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* North America */}
      <path d="M 120 120 L 150 110 L 220 90 L 280 105 L 310 130 L 290 170 L 250 200 L 205 220 L 235 240 L 220 260 L 195 240 L 180 200 L 150 190 L 130 150 Z" />
      <path d="M 285 80 L 305 70 L 315 85 L 295 95 Z" opacity="0.5" />{" "}
      {/* Greenland representation */}
      {/* South America */}
      <path d="M 295 295 L 340 310 L 360 350 L 380 400 L 340 460 L 315 440 L 310 400 L 290 350 L 285 315 Z" />
      {/* Eurasia */}
      <path d="M 460 140 L 510 110 L 580 90 L 650 100 L 750 110 L 810 130 L 840 180 L 800 220 L 740 240 L 720 210 L 680 230 L 610 200 L 545 220 L 490 190 Z" />
      {/* British Isles / Japan icons */}
      <path d="M 450 115 L 460 105 L 455 125 Z" opacity="0.6" />
      <path d="M 810 140 L 820 150 L 815 170 Z" opacity="0.6" />
      {/* Africa */}
      <path d="M 470 245 L 530 225 L 565 240 L 595 280 L 585 330 L 545 390 L 515 380 L 500 320 L 460 280 Z" />
      <path d="M 605 320 L 615 340 L 610 355 Z" opacity="0.5" />{" "}
      {/* Madagascar */}
      {/* Australia & New Zealand */}
      <path d="M 750 330 L 800 320 L 830 350 L 815 390 L 760 380 L 740 350 Z" />
      <path d="M 855 400 L 865 420 L 850 435 Z" opacity="0.6" /> {/* NZ */}
      {/* Grid Blueprint Overlays */}
      {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((y) => (
        <line
          key={`lat-${y}`}
          x1="20"
          y1={y}
          x2="980"
          y2={y}
          strokeDasharray="1 12"
          opacity="0.3"
        />
      ))}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
        <line
          key={`lon-${x}`}
          x1={x}
          y1="20"
          x2={x}
          y2="480"
          strokeDasharray="1 12"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

// Minimalist micro-illustrations of the real estate type for HUD style UI
function CuratedPropertyIcon({
  type,
}: {
  type: "glass" | "stone" | "water" | "brutalist";
}) {
  if (type === "glass") {
    return (
      <svg
        viewBox="0 0 60 40"
        className="w-12 h-8 text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="5" y="5" width="50" height="30" />
        <line x1="22" y1="5" x2="22" y2="35" strokeDasharray="2 2" />
        <line x1="38" y1="5" x2="38" y2="35" strokeDasharray="2 2" />
        <line x1="5" y1="20" x2="55" y2="20" />
      </svg>
    );
  }
  if (type === "stone") {
    return (
      <svg
        viewBox="0 0 60 40"
        className="w-12 h-8 text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="5,35 15,10 30,22 45,5 55,35" />
        <line x1="5" y1="35" x2="55" y2="35" />
      </svg>
    );
  }
  if (type === "brutalist") {
    return (
      <svg
        viewBox="0 0 60 40"
        className="w-12 h-8 text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="10" y="15" width="25" height="20" />
        <rect x="25" y="5" width="25" height="20" opacity="0.8" />
        <line x1="10" y1="35" x2="50" y2="35" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 60 40"
      className="w-12 h-8 text-[var(--color-accent)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M 5 25 Q 15 15 25 25 T 45 25 T 55 25" />
      <line x1="5" y1="35" x2="55" y2="35" />
    </svg>
  );
}

export default function Atlas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycles the active index unless the user is hovering over the map elements
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CITIES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeCity = CITIES[activeIndex];

  return (
    <section
      ref={containerRef}
      id="atlas"
      className="relative py-24 lg:py-36 border-t"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-line)",
      }}
    >
      <div className="container-x">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-2">
            <span className="eyebrow">— § IV · The Atlas</span>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] tracking-tight text-balance">
              Twelve <em className="italic text-gold-shimmer">cities</em>,{" "}
              <br />
              one standard of care.
            </h2>
          </div>
        </div>

        {/* Dynamic Architectural Control Room */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Main Visual Component: The Drafting Blueprint Canvas */}
          <div
            className="col-span-12 lg:col-span-8 relative aspect-[16/10] overflow-hidden border rounded-sm"
            style={{ borderColor: "var(--color-line-strong)" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Interactive World Map Contour */}
            <div className="absolute inset-0 z-0">
              <ArchitecturalWorldMap />
            </div>

            {/* Micro blueprint technical details */}
            <div className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-wider opacity-40 select-none">
              Projection: Cylindrical Equidistant // Scale: 1:45,000,000
            </div>

            {/* Grid overlay borders */}
            <div
              className="absolute inset-0 border-[6px]"
              style={{ borderColor: "var(--color-bg)" }}
            />
            <div
              className="absolute inset-[6px] border"
              style={{ borderColor: "var(--color-line)" }}
            />

            {/* Active coordinates tracker */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 text-[var(--color-ink-muted)]">
              <Compass
                size={11}
                strokeWidth={1.5}
                className="animate-spin-slow"
              />
              <span>
                {activeCity.lat} · {activeCity.lon}
              </span>
            </div>

            {/* Map Pins */}
            {CITIES.map((city, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsHovered(true);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  aria-label={`Select ${city.name}`}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    {/* Ring animation */}
                    {isActive && (
                      <>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-40 animate-ping" />
                        <span className="absolute inline-flex h-7 w-7 rounded-full border border-[var(--color-accent)] opacity-20" />
                      </>
                    )}
                    {/* Core bullet */}
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[var(--color-accent)] scale-125"
                          : "bg-[var(--color-ink-muted)] opacity-50 group-hover:opacity-100 group-hover:bg-[var(--color-accent)]"
                      }`}
                    />
                  </span>

                  {/* Micro hover label */}
                  <span
                    className={`absolute top-5 left-1/2 -translate-x-1/2 font-sans font-medium text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none px-1.5 py-0.5 rounded-sm bg-[var(--color-bg-elev)] border whitespace-nowrap ${
                      isActive
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 -translate-y-1 group-hover:opacity-80"
                    }`}
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    {city.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Sidebar Panel & Showcase */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between space-y-8">
            {/* Active City Information & Curated Masterpiece */}
            <div className="space-y-6">
              <div>
                <span
                  className="text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  Active Dispatch Desk
                </span>

                <h3 className="font-display text-4xl tracking-tight mt-1">
                  {activeCity.name}
                </h3>

                <div className="flex gap-4 mt-2 font-mono text-[10px] tracking-wider uppercase text-[var(--color-accent)]">
                  <span>{activeCity.listingsCount} Properties</span>
                  <span>·</span>
                  <span>{activeCity.portfolioValue} Cap</span>
                </div>
              </div>

              {/* Showcase Off-market master property */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCity.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="p-5 border rounded-sm space-y-4"
                  style={{
                    background: "var(--color-bg-elev)",
                    borderColor: "var(--color-line-strong)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest opacity-65">
                        {activeCity.featuredProperty.type}
                      </span>
                      <h4 className="font-display text-lg tracking-tight mt-0.5 text-balance">
                        {activeCity.featuredProperty.title}
                      </h4>
                    </div>
                    <CuratedPropertyIcon
                      type={activeCity.featuredProperty.iconType}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 pt-3 border-t text-[10px] uppercase tracking-wider font-mono opacity-80">
                    <div>
                      <span className="block text-[8px] opacity-50">
                        Architect
                      </span>
                      <span className="font-sans font-medium">
                        {activeCity.featuredProperty.architect}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] opacity-50">
                        Year Built
                      </span>
                      <span>{activeCity.featuredProperty.year}</span>
                    </div>
                    <div className="col-span-2 pt-1">
                      <span className="block text-[8px] opacity-50">
                        Private Guide
                      </span>
                      <span className="text-[var(--color-accent)] font-sans font-semibold">
                        {activeCity.featuredProperty.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* City Quick Navigation Directory */}
            <div
              className="pt-6 border-t"
              style={{ borderColor: "var(--color-line)" }}
            >
              <span className="text-[9px] uppercase tracking-[0.32em] opacity-50 block mb-3">
                Global Network Index
              </span>

              <div className="grid grid-cols-3 gap-2 max-h-[140px] overflow-y-auto pr-1">
                {CITIES.map((city, idx) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsHovered(true);
                    }}
                    className={`text-left py-2 px-2 text-[11px] uppercase tracking-widest transition-all rounded-sm border ${
                      idx === activeIndex
                        ? "text-[var(--color-accent)] font-medium bg-[var(--color-bg-elev)] border-[var(--color-accent)]"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-bg-elev)] border-transparent"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Action Call */}
            <div>
              <a
                href="#contact"
                className="btn w-full justify-between group"
                data-cursor="hover"
              >
                <span>Enquire By City Studio</span>
                <ArrowRight
                  size={14}
                  className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Styled City Loop Marquee (Footer Divider) */}
        <div
          className="mt-20 border-y py-5 marquee-mask"
          style={{ borderColor: "var(--color-line)" }}
        >
          <div className="flex gap-16 animate-marquee-slow whitespace-nowrap select-none">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span
                key={`${city.name}-marquee-${i}`}
                className="font-display text-xl tracking-wider flex items-center gap-6"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {city.name}
                <span className="inline-block h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
