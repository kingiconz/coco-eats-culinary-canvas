import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block -ml-4 mb-4">
            <img src={logo} alt="CocoEats" className="h-16 w-auto object-contain" />
          </Link>
          <p className="mt-5 max-w-md text-background/65 leading-relaxed">
            A modern dining experience where seasonal ingredients meet cinematic plating.
            Crafted in the heart of the city — open daily for those who taste with their eyes first.
          </p>
          <div className="flex gap-3 mt-8">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-5 text-gold">Visit</h4>
          <p className="text-background/65 text-sm leading-relaxed">
            18 Rue de la Lumière<br />
            District One<br />
            Open daily · 12pm – 11pm
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-5 text-gold">Explore</h4>
          <ul className="space-y-3 text-sm text-background/65">
            <li><Link to="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link to="/reservation" className="hover:text-primary transition-colors">Reservations</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} CocoEats. Crafted with intention.</p>
          <p>Privacy · Terms · Press</p>
        </div>
      </div>
    </footer>
  );
}
