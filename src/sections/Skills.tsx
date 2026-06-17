import type { CSSProperties } from 'react';
import { PORTFOLIO_CONFIG } from '../lib/config';

const SKILL_CATEGORIES = [
  {
    title: 'Data Engineering',
    delay: '',
    tags: [
      ['Databricks', 95], ['Delta Lake', 90], ['PySpark', 90], ['Spark', 88],
      ['ETL/ELT', 92], ["DAB's", 85], ['Unity Catalog', 88], ['Workflows', 86],
    ],
  },
  {
    title: 'Cloud & DevOps',
    delay: 'delay-1',
    tags: [
      ['Azure', 90], ['ADLS', 88], ['Key Vault', 85], ['GitHub Actions', 92],
      ['CI/CD', 90], ['Git', 88], ['Service Principals', 84],
    ],
  },
  {
    title: 'Backend & Integration',
    delay: 'delay-2',
    tags: [
      ['PHP Laravel', 88], ['REST APIs', 90], ['MySQL', 85], ['JavaScript', 80],
      ['Bitrix CRM', 82], ['Qlik', 78], ['Infra Automation', 84],
    ],
  },
  {
    title: 'Concepts & Collaboration',
    delay: 'delay-3',
    tags: [
      ['Data Modeling', 92], ['Modular Architecture', 88], ['Agile SCRUM', 85],
      ['Performance Tuning', 90], ['GitHub Environments', 86], ['Branch Protection', 84],
    ],
  },
] as const;

export function Skills() {
  const { certifications } = PORTFOLIO_CONFIG;

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">02 — Skills</span>
          <h2>Tech stack &amp; tooling</h2>
        </div>

        <div className="skills-orbit-wrap">
          <div className="skills-orbit reveal">
            <div className="orbit-center">
            <span>Core</span>
            <strong>Stack</strong>
            </div>
            <div className="orbit-ring ring-1">
              {['Python', 'PySpark', 'SQL', 'Spark'].map((item, i) => (
                <div key={item} className="orbit-item" style={{ '--i': i } as CSSProperties}>{item}</div>
              ))}
            </div>
            <div className="orbit-ring ring-2">
              {['Databricks', 'Azure', 'GH Actions', 'Delta Lake', 'ADLS'].map((item, i) => (
                <div key={item} className="orbit-item" style={{ '--i': i } as CSSProperties}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className={`skill-category reveal ${cat.delay}`.trim()}>
              <h3>{cat.title}</h3>
              <div className="skill-tags">
                {cat.tags.map(([name, level]) => (
                  <span key={name} className="skill-tag" data-level={level}>{name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="certifications reveal">
          <h3>Certifications</h3>
          <div className="cert-badges">
            <a
              href={certifications.associate.verifyUrl}
              className="cert-badge"
              id="cert-associate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cert-icon">🏅</div>
              <div>
                <strong>Databricks Certified</strong>
                <span>Data Engineer Associate</span>
                <em className="cert-verify">Verify credential ↗</em>
              </div>
            </a>
            <a
              href={certifications.professional.verifyUrl}
              className="cert-badge"
              id="cert-professional"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cert-icon">🏆</div>
              <div>
                <strong>Databricks Certified</strong>
                <span>Data Engineer Professional</span>
                <em className="cert-verify">Verify credential ↗</em>
              </div>
            </a>
            <div className="cert-badge cert-badge-static">
              <div className="cert-icon">📜</div>
              <div>
                <strong>NPTEL</strong>
                <span>Programming in Java (2019)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
