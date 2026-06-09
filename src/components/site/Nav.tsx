import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservation", label: "Reservation" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        transparent ? "bg-transparent" : "glass border-b border-border/40",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          aria-label="CocoEats Home"
          className="flex items-center -ml-8"
        >
          <img
            src={logo}
            alt="CocoEats"
            className={cn(
              "h-20 w-auto object-contain transition-all duration-500",
              !transparent && "brightness-0",
            )}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm uppercase tracking-[0.18em] transition-colors relative group",
                transparent ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground",
              )}
              activeProps={{ className: "!text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          to="/reservation"
          className={cn(
            "hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300",
            transparent
              ? "border border-white/40 text-white hover:bg-white hover:text-foreground"
              : "bg-foreground text-background hover:bg-primary",
          )}
        >
          Reserve
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn("md:hidden p-2", transparent ? "text-white" : "text-foreground")}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/40">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-base uppercase tracking-[0.18em] text-foreground/80"
                activeProps={{ className: "!text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
