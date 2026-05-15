import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import interior from "@/assets/interior.jpg";
import chef from "@/assets/chef.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CocoEats" },
      { name: "description", content: "Moments from the pass — plates, room, and people of CocoEats." },
      { property: "og:title", content: "Gallery — CocoEats" },
      { property: "og:description", content: "Moments from the pass — plates, room, and people of CocoEats." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const images = [
  { src: hero, span: "row-span-2" },
  { src: dish1, span: "" },
  { src: dish2, span: "row-span-2" },
  { src: dish3, span: "" },
  { src: interior, span: "col-span-2" },
  { src: dish4, span: "row-span-2" },
  { src: dish5, span: "" },
  { src: chef, span: "row-span-2" },
  { src: dish6, span: "" },
];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Layout>
      <section className="py-16 md:py-24 text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl mt-5 leading-[1]">
              Moments, <span className="italic text-primary">framed</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
            {images.map((img, i) => (
              <Reveal key={i} delay={(i % 6) * 0.05} className={img.span}>
                <button
                  onClick={() => setOpen(img.src)}
                  className="group relative w-full h-full overflow-hidden block"
                >
                  <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button onClick={() => setOpen(null)} className="absolute top-6 right-6 text-background hover:text-primary">
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={open}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
