"use client";
import { useSearchParams } from "next/navigation";
import { SkillGraph } from "./SkillGraph";

/** Reads ?focus=<node> (set by the hero graph and home-page chips) on the static page. */
export function GraphFromQuery() {
  const focus = useSearchParams().get("focus") ?? "me";
  return <SkillGraph key={focus} initial={focus} />;
}
