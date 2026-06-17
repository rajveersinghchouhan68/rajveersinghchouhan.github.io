export function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">05 — Education</span>
          <h2>Academic background</h2>
        </div>

        <div className="edu-grid">
          <div className="edu-card tilt-card reveal">
            <div className="edu-icon">🎓</div>
            <div>
              <h3>B.Tech in Computer Science</h3>
              <p className="edu-school">Geetanjali Institute of Technical Studies, Udaipur</p>
              <span className="edu-year">2017 – 2021</span>
            </div>
          </div>
          <div className="edu-card tilt-card reveal delay-1">
            <div className="edu-icon">📚</div>
            <div>
              <h3>Higher Secondary (XII)</h3>
              <p className="edu-school">Shreenath Senior Secondary School, Dungarpur</p>
              <span className="edu-year">2016 – 2017</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
