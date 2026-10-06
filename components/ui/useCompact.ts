"use client";
import { useEffect, useState } from "react";

/** True on phone-width screens; drives simplified graph rendering. */
export function useCompact(query = "(max-width: 639px)") {
  const [c, setC] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setC(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return c;
}
