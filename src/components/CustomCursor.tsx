import { useEffect, useState } from "react";

const hasMouse = window.matchMedia("(pointer: fine)").matches;

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!hasMouse) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a, button, .home-card, .project-card, .article-card"));
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  if (!hasMouse) return null;

  return (
    <div
      className={`custom-cursor ${hovered ? "hovered" : ""} ${clicked ? "clicked" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
