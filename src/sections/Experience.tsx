const EXPERIENCE = [
  {
    title: 'Senior Software Engineer',
    company: 'Kadel Labs',
    date: 'Jan 2025 – Present',
    delay: '',
    bullets: [
      'Developed high-throughput backend data infrastructures using Python, Databricks, PHP Laravel, and MySQL — reducing platform latency by 30%',
      'Designed GitHub Actions workflows to automate Databricks bundle deployments across multiple repositories (convene, sphere, cvent, press-release monorepo)',
      'Implemented approval-gated production releases and standardized service-principal job execution (dev vs prod)',
      'Built and maintained bronze/silver ingestion pipelines for press release and event/API sources',
      'Supported multi-bundle monorepo layout with path-scoped CI workflows for consistent release discipline',
      'Collaborated on Unity Catalog external locations, Key Vault, and secret scope permissions for automated jobs',
      'Mentored junior engineers on scalable data pipeline and backend design best practices',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Kadel Labs',
    date: 'Apr 2022 – Jan 2025',
    delay: '',
    bullets: [
      'Automated server deployments and workflow scheduling — 40% reduction in manual operations, saving 10+ hours per week',
      'Engineered REST API endpoints and custom ETL logic — 40% faster data retrieval; 20 APIs handling 500+ daily requests at 200ms latency',
      'Led Bitrix CRM optimization for multiple enterprise clients with 25%+ module efficiency improvements',
      'Developed Qlik reports, queries, and dashboards to support data-driven decision-making',
      'Automated infrastructure deployments via scripting — 5+ hours saved weekly on manual ops',
    ],
  },
  {
    title: 'Trainee',
    company: 'Kadel Labs',
    date: 'Dec 2021 – Apr 2022',
    delay: '',
    bullets: [
      'Foundation in backend development, data integration, and agile delivery practices',
      'Supported CRM enhancements and cross-vertical data consistency initiatives',
    ],
  },
] as const;

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">03 — Experience</span>
          <h2>Professional journey</h2>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((job) => (
            <div key={job.title + job.date} className="timeline-item reveal">
              <div className="timeline-marker" />
              <div className="timeline-card tilt-card">
                <div className="timeline-header">
                  <div>
                    <h3>{job.title}</h3>
                    <span className="company">{job.company}</span>
                  </div>
                  <span className="timeline-date">{job.date}</span>
                </div>
                <ul className="timeline-list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
