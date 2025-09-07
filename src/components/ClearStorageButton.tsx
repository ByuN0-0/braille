"use client";
import { FC, useState } from "react";

const ClearStorageButton: FC<{ className?: string }> = ({ className }) => {
  const [working, setWorking] = useState(false);

  const clearAll = async () => {
    if (working) return;
    setWorking(true);
    try {
      // Local/session storage
      try { localStorage.clear(); } catch {}
      try { sessionStorage.clear(); } catch {}

      // Cache Storage
      try {
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch {}

      // Service Workers
      try {
        if (navigator.serviceWorker?.getRegistrations) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }
      } catch {}

      // IndexedDB (best-effort)
      try {
        const anyWin = window as unknown as { indexedDB?: IDBFactory & { databases?: () => Promise<Array<{ name?: string }>> } };
        const dbs = await anyWin.indexedDB?.databases?.();
        if (dbs && anyWin.indexedDB) {
          await Promise.all(
            dbs.map((d) => (d.name ? new Promise<void>((res) => { anyWin.indexedDB!.deleteDatabase(d.name!); res(); }) : Promise.resolve()))
          );
        }
      } catch {}

      // Hard reload with cache-busting
      const url = new URL(window.location.href);
      url.searchParams.set("_clr", String(Date.now()));
      window.location.replace(url.toString());
    } finally {
      setWorking(false);
    }
  };

  return (
    <button type="button" onClick={clearAll} disabled={working} className={`btn btn-secondary ${className ?? ""}`}>
      {working ? "정리 중..." : "저장소 비우기"}
    </button>
  );
};

export default ClearStorageButton;


