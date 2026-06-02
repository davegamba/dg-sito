"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // Importazione dinamica per evitare SSR issues
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // ── FADE-IN DAL BASSO su tutte le sezioni ──
      gsap.utils.toArray<HTMLElement>(".gsap-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── STAGGER sulle card ──
      gsap.utils.toArray<HTMLElement>(".gsap-stagger").forEach((container) => {
        const cards = container.querySelectorAll<HTMLElement>(".gsap-card");
        if (!cards.length) return;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── COUNTER ANIMATO per i numeri Stats ──
      gsap.utils.toArray<HTMLElement>(".gsap-counter").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const isDecimal = !Number.isInteger(target);
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const formatted = isDecimal
              ? obj.val.toFixed(0)
              : Math.round(obj.val).toLocaleString("it-IT");
            el.textContent = formatted + suffix;
          },
        });
      });
    };

    init();
  }, []);

  return null;
}
