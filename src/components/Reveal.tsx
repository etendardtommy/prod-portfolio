import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right";
  delay?: number;
}

export default function Reveal({ children, className = "", from = "bottom", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => setTimeout(() => el.classList.add("revealed"), delay);

    // Si l'élément est déjà visible (ex: après navigation), on le révèle immédiatement
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal reveal--${from} ${className}`}>
      {children}
    </div>
  );
}
