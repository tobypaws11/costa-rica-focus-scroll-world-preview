import { useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useScrollSequence(count) {
  const rootRef = useRef(null);
  const [state, setState] = useState({ progress: 0, active: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    let lastWidth = window.innerWidth;

    const measure = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const distance = Math.max(1, root.offsetHeight - window.innerHeight);
      const progress = clamp((window.scrollY - start) / distance);
      setState({
        progress,
        active: Math.min(count - 1, Math.floor(progress * count)),
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const resize = () => {
      if (window.innerWidth === lastWidth && matchMedia("(pointer: coarse)").matches) return;
      lastWidth = window.innerWidth;
      schedule();
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [count]);

  return { rootRef, ...state };
}

export function sceneOpacity(progress, index, count) {
  const active = Math.min(count - 1, Math.floor(clamp(progress) * count));
  return active === index ? 1 : 0;
}

export function sceneProgress(progress, index, count) {
  if (count <= 1) return clamp(progress);

  // Each clip owns one exact third of the journey. The visible layer switches
  // only when the outgoing clip reaches its final frame and the incoming clip
  // is on its matching first frame, avoiding a soft double-exposure seam.
  return clamp(progress * count - index);
}
