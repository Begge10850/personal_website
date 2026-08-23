import Link from "next/link";
import { ToggleDetails } from "./_toggle";

export const tech = ["Python", "Pandas", "SQL", "Power BI", "React", "Next.js", "FastAPI", "Git"];
export const jobs = [
  { title: "Data & AI Engineer", org: "Your current company", place: "Germany", date: "2024 → Present", icon: "AI", copy: "Building reliable data products, intelligent workflows, and practical software that helps teams make better decisions.", tools: "Python · SQL · React · APIs" },
  { title: "Software Engineer", org: "Previous company", place: "Germany", date: "2022 → 2024", icon: "SE", copy: "Designed and shipped modern web applications with a focus on clear interfaces and maintainable systems.", tools: "TypeScript · Next.js · PostgreSQL" },
];
export const degrees = [
  { title: "Master’s Degree", org: "Your University", place: "Germany", date: "2024 → Present", icon: "🎓", copy: "Add your programme, academic focus, achievements, and relevant coursework here.", grade: "Add grade", details: ["Add current master’s courses", "Add specialization", "Add thesis or research focus"] },
  { title: "Bachelor’s Degree", org: "Your University", place: "Your City", date: "2019 → 2023", icon: "🏛️", copy: "Your transcript will provide the official course names, credits, and grades for this degree.", grade: "Pending transcript", details: ["Bachelor’s course list will be added from your transcript", "Final grade will be added from your transcript", "Academic projects and thesis can be highlighted here"] },
];
export const projects = [
  { title: "Smart Document Assistant", date: "2026", copy: "An intelligent document workspace for grounded answers, summaries, and structured insights.", tools: "Python · RAG · Streamlit", color: "blue", url: "https://github.com/Begge10850/smart_doc_assistant" },
  { title: "Performance Analytics", date: "2025", copy: "A statistical analysis project that turns complex student-performance data into actionable findings.", tools: "Python · Statistics · Jupyter", color: "rose", url: "https://github.com/Begge10850/student-performance-statistical-analysis" },
  { title: "Finance Tracker", date: "2025", copy: "A clear personal-finance experience for tracking budgets, transactions, and financial goals.", tools: "React · TypeScript · Supabase", color: "green", url: "https://github.com/Begge10850/wealthtrack-mobile" },
  { title: "Explainable Robo Advisor", date: "2025", copy: "An explainable AI prototype combining portfolio guidance with transparent recommendations.", tools: "Python · XAI · Machine Learning", color: "dark", url: "https://github.com/Begge10850/explainable_robo_advisor" },
];

export function Header({ active = "Home" }: { active?: string }) {
  const nav = ["Home", "Experience", "Education", "Projects"];
  return <header className="site-header"><div className="header-inner"><Link className="logo" href="/" aria-label="Home">TO</Link><nav>{nav.map(item => <Link key={item} className={active === item ? "active" : ""} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>{item}</Link>)}<div className="extra"><button type="button">Extra⌄</button><div className="extra-menu"><Link href="/trainings"><b>Trainings</b><span>Courses and certifications</span></Link><Link href="/seminars"><b>Seminars</b><span>Workshops and events</span></Link><Link href="/memberships"><b>Memberships</b><span>Professional communities</span></Link></div></div><Link className={active === "Contact" ? "active" : ""} href="/contact">Contact</Link></nav><div className="socials"><a href="https://github.com/Begge10850" aria-label="GitHub">●</a><a href="#" aria-label="LinkedIn">in</a></div></div></header>;
}

export function Intro({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return <section className="page-intro"><div className="avatar" aria-hidden="true">{emoji}</div><h1>{title}</h1><p>{text}</p></section>;
}

export function ResumeCard({ item, expanded = false, detailLabel = "Responsibilities" }: { item: { title:string; org:string; place:string; date:string; icon:string; copy:string; tools?:string; grade?:string; details?:string[] }; expanded?: boolean; detailLabel?: string }) {
  const details = item.details ?? ["Add your most important responsibility or measurable achievement.", "Describe the tools you used and the outcome you delivered.", "Highlight collaboration, ownership, or technical leadership."];
  return <article className="resume-card"><div className="card-icon">{item.icon}</div><div className="card-main"><div className="card-top"><h3>{item.title} <span>at {item.org}</span></h3><div className="pills"><span>⌖ {item.place}</span><b>▣ {item.date}</b></div></div>{item.tools && <div className="tool-row">{item.tools}</div>}<p>{item.copy}</p>{item.grade && <p className="grade"><strong>Overall grade:</strong> {item.grade}</p>}{expanded && <ToggleDetails label={detailLabel} items={details}/>}</div></article>;
}

export function ProjectCard({ item }: { item: typeof projects[number] }) {
  return <article className="project-card"><div className={`project-cover ${item.color}`}><span>{item.title}</span><small>Featured project</small></div><div className="project-info"><div className="card-top"><h3>{item.title}</h3><div className="pills"><b>▣ {item.date}</b></div></div><p>{item.copy}</p><div className="tool-row">{item.tools}</div><a className="github-button" href={item.url} aria-label={`${item.title} on GitHub`}>●</a></div></article>;
}

export function Footer() { return <footer>The source code is available on <a href="https://github.com/Begge10850/personal_website">GitHub</a>.</footer>; }
