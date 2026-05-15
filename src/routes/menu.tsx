import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Star } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — CocoEats" },
      { name: "description", content: "Browse our seasonal menu — breakfast, lunch, dinner, desserts and craft drinks." },
      { property: "og:title", content: "Menu — CocoEats" },
      { property: "og:description", content: "Seasonal plates, signature dishes, and craft drinks." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type Item = { name: string; desc: string; price: string; img: string; rating: number; cat: string };

const items: Item[] = [
  { name: "Avocado & Burrata Toast", desc: "Sourdough, heirloom tomato, basil oil", price: "$14", img: dish5, rating: 4.8, cat: "Breakfast" },
  { name: "Saffron Eggs Benedict", desc: "Cured ham, hollandaise, chives", price: "$18", img: dish1, rating: 4.7, cat: "Breakfast" },
  { name: "Tartufo Carbonara", desc: "Black truffle, guanciale, pecorino", price: "$32", img: dish1, rating: 4.9, cat: "Lunch" },
  { name: "Wagyu Stack", desc: "A5 wagyu, brioche, aged cheddar", price: "$28", img: dish2, rating: 4.9, cat: "Lunch" },
  { name: "Garden Florale", desc: "Edible flowers, citrus, herb vinaigrette", price: "$16", img: dish5, rating: 4.6, cat: "Lunch" },
  { name: "Omakase Selection", desc: "Chef's nigiri tasting, 8 pieces", price: "$58", img: dish4, rating: 5.0, cat: "Dinner" },
  { name: "Aged Ribeye", desc: "45-day dry-aged, bone marrow butter", price: "$62", img: dish2, rating: 4.9, cat: "Dinner" },
  { name: "Coulant au Chocolat", desc: "Warm chocolate, fresh berries, gold leaf", price: "$16", img: dish3, rating: 4.9, cat: "Desserts" },
  { name: "Vanilla Crème Brûlée", desc: "Bourbon vanilla, candied citrus", price: "$14", img: dish3, rating: 4.7, cat: "Desserts" },
  { name: "Smoked Old Fashioned", desc: "Bourbon, applewood, orange bitters", price: "$18", img: dish6, rating: 4.9, cat: "Drinks" },
  { name: "Cocozaki Spritz", desc: "Yuzu, sake, sparkling, shiso", price: "$16", img: dish6, rating: 4.8, cat: "Drinks" },
];

const cats = ["All", "Breakfast", "Lunch", "Dinner", "Desserts", "Drinks"] as const;

function MenuPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === "All" || i.cat === cat) &&
          (q === "" || i.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <Layout>
      <section className="bg-gradient-ivory pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <SectionEyebrow>The Menu</SectionEyebrow>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl mt-5 leading-[1] max-w-4xl mx-auto">
              Composed with <span className="italic text-primary">care</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-muted-foreground text-lg max-w-xl mx-auto">
              From sunrise plates to midnight pours — every dish honors the season and the maker.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-20 z-30 glass border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-colors ${
                  cat === c ? "bg-foreground text-background" : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-11 pr-4 py-2.5 bg-background border border-border rounded-full text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <motion.article
                  key={d.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                  className="group bg-card rounded-sm overflow-hidden hover-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-[10px] uppercase tracking-[0.2em]">{d.cat}</div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 text-[11px] flex items-center gap-1">
                      <Star size={11} className="text-gold" fill="currentColor" />
                      {d.rating}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl">{d.name}</h3>
                      <span className="text-primary font-medium text-lg">{d.price}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    <button
                      onClick={() => setCart((c) => [...c, d.name])}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 border border-foreground rounded-full text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Plus size={14} /> Add to order
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No dishes found.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background px-6 py-4 rounded-full shadow-luxe flex items-center gap-4"
          >
            <span className="text-sm">{cart.length} item{cart.length > 1 ? "s" : ""} in your order</span>
            <button onClick={() => setCart([])} className="text-xs uppercase tracking-[0.2em] text-gold hover:underline">
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
