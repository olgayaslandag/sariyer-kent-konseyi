"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname, mounted]);

  if (!mounted || !loading) return null;

  return (
    <div className="preloader open" aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-logo">
          <img src="/img/logo.svg" alt="Sarıyer Kent Konseyi" className="preloader-logo-img" />
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-inner" />
        </div>
      </div>
    </div>
  );
}

