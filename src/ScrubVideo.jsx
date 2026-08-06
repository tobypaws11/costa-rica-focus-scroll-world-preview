import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const focalBlendDistance = 0.12;

const parseFocal = (value) => {
  const match = typeof value === "string" && value.trim().match(/^(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%$/);
  return match ? [Number(match[1]), Number(match[2])] : null;
};

const blendFocal = (entry, settled, progress) => {
  if (!entry || entry === settled) return settled;

  const from = parseFocal(entry);
  const to = parseFocal(settled);
  if (!from || !to) return settled;

  const position = clamp(progress / focalBlendDistance);
  const smooth = position * position * (3 - 2 * position);
  const x = from[0] + (to[0] - from[0]) * smooth;
  const y = from[1] + (to[1] - from[1]) * smooth;
  return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
};

const seekThreshold = () => (matchMedia("(max-width: 860px)").matches ? 0.04 : 0.012);

const syncToTarget = (video, progress) => {
  if (!video || !Number.isFinite(video.duration) || video.seeking) return false;

  const target = clamp(progress) * Math.max(0, video.duration - 0.03);
  if (Math.abs(video.currentTime - target) <= seekThreshold()) return true;

  video.currentTime = target;
  return false;
};

export default function ScrubVideo({
  src,
  mobileSrc,
  poster,
  progress,
  active,
  load,
  focal,
  mobileFocal,
  entryFocal,
  entryMobileFocal,
}) {
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const [requested, setRequested] = useState(load);
  const [ready, setReady] = useState(false);
  const [painted, setPainted] = useState(false);
  const displayedFocal = blendFocal(entryFocal ?? focal, focal, progress);
  const displayedMobileFocal = blendFocal(
    entryMobileFocal ?? entryFocal ?? mobileFocal ?? focal,
    mobileFocal ?? focal,
    progress,
  );
  const mediaStyle = {
    "--scene-focal": displayedFocal,
    "--scene-focal-mobile": displayedMobileFocal,
  };

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
    video.preload = "auto";
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
    if (targetRef.current <= 0.004) setPainted(false);
    if (!ready || !video) return;
    syncToTarget(video, targetRef.current);
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
      {active || requested ? (
        <img
          className="scene-media scene-poster"
          src={poster}
          alt=""
          style={mediaStyle}
          loading={active ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={active ? "high" : undefined}
        />
      ) : null}
      {src ? (
        <video
          ref={videoRef}
          className={`scene-media scene-video ${painted ? "is-painted" : ""}`}
          style={mediaStyle}
          muted
          playsInline
          preload={requested ? "auto" : "none"}
          aria-hidden="true"
          onLoadedMetadata={() => setReady(true)}
          onLoadedData={() => {
            const video = videoRef.current;
            if (targetRef.current > 0.004 && syncToTarget(video, targetRef.current)) {
              setPainted(true);
            }
          }}
          onSeeked={() => {
            const video = videoRef.current;
            if (targetRef.current > 0.004 && syncToTarget(video, targetRef.current)) {
              setPainted(true);
            }
          }}
        />
      ) : null}
    </>
  );
}
