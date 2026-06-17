import { useState } from 'react';
import type { CSSProperties } from 'react';
import { PORTFOLIO_CONFIG } from '../../lib/config';
import { useHeroPortrait } from '../../lib/hooks';

const BADGES = [
  { label: 'Delta', x: '94%', y: '8%' },
  { label: 'ETL', x: '5%', y: '16%' },
  { label: 'Spark', x: '95%', y: '26%' },
  { label: 'Lake', x: '4%', y: '36%' },
] as const;

export function HeroPortrait() {
  const { stageRef, parallaxRef, portalRef, canvasRef } = useHeroPortrait();
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className="hero-portrait reveal" id="hero-portrait">
      <div className="portrait-stage" id="portrait-stage" ref={stageRef}>
        <div className="portal-backdrop" aria-hidden="true">
          <div className="portal-volumetric portal-volumetric--left" />
          <div className="portal-volumetric portal-volumetric--center" />
          <div className="portal-volumetric portal-volumetric--right" />
        </div>

        <div className="portal-ellipse" id="portal-ellipse" ref={portalRef} aria-hidden="true">
          <div className="portal-core" />
          <div className="portal-ring portal-ring--outer" />
          <div className="portal-ring portal-ring--mid" />
          <div className="portal-ring portal-ring--inner" />
          <div className="portal-scanlines" />
          <div className="portal-shimmer" />
        </div>

        <div className="portrait-parallax" id="portrait-parallax" ref={parallaxRef}>
          <div className="portrait-clip">
            <img
              id="profile-photo"
              className="portrait-img"
              src={PORTFOLIO_CONFIG.profileImage}
              alt="Rajveer Singh Chouhan"
              width={283}
              height={939}
              loading="eager"
              decoding="async"
              style={{ opacity: showFallback ? 0 : 1, display: showFallback ? 'none' : 'block' }}
              onLoad={() => setShowFallback(false)}
              onError={() => setShowFallback(true)}
            />
          </div>
        </div>

        <canvas className="portal-particles" id="portal-particles" ref={canvasRef} aria-hidden="true" />

        <div
          className="portrait-fallback"
          id="profile-fallback"
          aria-hidden="true"
          style={{ display: showFallback ? 'flex' : 'none' }}
        >
          RSC
        </div>

        <ul className="portrait-badges" aria-label="Technical focus areas">
          {BADGES.map((badge) => (
            <li
              key={badge.label}
              className="portrait-badge"
              style={{ '--badge-x': badge.x, '--badge-y': badge.y } as CSSProperties}
            >
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
