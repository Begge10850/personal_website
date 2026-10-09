const skillGroups = [
  {
    title: "Programming & Querying",
    skills: ["Python", "SQL", "TypeScript"],
  },
  {
    title: "Data Engineering & Analytics",
    skills: [
      "Snowflake",
      "PostgreSQL",
      "Amazon S3",
      "Parquet",
      "Power BI",
      "Data Modelling",
      "Data Quality Testing",
    ],
  },
  {
    title: "Machine Learning & AI",
    skills: [
      "scikit-learn",
      "SciPy",
      "Recommender Systems",
      "RAG",
      "LLM Workflows",
      "pgvector",
    ],
  },
  {
    title: "Applications & Interfaces",
    skills: ["Streamlit", "React", "React Native", "Next.js", "Supabase"],
  },
  {
    title: "Delivery & Collaboration",
    skills: ["Git", "GitHub", "Make", "Jira", "Confluence", "Cloudflare"],
  },
];

export function TechStack() {
  return (
    <section className="home-section tech-section" aria-labelledby="technical-skills-title">
      <div className="skills-heading">
        <div>
          <p className="skills-eyebrow">TOOLS I HAVE USED</p>
          <h2 id="technical-skills-title">Technical Skills</h2>
        </div>
        <p>
          A practical stack demonstrated across data engineering, analytics,
          applied AI, recommender systems, and product delivery.
        </p>
      </div>
      <div className="skills-groups">
        {skillGroups.map((group) => (
          <article className="skills-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skills-list">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
