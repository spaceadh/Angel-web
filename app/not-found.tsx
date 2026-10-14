import type { Metadata } from "next";
import Link from "next/link";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <HomeNavigation />
      <main className="legalPage">
        <div>
          <p className="legalKicker">404</p>
          <h1>This page wandered off.</h1>
          <p>
            The link may be old or mistyped. Here are some good places to
            continue:
          </p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/match?source=404">Get an instant estimate</Link>
            </li>
            <li>
              <Link href="/our-work">Our work</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
