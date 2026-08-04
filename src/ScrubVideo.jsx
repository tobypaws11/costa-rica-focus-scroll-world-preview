import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ScrubVideo({ src, mobileSrc, poster, progress, active, load, focal }) {
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const [requested, setRequested] = useState(load);
  const [ready, setReady] = useState(false);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (load) setRequested(true);
  }, [load]);

  useEffect(() => {
    if (!requested || !src) return undefined;

    const mobile = matchMedia("(max-width: 860px), (pointer: coarse)").matches;
    const selected = mobile && mobileSrc ? mobileSrc : src;
    const video = videoRef.current;
    if (!selected || !video) return undefined;

    setReady(false);
    setPainted(false);
    video.src = selected;
    video.load();

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [requested, src, mobileSrc]);

  useEffect(() => {
    targetRef.current = clamp(progress);
    const video = videoRef.current;
    if (!ready || !video || !Number.isFinite(video.duration) || video.seeking) return;
    const target = targetRef.current * Math.max(0, video.duration - 0.03);
    const threshold = matchMedia("(max-width: 860px)").matches ? 0.04 : 0.012;
    if (Math.abs(video.currentTime - target) > threshold) video.currentTime = target;
  }, [progress, ready]);

  useEffect(() => {
    const prime = () => {
      const video = videoRef.current;
      if (!video || !active) return;
      const promise = video.play();
      promise?.then(() => video.pause()).catch(() => {});
    };
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", prime);
  }, [active]);

  return (
    <>
      {requested ? (
        <img
          className="scene-media scene-poster"
          src={poster}
          alt=""
          style={{ objectPosition: focal }}
          decoding="async"
          fetchPriority={active ? "high" : "low"}
        />
      ) : null}
      {src ? (
        <video
          ref={videoRef}
          className={`scene-media scene-video ${painted ? "is-painted" : ""}`}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={() => setReady(true)}
          onLoadedData={() => {
            if (targetRef.current < 0.01) setPainted(true);
          }}
          onSeeked={() => setPainted(true)}
        />
      ) : null}
    </>
  );
}
