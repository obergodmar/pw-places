"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { GamePanel } from "./game-panel";
import type { Place } from "../lib/catalogue";

interface Viewer {
  on(event: string, callback: () => void): Viewer;
  destroy(): void;
}
declare global {
  interface Window {
    pannellum?: { viewer(element: HTMLElement, config: Record<string, unknown>): Viewer };
  }
}

export function Panorama({ place }: { place: Place }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const panorama = place.images[0];

  useEffect(() => {
    if (!ready || !container.current || !window.pannellum) return;
    let viewer: Viewer | undefined;
    let active = true;
    const timer = window.setTimeout(() => {
      if (active) setStatus("error");
    }, 30000);
    try {
      viewer = window.pannellum.viewer(container.current, {
        type: "equirectangular",
        panorama,
        autoLoad: true,
        vaov: 90,
        hfov: 100,
        minHfov: 50,
        maxHfov: 150,
        minPitch: -45,
        maxPitch: 45,
        autoRotate: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : -3,
        showControls: false,
        showZoomCtrl: false,
        disableKeyboardCtrl: true,
        mouseZoom: true,
        escapeHTML: true,
        strings: {
          loadingLabel: "",
          bylineLabel: "",
          noPanoramaError: "Панорама недоступна.",
          genericWebGLError: "Не удалось запустить WebGL.",
        },
      });
      viewer.on("load", () => {
        if (active) {
          window.clearTimeout(timer);
          setStatus("loaded");
        }
      });
      viewer.on("error", () => {
        if (active) {
          window.clearTimeout(timer);
          setStatus("error");
        }
      });
    } catch {
      // Synchronize an imperative WebGL initialization failure with React's UI.
      // oxlint-disable-next-line react/set-state-in-effect
      setStatus("error");
    }
    return () => {
      active = false;
      window.clearTimeout(timer);
      viewer?.destroy();
    };
  }, [ready, panorama]);

  return (
    <>
      <Script
        src="/vendor/pannellum/pannellum.js"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setStatus("error")}
      />
      <div ref={container} className="panorama" aria-label={`Панорама: ${place.name}`} />
      {status === "loading" && (
        <output className="panorama-loading" aria-label="Загрузка панорамы" />
      )}
      {status === "error" && (
        <div className="panorama-status" role="alert">
          <p>Не удалось загрузить панораму. Проверьте подключение и поддержку WebGL.</p>
          <a href={panorama}>Открыть изображение</a>
        </div>
      )}
      {status !== "loading" && <GamePanel />}
    </>
  );
}
