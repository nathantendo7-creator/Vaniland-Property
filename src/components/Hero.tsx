import { useState, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const container = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
    
    // Background Ken Burns effect
    gsap.to(bgImageRef.current, {
      scale: 1.15,
      duration: 10,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });

    // Reveal animations using masks (overflow-hidden)
    tl.from([titleLine1Ref.current, titleLine2Ref.current], {
      y: '100%',
      opacity: 0,
      stagger: 0.2,
      delay: 0.3
    })
    .from(subtitleRef.current, {
      y: '100%',
      opacity: 0,
    }, '-=1')
    .from(searchRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 1.2
    }, '-=0.8');
  }, { scope: container });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (activeTab === 'sell') {
      navigate('/sell');
    } else {
      const path = activeTab === 'rent' ? '/rent' : '/buy';
      navigate(`${path}${trimmedQuery ? `?q=${encodeURIComponent(trimmedQuery)}` : ''}`);
    }
  };

  return (
    <div ref={container} className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-deep-navy">
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
          alt="Luxury Real Estate"
          className="w-full h-full object-cover scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/85 via-deep-navy/45 to-deep-navy/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep-navy to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl">
          <p className="text-gold font-bold text-[10px] uppercase tracking-[0.38em] mb-6">Vaniland Property Consultants</p>
          <div className="overflow-hidden mb-2">
            <h1 ref={titleLine1Ref} className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extralight text-white tracking-[0.08em] uppercase drop-shadow-2xl">
              Find your
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 ref={titleLine2Ref} className="text-6xl md:text-8xl lg:text-9xl font-serif-luxury lowercase tracking-normal text-gold drop-shadow-2xl italic">
              place
            </h1>
          </div>
          
          <div className="overflow-hidden mb-10">
            <p ref={subtitleRef} className="max-w-2xl text-white/85 font-inter text-lg md:text-xl leading-relaxed">
              Premium homes, rental portfolios, and investment property guidance across Kampala and Uganda's fastest growing suburbs.
            </p>
          </div>
        </div>

        <div ref={searchRef} className="bg-white text-deep-navy border border-gold/20 shadow-2xl max-w-4xl">
          <div className="grid grid-cols-3 border-b border-deep-navy/10">
            {(['buy', 'rent', 'sell'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-all ${
                  activeTab === tab 
                    ? 'bg-deep-navy text-gold' 
                    : 'text-deep-navy/45 hover:text-deep-navy hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="District, neighborhood, or property reference..."
              className="flex-grow py-5 px-6 md:px-8 text-base outline-none text-deep-navy placeholder:text-slate-400 font-medium min-w-0"
            />
            <button 
              type="submit"
              className="bg-gold text-white px-8 py-5 hover:bg-deep-navy hover:text-gold transition-all duration-500 flex items-center justify-center gap-3 group text-[11px] font-bold uppercase tracking-[0.22em]"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform duration-500" />
              Search
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-gold">Quick access</span>
          <button onClick={() => navigate('/rent?district=Kampala')} className="text-[11px] uppercase tracking-widest font-bold hover:text-gold transition-colors flex items-center gap-2">
            Kampala rentals <ArrowRight size={14} />
          </button>
          <button onClick={() => navigate('/showroom')} className="text-[11px] uppercase tracking-widest font-bold hover:text-gold transition-colors flex items-center gap-2">
            Premium showroom <ArrowRight size={14} />
          </button>
        </div>
      </div>
      
      <div className="absolute left-8 bottom-12 hidden lg:block overflow-hidden">
        <div className="text-white/30 text-[10px] uppercase tracking-[0.5em] origin-left rotate-[-90deg] translate-y-[-100%]">
          Vaniland Property Group © 2026
        </div>
      </div>
    </div>
  );
}
