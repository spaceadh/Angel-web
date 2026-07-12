import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand brand--footer" href="/" aria-label="Malaika Studios home">
        <span className="brand-mark">
          <Image src="/brand/malaika-wing-mark-reverse.svg" alt="" width={27} height={27} />
        </span>
        <span className="brand-name">Malaika Studios<small>by Rotsi</small></span>
      </Link>
      <div className="footer-links">
        <Link href="/#work">Work</Link>
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/#studio">Studio</Link>
        <a href="mailto:hello@malaikastudios.co.ke">Start a project ↗</a>
      </div>
      <p>© 2026 Malaika Studios · Made in Nairobi</p>
    </footer>
  );
}
