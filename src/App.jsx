import { useState, useEffect, useRef } from "react";

// In App.jsx, change:
import BlogsPage from "./pages/BlogsPage";   // adjust path as needed

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected via <style> tag
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue: #0057FF;
      --blue-dark: #003FCC;
      --blue-light: #4D8FFF;
      --orange: #FF6B1A;
      --orange-light: #FF8C4D;
      --white: #FFFFFF;
      --off-white: #F5F7FF;
      --grey: #8892A4;
      --dark: #050E1F;
      --dark-2: #0A1830;
      --font-display: 'Montserrat', sans-serif;
      --font-body: 'Montserrat', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--white);
      color: var(--dark);
      overflow-x: hidden;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-18px); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2);   opacity: 0; }
    }
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes gradient-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes counter {
      from { opacity: 0; transform: scale(0.5); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes float-indicator {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(6px); }
    }

    .animate-fade-up   { animation: fadeUp 0.7s ease forwards; }
    .animate-fade-in   { animation: fadeIn 0.7s ease forwards; }
    .animate-slide-r   { animation: slideRight 0.7s ease forwards; }
    .animate-float     { animation: float 4s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.35s; }
    .delay-4 { animation-delay: 0.5s; }
    .delay-5 { animation-delay: 0.65s; }

    /* Nav */
    .nav-link {
      font-family: var(--font-display);
      font-weight: 600;
      font-size: 0.82rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--dark);
      text-decoration: none;
      padding: 0.35rem 0;
      position: relative;
      cursor: pointer;
      transition: color 0.25s;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 2px;
      background: var(--orange);
      transition: width 0.3s ease;
    }
    .nav-link:hover, .nav-link.active { color: var(--blue); }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .nav-link-white { color: var(--white); }
    .nav-link-white:hover { color: var(--orange-light); }

    /* Buttons */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--blue);
      color: #fff;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.82rem;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 0.85rem 2rem;
      border: none; border-radius: 4px;
      cursor: pointer;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
      text-decoration: none;
    }
    .btn-primary:hover {
      background: var(--blue-dark);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(0,87,255,0.35);
    }
    .btn-orange {
      background: var(--orange);
    }
    .btn-orange:hover {
      background: #e05500;
      box-shadow: 0 12px 32px rgba(255,107,26,0.35);
    }
    .btn-outline {
      background: transparent;
      border: 2px solid var(--blue);
      color: var(--blue);
    }
    .btn-outline:hover {
      background: var(--blue);
      color: #fff;
    }

    /* Cards */
    .card {
      background: var(--white);
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.07);
      transition: transform 0.3s, box-shadow 0.3s;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 48px rgba(0,87,255,0.12);
    }

    /* Section labels */
    .eyebrow {
      font-family: var(--font-display);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--orange);
      display: flex; align-items: center; gap: 8px;
    }
    .eyebrow::before {
      content: '';
      display: block;
      width: 28px; height: 2px;
      background: var(--orange);
    }

    .section-title {
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 3.2rem);
      font-weight: 800;
      line-height: 1.1;
      color: var(--dark);
    }
    .section-title span { color: var(--blue); }

    /* FAQ accordion */
    .faq-item {
      border-bottom: 1px solid #e8edf5;
      overflow: hidden;
    }
    .faq-question {
      width: 100%;
      background: none;
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 0;
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--dark);
      cursor: pointer;
      text-align: left;
      gap: 16px;
    }
    .faq-question:hover { color: var(--blue); }
    .faq-chevron {
      flex-shrink: 0;
      width: 28px; height: 28px;
      border-radius: 50%;
      background: var(--off-white);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.3s;
    }
    .faq-chevron.open {
      background: var(--blue);
      transform: rotate(180deg);
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.3s;
      font-size: 0.9rem;
      color: var(--grey);
      line-height: 1.7;
      font-weight: 400;
    }
    .faq-answer.open {
      max-height: 300px;
      padding-bottom: 1.2rem;
    }

    /* Input styles */
    .form-input {
      width: 100%;
      padding: 0.85rem 1.1rem;
      border: 1.5px solid #dde3f0;
      border-radius: 8px;
      font-family: var(--font-body);
      font-size: 0.9rem;
      background: #fff;
      color: var(--dark);
      transition: border 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .form-input:focus {
      border-color: var(--blue);
      box-shadow: 0 0 0 3px rgba(0,87,255,0.1);
    }
    .form-label {
      font-family: var(--font-display);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--dark);
      margin-bottom: 0.4rem;
      display: block;
    }

    /* Marquee */
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 22s linear infinite;
    }
    .marquee-track:hover { animation-play-state: paused; }

    /* Stats counter */
    .stat-number {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 900;
      color: var(--blue);
      line-height: 1;
    }

    /* Floating orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(70px);
      pointer-events: none;
    }

    /* Page transitions */
    .page-enter {
      animation: fadeUp 0.5s ease forwards;
    }

    /* ── RESPONSIVE ── */

    /* Desktop nav / Mobile menu */
    .desktop-nav { display: flex; }
    .mobile-menu-btn { display: none; }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-menu-btn { display: flex !important; }
    }

    /* Two-column grids → single column on mobile */
    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    @media (max-width: 768px) {
      .two-col-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        direction: ltr !important;
      }
    }

    /* Hero grid */
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .hero-visual { display: none; }
    }

    /* Service panel */
    .service-panel-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    @media (max-width: 768px) {
      .service-panel-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        direction: ltr !important;
      }
      .service-img-col { order: -1 !important; }
    }

    /* Footer grid */
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.2fr;
      gap: 3rem;
    }
    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }
    @media (max-width: 480px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    /* Contact grid */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 4rem;
      align-items: flex-start;
    }
    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    /* FAQ grid */
    .faq-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: flex-start;
    }
    @media (max-width: 900px) {
      .faq-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .faq-sticky { position: static !important; }
    }

    /* Responsive padding */
    .section-pad {
      padding: 6rem 2rem;
    }
    @media (max-width: 768px) {
      .section-pad { padding: 4rem 1.2rem; }
    }

    .hero-pad {
      padding: 4rem 2rem;
    }
    @media (max-width: 768px) {
      .hero-pad { padding: 2.5rem 1.2rem; }
    }

    .page-header-pad {
      padding: 10rem 2rem 5rem;
    }
    @media (max-width: 768px) {
      .page-header-pad { padding: 7rem 1.2rem 3rem; }
    }

    /* Hero heading responsive */
    .hero-heading {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2rem, 6vw, 4rem);
      line-height: 1.05;
      color: #fff;
      margin-bottom: 1.5rem;
    }

    /* Button responsive */
    @media (max-width: 480px) {
      .btn-primary {
        padding: 0.75rem 1.4rem;
        font-size: 0.75rem;
      }
      .hero-cta-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    /* Cards auto-fit */
    .service-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 480px) {
      .service-cards-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
      text-align: center;
    }
    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 480px) {
      .testimonials-grid { grid-template-columns: 1fr; }
    }

    .why-us-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 480px) {
      .why-us-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    @media (max-width: 480px) {
      .blog-grid { grid-template-columns: 1fr; }
    }

    /* Image responsive */
    .placeholder-img {
      width: 100%;
      border-radius: 16px;
      object-fit: cover;
      display: block;
    }

    /* Form grid */
    .form-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 480px) {
      .form-two-col { grid-template-columns: 1fr; }
    }

    /* Hero floating tags */
    .hero-tags {
      display: flex;
      gap: 8px;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    /* Metric cards hide overflow on small screens */
    @media (max-width: 480px) {
      .hero-metric-1 { top: -10px !important; left: -10px !important; }
      .hero-metric-2 { bottom: 10px !important; right: -10px !important; }
    }

    /* Scroll indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    @media (max-width: 480px) {
      .scroll-indicator { display: none; }
    }

    /* Section title responsive */
    @media (max-width: 768px) {
      .section-title { font-size: clamp(1.5rem, 5vw, 2.2rem); }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   PLACEHOLDER IMAGES (Unsplash)
───────────────────────────────────────────── */
const IMAGES = {
  heroDashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  aboutStory: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  seoDashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  performanceDashboard: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
  creators: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?w=800&q=80",
  socialMedia: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
  mapOffice: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=800&q=80",
  blog1: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
  blog2: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&q=80",
  blog3: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  blog4: "https://images.unsplash.com/photo-1553484771-047a44eee27a?w=600&q=80",
  blog5: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
  blog6: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
};

/* ─────────────────────────────────────────────
   ICONS (inline SVG)
───────────────────────────────────────────── */
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    seo: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>,
    performance: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
    creators: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    social: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.68a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.7 16z" /></svg>,
    location: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  };
  return icons[name] || null;
};

