"use client";

import { useEffect } from "react";

export default function SecurityShield() {
  useEffect(() => {
    // Sağ tık (Context Menu) Engelleme
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Geliştirici Araçları ve Kaynak Kodu Kısayollarını Engelleme
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl + Shift + I (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
      }
      // Ctrl + Shift + J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
      }
      // Ctrl + Shift + C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
      // Ctrl + U (View Source)
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
    };

    // Yalnızca production ortamında veya kullanıcı talebiyle aktif edilir
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
