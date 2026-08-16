"use client";

import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaTwitter, FaFacebook } from "react-icons/fa";
import { FiMapPin, FiMail } from "react-icons/fi";
import { sendEmailAction } from "../actions/sendEmail";
import SiteFooter from "../SiteFooter";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleAction(formData: FormData) {
    setFormStatus("submitting");
    const res = await sendEmailAction(formData);
    if (res?.error) setFormStatus("error");
    else setFormStatus("success");
  }

  return (
    <main className="seo-page malaika-dots">
      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Contact navigation">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/#work">Work</Link>
        </nav>
      </header>

      <section className="seo-hero seo-hero--compact">
        <p className="malaika-label">
          <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
            <span className="malaika-signature-color"></span>
            <span className="malaika-signature-color"></span>
            <span className="malaika-signature-color"></span>
          </span>
          CONTACT
        </p>
        <div>
          <h1>Let&apos;s make it unforgettable.</h1>
          <p>
            Whether you need a full digital presence overhaul or just have a few questions about where to start, we are here to help.
          </p>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", padding: "60px 3.25vw", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Contact Form Section */}
        <section>
          <h2 className="malaika-label" style={{ marginBottom: "24px" }}>
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            Send a Message
          </h2>
          <form action={handleAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input type="text" name="name" placeholder="Your Name" required className="malaika-card" style={{ padding: "16px", width: "100%" }} />
            <input type="email" name="email" placeholder="Your Email" required className="malaika-card" style={{ padding: "16px", width: "100%" }} />
            <textarea name="message" placeholder="How can we help?" required className="malaika-card" style={{ padding: "16px", minHeight: "150px", width: "100%", fontFamily: "inherit" }} />
            <button type="submit" className="btn-primary" disabled={formStatus === "submitting"} style={{ alignSelf: "flex-start", marginTop: "8px", border: "none", cursor: "pointer" }}>
              {formStatus === "submitting" ? "Sending..." : "Send Message"}
              <span className="malaika-signature">
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
              </span>
            </button>
            {formStatus === "success" && <p style={{ color: "green", fontSize: "14px", marginTop: "8px" }}>Message sent successfully!</p>}
            {formStatus === "error" && <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>Failed to send message. Please try again.</p>}
          </form>
        </section>

        {/* Info & Map Section */}
        <section style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <div>
            <h2 className="malaika-label" style={{ marginBottom: "24px" }}>
              <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
              </span>
              Our Location
            </h2>
            <div className="malaika-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <FiMapPin size={24} color="var(--orange)" />
                <div>
                  <strong style={{ display: "block", fontSize: "15px", fontFamily: "var(--sans)" }}>Malaika Studios</strong>
                  <span style={{ fontSize: "13px", color: "var(--muted)" }}>Afya Mansionettes, Kilimani, Nairobi</span>
                </div>
              </div>
              <iframe 
                src="https://maps.google.com/maps?q=Afya+Mansionettes+Kilimani+Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: "4px" }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div>
            <h2 className="malaika-label" style={{ marginBottom: "24px" }}>
              <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
              </span>
              Connect With Us
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <a href="https://wa.me/254745474586" target="_blank" rel="noreferrer" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FaWhatsapp size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>WhatsApp</span>
              </a>
              <a href="/contact" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FiMail size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Email Us</span>
              </a>
              <a href="https://instagram.com/malaikastudios.ke" target="_blank" rel="noreferrer" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FaInstagram size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Instagram</span>
              </a>
              <a href="https://facebook.com/rotsilabs" target="_blank" rel="noreferrer" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FaFacebook size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Facebook</span>
              </a>
              <a href="https://x.com/rotsilabs" target="_blank" rel="noreferrer" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FaTwitter size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Twitter</span>
              </a>
              <a href="https://linkedin.com/company/rotsilabs" target="_blank" rel="noreferrer" className="malaika-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", textDecoration: "none", color: "var(--ink)" }}>
                <FaLinkedinIn size={20} color="var(--orange)" />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}