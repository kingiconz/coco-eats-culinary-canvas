import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Layout({ children, transparentNav }: { children: ReactNode; transparentNav?: boolean }) {
  return (
    <>
      <Nav />
      <main className={transparentNav ? "" : "pt-20"}>{children}</main>
      <Footer />
    </>
  );
}
