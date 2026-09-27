"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { places } from "../lib/catalogue";
import markers from "../data/map-markers.json";

let hasEntered = false;

export function WorldMap() {
  const [entering, setEntering] = useState(() => !hasEntered);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const boot = setTimeout(() => {
      hasEntered = true;
      setEntering(false);
    }, 1000);
    return () => {
      clearTimeout(boot);
      clearTimeout(timer.current);
    };
  }, []);
  function hide() {
    clearTimeout(timer.current);
    setTooltip(null);
  }
  return (
    <main className="world" aria-label="Карта Идеального мира">
      {entering ? (
        <div className="boot">
          <div className="game-dialog">Входим в игру... Подождите, пожалуйста.</div>
        </div>
      ) : (
        <svg className="map" viewBox="0 0 1440 1080" fill="none" aria-label="Карта мира">
          <image href="/assets/map.png" width="1440" height="1080" />
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              prefetch={false}
              aria-label={place.name}
              onPointerEnter={(e) => {
                if (e.pointerType === "touch") return;
                clearTimeout(timer.current);
                const { clientX: x, clientY: y } = e;
                timer.current = setTimeout(
                  () => setTooltip({ name: place.name, x, y: y + 30 }),
                  200,
                );
              }}
              onPointerLeave={hide}
              onFocus={(e) => {
                const b = e.currentTarget.getBoundingClientRect();
                setTooltip({ name: place.name, x: b.x, y: b.bottom + 10 });
              }}
              onBlur={hide}
              onClick={hide}
            >
              <g className="map-point">
                {markers[place.id as keyof typeof markers].map((path, i) => (
                  <path key={i} {...path} />
                ))}
              </g>
            </Link>
          ))}
        </svg>
      )}
      {tooltip && (
        <div
          className="game-tooltip"
          style={{
            left: Math.min(tooltip.x, window.innerWidth - 180),
            top: Math.min(tooltip.y, window.innerHeight - 40),
          }}
        >
          {tooltip.name}
        </div>
      )}
    </main>
  );
}
