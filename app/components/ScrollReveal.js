"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const observeWithInstantCheck = (selector, delayFactor = 0.1) => {
      const items = document.querySelectorAll(selector);
      items.forEach((el, index) => {
        el.style.transitionDelay = `${index * delayFactor}s`;
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    };

    observeWithInstantCheck(".section-heading");
    observeWithInstantCheck(".process-item", 0.15);
    observeWithInstantCheck(".content-panel", 0.1);
    observeWithInstantCheck(".event-row", 0.1);
    observeWithInstantCheck(".report-row", 0.1);
    observeWithInstantCheck(".news-row", 0.1);
    observeWithInstantCheck(".work-grid .image-card", 0.1);
    observeWithInstantCheck(".council-grid .council-card", 0.1);
    observeWithInstantCheck(".board-grid .board-card", 0.1);
    observeWithInstantCheck(".gallery-grid .gallery-item", 0.1);

    const ideaContent = document.querySelector(".idea-content");
    if (ideaContent) {
      observer.observe(ideaContent);
      const rect = ideaContent.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        ideaContent.classList.add("visible");
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
