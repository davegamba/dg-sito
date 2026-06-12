"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    let mounted = true;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);

      // Context GSAP — permette cleanup completo al unmount
      ctx = gsap.context(() => {

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

        // ── STAGGER sulle card — solo opacity, no y per evitare conflitto con Framer Motion ──
        gsap.utils.toArray<HTMLElement>(".gsap-stagger").forEach((container) => {
          const cards = container.querySelectorAll<HTMLElement>(".gsap-card");
          if (!cards.length) return;
          // Anima solo le prime 4 card visibili per evitare problemi con scroll orizzontale
          const visibleCards = Array.from(cards).slice(0, 4);
          gsap.fromTo(
            visibleCards,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
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
              el.textContent = Math.round(obj.val).toLocaleString("it-IT") + suffix;
            },
          });
        });

      });
    };

    init();

    // Cleanup — distrugge tutte le istanze GSAP al unmount
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return null;
}
