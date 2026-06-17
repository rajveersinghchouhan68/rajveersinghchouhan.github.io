export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">01 — About</span>
          <h2>Data engineering at scale</h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              Proactive and technically-driven <strong>Backend &amp; Data Engineer</strong> with
              <strong> 4.7+ years</strong> of hands-on experience in scalable system design, ETL pipeline
              orchestration, and cloud-native analytics — primarily at <strong>Kadel Labs</strong>.
            </p>
            <p>
              I architect and automate data workflows using <strong>Python</strong>, <strong>Databricks</strong>,
              and <strong>PySpark</strong>, cutting platform latency by <strong>30%</strong> and manual deployment
              effort by <strong>40%</strong> while processing <strong>10GB+</strong> structured and semi-structured
              datasets for real-time analytics and BI.
            </p>
            <p>
              Experienced in API development, data integration, and automated Databricks bundle deployments via
              <strong> GitHub Actions</strong> — with approval-gated production releases, service-principal job
              execution, and Unity Catalog governance across enterprise pipelines.
            </p>
          </div>
          <div className="about-highlights reveal delay-1">
            <div className="highlight-card">
              <div className="highlight-icon">⚡</div>
              <h3>Performance</h3>
              <p>30% latency reduction and 40% less manual deployment effort across data platforms</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🔄</div>
              <h3>Release Automation</h3>
              <p>DAB deployments via GitHub Actions with approval-gated prod releases across multiple repos</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">📈</div>
              <h3>Analytics</h3>
              <p>10GB+ datasets ingested, transformed, and modeled into analytics-ready outputs for downstream BI consumption</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🛡️</div>
              <h3>Governance</h3>
              <p>Service principals, Key Vault, Unity Catalog external locations &amp; secret scopes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
