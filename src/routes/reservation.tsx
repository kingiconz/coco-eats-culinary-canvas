import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, Check } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — CocoEats" },
      { name: "description", content: "Book your table at CocoEats. Open daily, 12pm to 11pm." },
      { property: "og:title", content: "Reserve a Table — CocoEats" },
      { property: "og:description", content: "Book your table at CocoEats." },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: Reservation,
});

const times = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Layout>
      <section className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        <div className="relative hidden lg:block overflow-hidden">
          <img src={interior} alt="Restaurant interior" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/70" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <p className="text-gold uppercase tracking-[0.32em] text-xs">Reservations</p>
            <h2 className="font-display text-5xl xl:text-6xl mt-4 leading-[1.05]">
              An evening, just for <span className="italic">you</span>.
            </h2>
            <p className="mt-6 text-white/75 max-w-md">
              Tables released 30 days in advance. For parties of 8 or more, please contact us directly.
            </p>
          </div>
        </div>

        <div className="bg-background flex items-center py-20 lg:py-0">
          <div className="w-full max-w-lg mx-auto px-6 lg:px-12">
            <SectionEyebrow>Book a Table</SectionEyebrow>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl mt-5 leading-[1.05]">
                Reserve your <span className="italic text-primary">seat</span>.
              </h1>
            </Reveal>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 p-8 bg-secondary/60 border border-primary/20 rounded-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-5">
                    <Check size={20} />
                  </div>
                  <h3 className="font-display text-3xl">Table held.</h3>
                  <p className="mt-3 text-muted-foreground">
                    A confirmation has been sent to <span className="text-foreground">{email}</span>. We can't wait to see you.
                  </p>
                  <button onClick={() => setDone(false)} className="mt-6 text-sm uppercase tracking-[0.2em] text-primary border-b border-primary pb-1">
                    Make another reservation
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 space-y-7"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="Date" icon={<Calendar size={16} />}>
                      <input
                        required
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent outline-none pt-2"
                      />
                    </Field>
                    <Field label="Guests" icon={<Users size={16} />}>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-transparent outline-none pt-2"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
                      <Clock size={14} /> Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`py-2.5 text-sm rounded-sm border transition-all ${
                            time === t ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Full name">
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent outline-none pt-2" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none pt-2" />
                  </Field>

                  <button
                    type="submit"
                    disabled={!time || !date}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-ember transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirm Reservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block border-b border-border pb-2 group focus-within:border-primary transition-colors">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
