import { useEffect, useState } from 'react';
import { useTypedRole } from '../../lib/hooks';
import { HeroPortrait } from './HeroPortrait';

const TERMINAL_COMMANDS = [
  'spark.sql("SELECT * FROM silver.hr_attrition")',
  'git push origin main -- deploy triggered',
  'databricks jobs run-now --job-id prod_etl',
  'bundle validate && bundle deploy -t prod',
];

export function Hero() {
  const typedRole = useTypedRole();
  const [terminalCmd, setTerminalCmd] = useState('');

  useEffect(() => {
    let cmdIndex = 0;
    let interval: number;
    let timeout: number;

    const typeTerminal = () => {
      const cmd = TERMINAL_COMMANDS[cmdIndex];
      let i = 0;
      setTerminalCmd('');

      interval = window.setInterval(() => {
        if (i < cmd.length) {
          setTerminalCmd(cmd.substring(0, i + 1));
          i++;
        } else {
          window.clearInterval(interval);
          timeout = window.setTimeout(() => {
            cmdIndex = (cmdIndex + 1) % TERMINAL_COMMANDS.length;
            typeTerminal();
          }, 3000);
        }
      }, 60);
    };

    const start = window.setTimeout(typeTerminal, 3000);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-grid">
        <HeroPortrait />

        <div className="hero-content reveal delay-1">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Available for opportunities
          </div>
          <h1 className="hero-title">
            <span className="hero-greeting">Hi, I&apos;m</span>
            <span className="hero-name-line">
              <span className="hero-name-first">Rajveer Singh</span>
              <span className="hero-name-last">Chouhan</span>
            </span>
          </h1>
          <div className="hero-role">
            <span className="role-prefix">$ role --set</span>
            <span id="typed-role" className="typed-text">{typedRole}</span>
            <span className="typed-cursor">|</span>
          </div>
          <div className="hero-expertise" aria-label="Core expertise">
            <span className="expertise-chip">Databricks</span>
            <span className="expertise-chip">PySpark</span>
            <span className="expertise-chip">ETL / Lakehouse</span>
            <span className="expertise-chip">Delta Lake</span>
          </div>
          <p className="hero-desc">
            I build <strong>enterprise data pipelines</strong> on Databricks — ingesting, transforming, and modeling
            <strong> 10GB+ datasets</strong> with medallion architecture, service-principal job execution, and
            GitHub Actions–driven bundle deployments.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary magnetic">View Projects</a>
            <a href="#contact" className="btn btn-ghost magnetic">Connect</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num" data-target="4.7">0</span><span className="stat-suffix">+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" data-target="30">0</span><span className="stat-suffix">%</span>
              <span className="stat-label">Latency Reduced</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" data-target="10">0</span><span className="stat-suffix">GB+</span>
              <span className="stat-label">Data Processed</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" data-target="40">0</span><span className="stat-suffix">%</span>
              <span className="stat-label">Ops Automated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-showcase reveal delay-2">
        <div className="hero-terminal">
          <div className="terminal">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">pipeline_deploy.sh</span>
            </div>
            <div className="terminal-body" id="terminal-output">
              <div className="terminal-line"><span className="t-green">➜</span> <span className="t-dim">~/kadel-labs</span> databricks bundle deploy -t prod</div>
              <div className="terminal-line"><span className="t-blue">ℹ</span> Validating DAB configuration...</div>
              <div className="terminal-line"><span className="t-blue">ℹ</span> GitHub Actions: awaiting production approval</div>
              <div className="terminal-line"><span className="t-green">✓</span> Service principal authenticated</div>
              <div className="terminal-line"><span className="t-green">✓</span> Unity Catalog: external locations synced</div>
              <div className="terminal-line"><span className="t-yellow">→</span> Running ETL: landing → bronze → silver</div>
              <div className="terminal-line"><span className="t-green">✓</span> Pipeline deployed successfully <span className="t-dim">(latency -30%)</span></div>
              <div className="terminal-line typing-line">
                <span className="t-green">➜</span>{' '}
                <span id="terminal-cursor-line">{terminalCmd}</span>
                <span className="typed-cursor blink">_</span>
              </div>
            </div>
          </div>

          <div className="pipeline-viz">
            <div className="pipeline-node" data-layer="landing">
              <div className="node-icon">📥</div>
              <span>Landing</span>
            </div>
            <div className="pipeline-flow"><div className="flow-particle" /></div>
            <div className="pipeline-node" data-layer="bronze">
              <div className="node-icon">🥉</div>
              <span>Bronze</span>
            </div>
            <div className="pipeline-flow"><div className="flow-particle delay" /></div>
            <div className="pipeline-node" data-layer="silver">
              <div className="node-icon">🥈</div>
              <span>Silver</span>
            </div>
            <div className="pipeline-flow"><div className="flow-particle delay-2" /></div>
            <div className="pipeline-node" data-layer="gold">
              <div className="node-icon">📊</div>
              <span>BI / Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-console" aria-hidden="true">
        <span className="hero-console-prompt">rajveer@portfolio</span>:<span className="hero-console-path">~</span>$
        <span className="hero-console-cmd">Building lakehouse pipelines &amp; Databricks release automation</span>
        <span className="hero-console-cursor">▌</span>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
