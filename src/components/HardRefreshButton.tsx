"use client";
import { FC } from "react";

const HardRefreshButton: FC<{ className?: string }> = ({ className }) => {
  const onClick = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("_v", String(Date.now()));
    window.location.replace(url.toString());
  };
  return (
    <button type="button" onClick={onClick} className={`btn btn-secondary ${className ?? ""}`}>
      새로고침
    </button>
  );
};

export default HardRefreshButton;


