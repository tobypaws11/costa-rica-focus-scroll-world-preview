import { ArrowUpRight, SiteFooter, SiteHeader } from "./SiteChrome";
import { ResponsiveImage } from "./ResponsiveImage";
import { Link } from "./router";

const whatsapp = "https://wa.me/50683182105";

function PageHero({ title, intro, detail, image, alt, focal = "center" }) {
  return (
    <section className="content-hero">
      <ResponsiveImage
        src={image}
        alt={alt}
        sizes="100vw"
        style={{ objectPosition: focal }}
        loading="eager"
        fetchPriority="high"
        wide
      />
      <div className="content-hero-grade" />
      <div className="content-hero-copy">
        <h1>{title}</h1>
        <p>{intro}</p>
        {detail ? <span>{detail}</span> : null}
      </div>
    </section>
  );
}

function PageFrame({ pathname, children }) {
  return (
    <>
      <SiteHeader pathname={pathname} />
      <main className="content-page">{children}</main>
      <SiteFooter />
    </>
  );
}

function EditorialImage({ src, alt, focal = "center", caption }) {
  return (
    <figure className="editorial-image">
      <ResponsiveImage src={src} alt={alt} sizes="100vw" style={{ objectPosition: focal }} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function PhotoField({ eyebrow, title, intro, images, className = "" }) {
  return (
    <section className={`photo-field ${className}`.trim()}>
      <div className="photo-field-heading">
        <p>{eyebrow}</p>
        <div>
          <h2>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
      </div>
      <div className="photo-field-grid">
        {images.map((image, index) => (
          <figure className={[image.tall ? "is-tall" : "", image.wide ? "is-wide" : ""].filter(Boolean).join(" ")} key={image.src}>
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              sizes="(max-width: 860px) 100vw, 50vw"
              style={{ objectPosition: image.focal ?? "center" }}
            />
            {image.caption ? <figcaption>{String(index + 1).padStart(2, "0")} · {image.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

function ContactBand({ title = "Continue the conversation.", body }) {
  return (
    <section className="contact-band">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="contact-band-actions">
        <a className="action action-primary" href={whatsapp}>Message on WhatsApp <ArrowUpRight /></a>
        <a className="action action-secondary" href="mailto:coffee@montanoa.com">Send an email</a>
      </div>
    </section>
  );
}

function AboutPage({ pathname }) {
  const team = [
    {
      name: "William Leitón",
      role: "Main farm worker",
      image: "/assets/original/team-william.jpeg",
      alt: "William Leitón standing among the coffee plants at Montanoa",
      copy: "A lifelong farmer who created the coffee farm from a windswept cattle pasture. William has also worked as a forest ranger at the Monteverde Reserve, an ice-cream and cheese maker, and across maintenance, housekeeping and cooking roles in local hotels. To his family, he is the kindhearted center of Montanoa—and a great cook.",
    },
    {
      name: "Wilfredy Leitón",
      role: "CEO · Coffee educator",
      image: "/assets/original/team-wilfredy.jpeg",
      alt: "Wilfredy Leitón leading a coffee lesson at Montanoa Academy",
      copy: "Wilfredy returned to the farm to help his parents build a living from coffee. His work now connects farm production, barista craft, sensory education and Costa Rica’s professional coffee community.",
      credentials: [
        "Technical judge — Costa Rica Barista Championship, World Coffee Events (2023)",
        "Professional Barista Course — Academia Costarricense del Café (2021)",
        "Intermediate espresso — Vandola Academia de Barismo (2022)",
        "Intermediate brewing methods — Instituto del Café de Costa Rica (2022)",
        "SCA Introduction to Coffee and Brewing Foundation (2022)",
        "SCA Barista Skills Foundation and Brewing Intermediate (2023)",
        "SCA Barista Skills Intermediate (2023)",
        "SCA Introduction to Roasting (2024)",
        "Basic cupping with the SCA scoresheet — Esdras Vega, Q Grader (2019)",
        "Coach, national Vandola competition (2023)",
        "Coach, national Brewers competition (2024)",
        "Assistant coach, national Barista competition (2024)",
      ],
    },
    {
      name: "Kimberly Leitón",
      role: "Tour guide",
      image: "/assets/original/team-kimberly.jpg",
      alt: "Kimberly Leitón with her two children on the family farm",
      landscape: true,
      copy: "The family’s youngest sister, a mother of two, a barista and an ecological-tourism graduate. Kimberly brings the farm, its food and its ecology together for visitors—and is especially known in the family for her pastries.",
    },
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="A family story, grown against the wind."
        intro="Montanoa began with school books, hard work and the decision to return home with new knowledge."
        detail="San Luis · Monteverde · Family farm"
        image="/assets/original/about-0430.jpeg"
        alt="Espresso being prepared at Montanoa"
        focal="69% 54%"
      />
      <section className="story-grid">
        <h2>Dreams, coffee and nature meet here.</h2>
        <div className="reading-copy">
          <p>Montanoa is the dream of a child who once thought picking coffee was a punishment, but still did it because it was a way to buy new school books, become educated and work toward a promising future.</p>
          <p>After high school and studies in philosophy and management, Wilfredy chose to study what the family farm had: coffee. He returned to help his parents create a sustainable living from land they had already spent years transforming.</p>
          <p>Today Montanoa is a meeting point where coffee consumers, producers and everyone between them can interact, elevate their knowledge and grow together.</p>
        </div>
      </section>
      <EditorialImage
        src="/assets/original/about-0440.jpeg"
        alt="Three cups of espresso prepared at Montanoa"
        caption="A family story now shared through farm work, hospitality and coffee education."
        focal="50% 48%"
      />
      <section className="people-section">
        <div className="section-heading">
          <h2>Meet the family behind Montanoa.</h2>
          <p>The farm, Academy and visitor experience are different expressions of the same family work.</p>
        </div>
        <div className="people-list">
          {team.map((person) => (
            <article key={person.name}>
              <ResponsiveImage
                src={person.image}
                alt={person.alt}
                className={person.landscape ? "is-landscape" : ""}
                sizes="(max-width: 860px) 100vw, 30vw"
              />
              <div className="person-name">
                <h3>{person.name}</h3>
                <p className="row-meta">{person.role}</p>
              </div>
              <div className="person-story">
                <p>{person.copy}</p>
                {person.credentials ? (
                  <details>
                    <summary>Training and competition experience</summary>
                    <ul>{person.credentials.map((item) => <li key={item}>{item}</li>)}</ul>
                  </details>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactBand body="Ask the family about the farm, the Academy or staying on the property." />
    </PageFrame>
  );
}

function FarmPage({ pathname }) {
  const practices = [
    ["No herbicides", "Weeds are cut manually and become organic nutrients for the soil."],
    ["No pesticides", "Pests are managed with living organisms including trichoderma, Beauveria bassiana and metarhizium."],
    ["Pro-tree production", "Fruit and shade trees protect the coffee from wind and direct sun while fallen leaves feed the soil."],
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="A pasture became a sanctuary."
        intro="The Leitón family has spent decades transforming this land below the Monteverde Cloud Forest."
        detail="Working family farm · San Luis"
        image="/assets/original/farm-0112.jpeg"
        alt="The forested Montanoa coffee farm"
        focal="42% 48%"
      />
      <section className="story-grid">
        <h2>First came the land. Then came the trees.</h2>
        <div className="reading-copy">
          <p>San Luis was settled by several Costa Rican farming families between 1915 and 1920; local community history places its founding in 1918. Beginning in 1993, local San Luiseños, the Monteverde Quaker community and Quaker Earthcare Witness collaborated to establish Finca La Bella. The project provided 24 previously landless families with renewable leases to farm while conserving the forest. William and Damaris Leitón were among its parceleros, accepting the responsibility to keep the land as a home, conserve it and make a sustainable living from it.</p>
          <p>The property arrived as an old grass cattle field with almost no trees. William Leitón planted <em>Montanoa guatemalensis</em> around the boundaries and through the property to create wind-protected sections.</p>
          <p>For 15 years he watered those trees through dry seasons and cleared weeds through the rain. That shelter eventually made room for coffee, avocados, plantains, bananas, corn, oranges, limes and many smaller crops—as well as insects, birds and wildlife.</p>
        </div>
      </section>
      <EditorialImage
        src="/assets/original/farm-0075.jpg"
        alt="A view across the Montanoa farm in Monteverde"
        caption="A family home, working farm and habitat shaped together."
      />
      <section className="lined-section">
        <div className="section-heading">
          <h2>Sustainability is daily farm work.</h2>
          <p>The practices below are part of the family’s commitment to caring for the land that supports them.</p>
        </div>
        <div className="fact-rows">
          {practices.map(([title, copy]) => (
            <article key={title}><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>
      <PhotoField
        eyebrow="Field notes"
        title="A farm read through small details."
        intro="The original Montanoa archive returns here as a closer look at the plants, flowering cycles and hand-scale processing behind the larger landscape."
        images={[
          { src: "/assets/original/farm-0092.jpeg", alt: "Green coffee cherries ripening on a branch at Montanoa", caption: "Coffee fruit developing under the farm canopy" },
          { src: "/assets/original/farm-0029.jpeg", alt: "A red flower growing on the Montanoa farm", caption: "Biodiversity woven into the working farm", tall: true },
          { src: "/assets/original/farm-0005.jpeg", alt: "White coffee blossoms and green leaves at Montanoa", caption: "Coffee blossom before the fruit" },
          { src: "/assets/original/farm-0059.jpeg", alt: "Green coffee beans being examined during processing", caption: "Care and observation at every stage" },
        ]}
      />
      <section className="tour-section">
        <div>
          <h2>Tour the real seed-to-cup process.</h2>
          <p>Spend two hours inside the work of a specialty-coffee farm. The activity depends on the season and may include harvesting, drying or fertilizing. The experience ends with coffee tasting; a homemade, locally sourced family meal can be requested in advance.</p>
        </div>
        <div className="schedule">
          <h3>Advance reservation required</h3>
          <dl>
            <div><dt>Monday–Friday</dt><dd>10:00–12:00 or 14:30–16:30</dd></div>
            <div><dt>Saturday</dt><dd>10:00–12:00; afternoon by prior request</dd></div>
            <div><dt>Sunday</dt><dd>By prior request, when available</dd></div>
          </dl>
          <p>Farm-style lunch is available with advance notice.</p>
        </div>
      </section>
      <ContactBand title="Reserve a farm visit." body="Confirm your preferred day, time and whether you would like the family lunch." />
    </PageFrame>
  );
}

function CoffeePage({ pathname }) {
  const traceability = [
    ["Producer", "The farmer’s practices and care are present in the final cup."],
    ["Region", "Costa Rica’s eight coffee regions bring different soils, valleys and flavor profiles."],
    ["Micro-region", "Even opposite sides of a hill can produce distinct coffees; exact place matters."],
    ["Elevation", "Higher elevations tend toward greater intensity and complexity; lower coffees can be mild, balanced and aromatic."],
    ["Drying process", "Natural, honey and washed processing change sweetness, balance and clarity."],
    ["Tasting notes", "These describe naturally occurring flavors—not ingredients added to the coffee."],
  ];
  const coffees = [
    { name: "Montanoa", producer: "Leitón Family · William & Wilfredy", place: "San Luis, Monteverde · Guanacaste", variety: "Obata & CR95", process: "Natural", notes: "Plum, raisin, strawberry" },
    { name: "Don Alexis — Milenio", producer: "Don Alexis", place: "El Tablón · Los Santos", variety: "Milenio", process: "Honey", notes: "Lavender, caramel, hazelnut" },
    { name: "Milenio", producer: "Mario León", place: "Monteverde · Zona Norte", variety: "Milenio", process: "Natural", notes: "Plum, red apple, vanilla" },
    { name: "Pachamama Estate — SL28", producer: "Pachamama Estate", place: "San Cristóbal Sur · Los Santos", variety: "SL28", process: "Honey", notes: "Raspberry, grapefruit, orange" },
    { name: "Pachamama Estate — Etiope", producer: "Pachamama Estate", place: "San Cristóbal Sur · Los Santos", variety: "Etiope", process: "Honey anaerobic", notes: "Lime, jasmine, cacao" },
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="Coffee is Costa Rica’s golden bean."
        intro="Montanoa shares a small collection of traceable specialty coffees shaped by producer, place, variety and process."
        detail="Specialty coffee · Farm to cup"
        image="/assets/original/coffee-0222.jpeg"
        alt="Espresso flowing into a measuring cup at Montanoa"
        focal="55% 44%"
      />
      <section className="story-grid">
        <h2>Two centuries of knowledge in every lot.</h2>
        <div className="reading-copy">
          <p>Costa Rica exported its first bags of coffee in 1820, one year before independence. For the following century, coffee became the country’s “golden bean” and central economic crop.</p>
          <p>Today Costa Rican coffee represents only a small share of global production. Montanoa’s focus is not volume, but a few distinctive coffees whose origin and work can be understood.</p>
        </div>
      </section>
      <section className="lined-section traceability">
        <div className="section-heading">
          <h2>The guarantee is traceability.</h2>
          <p>A tasting note becomes more useful when you can follow the hands, landscape and processing decisions behind it.</p>
        </div>
        <div className="fact-rows">
          {traceability.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <EditorialImage
        src="/assets/original/farm-0059.jpeg"
        alt="Green coffee beans being evaluated during processing"
        caption="Traceability begins with the producer, the place and each decision made before roasting."
        focal="50% 52%"
      />
      <section className="coffee-section">
        <div className="section-heading">
          <h2>Coffees shared by Montanoa.</h2>
          <p>Availability changes with harvests. Contact Montanoa to ask which lots are currently available.</p>
        </div>
        <div className="coffee-lots">
          {coffees.map((coffee) => (
            <article key={coffee.name}>
              <h3>{coffee.name}</h3>
              <dl>
                <div><dt>Producer</dt><dd>{coffee.producer}</dd></div>
                <div><dt>Place</dt><dd>{coffee.place}</dd></div>
                <div><dt>Variety</dt><dd>{coffee.variety}</dd></div>
                <div><dt>Process</dt><dd>{coffee.process}</dd></div>
                <div><dt>Tasting notes</dt><dd>{coffee.notes}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section className="availability-band">
        <h2>Find the coffee.</h2>
        <ul>
          <li>Directly from the Montanoa farm</li>
          <li>At Kaffi, the family’s specialty shop in Monteverde</li>
          <li>Worldwide shipping through DHL</li>
        </ul>
        <a href={whatsapp}>Ask what is available <ArrowUpRight /></a>
      </section>
    </PageFrame>
  );
}

function AcademyPage({ pathname }) {
  const certifications = [
    "Barista introduction to coffee — 20 hours",
    "Intermediate espresso module — 20 hours",
    "Intermediate brewing methods module — 20 hours",
  ];
  const workshops = [
    {
      title: "Using the SCA cupping form",
      image: "/assets/original/academy-0387.jpeg",
      alt: "Roasted coffee samples and an SCA cupping form",
    },
    {
      title: "Tasting different drying processes and origins",
      image: "/assets/original/academy-0448.jpeg",
      alt: "Coffee professional tasting an espresso during a workshop",
    },
    {
      title: "Cold brewed coffee",
      image: "/assets/original/academy-cold-brew.jpeg",
      alt: "Cold-brew coffee being poured over ice",
    },
    {
      title: "How to pour over and its variables",
      image: "/assets/original/academy-0475.jpeg",
      alt: "Pour-over coffee preparation at Montanoa Academy",
    },
    {
      title: "Calibrating espresso",
      image: "/assets/original/academy-0706.jpeg",
      alt: "Espresso calibration at Montanoa Academy",
    },
    {
      title: "Milk foaming and latte art",
      image: "/assets/original/academy-0765.jpeg",
      alt: "Hands-on milk foaming and latte-art instruction",
    },
    {
      title: "Coffee roasting (Roast your own beans)",
      image: "/assets/original/academy-roasting.jpg",
      alt: "Fresh coffee beans cooling after roasting",
    },
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="Knowledge makes the cup complete."
        intro="Montanoa Academy connects specialty coffee to every hand that grows, sources, roasts, brews and values it."
        detail="In coffea veritas"
        image="/assets/original/academy-0337.jpeg"
        alt="Wilfredy Leitón teaching a coffee tasting session at Montanoa Academy"
        focal="50% 48%"
      />
      <section className="story-grid">
        <h2>Every answer should lead to a better question.</h2>
        <div className="reading-copy">
          <p>When learning something about coffee creates a new question, you are on the right path. If we meet, Montanoa’s goal is that you learn something from the family—and that they learn something from you.</p>
          <p>Understanding specialty coffee makes the value behind it visible. When a well-produced, responsibly sourced, carefully roasted and properly brewed coffee reaches someone who values it, the cup becomes a relationship between every hand in the chain.</p>
        </div>
      </section>
      <EditorialImage
        src="/assets/original/academy-0826.jpeg"
        alt="Wilfredy Leitón preparing coffee with a participant at Montanoa Academy"
        caption="Hands-on education for curious drinkers and working coffee professionals."
        focal="52% 48%"
      />
      <PhotoField
        eyebrow="Inside the Academy"
        title="Learning through tasting, place and practice."
        intro="These photographs document past Montanoa sessions. Current course and workshop dates are confirmed directly with the Academy."
        images={[
          { src: "/assets/original/academy-0573.jpeg", alt: "Wilfredy Leitón discussing a coffee sample with Academy participants", caption: "Guided sensory discussion" },
          { src: "/assets/original/academy-0245.jpeg", alt: "Roasted coffee beans being weighed for a tasting session", caption: "Measured preparation for repeatable tasting" },
          { src: "/assets/original/academy-0594.jpeg", alt: "Wilfredy Leitón explaining Costa Rica coffee regions on a map", caption: "Origin and regional context" },
          { src: "/assets/original/academy-0256.jpeg", alt: "A participant smelling roasted coffee during sensory analysis", caption: "Aroma and sensory analysis", tall: true },
        ]}
        className="academy-field"
      />
      <section className="offerings-section">
        <div className="section-heading">
          <h2>ICAFE-certified courses.</h2>
          <p>Programs certified by the Instituto del Café de Costa Rica.</p>
        </div>
        <div className="offering-rows">
          {certifications.map((course) => <article key={course}><h3>{course}</h3><a href={whatsapp}>Request dates <ArrowUpRight /></a></article>)}
        </div>
      </section>
      <section className="offerings-section workshops-section">
        <div className="section-heading">
          <h2>Two-hour workshops.</h2>
          <p>Focused sessions that turn one part of coffee craft into something you can understand and practice.</p>
        </div>
        <div className="workshop-rows">
          {workshops.map((workshop) => (
            <article className="workshop-row" key={workshop.title}>
              <ResponsiveImage
                src={workshop.image}
                alt={workshop.alt}
                sizes="(max-width: 860px) 100vw, 38vw"
              />
              <div className="workshop-copy">
                <h3>{workshop.title}</h3>
                <a href={whatsapp}>More information <ArrowUpRight /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="online-section">
        <div>
          <h2>Online, one-hour sessions.</h2>
          <p>Continue learning wherever you make coffee.</p>
        </div>
        <ul>
          <li>One-to-one home-brewing upgrade</li>
          <li>Work or family group coffee session</li>
        </ul>
      </section>
      <ContactBand title="Find the right Academy session." body="Ask for current dates, locations and course availability." />
    </PageFrame>
  );
}

function StayPage({ pathname }) {
  const amenities = [
    ["The view", "A wide front window opens toward sunsets, surrounding cloud-forest mountains and the distant Gulf of Nicoya."],
    ["The rest", "A comfortable mattress and a quiet hillside setting for a good night’s sleep."],
    ["The essentials", "A relaxing shower and a basic kitchenette for an independent stay."],
    ["The landscape", "Tropical birds, butterflies, leaf-cutter ants and the life of the farm begin just outside the door."],
  ];
  const gallery = [
    { src: "/assets/original/stay-0076.jpeg", alt: "A panoramic view from Montanoa toward the mountains and Gulf of Nicoya", caption: "The wide Pacific-facing outlook", wide: true },
    { src: "/assets/original/stay-0019.jpeg", alt: "The guest-house bedroom with its large window and balcony", caption: "Bedroom, view and balcony in one quiet space" },
    { src: "/assets/original/stay-0029.jpeg", alt: "The made bed inside the Montanoa guest house", caption: "A simple room designed for rest" },
    { src: "/assets/original/stay-0022.jpeg", alt: "Fresh towels arranged for guests", caption: "Fresh linens on arrival" },
    { src: "/assets/original/stay-0007.jpeg", alt: "The private bathroom and shower in the guest house", caption: "Private bathroom and shower" },
    { src: "/assets/original/stay-0028.jpeg", alt: "The bathroom basin and modern faucet", caption: "Bathroom details" },
    { src: "/assets/original/stay-0038.jpeg", alt: "The compact guest-house kitchenette", caption: "An independent kitchenette" },
    { src: "/assets/original/stay-0040.jpeg", alt: "The kitchenette with microwave, sink and dining essentials", caption: "Cooking and dining essentials" },
    { src: "/assets/original/stay-0053.jpeg", alt: "Coffee equipment provided inside the guest house", caption: "Coffee remains close at hand" },
    { src: "/assets/original/stay-0037.jpeg", alt: "The induction cooktop in the kitchenette", caption: "Compact induction cooking" },
    { src: "/assets/original/stay-0036.jpeg", alt: "Oil, salt and pepper supplied in the kitchenette", caption: "Small practical provisions" },
    { src: "/assets/original/stay-0035.jpeg", alt: "Kitchen towels and storage inside the guest house", caption: "Everyday kitchen details" },
    { src: "/assets/original/stay-0063.jpeg", alt: "The private balcony overlooking Monteverde at blue hour", caption: "A private balcony in the cloud-forest air" },
    { src: "/assets/original/stay-0064.jpeg", alt: "A second balcony view across the surrounding mountains", caption: "The hillside beyond the rail" },
    { src: "/assets/original/stay-0075.jpeg", alt: "Layered mountain ridges seen from Montanoa", caption: "Mountain layers toward the Pacific", tall: true },
    { src: "/assets/original/stay-0070.jpeg", alt: "Bright fungi growing on a tree beside the guest house", caption: "The living forest at the doorstep" },
    { src: "/assets/original/stay-0079.jpeg", alt: "A dramatic orange sunset seen from the Montanoa property", caption: "Sunset over the distant gulf", wide: true },
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="Your nature retreat begins at the farm."
        intro="A small, comfortable guest house tucked into a Monteverde hillside, surrounded by the biodiversity that makes this place extraordinary."
        detail="Vacation rental · San Luis"
        image="/assets/original/stay-0001.jpeg"
        alt="The Montanoa guest house in its green hillside setting"
        focal="48% 52%"
      />
      <section className="story-grid">
        <h2>Wake to the living sound of Monteverde.</h2>
        <div className="reading-copy">
          <p>Imagine waking to tropical birds, feeling a butterfly land on your arm and watching leaf-cutter ants march past the door. At Montanoa, those moments are part of an ordinary morning.</p>
          <p>The guest house sits on a hill with views across the surrounding cloud-forest mountains and toward the Gulf of Nicoya on Costa Rica’s Pacific coast.</p>
        </div>
      </section>
      <EditorialImage
        src="/assets/original/stay-0068.jpeg"
        alt="The view and interior atmosphere of the Montanoa guest house"
        caption="A simple stay inside the landscape where the coffee story begins."
        focal="58% 54%"
      />
      <section className="lined-section">
        <div className="section-heading"><h2>What the stay includes.</h2></div>
        <div className="fact-rows">
          {amenities.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <PhotoField
        eyebrow="The guest house"
        title="See the stay before you arrive."
        intro="The complete original lodging archive is now part of the page: room, bathroom, kitchenette, balcony and the landscape immediately outside."
        images={gallery}
        className="stay-gallery"
      />
      <section className="monteverde-section">
        <div>
          <h2>Monteverde is a unique destination.</h2>
          <p>The community has been internationally known for conservation since Quaker families settled in the area during the 1950s.</p>
        </div>
        <ul>
          <li><strong>2.5%</strong><span>of the world’s biodiversity is found in the Monteverde area.</span></li>
          <li><strong>10%</strong><span>of its flora is endemic and found nowhere else.</span></li>
          <li><strong>50%</strong><span>of Costa Rica’s flora and fauna can be found around Monteverde.</span></li>
        </ul>
      </section>
      <ContactBand title="Ask about staying at Montanoa." body="Contact the family directly for current availability, rates and arrival details." />
    </PageFrame>
  );
}

function VisitPage({ pathname }) {
  const routes = [
    { to: "/farm", title: "Tour the farm", copy: "Reserve a two-hour seed-to-cup visit and ask about the family lunch." },
    { to: "/academy", title: "Learn at the Academy", copy: "Choose a certification, focused workshop or online session." },
    { to: "/stay", title: "Stay on the hillside", copy: "Ask about current guest-house availability and arrival details." },
  ];

  return (
    <PageFrame pathname={pathname}>
      <PageHero
        title="Plan your way into Montanoa."
        intro="Come for the work, the knowledge or the quiet—and let one lead naturally into the next."
        detail="San Luis · Monteverde · Costa Rica"
        image="/assets/montanoa-farm-end.png"
        alt="The green landscape surrounding Montanoa in Monteverde"
        focal="50% 48%"
      />
      <section className="visit-options">
        <div className="section-heading">
          <h2>Choose what brings you here.</h2>
          <p>Each path now has its own complete page, with the information brought over from the original Montanoa site.</p>
        </div>
        <div className="visit-option-list">
          {routes.map((route) => (
            <Link key={route.to} to={route.to}>
              <div><h3>{route.title}</h3><p>{route.copy}</p></div><ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="location-section">
        <div>
          <h2>Located below the Monteverde Cloud Forest.</h2>
          <p>San Luis, Monteverde<br />Puntarenas, Costa Rica</p>
        </div>
        <div className="location-contact">
          <a href="tel:+50683182105">+506 8318 2105</a>
          <a href="mailto:coffee@montanoa.com">coffee@montanoa.com</a>
          <a href={whatsapp}>Open WhatsApp <ArrowUpRight /></a>
        </div>
      </section>
    </PageFrame>
  );
}

function NotFoundPage({ pathname }) {
  return (
    <PageFrame pathname={pathname}>
      <section className="not-found">
        <h1>This path has not been planted yet.</h1>
        <p>The page you requested does not exist. Return to the Montanoa story or plan a visit.</p>
        <div><Link className="action action-primary" to="/">Return home</Link><Link className="action action-secondary" to="/visit">Plan a visit</Link></div>
      </section>
    </PageFrame>
  );
}

export function ContentRouter({ pathname }) {
  if (pathname === "/about") return <AboutPage pathname={pathname} />;
  if (pathname === "/farm") return <FarmPage pathname={pathname} />;
  if (pathname === "/coffee") return <CoffeePage pathname={pathname} />;
  if (pathname === "/academy") return <AcademyPage pathname={pathname} />;
  if (pathname === "/stay") return <StayPage pathname={pathname} />;
  if (pathname === "/visit") return <VisitPage pathname={pathname} />;
  return <NotFoundPage pathname={pathname} />;
}
