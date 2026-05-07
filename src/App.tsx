import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import InfoPage from './pages/InfoPage';
import Admin from './pages/Admin';
import Showroom from './pages/Showroom';

import 'lenis/dist/lenis.css';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Listings defaultGoal="buy" />} />
          <Route path="/rent" element={<Listings defaultGoal="rent" />} />
          <Route path="/sell" element={<Contact defaultGoal="sell" />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:code" element={<ListingDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/privacy" element={<InfoPage />} />
          <Route path="/terms" element={<InfoPage />} />
          <Route path="/expertise/:slug" element={<InfoPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
