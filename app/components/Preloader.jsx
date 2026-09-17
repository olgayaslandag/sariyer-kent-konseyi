"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 400);
    };

    window.addEventListener("preloader-start", handleStart);
    window.addEventListener("preloader-complete", handleComplete);

    return () => {
      window.removeEventListener("preloader-start", handleStart);
      window.removeEventListener("preloader-complete", handleComplete);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

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

