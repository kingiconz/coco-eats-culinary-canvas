import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star, Utensils, Clock, Award } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import landingVideo from "@/assets/landing1.mp4";
import hero from "@/assets/hero.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import interior from "@/assets/interior.jpg";
import chef from "@/assets/chef.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CocoEats — A Cinematic Dining Experience" },
      { name: "description", content: "Modern luxury dining in the heart of the city. Seasonal ingredients, cinematic plating, unforgettable evenings." },
      { property: "og:title", content: "CocoEats — A Cinematic Dining Experience" },
      { property: "og:description", content: "Modern luxury dining where every plate tells a story." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const dishes = [
  { img: dish1, name: "Tartufo Carbonara", price: "$32", tag: "Signature" },
  { img: dish2, name: "Wagyu Stack", price: "$28", tag: "Bestseller" },
  { img: dish4, name: "Omakase Selection", price: "$58", tag: "Chef's Pick" },
  { img: dish3, name: "Coulant au Chocolat", price: "$16", tag: "Dessert" },
];

const testimonials = [
  { name: "Sofia Marin", quote: "Plates that look like art and taste even better. The atmosphere alone is worth the visit.", role: "Food Critic, Le Magazine" },
  { name: "James O'Connor", quote: "An effortlessly modern restaurant — every dish has a quiet confidence to it.", role: "Regular guest" },
  { name: "Aiko Tanaka", quote: "The omakase was a love letter to seasonality. We will be back. And back. And back.", role: "Travel writer" },
];

function Home() {
  return (
    <Layout transparentNav>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            src={landingVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={hero}
            className="w-full h-full object-cover object-center contrast-[1.02] brightness-[1.02] will-change-transform"
          />
        </div>
        {/* Subtle noise/grain overlay to mask compression and improve perceived quality */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-[2]" />

        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pt-32 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 text-white/80 mb-6"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs uppercase tracking-[0.32em]">Est. 2014 · Modern Cuisine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight max-w-5xl"
          >
            Taste the <span className="italic font-light text-gold">art</span><br />
            of slow living.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-xl text-white/75 text-lg leading-relaxed"
          >
            A cinematic dining experience where seasonal ingredients meet quiet,
            confident plating. Crafted in the heart of the city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/reservation"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-ember transition-all duration-500 shadow-luxe"
            >
              Reserve a Table
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 border border-white/40 text-white px-7 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-all duration-500"
            >
              Explore Menu
            </Link>
            <a
              href="#order"
              className="inline-flex items-center gap-3 text-white/80 px-3 py-4 text-sm uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
              Order Now →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 text-[10px] uppercase tracking-[0.4em]"
        >
          <span>Scroll</span>
          <span className="block w-px h-10 bg-white/40 animate-shimmer" />
        </motion.div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="bg-foreground text-background py-6 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 text-sm uppercase tracking-[0.32em] text-background/70">
              <span>Seasonal Tasting Menu</span>
              <span className="text-gold">✦</span>
              <span>Award Winning Chefs</span>
              <span className="text-gold">✦</span>
              <span>Reservations Open</span>
              <span className="text-gold">✦</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* FEATURED DISHES */}
      <section id="order" className="py-28 md:py-40 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <SectionEyebrow>Signature Dishes</SectionEyebrow>
              <Reveal delay={0.1}>
                <h2 className="font-display text-5xl md:text-7xl mt-5 max-w-2xl leading-[1.05]">
                  Plates that <span className="italic text-primary">linger</span> in memory.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link to="/menu" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
                Full Menu <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {dishes.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <div className="group hover-lift bg-card rounded-sm overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={d.img}
                      alt={d.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-[10px] uppercase tracking-[0.2em]">
                      {d.tag}
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="font-display text-xl">{d.name}</h3>
                    <span className="text-primary font-medium">{d.price}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SPLIT */}
      <section className="py-28 md:py-40 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={interior} alt="Restaurant interior at golden hour" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 hidden md:block bg-background p-8 shadow-luxe max-w-[260px]">
                <Award className="text-gold mb-3" size={24} />
                <p className="font-display text-lg leading-snug">Three years of Michelin recognition.</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionEyebrow>Our Story</SectionEyebrow>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-6xl mt-5 leading-[1.05]">
                A house built on <span className="italic text-primary">seasonality</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed">
                Coco began as a six-seat counter in a quiet alley. A decade later, our philosophy
                hasn't changed: pick what's best from the morning market, plate what makes us
                proud, and let the room hold the rest.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { n: "10+", l: "Years" },
                  { n: "42", l: "Awards" },
                  { n: "3", l: "Stars" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-4xl text-primary">{s.n}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
                Read our story <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHEF SECTION */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <SectionEyebrow>The Chef</SectionEyebrow>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-6xl mt-5 leading-[1.05]">
                Marco <span className="italic text-primary">Reyes</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">Executive Chef</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                Trained in Lyon, refined in Tokyo, and rooted in Mediterranean memory.
                Marco's tasting menus are quiet manifestos — restraint, technique, and
                an obsession with what arrives on the dock that morning.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-muted-foreground">4.9 from 2,300+ guests</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={chef} alt="Chef Marco Reyes plating a dish" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-12">
          <SectionEyebrow>Through the Lens</SectionEyebrow>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl mt-5 leading-[1.05] max-w-2xl">
              Moments from the <span className="italic text-primary">pass</span>.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[dish5, dish6, dish1, dish4, dish2, dish3].map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative aspect-square overflow-hidden group">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
            View Gallery <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 md:py-40 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
          <SectionEyebrow>Whispered Words</SectionEyebrow>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl mt-5 mx-auto max-w-3xl leading-[1.05]">
              What guests <span className="italic text-primary">remember</span>.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-background p-10 text-left h-full shadow-soft">
                  <div className="flex gap-1 text-gold mb-5">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                  <p className="font-display italic text-xl leading-snug">"{t.quote}"</p>
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <Reveal>
            <Utensils className="text-gold mx-auto mb-6" size={32} />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-white text-5xl md:text-7xl leading-[1.05]">
              An evening, <span className="italic text-gold">composed</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-white/75 text-lg max-w-xl mx-auto">
              Reserve a table for an evening of slow plates, low lighting, and quiet conversation.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link to="/reservation" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-ember transition-colors">
                Book a Table <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock size={14} /> Open daily · 12pm – 11pm
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
