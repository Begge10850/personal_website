import { ToggleDetails } from "./_toggle";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { FiAward, FiCalendar, FiExternalLink, FiMapPin } from "react-icons/fi";
import { SiConfluence, SiFastapi, SiGit, SiGithub, SiGoogle, SiJira, SiNextdotjs, SiPandas, SiPostgresql, SiPython, SiReact, SiStreamlit, SiSupabase, SiTypescript } from "react-icons/si";
import { PiChartBarFill } from "react-icons/pi";
import { TbChartTreemap } from "react-icons/tb";

export const jobs = [
  { title: "Working Student IT Support", org: "Scalable Operations GmbH", url: "https://de.scalable.capital/en", place: "Germany", date: "Jun 2024 → May 2025", icon: "SC", logo: "/brands/scalable.png", copy: "Supported employees and workplace technology across device management, identity access, meeting-room hardware, onboarding, and IT operations.", tools: "Jira · Google Workspace · GitHub · Omada · Confluence", details: ["Installed, maintained, and repaired MacBooks, iPhones, and ChromeOS devices.", "Regularly checked Google Meet hardware across six Berlin meeting rooms and worked with the team to connect conference monitors.", "Managed the backup and repair of returned hardware in line with internal processes.", "Tracked company devices in Jira Asset Management to keep the hardware inventory and user records accurate.", "Resolved daily hardware and software requests through Jira Service Management within the team's service-level expectations.", "Provisioned and removed access to Jira, Google Workspace, and GitHub through Omada identity workflows.", "Handled employee onboarding and offboarding and maintained IT documentation in Confluence for the wider support team.", "Delivered a LAN connectivity project for 72 desktop monitors, improving connection stability and reducing office network latency."] },
  { title: "Working Student IT Support", org: "Hive Technologies GmbH", place: "Berlin, Germany", date: "May 2023 → Apr 2024", icon: "HT", logo: "/brands/hive-technologies.png", copy: "Supported employees across office and remote teams, covering devices, accounts, workplace hardware, and day-to-day technical requests.", tools: "Jira · Google Workspace", details: ["Resolved more than 50 hardware, software, and network requests each month across Windows, macOS, and ChromeOS, with over 80% completed within SLA.", "Managed device logistics for remote employees, from preparing laptops and accessories to coordinating deliveries, replacements, and returns through DHL and UPS.", "Set up and maintained laptops, mobile devices, printers, meeting-room hardware, and workplace peripherals, troubleshooting issues that disrupted daily work.", "Supported new-starter onboarding by configuring equipment and completing SSO-based account setup so employees had the access they needed from their first day."] },
  { title: "Data Analytics Intern", org: "Life Planner", place: "Kenya", date: "Aug 2021 → Dec 2022", icon: "LP", logo: "/brands/life-planner.png", copy: "Worked full-time with the Data Analytics and Business Intelligence teams, preparing data and translating analysis into reports and business insights.", tools: "SQL · Python · Power BI", details: ["Extracted and cleaned internal datasets, handled missing values, and checked data integrity.", "Conducted statistical analysis and exploratory data analysis to identify trends and correlations.", "Designed interactive dashboards and reports to communicate findings to stakeholders.", "Assisted with scripts that automated routine data extraction and reporting workflows.", "Produced weekly and monthly performance reports to track key metrics."] },
];
export const degrees = [
  { title: "Master of Science in Information Systems", org: "Universität Münster", url: "https://www.uni-muenster.de/en/", place: "Münster, Germany", date: "Oct 2026 → Present", icon: "UM", logo: "/brands/universitaet-muenster.svg", copy: "Exploring how technology, data, and business processes come together to design and improve modern information systems.", details: [] },
  { title: "BSc Data Science, AI and Digital Business", org: "Gisma University of Applied Sciences", url: "https://www.gisma.com/", place: "Potsdam, Germany", date: "Jan 2023 → Feb 2026", icon: "GU", logo: "/brands/gisma-supplied.png", copy: "Built a multidisciplinary foundation in data science, artificial intelligence, analytics, and digital business through applied, project-based learning.", details: ["Innovation Management in a Digital and Globalised World — 95", "Mathematical Foundations — 62", "Digital Marketing Methods — 90", "Academic Writing and Research Methods — 90", "Creative Problem Solving and Strategy Development — 90", "Project Management — 94", "Python Programming — 95", "Data Structures & Algorithms — 82", "Databases & Big Data — 90", "Statistics — 65", "Data Visualisation — 65", "Data Driven Strategic Decision Making — 55", "Data Governance, Security and Ethics — 83", "Data Mining — 70", "Data Integration — 70", "AI Studio — 70", "Applied Statistical Modelling — 85", "Digital Transformation and Cases — 50", "Fundamentals of Marketing — 70", "Sustainability Management — 63", "Data Driven Business Models — 91", "AI Applications for Digital Business — 92", "Artificial Intelligence & Machine Learning — 70", "End-to-End Data Science Project — 83", "Business Start-up Simulation — 80", "Bachelor’s Thesis — 66", "Internship — 90"] },
  { title: "Diploma in Business Information Technology", org: "Strathmore University", url: "https://strathmore.edu/", place: "Nairobi, Kenya", date: "Jan 2018 → Sep 2021", icon: "SU", logo: "/brands/strathmore.png", copy: "A business-focused information technology diploma covering programming, databases, software engineering, networks, and management.", details: ["Introduction to Ethics — 54.50% (C)", "Fundamentals of Information Technology — 57.35% (C)", "Fundamentals of Accounting — 64.88% (B)", "Mathematics for Business Computing — 55.33% (C)", "Introduction to Programming — 50.00% (C)", "Business Communication — 67.83% (B)", "Database Systems — 59.83% (C)", "Data Structures and Algorithms — 53.93% (C)", "Business Statistics — 58.44% (C)", "Business Organization and Management — 60.00% (B)", "Business Finance and Economics — 70.58% (B)", "Object Oriented Programming — 60.60% (B)", "Marketing and Entrepreneurship Skill — 65.00% (B)", "Web Application Development — 50.46% (C)", "System Analysis and Design — 50.77% (C)", "Software Engineering — 51.17% (C)", "Computer Networks — 50.22% (C)", "IS Project — 58.50% (C)"] },
];
export const projects = [
  { title: "RoutePulse: Mobility Analytics", date: "2026", copy: "How I collected, tested and modelled Berlin-Brandenburg public transport data, then turned it into an interactive dashboard.", tools: "Python · SQL · Streamlit", image: "/projects/routepulse/routepulse-cover.webp", color: "dark", url: "/projects/routepulse-mobility-analytics", caseStudy: true },
  { title: "Saidia: Hybrid Game Recommender", date: "2026", copy: "An explainable product-discovery system combining behavioural similarity, product metadata, chronological evaluation, and a deployed shopping experience.", tools: "Python · Machine Learning · Streamlit", image: "/projects/saidia-game-recommender/catalogue.png", color: "dark", url: "/projects/saidia-game-recommender", caseStudy: true },
  { title: "Saidia: AI-Assisted Logistics Claims", date: "2026", copy: "A claims workflow combining structured policy checks, grounded AI explanations, automation, and human review.", tools: "Python · RAG · PostgreSQL", image: "/projects/smart-document.jpg", color: "blue", url: "/projects/saidia-logistics-claims", caseStudy: true },
  { title: "Performance Analytics", date: "2025", copy: "A statistical analysis project that turns complex student-performance data into actionable findings.", tools: "Python · Statistics · Jupyter", image: "/projects/performance-analytics.jpg", color: "rose", url: "https://github.com/Begge10850/student-performance-statistical-analysis" },
  { title: "Finance Tracker", date: "2026", copy: "A savings-first personal finance product connecting budgets, goal plans, contribution tracking, forecasts, and financial behaviour.", tools: "React · TypeScript · Supabase", image: "/projects/finance-tracker.jpg", color: "green", url: "/projects/savings-first-finance", caseStudy: true },
  { title: "Explainable Robo Advisor", date: "2025", copy: "An explainable AI prototype combining portfolio guidance with transparent recommendations.", tools: "Python · XAI · Machine Learning", image: "/projects/robo-advisor.jpg", color: "dark", url: "https://github.com/Begge10850/explainable_robo_advisor" },
];

