const skills = ["Python", "TypeScript", "React", "Next.js", "SQL", "FastAPI", "Docker", "Git"];

const projects = [
  { number: "01", title: "Intelligent Document Assistant", description: "A focused workspace that turns long documents into useful answers, summaries, and structured insights.", stack: ["Python", "RAG", "React"], accent: "violet" },
  { number: "02", title: "Incident Intelligence Platform", description: "A data-driven tool for tracking incidents, spotting patterns, and helping teams respond with confidence.", stack: ["Next.js", "Postgres", "APIs"], accent: "mint" },
  { number: "03", title: "Analytics Command Center", description: "A crisp operational dashboard that makes complex metrics easy to explore and act on.", stack: ["TypeScript", "SQL", "Charts"], accent: "peach" },
];

const experience = [
  { period: "2024 — PRESENT", role: "Data & AI Engineer", company: "Your current company", text: "Building dependable AI workflows, integrations, and data products that solve real operational problems." },
  { period: "2022 — 2024", role: "Software Engineer", company: "Previous company", text: "Designed and shipped modern web applications with an emphasis on thoughtful UX and maintainable systems." },
];

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Go to top">YN<span>.</span></a>
        <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a></nav>
        <a className="nav-cta" href="mailto:hello@example.com">Let&apos;s talk <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="status-dot" /> Available for interesting work</div>
        <h1>I build useful things<br />with <em>data</em> &amp; code.</h1>
        <p className="hero-copy">I&apos;m <strong>Your Name</strong>, a data and software engineer turning ambitious ideas into clear, dependable digital products.</p>
        <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span>↓</span></a><a className="button secondary" href="mailto:hello@example.com">Get in touch <span>↗</span></a></div>
        <div className="orbit" aria-hidden="true"><span>✦</span><i /><b>⌁</b></div>
      </section>

      <section className="section split" id="about">
        <div><p className="kicker">01 / ABOUT</p><h2>Curious by nature.<br /><span>Practical by design.</span></h2></div>
        <div className="about-copy"><p>I enjoy working where technology meets real human needs. My approach combines analytical thinking, careful engineering, and a strong sense of how a product should feel.</p><p>Whether I&apos;m shaping a data pipeline or polishing an interface, I care about clarity, reliability, and the small details that make work memorable.</p><div className="facts"><div><strong>4+</strong><span>Years building</span></div><div><strong>12</strong><span>Projects shipped</span></div><div><strong>3</strong><span>Countries worked in</span></div></div></div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading"><div><p className="kicker">02 / SELECTED WORK</p><h2>Projects with purpose.</h2></div><p>A few things I&apos;ve designed, built, and learned from.</p></div>
        <div className="project-grid">{projects.map((project) => <article className="project" key={project.title}><div className={`project-art ${project.accent}`}><span>{project.number}</span><div className="art-window"><i /><i /><i /><b>{project.title.split(" ")[0]}</b></div></div><div className="project-body"><p className="project-number">PROJECT {project.number}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
      </section>

      <section className="section experience" id="experience">
        <div><p className="kicker">03 / EXPERIENCE</p><h2>Where I&apos;ve made<br />an impact.</h2><a className="text-link" href="#">Download résumé ↗</a></div>
        <div className="timeline">{experience.map((item) => <article key={item.period}><p className="period">{item.period}</p><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p></article>)}</div>
      </section>

      <section className="section skills"><p className="kicker">04 / TOOLKIT</p><h2>Tools I reach for.</h2><div className="skill-list">{skills.map((skill, index) => <span key={skill}><b>{String(index + 1).padStart(2, "0")}</b>{skill}</span>)}</div></section>

      <section className="contact"><p className="kicker">HAVE A PROJECT IN MIND?</p><h2>Let&apos;s make something<br /><em>worth using.</em></h2><a href="mailto:hello@example.com">hello@example.com <span>↗</span></a></section>
      <footer><a className="brand" href="#top">YN<span>.</span></a><p>Designed with intention. Built with care.</p><div><a href="#">LinkedIn</a><a href="#">GitHub</a></div></footer>
    </main>
  );
}
