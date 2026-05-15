import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish4 from "@/assets/dish-4.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — CocoEats" },
      { name: "description", content: "A decade of seasonal cooking. Meet the team and philosophy behind CocoEats." },
      { property: "og:title", content: "Our Story — CocoEats" },
      { property: "og:description", content: "Meet the team and philosophy behind CocoEats." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2014", title: "A six-seat counter", text: "Coco opened in a quiet alley with a single chef, a wood stove, and a stubborn idea." },
  { year: "2017", title: "First star", text: "Recognition from the guide that, quietly, mattered most to us." },
  { year: "2020", title: "The Pass", text: "We rebuilt the kitchen. Glass walls. Open fire. Closer to the food, closer to the guest." },
  { year: "2024", title: "A house, fully grown", text: "42 covers. Three menus. The same six-seat counter, still running." },
];

const team = [
  { name: "Marco Reyes", role: "Executive Chef", img: chef },
  { name: "Lia Okafor", role: "Head Sommelier", img: dish1 },
  { name: "Yuki Brennan", role: "Pastry Chef", img: dish4 },
];

function About() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={interior} alt="Restaurant interior" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 w-full">
            <Reveal>
              <p className="text-gold uppercase tracking-[0.32em] text-xs">Our Story</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-white text-6xl md:text-8xl mt-4 leading-[1] max-w-3xl">
                A house built on <span className="italic">seasonality</span>.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <SectionEyebrow>Mission</SectionEyebrow>
          <Reveal delay={0.1}>
            <p className="font-display text-3xl md:text-5xl mt-8 leading-[1.15]">
              We exist to make the best <span className="italic text-primary">half-hour</span> of your week —
              a quiet room, slow plates, and the feeling that someone, somewhere, still cares.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionEyebrow>The Decade</SectionEyebrow>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl mt-5 mb-16">A small, slow timeline.</h2>
          </Reveal>
          <div className="space-y-2">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-12 py-8 border-t border-border">
                  <div className="font-display text-3xl md:text-5xl text-primary">{t.year}</div>
                  <div>
                    <h3 className="font-display text-2xl mb-2">{t.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionEyebrow>The Hands</SectionEyebrow>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl mt-5 mb-16 max-w-2xl">
              Quiet talent, <span className="italic text-primary">loud care</span>.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="group">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-2xl">{m.name}</h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-1">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