export function TechIcon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    Python: <SiPython/>, Pandas: <SiPandas/>, SQL: <SiPostgresql/>, "Power BI": <PiChartBarFill/>, React: <SiReact/>, "Next.js": <SiNextdotjs/>, FastAPI: <SiFastapi/>, Git: <SiGit/>, Jira: <SiJira/>, "Google Workspace": <SiGoogle/>, GitHub: <SiGithub/>, Confluence: <SiConfluence/>, Tableau: <TbChartTreemap/>, Streamlit: <SiStreamlit/>, TypeScript: <SiTypescript/>, Supabase: <SiSupabase/>
  };
  return <span className="tool-icon" data-tooltip={name} aria-label={name}>{icons[name] ?? <span className="tool-fallback">{name.slice(0,2)}</span>}</span>;
}

export function ToolRow({ tools, labelled = false }: { tools: string; labelled?: boolean }) {
  const items = tools.split(" · ");
  return <div className={`tool-row ${labelled ? "labelled" : ""}`}>{items.map((item, index) => <span className="tool-item" key={item}>{index > 0 && <i aria-hidden="true"/>}<TechIcon name={item}/>{labelled && <small>{item}</small>}</span>)}</div>;
}

export { Header } from "./_header";

export function Avatar({ pose, hero = false }: { pose: string; hero?: boolean }) {
  const cleanPoses = new Set(["education", "projects", "trainings", "seminars"]);
  const src = cleanPoses.has(pose) ? `/avatars/${pose}-clean.jpg` : `/avatars/${pose}.png`;
  return <div className={`avatar avatar-${pose} ${hero ? "hero-avatar" : ""}`} aria-hidden="true"><img src={src} alt="" decoding="async"/></div>;
}

