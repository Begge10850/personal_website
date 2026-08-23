import Link from "next/link";
import { degrees, Footer, Header, jobs, ProjectCard, projects, ResumeCard, tech } from "./_components";

export default function Home() {
  return <><Header active="Home"/><main className="container">
    <section className="home-hero"><div className="avatar hero-avatar" aria-hidden="true">🧑🏿‍💻</div><div className="badges"><span>⌖ Germany</span><span><i/> Open to opportunities</span></div><h1>Hi, I am Your Name</h1><p>A data and software professional building practical products with analytics, artificial intelligence, and modern web technology.</p><div className="hero-links"><a className="soft-button" href="#">▧ Download CV</a><a href="https://github.com/Begge10850" aria-label="GitHub">●</a><a href="#" aria-label="LinkedIn">in</a></div></section>

    <section className="home-section"><div className="section-title"><h2>My Tech Stack</h2><div className="filters"><button className="selected">All</button><button>Languages</button><button>Data</button><button>Frontend</button><button>Tools</button></div></div><div className="tech-grid">{tech.map((item, i) => <div className="tech-tile" key={item}><strong>{["Py","pd","SQL","BI","⚛","N","API","Git"][i]}</strong><span>{item}</span></div>)}</div></section>

    <section className="home-section"><div className="section-title"><h2>Education</h2><Link className="view-button" href="/education">View All Degrees ↗</Link></div><ResumeCard item={degrees[0]}/></section>
    <section className="home-section"><div className="section-title"><h2>Current Position</h2><Link className="view-button" href="/experience">View Past Experience ↗</Link></div><ResumeCard item={jobs[0]}/></section>
    <section className="home-section"><div className="section-title"><h2>Recent Projects</h2><Link className="view-button" href="/projects">View All Projects ↗</Link></div><div className="project-grid home-projects">{projects.slice(0,2).map(item => <ProjectCard item={item} key={item.title}/>)}</div></section>
    <section className="home-section"><div className="section-title"><h2>Trainings & Certifications</h2><Link className="view-button" href="/trainings">View All Trainings ↗</Link></div><div className="stack"><ResumeCard item={{title:"Modern Data & AI Development",org:"Online Academy",place:"Remote",date:"2025",icon:"📜",copy:"Add your latest professional course, certification, or intensive training here.",tools:"Python · React · AI"}}/><ResumeCard item={{title:"Professional Certification",org:"Certification Provider",place:"Remote",date:"2025",icon:"✓",copy:"Add the certification name, credential link, and skills covered here."}}/></div></section>
  </main><Footer/></>;
}
