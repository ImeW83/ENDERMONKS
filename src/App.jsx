import { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import GlitchCursor from './components/GlitchCursor';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Ticker   from './components/Ticker';
import Services from './components/Services';
import Projects from './components/Projects';
import Stats    from './components/Stats';
import Team     from './components/Team';
import Stack    from './components/Stack';
import Contact  from './components/Contact';
import Footer   from './components/Footer';
import VCareCaseStudy from './components/VCare/VCareCaseStudy';
import WorldClassCaseStudy from './components/WorldClass/WorldClassCaseStudy';
import CheapAssCaseStudy from './components/CheapAss/CheapAssCaseStudy';
import HoneylightCaseStudy from './components/Honeylight/HoneylightCaseStudy';
import EvornCaseStudy from './components/Evorn/EvornCaseStudy';
import PortfolioPage from './components/Portfolio/PortfolioPage';

// Minimal path routing — the portfolio and case-study pages live at their own URL; everything else is the one-page site.
const CASE_STUDIES = {
  '/work': PortfolioPage,
  '/work/vcare-nursing': VCareCaseStudy,
  '/work/world-class-travels': WorldClassCaseStudy,
  '/work/cheapass': CheapAssCaseStudy,
  '/work/honeylight': HoneylightCaseStudy,
  '/work/evorn': EvornCaseStudy,
};
const path = window.location.pathname.replace(/\/+$/, '');

export default function App() {
  useEffect(() => {
    // On a direct/refreshed load with a URL fragment (e.g. /#work), the browser tries to
    // jump to that section before React has rendered it, so the native anchor-scroll is a
    // no-op. Once mounted, scroll to it ourselves (scroll-margin-top on sections still applies).
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const scrollToHash = () => document.getElementById(id)?.scrollIntoView();
    requestAnimationFrame(scrollToHash);
    document.fonts?.ready?.then(scrollToHash);
  }, []);

  const CaseStudy = CASE_STUDIES[path];
  if (CaseStudy) {
    return (
      <LoadingScreen>
        <GlitchCursor />
        <Navbar base="/" />
        <CaseStudy />
        <Footer base="/" />
      </LoadingScreen>
    );
  }

  return (
    <LoadingScreen>
      <GlitchCursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Projects />
      <Team />
      <Stack />
      <Contact />
      <Footer />
    </LoadingScreen>
  );
}
