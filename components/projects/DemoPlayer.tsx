"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** Animated GIF preview that swaps to the full walkthrough video on click, so the MP4 only loads when asked for. */
export function DemoPlayer({ gif, video, title }: { gif: string; video: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src={video}
        controls
        autoPlay
        playsInline
        poster={gif}
        className="aspect-video h-auto w-full bg-bg-2 object-contain"
        aria-label={`${title}: walkthrough video`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full cursor-pointer bg-bg-2"
      aria-label={`Play the ${title} walkthrough video`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, GIF must stay animated */}
      <img src={gif} alt={`${title} walkthrough preview`} width={800} height={450} loading="lazy" decoding="async" className="aspect-video h-auto w-full object-cover" />
      <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/10">
        <span className="flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-bg shadow-lg">
          <Play className="h-4 w-4 fill-current" aria-hidden />
          Watch video
        </span>
      </span>
    </button>
  );
}
