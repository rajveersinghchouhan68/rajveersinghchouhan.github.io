import { usePortfolioEffects } from '../lib/hooks';
import { CursorGlow } from '../components/effects/CursorGlow';
import { ParticleCanvas } from '../components/effects/ParticleCanvas';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/hero/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Education } from '../sections/Education';
import { Contact } from '../sections/Contact';

export default function App() {
  usePortfolioEffects();

  return (
    <>
      <CursorGlow />
      <ParticleCanvas />
      <Nav />
      <div className="nav-backdrop" id="nav-backdrop" aria-hidden="true" />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
