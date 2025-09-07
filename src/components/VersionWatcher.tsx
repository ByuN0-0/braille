"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VersionWatcher({ version }: { version: string }) {
  const router = useRouter();
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const key = "app_version";
    const prev = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (prev && prev !== version) setStale(true);
    if (typeof window !== "undefined") localStorage.setItem(key, version);
  }, [version]);

  if (!stale) return null;
  const hardReload = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("_v", version);
    window.location.replace(url.toString());
  };

  return (
    <button
      onClick={hardReload}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 btn btn-primary z-[9999]"
    >
      새 버전이 있습니다. 새로고침
    </button>
  );
}


