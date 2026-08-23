import { degrees, Footer, Header, jobs, ProjectCard, projects, ResumeCard, tech } from "./_components";

export default function Home() {
  return <><Header active="Home"/><main className="container">
    <section className="home-hero"><div className="avatar hero-avatar" aria-hidden="true">🧑🏿‍💻</div><div className="badges"><span>⌖ Germany</span><span><i/> Open to opportunities</span></div><h1>Hi, I am Treva Antony Ogwang</h1><p>A data and software professional building practical products with analytics, artificial intelligence, and modern web technology.</p><div className="hero-links"><a href="https://github.com/Begge10850" aria-label="GitHub">●</a><a href="#" aria-label="LinkedIn">in</a></div></section>

    <section className="home-section"><div className="section-title"><h2>My Tech Stack</h2><div className="filters"><button className="selected">All</button><button>Languages</button><button>Data</button><button>Frontend</button><button>Tools</button></div></div><div className="tech-grid">{tech.map((item, i) => <div className="tech-tile" key={item}><strong>{["Py","pd","SQL","BI","⚛","N","API","Git"][i]}</strong><span>{item}</span></div>)}</div></section>

    <section className="home-section"><div className="section-title"><h2>Education</h2><a className="view-button" href="/education">View All Qualifications ↗</a></div><ResumeCard item={degrees[0]}/></section>
    <section className="home-section"><div className="section-title"><h2>Most Recent Position</h2><a className="view-button" href="/experience">View All Experience ↗</a></div><ResumeCard item={jobs[0]}/></section>
    <section className="home-section"><div className="section-title"><h2>Recent Projects</h2><a className="view-button" href="/projects">View All Projects ↗</a></div><div className="project-grid home-projects">{projects.slice(0,2).map(item => <ProjectCard item={item} key={item.title}/>)}</div></section>
    <section className="home-section"><div className="section-title"><h2>Trainings & Certifications</h2><a className="view-button" href="/trainings">View All Trainings ↗</a></div><div className="stack"><ResumeCard item={{title:"Diploma in Business Information Technology",org:"Strathmore University",place:"Nairobi, Kenya",date:"Sep 2021",icon:"SU",copy:"A completed diploma in business information technology, awarded with a Pass.",tools:"Programming · Databases · Software Engineering · Networks"}}/></div></section>
  </main><Footer/></>;
}
