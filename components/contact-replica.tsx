import { getV1Document } from "@/lib/v1";
import { MobileMenuController } from "./mobile-menu-controller";

export async function ContactReplica() {
  const document = await getV1Document("index.html");
  const contactHeader = document.header
    .replaceAll('href="#home"', 'href="/#home"')
    .replaceAll('href="#process"', 'href="/#process"')
    .replaceAll('href="#contact"', 'href="/contact"');
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: document.styles }} />
      <header dangerouslySetInnerHTML={{ __html: contactHeader }} />
      <main className="contact-page">
        <section
          className="container contact-page__grid"
          aria-labelledby="contact-title"
        >
          <div className="contact-page__copy">
            <div className="eyebrow">Talk to Malaika</div>
            <h1 id="contact-title">LET&apos;S MAKE YOU LOOK GOOD.</h1>
            <p>
              Ready to build a digital presence that actually works? Start the
              conversation on WhatsApp or email Malaika Studios.
            </p>
            <div className="contact-page__actions">
              <a className="nav-cta" href="https://wa.me/254712345678">
                ◉ &nbsp; Talk to Malaika →
              </a>
              <a className="btn-outline" href="mailto:hello@malaikastudios.com">
                Email Malaika →
              </a>
            </div>
          </div>
          <div className="contact-page__art" aria-hidden="true">
            <img src="/v1/assets/brand-showcase.png" alt="" />
            <span className="script">
              If you want it done properly, talk to Malaika.
            </span>
          </div>
        </section>
      </main>
      <footer dangerouslySetInnerHTML={{ __html: document.footer }} />
      <MobileMenuController />
    </>
  );
}
