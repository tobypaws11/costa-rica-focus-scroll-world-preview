import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const seekThreshold = () => (matchMedia("(max-width: 860px)").matches ? 0.04 : 0.012);

const syncToTarget = (video, progress) => {
  if (!video || !Number.isFinite(video.duration) || video.seeking) return false;

  const target = clamp(progress) * Math.max(0, video.duration - 0.03);
  if (Math.abs(video.currentTime - target) <= seekThreshold()) return true;

  video.currentTime = target;
  return false;
};

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
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
    const constrained = connection?.saveData
      || ["slow-2g", "2g"].includes(connection?.effectiveType);
    const selected = mobile && mobileSrc && constrained ? mobileSrc : src;
    const video = videoRef.current;
    if (!selected || !video) return undefined;

    setReady(false);
    setPainted(false);
    video.preload = active ? "auto" : "metadata";
    video.src = selected;
    video.load();

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [requested, src, mobileSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!requested || !active || !video?.currentSrc) return;

    video.preload = "auto";
    if (video.readyState < 2 && video.networkState === 1) {
      setReady(false);
      video.load();
    }
  }, [active, requested]);

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
          style={{ objectPosition: focal }}
          muted
          playsInline
          preload={active ? "auto" : requested ? "metadata" : "none"}
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