export function Intro({ pose, title, text }: { pose: string; title: string; text: string }) {
  return <section className="page-intro"><Avatar pose={pose}/><h1>{title}</h1><p>{text}</p></section>;
}

export function ResumeCard({ item, expanded = false, detailLabel = "Responsibilities" }: { item: { title:string; org:string; url?:string; place:string; date:string; icon:string; logo?:string; copy:string; tools?:string; grade?:string; details?:string[]; certificate?:string }; expanded?: boolean; detailLabel?: string }) {
  const details = item.details ?? ["Add your most important responsibility or measurable achievement.", "Describe the tools you used and the outcome you delivered.", "Highlight collaboration, ownership, or technical leadership."];
  const displayedDetails = detailLabel.toLowerCase().includes("course") ? details.map(detail => detail.split(" — ")[0]) : details;
  const orgName = item.url ? <a className="org-link" href={item.url} target="_blank" rel="noreferrer">{item.org}<FiExternalLink/></a> : item.org;
  const cardDetails = <>{item.grade && <p className="grade"><strong>Overall grade:</strong> {item.grade}</p>}{item.certificate && <a className="certificate-button" href={item.certificate} target="_blank" rel="noreferrer"><FiAward/> Certificate</a>}{expanded && displayedDetails.length > 0 && <ToggleDetails label={detailLabel} items={displayedDetails}/>}</>;

  return <article className="resume-card"><div className="card-icon">{item.logo ? (item.url ? <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Visit ${item.org}`}><img src={item.logo} alt=""/></a> : <img src={item.logo} alt=""/>) : item.icon}</div><div className="card-main"><div className="card-top"><h3>{item.title} <span>at {orgName}</span></h3><div className="pills"><span><FiMapPin/> {item.place}</span><b><FiCalendar/> {item.date}</b></div></div>{item.tools && <ToolRow tools={item.tools}/>}<p>{item.copy}</p>{cardDetails}</div></article>;
}

export function ProjectCard({ item }: { item: typeof projects[number] }) {
  const card = <article className="project-card"><img className="project-cover-image" src={item.image} alt={`${item.title} project preview`} loading="lazy" decoding="async"/><div className="project-info"><div className="card-top"><h3>{item.title}</h3><div className="pills"><b><FiCalendar/> {item.date}</b></div></div><p>{item.copy}</p><ToolRow tools={item.tools}/>{"caseStudy" in item && item.caseStudy ? <span className="case-study-link">Read case study <FiExternalLink/></span> : <a className="github-button" href={item.url} target="_blank" rel="noreferrer" aria-label={`${item.title} on GitHub`}><FaGithub/><FiExternalLink className="external-mark"/></a>}</div></article>;
  return "caseStudy" in item && item.caseStudy ? <a className="project-card-link" href={item.url} aria-label={`Read the ${item.title} case study`}>{card}</a> : card;
}

export function Footer() { return null; }
