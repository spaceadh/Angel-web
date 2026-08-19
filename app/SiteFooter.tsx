import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <Link className="brand brand--footer" href="/" aria-label="Malaika Studios home">
        <span className="brand-mark">
          <Image src="/brand/malaika-wing-mark-reverse.svg" alt="" width={27} height={27} />
        </span>
        <span className="brand-name">Malaika Studios<small>by Rotsi</small></span>
      </Link>
      <div className="footer-links">
        <Link href="/projects">Work</Link>
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/contact">Contact</Link>
        <a href="/contact">Start a project ↗</a>
      </div>
      <p>© {currentYear} Malaika Studios · We are located at Afya Mansionettes, Kilimani, Nairobi.</p>
    </footer>
  );
}
