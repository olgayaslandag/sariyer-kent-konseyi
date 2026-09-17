"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import WorkAreas from "./WorkAreas";
import Councils from "./Councils";
import Process from "./Process";
import IdeaBanner from "./IdeaBanner";
import NewsEvents from "./NewsEvents";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import ScrollReveal from "./ScrollReveal";

export default function HomeClient() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
    const eventRows = document.querySelectorAll(".event-rows .event-row");
    eventRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
    const reportRows = document.querySelectorAll(".report-row");
    reportRows.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
    const newsRows = document.querySelectorAll(".news-rows .news-row");
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
      <Navbar />
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
      <ScrollReveal />
    </>
  );
}
