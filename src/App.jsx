import { useEffect } from 'react';
import Cursor   from './components/Cursor';
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

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Projects />
      <Stats />
      <Team />
      <Stack />
      <Contact />
      <Footer />
    </>
  );
}
