const PROJECTS = [
  {
    num: '01',
    role: 'Data Engineer',
    size: '10GB+',
    delay: '',
    title: 'Attrition Analysis HR Data Lakehouse Pipeline',
    desc: 'Productionized end-to-end pipeline processing 10GB+ HR datasets for attrition prediction and retention analytics — driving 25% improved predictive accuracy.',
    points: [
      'PySpark ETL workflows for ingesting and transforming HR data on Databricks',
      'Engineered model features and automated cleansing — 10+ hrs/week saved',
      'Analytics-ready modeled outputs delivered for downstream dashboard and reporting teams',
    ],
    tech: ['Databricks', 'PySpark', 'Python', 'REST APIs'],
  },
  {
    num: '02',
    role: 'Backend / Data Engineer',
    size: '500+ req/day',
    delay: 'delay-1',
    title: 'Internet Advertising Backend & API Integration',
    desc: 'Led backend development and data integration for an advertising organization — scalable RESTful APIs connecting client-facing systems with optimized query performance.',
    points: [
      '20 REST APIs with PHP Laravel & MySQL — 500+ daily requests, 200ms latency',
      'Access control modules for security and compliance across environments',
      'Automated infrastructure deployments — 5+ hrs/week saved',
    ],
    tech: ['PHP Laravel', 'MySQL', 'JavaScript', 'REST'],
  },
  {
    num: '03',
    role: 'Data Engineer',
    size: 'Multi-repo',
    delay: 'delay-2',
    title: 'Multi-source Databricks Platform',
    desc: 'Enterprise Azure lakehouse delivering multi-source ingestion and processing with Git-driven bundle deployments, gated production releases, and dev/prod workspace separation.',
    points: [
      'Landing → bronze → silver ETL/ELT for press, event, and marketing datasets',
      'GitHub Actions CI/CD: deploy to dev on merge; prod with approval gates',
      'Service principals, secret scopes, and Unity Catalog governance',
    ],
    tech: ['Azure Databricks', "DAB's", 'GitHub Actions', 'Unity Catalog', 'Spark'],
  },
  {
    num: '04',
    role: 'Data Engineer / Backend',
    size: '3 clients',
    delay: 'delay-3',
    title: 'Bitrix CRM Optimization & Automation',
    desc: 'Upgraded, maintained, and optimized Bitrix CRM modules for 3 enterprise clients — improving performance, reliability, and analytics reporting.',
    points: [
      '25% operational performance improvement via core module refactoring',
      '40% reduction in manual deployment effort through automation',
      'Qlik reports, queries, and dashboards; cross-client compatibility enhancements',
    ],
    tech: ['Bitrix', 'PHP', 'MySQL', 'Qlik'],
  },
] as const;

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">04 — Projects</span>
          <h2>Major work executed</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article key={project.num} className={`project-card tilt-card reveal ${project.delay}`.trim()}>
              <div className="project-num">{project.num}</div>
              <div className="project-meta">
                <span className="project-role">{project.role}</span>
                <span className="project-size">{project.size}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <ul className="project-points">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
