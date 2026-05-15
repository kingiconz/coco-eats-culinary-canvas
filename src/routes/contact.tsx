import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CocoEats" },
      { name: "description", content: "Get in touch with CocoEats. Visit us, call, email, or message on WhatsApp." },
      { property: "og:title", content: "Contact — CocoEats" },
      { property: "og:description", content: "Get in touch with CocoEats." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <SectionEyebrow>Contact</SectionEyebrow>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl mt-5 leading-[1]">
              Say <span className="italic text-primary">hello</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Visit", text: "18 Rue de la Lumière\nDistrict One, City Center" },
              { icon: Clock, title: "Hours", text: "Open daily\n12:00pm – 11:00pm" },
              { icon: Phone, title: "Call", text: "+1 (555) 010 4242" },
              { icon: Mail, title: "Email", text: "hello@cocoeats.com" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="flex gap-5 p-7 bg-card hover-lift rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{c.title}</h3>
                    <p className="mt-1 text-muted-foreground whitespace-pre-line text-sm leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <a
                href="https://wa.me/15550104242"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full p-5 bg-foreground text-background rounded-full text-sm uppercase tracking-[0.2em] hover:bg-primary transition-colors"
              >
                <MessageCircle size={18} /> Message on WhatsApp
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-card p-8 md:p-10 shadow-soft space-y-6"
            >
              <h2 className="font-display text-3xl">Send a note</h2>

              {sent ? (
                <p className="text-primary py-10">Thank you. We'll be in touch shortly.</p>
              ) : (
                <>
                  <Field label="Name"><input required className="w-full bg-transparent outline-none pt-2" /></Field>
                  <Field label="Email"><input required type="email" className="w-full bg-transparent outline-none pt-2" /></Field>
                  <Field label="Subject"><input className="w-full bg-transparent outline-none pt-2" /></Field>
                  <Field label="Message"><textarea required rows={5} className="w-full bg-transparent outline-none pt-2 resize-none" /></Field>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-ember transition-colors">
                    Send Message
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="aspect-[16/7] overflow-hidden rounded-sm">
              <iframe
                title="Map to CocoEats"
                className="w-full h-full grayscale contrast-110"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.34%2C48.85%2C2.36%2C48.87&layer=mapnik"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-border pb-2 focus-within:border-primary transition-colors">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
