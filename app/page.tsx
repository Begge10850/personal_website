import { degrees, Footer, Header, jobs, ProjectCard, projects, ResumeCard } from "./_components";
import { TechStack } from "./_tech-stack";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function Home() {
  return <><Header active="Home"/><main className="container">
    <section className="home-hero professional-hero"><div className="professional-portrait"><img src="/treva-antony-ogwang.jpg" alt="Treva Antony Ogwang in a black suit"/></div><div className="professional-intro"><p className="hero-eyebrow">PRODUCT · DATA · TECHNOLOGY</p><div className="badges"><span><FiMapPin/> Berlin, Germany</span><span><i/> Open to opportunities</span></div><h1>Hi, I am Treva Antony Ogwang</h1><p className="hero-background">With a background in data science, AI, digital business, and hands-on technology operations, I work across discovery, product decisions, prototyping, and measurement. I am currently developing Finance Tracker, a personal-finance product shaped by qualitative research with peers.</p><div className="hero-links"><a href="https://github.com/Begge10850" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub/></a><a href="https://www.linkedin.com/in/treva-ogwang/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn/></a></div></div></section>

    <TechStack/>

    <section className="home-section"><div className="section-title"><h2>Education</h2><a className="view-button" href="/education">View All Degrees ↗</a></div><ResumeCard item={degrees[0]} expanded detailLabel="Relevant Courses"/></section>
    <section className="home-section"><div className="section-title"><h2>Working Experience</h2><a className="view-button" href="/experience">View All Experience ↗</a></div><ResumeCard item={jobs[0]} expanded/></section>
    <section className="home-section"><div className="section-title"><h2>Latest Project</h2><a className="view-button" href="/projects">View All Projects ↗</a></div><div className="project-grid home-projects">{[projects[0]].map(item => <ProjectCard item={item} key={item.title}/>)}</div></section>
    <section className="home-section"><div className="section-title"><h2>Trainings & Certifications</h2><a className="view-button" href="/trainings">View All Trainings ↗</a></div><div className="stack"><ResumeCard item={{title:"Deep Learning Specialization",org:"DeepLearning.AI · Coursera",place:"Online",date:"Feb 2026",icon:"DL",logo:"/brands/deeplearning-ai.png",copy:"A five-course specialization covering neural networks, CNNs, sequence models, LSTMs, Transformers, regularization, optimization, and practical deep-learning applications.",tools:"Python · TensorFlow · Deep Learning",certificate:"https://coursera.org/verify/specialization/FJ18WDE90O6F"}}/></div></section>
  </main><Footer/></>;
}
