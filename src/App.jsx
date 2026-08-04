/*
THESIS: Montanoa is entered, not introduced; this refuses the standard café-menu homepage.
OWN-WORLD: Volcanic black, cloud white, leaf green, cherry wine and golden-bean marks frame documentary photography.
STORY: Visitors move from origin to craft to a stay, then choose a farm tour, Academy course or lodging.
FIRST VIEWPORT: Full-bleed hands hold the right side; brand and one decisive line occupy the dark left field; route marks sit at the edge.
FORM: A continuous three-chapter forward camera journey adapted from Scroll World architecture A, with native scroll as its only clock.
*/
import { useEffect, useMemo } from "react";
import { ContentRouter } from "./ContentPages";
import ScrubVideo from "./ScrubVideo";
import { ArrowUpRight, SiteFooter, SiteHeader } from "./SiteChrome";
import { scenes } from "./media";
import { Link, usePathname } from "./router";
import { sceneOpacity, sceneProgress, useReducedMotion, useScrollSequence } from "./useScrollSequence";

const paths = {
  farm: "/farm",
  academy: "/academy",
  lodging: "/stay",
};

function ReducedStory() {
  return (
    <section className="reduced-story" aria-label="The Montanoa story">
      {scenes.map((scene, index) => (
        <article key={scene.id} id={scene.id} className="reduced-chapter">
          <img
            src={scene.still}
            alt=""
            style={{ objectPosition: scene.focal }}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <div>
            <h2>{scene.title}</h2>
            <p className="chapter-context">{scene.kicker}</p>
            <p>{scene.body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function CinematicStory({ pathname }) {
  const { rootRef, progress, active } = useScrollSequence(scenes.length);
  const chapterProgress = useMemo(
    () => scenes.map((_, index) => sceneProgress(progress, index, scenes.length)),
    [progress],
  );

  const jumpTo = (index) => {
    const root = rootRef.current;
    if (!root) return;
    const top = window.scrollY + root.getBoundingClientRect().top;
    const distance = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (index / (scenes.length - 1)) * distance, behavior: "smooth" });
  };

  return (
    <section ref={rootRef} className="cinematic" aria-label="Scroll through Montanoa" style={{ "--journey-progress": progress }}>
      <div className="stage">
        <div className="stage-progress" aria-hidden="true"><span /></div>
        <SiteHeader overlay pathname={pathname} />

        <div className="sight-line sight-line-left" aria-hidden="true" />
        <div className="sight-line sight-line-right" aria-hidden="true" />

        <div className="scene-stack" aria-hidden="true">
          {scenes.map((scene, index) => {
            const opacity = sceneOpacity(progress, index, scenes.length);
            const local = chapterProgress[index];
            const shouldLoad = index === active
              || (index === active + 1 && chapterProgress[active] >= 0.55);
            return (
              <div
                key={scene.id}
                className={`scene ${index === active ? "is-active" : ""}`}
                style={{ opacity, zIndex: index === active ? 10 : 5 }}
              >
                <ScrubVideo
                  src={scene.clip}
                  mobileSrc={scene.clipMobile}
                  poster={scene.poster ?? scene.still}
                  progress={local}
                  active={index === active}
                  load={shouldLoad}
                  focal={scene.focal}
                />
                <div className="scene-grade" />
              </div>
            );
          })}
        </div>

        <div className="copy-stack">
          {scenes.map((scene, index) => {
            return (
              <article
                className={`chapter-copy ${index === active ? "is-active" : ""}`}
                key={scene.id}
                aria-hidden={index !== active}
                style={{ opacity: index === active ? 1 : 0, "--chapter-accent": scene.accent }}
              >
                <p className="chapter-count">{String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</p>
                <h1>{scene.title}</h1>
                <p className="chapter-context">{scene.kicker}</p>
                <p className="chapter-body">{scene.body}</p>
                <ul className="chapter-tags" aria-label="Highlights">
                  {scene.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {index === scenes.length - 1 ? (
                  <div className="chapter-actions">
                    <Link className="action action-primary" to={paths.lodging}>Explore the stay</Link>
                    <Link className="action action-secondary" to={paths.farm}>Tour the farm</Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <nav className="chapter-route" aria-label="Story chapters">
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              className={index === active ? "is-active" : ""}
              onClick={() => jumpTo(index)}
              aria-label={`Go to ${scene.label}`}
              aria-current={index === active ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span><i />
            </button>
          ))}
        </nav>

        <div className="scroll-cue" aria-hidden="true">
          <span>{progress < 0.9 ? "Scroll to enter" : "Continue to visit"}</span>
          <i />
        </div>
      </div>
    </section>
  );
}

function Pathways() {
  const pathways = [
    { label: "Farm experience", title: "Walk the real seed-to-cup process.", href: paths.farm, image: "/assets/original/farm-0112.jpeg", focal: "42% 48%" },
    { label: "Academy", title: "Understand what makes coffee extraordinary.", href: paths.academy, image: "/assets/original/academy-0475.jpeg", focal: "42% 54%" },
    { label: "Lodging", title: "Stay in the landscape where it begins.", href: paths.lodging, image: "/assets/original/stay-0068.jpeg", focal: "58% 54%" },
  ];

  return (
    <section id="visit" className="pathways" aria-labelledby="visit-title">
      <div className="pathways-intro">
        <h2 id="visit-title">One farm.<br />Three ways to know it.</h2>
        <p>Come for the work, the knowledge, the quiet—or let one lead naturally into the next.</p>
      </div>
      <div className="pathway-list">
        {pathways.map((path, index) => (
          <Link className="pathway" to={path.href} key={path.label}>
            <img
              src={path.image}
              alt=""
              style={{ objectPosition: path.focal }}
              loading="lazy"
              decoding="async"
            />
            <span className="pathway-number">0{index + 1}</span>
            <span className="pathway-label">{path.label}</span>
            <strong>{path.title}</strong>
            <span className="pathway-arrow"><ArrowUpRight /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function App() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const names = {
      "/": "Montanoa — Coffee village in Monteverde",
      "/about": "Our story — Montanoa",
      "/farm": "The farm — Montanoa",
      "/coffee": "Specialty coffee — Montanoa",
      "/academy": "Academy — Montanoa",
      "/stay": "Stay at Montanoa",
      "/visit": "Plan your visit — Montanoa",
    };
    document.title = names[pathname] ?? "Montanoa — Monteverde, Costa Rica";
  }, [pathname]);

  if (pathname !== "/") return <ContentRouter pathname={pathname} />;

  return (
    <>
      <main id="top">
        {reduced ? <ReducedStory /> : <CinematicStory pathname={pathname} />}
        <section className="origin-statement" aria-labelledby="origin-title">
          <p>San Luis · Monteverde · Costa Rica</p>
          <h2 id="origin-title">A family farm grown from wind, patience and a promise to the land.</h2>
          <Link to="/about">Meet the family <ArrowUpRight /></Link>
        </section>
        <Pathways />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