/* ─────────────────────────────────────────────
   WHATSAPP WIDGET
───────────────────────────────────────────── */
const WhatsAppWidget = () => {
  // Enter the American Hairline WhatsApp number here. 
  // IMPORTANT: Only include the country code and the number. Do not use '+', '-', '(', ')', or spaces.
  // Example for India: "919876543210"
  const whatsappNumber = "";
  const message = "Hi, I'd like to know more about your services.";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
        zIndex: 9999, // Ensures it sits above everything, including navbars
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.15)";
      }}
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_LINKS = ["Home", "Services", "Blogs", "FAQs", "Contact"];

const Navbar = ({ activePage, setPage, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
      transition: "all 0.35s ease",
      padding: "0 1.5rem",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <div onClick={() => { setPage("Home"); setMobileOpen(false); }}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #0057FF, #4D8FFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "#fff", fontSize: "1.1rem" }}>Y</span>
          </div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.15rem",
            color: scrolled ? "var(--dark)" : "#fff",
            transition: "color 0.35s",
          }}>
            digital
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <span
              key={link}
              className={`nav-link ${activePage === link ? "active" : ""}`}
              onClick={() => setPage(link)}
              style={{ color: !scrolled ? "#fff" : activePage === link ? "var(--blue)" : "var(--dark)" }}
            >
              {link}
            </span>
          ))}
          <button
            className="btn-primary btn-orange"
            onClick={() => setPage("Contact")}
            style={{ padding: "0.55rem 1.3rem", fontSize: "0.72rem" }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", alignItems: "center" }}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={24} color={scrolled ? "var(--dark)" : "#fff"} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "#fff", padding: "0.8rem 1.5rem 1.5rem",
          borderTop: "1px solid #eee",
          display: "flex", flexDirection: "column", gap: "0.2rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}>
          {NAV_LINKS.map(link => (
            <span
              key={link}
              className="nav-link"
              style={{
                padding: "0.7rem 0",
                borderBottom: "1px solid #f0f0f0",
                color: activePage === link ? "var(--blue)" : "var(--dark)",
              }}
              onClick={() => { setPage(link); setMobileOpen(false); }}
            >
              {link}
            </span>
          ))}
          <button
            className="btn-primary btn-orange"
            onClick={() => { setPage("Contact"); setMobileOpen(false); }}
            style={{ marginTop: "0.8rem", justifyContent: "center" }}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

/* ─────────────────────────────────────────────
   USE INTERSECTION OBSERVER
───────────────────────────────────────────── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
};

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const HomePage = ({ setPage }) => {
  const [heroRef, heroVisible] = useReveal(0.05);
  const [statsRef] = useReveal(0.2);
  const [aboutRef, aboutVisible] = useReveal(0.2);

  const services = [
    { icon: "seo", label: "SEO", color: "#0057FF" },
    { icon: "performance", label: "Performance", color: "#FF6B1A" },
    { icon: "creators", label: "Creators", color: "#7C3AED" },
    { icon: "social", label: "Social Media", color: "#DB2777" },
  ];

  const clients = ["TechCorp", "BrandLab", "StartupX", "GrowthCo", "MediaHub", "DigitalPro", "BrandWave", "NovaTech"];

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050E1F 0%, #0A1830 50%, #0D1F45 100%)",
        position: "relative",
        display: "flex", alignItems: "center",
        overflow: "hidden",
        paddingTop: 68,
      }}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(0,87,255,0.15)", top: -100, right: -100 }} />
        <div className="orb" style={{ width: 350, height: 350, background: "rgba(255,107,26,0.1)", bottom: -100, left: -50 }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div ref={heroRef} style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}
          className="hero-pad">
          <div className="hero-grid">
            <div>
              <div className={`eyebrow ${heroVisible ? "animate-fade-up" : ""}`}
                style={{ color: "#FF8C4D", marginBottom: "1.2rem", opacity: heroVisible ? 1 : 0 }}>
                <span>Mumbai's #1 Digital Marketing Agency</span>
              </div>

              <h1 className={`hero-heading ${heroVisible ? "animate-fade-up delay-1" : ""}`}
                style={{ opacity: heroVisible ? undefined : 0 }}>
                We Don't Just
                <br />
                <span style={{
                  background: "linear-gradient(90deg, #4D8FFF, #FF8C4D)",
                  backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Market. We Grow.
                </span>
              </h1>

              <p className={heroVisible ? "animate-fade-up delay-2" : ""}
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.75,
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "2.2rem", maxWidth: 480, fontWeight: 400,
                  opacity: heroVisible ? undefined : 0,
                }}>
                Ydigital is a full-service digital marketing firm that turns clicks into customers. From SEO to Content Creation campaigns — we engineer growth that compounds.
              </p>

              <div className={`hero-cta-row ${heroVisible ? "animate-fade-up delay-3" : ""}`}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: heroVisible ? undefined : 0 }}>
                <button className="btn-primary btn-orange" onClick={() => setPage("Services")}>
                  Explore Services <Icon name="arrow" size={16} />
                </button>
                <button className="btn-primary btn-outline"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
                  onClick={() => setPage("Contact")}>
                  Talk to Us
                </button>
              </div>

              <div className="hero-tags">
                {services.map(s => (
                  <div key={s.label} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.07)", borderRadius: 30,
                    padding: "0.4rem 0.85rem", border: "1px solid rgba(255,255,255,0.12)",
                  }}>
                    <Icon name={s.icon} size={13} color={s.color} />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — hidden on mobile via CSS */}
            <div className={`hero-visual animate-float ${heroVisible ? "animate-fade-in" : ""}`}
              style={{ opacity: heroVisible ? undefined : 0 }}>
              <div style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)",
                padding: "1.5rem", position: "relative",
              }}>
                <img
                  src={IMAGES.heroDashboard}
                  alt="Campaign Dashboard"
                  className="placeholder-img"
                  style={{ height: 340, objectFit: "cover" }}
                />

                {/* Metric card 1 */}
                <div className="hero-metric-1" style={{
                  position: "absolute", top: -20, left: -20,
                  background: "#fff", borderRadius: 12, padding: "0.75rem 1.1rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#e8f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="performance" size={16} color="var(--blue)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.05rem", color: "var(--blue)" }}>+247%</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--grey)", fontWeight: 500 }}>ROI Increase</div>
                  </div>
                </div>

                {/* Metric card 2 */}
                <div className="hero-metric-2" style={{
                  position: "absolute", bottom: 10, right: -20,
                  background: "#fff", borderRadius: 12, padding: "0.75rem 1.1rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#fff3ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="creators" size={16} color="var(--orange)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.05rem", color: "var(--orange)" }}>5M+</div>
                    <div style={{ fontSize: "0.65rem", color: "var(--grey)", fontWeight: 500 }}>Reach Generated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: 24, height: 40, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 12,
            display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "6px 0",
          }}>
            <div style={{ width: 4, height: 8, background: "rgba(255,255,255,0.5)", borderRadius: 2, animation: "float-indicator 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "var(--orange)", padding: "0.85rem 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#fff", padding: "0 2.5rem",
            }}>
              {c} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ background: "var(--off-white)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="stats-grid">
            {[
              { target: 150, suffix: "+", label: "Campaigns Launched" },
              { target: 98, suffix: "%", label: "Client Retention" },
              { target: 5, suffix: "M+", label: "Reach Generated" },
              { target: 7, suffix: "+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "1.8rem 1rem" }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.8rem", color: "var(--grey)", marginTop: "0.5rem", letterSpacing: "0.04em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div ref={aboutRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col-grid">
            <div>
              <img
                src={IMAGES.aboutStory}
                alt="About Ydigital team"
                className="placeholder-img"
                style={{ height: 420, objectFit: "cover", aspectRatio: "4/5" }}
              />
            </div>
            <div>
              <div className={`eyebrow ${aboutVisible ? "animate-fade-up" : ""}`}
                style={{ marginBottom: "1rem", opacity: aboutVisible ? 1 : 0 }}>
                About Ydigital
              </div>
              <h2 className={`section-title ${aboutVisible ? "animate-fade-up delay-1" : ""}`}
                style={{ marginBottom: "1.5rem", opacity: aboutVisible ? 1 : 0 }}>
                Built to Push Brands to the <span>Next Level</span>
              </h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.85, marginBottom: "1.4rem", fontSize: "0.95rem", fontWeight: 400 }}>
                Founded in Mumbai, Ydigital was born from a simple belief — great marketing should be both measurable and memorable. We don't do cookie-cutter campaigns. We build strategies that are as unique as your brand.
              </p>
              <p style={{ color: "var(--grey)", lineHeight: 1.85, marginBottom: "2rem", fontSize: "0.95rem", fontWeight: 400 }}>
                Our team of strategists, creatives, and data nerds work in sync to ensure every rupee you invest returns multiplied. From startups to Fortune 500s, we've driven growth across industries.
              </p>
              {[
                "Data-first strategy, creativity-second execution",
                "Full-funnel approach: awareness to conversion",
                "Transparent reporting & dedicated account managers",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: "0.8rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#e8f0ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Icon name="check" size={12} color="var(--blue)" />
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.88rem", color: "var(--dark)" }}>{item}</span>
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: "2rem" }} onClick={() => setPage("Contact")}>
                Work With Us <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE PREVIEW ── */}
      <section className="section-pad" style={{ background: "var(--dark)", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(0,87,255,0.12)", top: -100, right: -50 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="eyebrow" style={{ justifyContent: "center", color: "var(--orange-light)", marginBottom: "1rem" }}>What We Do</div>
            <h2 className="section-title" style={{ color: "#fff" }}>Services Built for <span>Measurable Impact</span></h2>
          </div>
          <div className="service-cards-grid">
            {[
              { icon: "seo", title: "SEO", desc: "Rank higher, get found faster.", color: "#4D8FFF" },
              { icon: "performance", title: "Performance Marketing", desc: "Every click, maximised.", color: "#FF8C4D" },
              { icon: "creators", title: "Content Creation for Creators Mktg", desc: "Scale reach authentically.", color: "#A78BFA" },
              { icon: "social", title: "Social Media", desc: "Build loyal communities.", color: "#F472B6" },
            ].map((s, i) => (
              <div key={i} className="card" onClick={() => setPage("Services")} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                padding: "1.6rem", cursor: "pointer",
              }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <Icon name={s.icon} size={20} color={s.color} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: "0.4rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, fontWeight: 400 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button className="btn-primary btn-orange" onClick={() => setPage("Services")}>
              View All Services <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: "var(--off-white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "0.8rem" }}>Testimonials</div>
            <h2 className="section-title">Our Clients Love <span>What We Do</span></h2>
          </div>
          <div className="testimonials-grid">
            {[
              { text: "Ydigital transformed our online presence. Our organic traffic is up 300% in just 6 months.", name: "Vatsal Shah", role: "CEO, TechStartup", rating: 5 },
              { text: "The Performance Marketing campaigns they ran had the best ROI we've ever seen. Truly data-driven experts.", name: "Priya Mehta", role: "Marketing Director", rating: 5 },
              { text: "Young, dynamic, and incredibly competent. They feel like an extension of our own team.", name: "Amit Joshi", role: "Founder, BrandLab", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="card" style={{ padding: "1.8rem" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: "1rem" }}>
                  {Array(t.rating).fill(0).map((_, j) => <Icon key={j} name="star" size={13} color="var(--orange)" />)}
                </div>
                <p style={{ color: "var(--grey)", lineHeight: 1.75, marginBottom: "1.4rem", fontStyle: "italic", fontSize: "0.92rem", fontWeight: 400 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #0057FF, #FF6B1A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: "0.85rem" }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.88rem", color: "var(--dark)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--grey)", fontWeight: 400 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        padding: "5rem 1.5rem",
        background: "linear-gradient(135deg, #0057FF, #003FCC)",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(255,255,255,0.08)", top: -80, left: "20%" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "#fff", marginBottom: "1rem" }}>
            Ready to Grow Your Brand?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", marginBottom: "2rem", maxWidth: 460, margin: "0 auto 2rem", fontWeight: 400 }}>
            Let's build a strategy that turns your digital presence into your biggest asset.
          </p>
          <button className="btn-primary btn-orange" onClick={() => setPage("Contact")}>
            Start Today <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SERVICES PAGE
───────────────────────────────────────────── */
const services = [
  {
    id: "seo", icon: "seo", title: "Search Engine Optimisation",
    color: "#0057FF", bg: "linear-gradient(135deg, #e8f0ff, #f0f5ff)",
    tagline: "Own Page One. Drive Compounding Growth.",
    desc: "We conduct deep technical audits, craft content strategies, and build authoritative link profiles that move the needle — permanently. Our SEO isn't about quick hacks; it's about building digital equity that keeps paying dividends.",
    bullets: ["Technical SEO audits & site health", "Keyword strategy & content planning", "High-authority link building", "Local SEO & Google Business Profile", "Monthly performance dashboards"],
    metric: "+300%", metricLabel: "Average organic traffic lift",
    img: IMAGES.seoDashboard, imgAlt: "SEO Analytics Dashboard",
  },
  {
    id: "performance", icon: "performance", title: "Performance Marketing",
    color: "#FF6B1A", bg: "linear-gradient(135deg, #fff3ee, #fff8f5)",
    tagline: "Every Rupee Spent, Purposefully.",
    desc: "We manage Google Ads, Meta Ads, and LinkedIn campaigns with laser precision. From audience segmentation to A/B testing ad creatives — we squeeze maximum ROI from every campaign rupee.",
    bullets: ["Google Ads & Meta Ads management", "Landing page conversion optimisation", "A/B testing & ad creative strategy", "Real-time bid management", "Detailed ROAS reporting"],
    metric: "4.8x", metricLabel: "Average return on ad spend",
    img: IMAGES.performanceDashboard, imgAlt: "Performance Marketing Analytics",
  },
  {
    id: "creators", icon: "creators", title: "Content Creation for Creators Marketing",
    color: "#7C3AED", bg: "linear-gradient(135deg, #f3eeff, #f9f5ff)",
    tagline: "Authentic Voices, Massive Reach.",
    desc: "We connect brands with the right creators — from mega creators to micro-niche communities. Our campaigns are built on genuine alignment between brand values and creator audiences, driving real engagement not just impressions.",
    bullets: ["Creators discovery & vetting", "Campaign strategy & briefing", "Content review & brand alignment", "Performance tracking & reporting", "Long-term creator relationships"],
    metric: "5M+", metricLabel: "Combined reach across campaigns",
    img: IMAGES.creators, imgAlt: "Content Creation for Creators Campaign",
  },
  {
    id: "social", icon: "social", title: "Social Media Marketing",
    color: "#DB2777", bg: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
    tagline: "Build Communities. Not Just Followers.",
    desc: "We craft scroll-stopping content, manage communities, and run social campaigns that build genuine brand love. Instagram, LinkedIn, X, YouTube — we show up where your audience is and make them care.",
    bullets: ["Content calendar & creation", "Community management & engagement", "Instagram & LinkedIn growth", "Social analytics & reporting", "Paid social campaigns"],
    metric: "12x", metricLabel: "Average engagement rate increase",
    img: IMAGES.socialMedia, imgAlt: "Social Media Marketing",
  },
];

const ServiceCard = ({ service, index }) => {
  const [ref, visible] = useReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} style={{
      padding: "5rem 1.5rem",
      background: index % 2 === 0 ? "#fff" : "var(--off-white)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: service.color, opacity: 0.3,
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="service-panel-grid" style={{ direction: isEven ? "ltr" : "rtl" }}>
          {/* Image */}
          <div className="service-img-col" style={{
            direction: "ltr",
            transform: visible ? "translateY(0)" : "translateY(40px)",
            opacity: visible ? 1 : 0,
            transition: "all 0.8s ease",
          }}>
            <img
              src={service.img}
              alt={service.imgAlt}
              className="placeholder-img"
              style={{ height: 380, objectFit: "cover", aspectRatio: "4/3" }}
            />
          </div>

          {/* Content */}
          <div style={{
            direction: "ltr",
            transform: visible ? "translateX(0)" : `translateX(${isEven ? "-40px" : "40px"})`,
            opacity: visible ? 1 : 0,
            transition: "all 0.8s ease 0.15s",
          }}>
            <div className="eyebrow" style={{ color: service.color, marginBottom: "0.8rem" }}>
              <Icon name={service.icon} size={12} color={service.color} />
              {service.title}
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)", lineHeight: 1.15,
              color: "var(--dark)", marginBottom: "0.8rem",
            }}>
              {service.tagline}
            </h2>
            <p style={{ color: "var(--grey)", lineHeight: 1.85, marginBottom: "1.8rem", fontSize: "0.92rem", fontWeight: 400 }}>
              {service.desc}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
              {service.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${service.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="check" size={11} color={service.color} />
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "var(--dark)", fontWeight: 500 }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              background: `${service.color}10`, border: `1px solid ${service.color}25`,
              borderRadius: 12, padding: "1rem 1.5rem",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.9rem", color: service.color }}>
                {service.metric}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--grey)", maxWidth: 110, lineHeight: 1.3, fontWeight: 500 }}>
                {service.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesPage = ({ setPage }) => (
  <div className="page-enter">
    <section style={{
      background: "var(--dark)", position: "relative", overflow: "hidden", textAlign: "center",
    }} className="page-header-pad">
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(0,87,255,0.15)", top: -100, right: 0 }} />
      <div className="orb" style={{ width: 300, height: 300, background: "rgba(255,107,26,0.1)", bottom: -80, left: 0 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow animate-fade-up" style={{ justifyContent: "center", color: "var(--orange-light)", marginBottom: "1rem" }}>What We Offer</div>
        <h1 className="section-title animate-fade-up delay-1" style={{ color: "#fff", marginBottom: "1rem" }}>
          Services That <span>Deliver Results</span>
        </h1>
        <p className="animate-fade-up delay-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.9rem,2vw,1.05rem)", maxWidth: 520, margin: "0 auto 2rem", fontWeight: 400 }}>
          Four specialised disciplines, one unified goal: accelerating your brand's growth in the digital world.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {services.map(s => (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.07)", borderRadius: 30,
              padding: "0.4rem 0.9rem", border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <Icon name={s.icon} size={12} color={s.color} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.title.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}

    <section className="section-pad" style={{ background: "var(--blue)", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 350, height: 350, background: "rgba(255,255,255,0.1)", top: -80, right: -60 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", color: "#fff", marginBottom: "0.8rem" }}>
            Why Ydigital?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 460, margin: "0 auto", fontWeight: 400 }}>
            We're not just a vendor — we're your growth partner.
          </p>
        </div>
        <div className="why-us-grid">
          {[
            { icon: "star", title: "Award-winning Team", desc: "Recognised by Economic Times and Gulf News for excellence." },
            { icon: "performance", title: "Data-Driven Decisions", desc: "Every strategy is backed by real data, not gut feels." },
            { icon: "check", title: "Transparent Reporting", desc: "You see everything. Real-time dashboards, no hidden metrics." },
            { icon: "clock", title: "Agile Execution", desc: "We move fast and adapt faster to market changes." },
          ].map((w, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.1)", borderRadius: 16,
              padding: "1.8rem", border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Icon name={w.icon} size={20} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "0.95rem", marginBottom: "0.5rem" }}>{w.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.65, fontWeight: 400 }}>{w.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="btn-primary btn-orange" onClick={() => setPage("Contact")}>
            Let's Work Together <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>
  </div>
);

/* ─────────────────────────────────────────────
   FAQ PAGE
───────────────────────────────────────────── */
const faqs = [
  { q: "What digital marketing services does Ydigital offer?", a: "We offer a suite of services including SEO, Performance Marketing, Creators Marketing, and Social Media Marketing. Each service is tailored to your brand's unique goals and audience." },
  { q: "How long before I see results from SEO?", a: "SEO is a long-term investment. Most clients start seeing meaningful improvements in 3–6 months, with significant gains at the 6–12 month mark. We focus on sustainable, compounding growth rather than risky shortcuts." },
  { q: "Do you work with small businesses or only enterprises?", a: "We work with businesses of all sizes — from early-stage startups to Fortune 500 companies. Our strategies are always scaled to your budget and growth stage." },
  { q: "How do you measure the success of campaigns?", a: "We track KPIs specific to each service: organic traffic and keyword rankings for SEO, ROAS and CTR for Performance Marketing, engagement rates for social media, and reach/EMV for creators campaigns. You get full visibility via monthly reports." },
  { q: "Can I choose just one service, or do I need a full package?", a: "You can absolutely start with a single service. Many clients begin with SEO or Performance Marketing and expand into other services as they see results. We'll recommend what makes most sense for your goals." },
  { q: "What makes Ydigital different from other digital agencies?", a: "We combine deep data analytics with genuine creative strategy. We don't use cookie-cutter playbooks — every campaign is built from scratch for your brand. Plus, you always have a dedicated account manager who knows your business." },
  { q: "How do you select creators for campaigns?", a: "We vet creators across three dimensions: audience authenticity (real followers, not bots), niche relevance (their audience matches yours), and past performance (engagement rate and conversion history)." },
  { q: "What is your minimum contract length?", a: "We offer month-to-month contracts for most services, though we recommend a minimum 3-month engagement for SEO to see meaningful results. We believe in earning your business every month, not locking you in." },
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{faq.q}</span>
        <div className={`faq-chevron ${open ? "open" : ""}`}>
          <Icon name="chevronDown" size={14} color={open ? "#fff" : "var(--grey)"} />
        </div>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>{faq.a}</div>
    </div>
  );
};

const FAQsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="page-enter">
      <section style={{ background: "var(--dark)", position: "relative", overflow: "hidden", textAlign: "center" }}
        className="page-header-pad">
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(255,107,26,0.12)", top: -100, left: "30%" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow animate-fade-up" style={{ justifyContent: "center", color: "var(--orange-light)", marginBottom: "1rem" }}>Help Centre</div>
          <h1 className="section-title animate-fade-up delay-1" style={{ color: "#fff", marginBottom: "1rem" }}>
            Got <span>Questions?</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto", fontWeight: 400 }}>
            Find answers to our most commonly asked questions below, or send us your own — we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="faq-grid">
            {/* FAQ list */}
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Common Questions</div>
              <h2 className="section-title" style={{ marginBottom: "2.5rem", fontSize: "clamp(1.5rem,3vw,2rem)" }}>
                Frequently Asked <span>Questions</span>
              </h2>
              <div style={{ border: "1px solid #e8edf5", borderRadius: 16, overflow: "hidden", padding: "0 1.5rem" }}>
                {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
              </div>
            </div>

            {/* Query form */}
            <div className="faq-sticky" style={{ position: "sticky", top: 90 }}>
              <div style={{ background: "var(--off-white)", borderRadius: 20, padding: "2.2rem", border: "1px solid #e8edf5" }}>
                <div className="eyebrow" style={{ marginBottom: "0.8rem" }}>Ask Us Anything</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", color: "var(--dark)", marginBottom: "0.5rem" }}>
                  Send Your Query
                </h3>
                <p style={{ color: "var(--grey)", fontSize: "0.88rem", marginBottom: "1.8rem", lineHeight: 1.65, fontWeight: 400 }}>
                  Don't see your question in the FAQ? Send it over and our team will respond within 24 hours.
                </p>

                {submitted ? (
                  <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#059669" }}>Query Submitted!</div>
                    <p style={{ color: "var(--grey)", fontSize: "0.82rem", marginTop: "0.3rem" }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    <div>
                      <label className="form-label">Your Name</label>
                      <input className="form-input" type="text" placeholder="e.g. Priya Mehta"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input className="form-input" type="email" placeholder="priya@company.com"
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Subject</label>
                      <input className="form-input" type="text" placeholder="e.g. About creators pricing"
                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Your Question</label>
                      <textarea className="form-input" rows={4} placeholder="Type your question here..."
                        value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                        style={{ resize: "vertical" }} />
                    </div>
                    <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>
                      Submit Query <Icon name="arrow" size={16} />
                    </button>
                  </div>
                )}

                <div style={{ marginTop: "1.8rem", paddingTop: "1.4rem", borderTop: "1px solid #e8edf5" }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--grey)", marginBottom: "0.7rem", fontWeight: 600 }}>Prefer to talk directly?</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <a href="tel:+918591261258" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--blue)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
                      <Icon name="phone" size={14} color="var(--blue)" /> +91 85912 61258
                    </a>
                    <a href="mailto:ydigital@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--blue)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
                      <Icon name="mail" size={14} color="var(--blue)" /> ydigital@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    }
  };

  const services_list = ["SEO", "Performance Marketing", "Content Creation for Creators Marketing", "Social Media", "Full Package"];
  const budgets = ["< ₹50K/mo", "₹50K–2L/mo", "₹2L–5L/mo", "₹5L+/mo"];

  return (
    <div className="page-enter">
      <section style={{ background: "var(--dark)", position: "relative", overflow: "hidden", textAlign: "center" }}
        className="page-header-pad">
        <div className="orb" style={{ width: 450, height: 450, background: "rgba(0,87,255,0.15)", top: -150, right: -100 }} />
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(255,107,26,0.1)", bottom: -80, left: -60 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow animate-fade-up" style={{ justifyContent: "center", color: "var(--orange-light)", marginBottom: "1rem" }}>Get In Touch</div>
          <h1 className="section-title animate-fade-up delay-1" style={{ color: "#fff", marginBottom: "1rem" }}>
            Let's Build Something <span>Great Together</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto", fontWeight: 400 }}>
            Whether you're a startup ready to launch or an established brand looking to grow, we're here to help you win online.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="contact-grid">
            {/* Info */}
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Contact Info</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.4rem,3vw,1.9rem)", color: "var(--dark)", marginBottom: "0.5rem" }}>
                We're Ready When You Are
              </h2>
              <p style={{ color: "var(--grey)", lineHeight: 1.75, marginBottom: "2.5rem", fontWeight: 400, fontSize: "0.92rem" }}>
                Reach out through any channel below or fill in the form — our team responds within 24 hours on business days.
              </p>

              {[
                { icon: "location", label: "Address", value: "4Aesthetique Solutions, Satguru Shopping Centre, Khar, Mumbai" },
                { icon: "mail", label: "Email", value: "ydigital@gmail.com", href: "mailto:ydigital@gmail.com" },
                { icon: "phone", label: "Phone", value: "+91 85912 61258", href: "tel:+918591261258" },
                { icon: "clock", label: "Hours", value: "Mon–Sat, 9:00 AM – 6:00 PM" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: "1.4rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                    background: i % 2 === 0 ? "#e8f0ff" : "#fff3ee",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name={item.icon} size={20} color={i % 2 === 0 ? "var(--blue)" : "var(--orange)"} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.7rem", color: "var(--grey)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: "var(--dark)", fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>{item.value}</a>
                    ) : (
                      <span style={{ color: "var(--dark)", fontWeight: 500, fontSize: "0.9rem" }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              <img src={IMAGES.mapOffice} alt="Khar Mumbai Office"
                className="placeholder-img" style={{ height: 200, objectFit: "cover", marginTop: "0.5rem" }} />
            </div>

            {/* Form */}
            <div style={{ background: "var(--off-white)", borderRadius: 20, padding: "2.2rem", border: "1px solid #e8edf5" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", color: "var(--dark)", marginBottom: "0.4rem" }}>
                Start a Conversation
              </h3>
              <p style={{ color: "var(--grey)", fontSize: "0.88rem", marginBottom: "1.8rem", fontWeight: 400 }}>
                Tell us about your brand and goals — we'll put together a strategy tailored to you.
              </p>

              {submitted ? (
                <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#059669", fontSize: "1.05rem" }}>Message Sent!</div>
                  <p style={{ color: "var(--grey)", fontSize: "0.85rem", marginTop: "0.4rem" }}>Our team will reach out within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div className="form-two-col">
                    <div>
                      <label className="form-label">Name *</label>
                      <input className="form-input" type="text" placeholder="Your full name"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="you@company.com"
                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Company</label>
                    <input className="form-input" type="text" placeholder="Your company name"
                      value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Service Interested In</label>
                    <select className="form-input"
                      value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      {services_list.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Monthly Budget</label>
                    <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                      {budgets.map(b => (
                        <button key={b} onClick={() => setFormData({ ...formData, budget: b })}
                          style={{
                            padding: "0.42rem 0.85rem", borderRadius: 30,
                            border: `1.5px solid ${formData.budget === b ? "var(--blue)" : "#dde3f0"}`,
                            background: formData.budget === b ? "var(--blue)" : "#fff",
                            color: formData.budget === b ? "#fff" : "var(--grey)",
                            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.72rem",
                            cursor: "pointer", transition: "all 0.2s",
                          }}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Tell Us About Your Goals</label>
                    <textarea className="form-input" rows={4}
                      placeholder="What are you trying to achieve? What's your timeline?"
                      value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ resize: "vertical" }} />
                  </div>
                  <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                    Send Message <Icon name="arrow" size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter setPage={() => { }} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SHARED FOOTER
───────────────────────────────────────────── */
const SharedFooter = ({ setPage }) => (
  <footer style={{ background: "var(--dark-2)", padding: "4rem 1.5rem 2rem", color: "rgba(255,255,255,0.6)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="footer-grid" style={{ marginBottom: "2.5rem" }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #0057FF, #4D8FFF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "#fff", fontSize: "1rem" }}>Y</span>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "#fff", fontSize: "1.1rem" }}>digital</span>
          </div>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.7, maxWidth: 260, fontWeight: 400 }}>
            Mumbai's top-rated digital marketing agency engineering growth that compounds.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: "1.5rem", flexWrap: "wrap" }}>
            {["T", "Li", "Ig", "Fb"].map((s, i) => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-display)", fontWeight: 800,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.background = "rgba(0,87,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "transparent"; }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {[
          { title: "Services", links: ["SEO", "Performance Marketing", "Creators Mktg", "Social Media"] },
          { title: "Company", links: ["Home", "Services", "Blogs", "FAQs", "Contact"] },
          { title: "Contact", links: ["ydigital@gmail.com", "+91 85912 61258", "Khar, Mumbai"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: "0.78rem", marginBottom: "1.1rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>{col.title}</h4>
            {col.links.map(l => (
              <div key={l}
                onClick={() => col.title === "Company" && setPage && setPage(l.replace(" Us", ""))}
                style={{ marginBottom: "0.55rem", fontSize: "0.83rem", cursor: col.title === "Company" ? "pointer" : "default", transition: "color 0.2s", fontWeight: 400 }}
                onMouseEnter={e => { if (col.title === "Company") e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { if (col.title === "Company") e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.78rem" }}>© 2025 Ydigital by <strong style={{ color: "var(--blue-light)" }}>4Aesthetique Solutions</strong>. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "Home": return <HomePage setPage={setPage} />;
      case "Services": return <ServicesPage setPage={setPage} />;
      case "Blogs": return <BlogsPage />;
      case "FAQs": return <FAQsPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh" }}>
        <Navbar activePage={activePage} setPage={setPage} scrolled={scrolled} />
        <main key={activePage}>
          {renderPage()}
        </main>
        {activePage !== "Contact" && <SharedFooter setPage={setPage} />}
      </div>

      {/* Our newly added WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  );
}