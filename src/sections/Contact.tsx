import { PORTFOLIO_CONFIG } from '../lib/config';

export function Contact() {
  const { email, linkedin, location } = PORTFOLIO_CONFIG;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-box reveal">
          <div className="contact-content">
            <span className="section-tag">06 — Connect</span>
            <h2>Let&apos;s build scalable data pipelines</h2>
            <p>
              Open to <strong>Data Engineer</strong> roles — Databricks lakehouse platforms, PySpark ETL,
              medallion architecture, and cloud-native analytics on Azure.
            </p>
            <div className="contact-links" id="contact-links">
              <a href={`mailto:${email}`} className="contact-link magnetic" id="link-email" target="_blank" rel="noopener">
                <span className="contact-link-icon">✉</span>
                <span className="contact-link-text">{email}</span>
              </a>
              <a href={linkedin} className="contact-link magnetic" id="link-linkedin" target="_blank" rel="noopener">
                <span className="contact-link-icon">in</span>
                <span className="contact-link-text">LinkedIn</span>
              </a>
            </div>
            <p className="contact-location" id="contact-location">{location}</p>
          </div>
          <div className="contact-terminal">
            <div className="terminal mini">
              <div className="terminal-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="terminal-title">contact.json</span>
              </div>
              <div className="terminal-body">
                <pre id="contact-json">{`{
  "name": "Rajveer Singh Chouhan",
  "role": "Data Engineer",
  "title": "Senior Software Engineer",
  "company": "Kadel Labs",
  "email": "${email}",
  "linkedin": "${linkedin}",
  "focus": ["Databricks", "PySpark", "ETL", "Azure"],
  "status": "ready_to_connect"
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
