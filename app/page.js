"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkAreas from "./components/WorkAreas";
import Councils from "./components/Councils";
import Process from "./components/Process";
import IdeaBanner from "./components/IdeaBanner";
import NewsEvents from "./components/NewsEvents";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".section-heading").forEach(el => observer.observe(el));

    const processItems = document.querySelectorAll(".process-item");
    processItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(el);
    });

    document.querySelectorAll(".content-panel").forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const eventRows = document.querySelectorAll(".event-row");
    eventRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const reportRows = document.querySelectorAll(".report-row");
    reportRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const newsRows = document.querySelectorAll(".news-row");
    newsRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const imageCards = document.querySelectorAll(".work-grid .image-card");
    imageCards.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const councilCards = document.querySelectorAll(".council-grid .council-card");
    councilCards.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    const ideaContent = document.querySelector(".idea-content");
    if (ideaContent) observer.observe(ideaContent);

    const galleryItems = document.querySelectorAll(".gallery-grid .gallery-item");
    galleryItems.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <main>
        <Hero />
        <WorkAreas />
        <Councils />
        <Process />
        <IdeaBanner />
        <NewsEvents />
        <Newsletter email={email} setEmail={setEmail} subscribed={subscribed} setSubscribed={setSubscribed} />
      </main>
      <Footer />
    </>
  );
}
