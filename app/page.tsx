import { Avatar, degrees, Footer, Header, jobs, ProjectCard, projects, ResumeCard } from "./_components";
import { TechStack } from "./_tech-stack";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiFileText, FiMapPin } from "react-icons/fi";

export default function Home() {
  return <><Header active="Home"/><main className="container">
    <section className="home-hero"><Avatar pose="home" hero/><div className="badges"><span><FiMapPin/> Berlin, Germany</span><span><i/> Open to opportunities</span></div><h1>Hi, I am Treva Antony Ogwang</h1><p>A data and software professional building practical products with analytics, artificial intelligence, and modern web technology.</p><div className="hero-links"><a className="soft-button cv-button" href="/Treva_Antony_Ogwang_CV.pdf" target="_blank" rel="noreferrer"><FiFileText/> Download CV</a><a href="https://github.com/Begge10850" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub/></a><a href="https://www.linkedin.com/in/treva-ogwang/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn/></a></div></section>

    <TechStack/>

    <section className="home-section"><div className="section-title"><h2>Education</h2><a className="view-button" href="/education">View All Degrees ↗</a></div><ResumeCard item={degrees[0]} expanded detailLabel="Relevant Courses"/></section>
    <section className="home-section"><div className="section-title"><h2>Working Experience</h2><a className="view-button" href="/experience">View All Experience ↗</a></div><ResumeCard item={jobs[0]} expanded/></section>
    <section className="home-section"><div className="section-title"><h2>Recent Projects</h2><a className="view-button" href="/projects">View All Projects ↗</a></div><div className="project-grid home-projects">{projects.slice(0,2).map(item => <ProjectCard item={item} key={item.title}/>)}</div></section>
    <section className="home-section"><div className="section-title"><h2>Trainings & Certifications</h2><a className="view-button" href="/trainings">View All Trainings ↗</a></div><div className="stack"><ResumeCard item={{title:"Deep Learning Specialization",org:"DeepLearning.AI · Coursera",place:"Online",date:"Feb 2026",icon:"DL",logo:"/brands/deeplearning-ai.png",copy:"A five-course specialization covering neural networks, CNNs, sequence models, LSTMs, Transformers, regularization, optimization, and practical deep-learning applications.",tools:"Python · TensorFlow · Deep Learning",certificate:"https://coursera.org/verify/specialization/FJ18WDE90O6F"}}/></div></section>
  </main><Footer/></>;
}
