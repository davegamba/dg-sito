"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a29b8c35bdfa41c2ccf5e65/1jqpfjeu6";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
