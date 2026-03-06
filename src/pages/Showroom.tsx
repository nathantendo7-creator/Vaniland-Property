import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';

export default function Showroom() {
  const [premiumListings, setPremiumListings] = useState<any[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch only premium listings for the showroom
    fetch('/api/search')
      .then(res => res.json())
      .then(data => {
        const premium = data
          .filter((p: any) => (p.premium || p.featured) && p.code !== '240192')
          .slice(0, 6);
        setPremiumListings(premium);
      })
      .catch(err => console.error("Showroom fetch error:", err));

    // GSAP Entrance Animations
    const ctx = gsap.context(() => {
      gsap.from(".showroom-title", { 
        y: 100, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out",
        stagger: 0.2 
      });
      
      gsap.from(".showroom-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.5
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const showroomImages = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687940-47a04b62174c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="min-h-screen bg-deep-navy text-white">
      {/* Cinematic Header */}
      <section ref={headerRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover"
            alt="Showroom Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-transparent to-deep-navy"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="showroom-title block text-gold text-xs uppercase tracking-[0.5em] mb-6 font-medium">The Exclusive Collection</span>
          <h1 className="showroom-title text-5xl md:text-7xl lg:text-8xl font-montserrat font-extralight tracking-widest uppercase mb-8">
            Curated <br /> <span className="text-gold italic font-cormorant lowercase tracking-normal">Showroom</span>
          </h1>
          <div className="showroom-title w-32 h-[1px] bg-gold/50 mx-auto"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white text-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <Shield className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Unrivaled Privacy</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Discreet acquisition and management services for the most discerning clients in the region.</p>
            </div>
            <div className="space-y-4">
              <Award className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Architectural Merit</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Every property in our showroom is selected for its exceptional design and structural integrity.</p>
            </div>
            <div className="space-y-4">
              <Star className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Prime Positioning</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Strategically located assets in Kampala's high-growth corridors and prestigious suburbs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-3xl font-montserrat font-light uppercase tracking-[0.2em] mb-4">Available Assets</h2>
            <p className="text-slate-400 font-light max-w-md">Immediate occupancy and off-plan opportunities within our premium tier.</p>
          </div>
          <Link to="/listings" className="text-gold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300">
            View All Properties <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {premiumListings.map((prop, index) => (
            <Link 
              key={prop.code} 
              to={`/listing/${prop.code}`}
              className="showroom-card group block relative aspect-[4/5] overflow-hidden rounded-sm bg-slate-800"
            >
              <img 
                src={showroomImages[index % showroomImages.length]} 
                alt={prop.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2">{prop.location.neighborhood}</p>
                <h3 className="text-2xl font-cormorant font-light mb-4">{prop.title}</h3>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-xs tracking-widest font-mono text-slate-400">#{prop.code}</span>
                  <span className="text-gold text-xs uppercase tracking-widest flex items-center gap-2">Explore <ArrowRight size={12} /></span>
                </div>
              </div>
              
              {prop.premium && (
                <div className="absolute top-6 right-6">
                  <Star size={16} className="text-gold fill-gold" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white text-deep-navy text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-light uppercase tracking-widest mb-8">Secure Your Legacy</h2>
          <p className="text-slate-500 font-light mb-12 text-lg italic font-cormorant">"Real estate is the only investment that returns both capital and character."</p>
          <Link 
            to="/contact" 
            className="inline-block bg-deep-navy text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] hover:bg-gold transition-colors duration-500"
          >
            Request Private Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
