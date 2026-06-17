export function Nav() {
  return (
    <nav className="nav" id="nav">
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">&lt;</span>RSC<span className="logo-bracket">/&gt;</span>
      </a>
      <button
        className="nav-toggle"
        id="nav-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded="false"
        aria-controls="nav-links"
      >
        <span />
        <span />
        <span />
      </button>
      <ul className="nav-links" id="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#contact" className="nav-cta">Connect</a></li>
      </ul>
    </nav>
  );
}
