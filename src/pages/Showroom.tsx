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
    "/Images/yoel-winkler-vHkHv5wSxMI-unsplash.jpg",
    "/Images/twinomugisha-jackson--a8otaf4jro-unsplash.jpg",
    "/Images/IMG_20260306_174434_190.png",
    "/Images/IMG_20260306_174218_240.png",
    "/Images/IMG_20260306_174131_404.png",
    "/Images/Gemini_Generated_Image_30so0i30so0i30so~2.png"
  ];

  return (
    <div className="min-h-screen bg-deep-navy text-white">
      {/* Cinematic Header */}
      <section ref={headerRef} className="relative min-h-[68vh] flex items-center justify-center overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/Images/yoel-winkler-vHkHv5wSxMI-unsplash.jpg" 
            className="w-full h-full object-cover"
            alt="Showroom Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-transparent to-deep-navy"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="showroom-title block text-gold text-xs uppercase tracking-[0.5em] mb-6 font-medium">The Exclusive Collection</span>
          <h1 className="showroom-title text-5xl md:text-7xl lg:text-8xl font-montserrat font-extralight tracking-[0.08em] uppercase mb-8">
            Curated <br /> <span className="text-gold italic font-cormorant lowercase tracking-normal">Showroom</span>
          </h1>
          <div className="showroom-title w-32 h-[1px] bg-gold/50 mx-auto"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24 bg-white text-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep-navy/10 border border-deep-navy/10">
            <div className="space-y-4 bg-white p-8 text-center">
              <Shield className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Unrivaled Privacy</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Discreet acquisition and management services for the most discerning clients in the region.</p>
            </div>
            <div className="space-y-4 bg-white p-8 text-center">
              <Award className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Architectural Merit</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Every property in our showroom is selected for its exceptional design and structural integrity.</p>
            </div>
            <div className="space-y-4 bg-white p-8 text-center">
              <Star className="mx-auto text-gold" size={32} strokeWidth={1} />
              <h3 className="font-montserrat text-sm uppercase tracking-widest">Prime Positioning</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Strategically located assets in Kampala's high-growth corridors and prestigious suburbs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-24 sm:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <p className="text-gold font-bold text-[10px] uppercase tracking-[0.32em] mb-4">Premium tier</p>
            <h2 className="text-3xl font-montserrat font-light uppercase tracking-[0.12em] mb-4">Available Assets</h2>
            <p className="text-slate-400 font-light max-w-md">Immediate occupancy and off-plan opportunities within our premium tier.</p>
          </div>
          <Link to="/listings" className="text-gold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300">
            View All Properties <ArrowRight size={14} />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {premiumListings.map((prop, index) => (
            <Link 
              key={prop.code} 
              to={`/listing/${prop.code}`}
              className="showroom-card group block relative aspect-[4/5] overflow-hidden bg-slate-800 border border-gold/10"
            >
              <img 
                src={(prop.images && prop.images.length > 0) ? prop.images[0] : showroomImages[index % showroomImages.length]} 
                alt={prop.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2">{prop.location.neighborhood}</p>
                <h3 className="text-2xl font-montserrat font-light mb-4">{prop.title}</h3>
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
      <section className="py-28 sm:py-36 bg-white text-deep-navy text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-light uppercase tracking-[0.12em] mb-8">Secure Your Legacy</h2>
          <p className="text-slate-500 font-light mb-12 text-lg italic font-cormorant">"Real estate is the only investment that returns both capital and character."</p>
          <Link 
            to="/contact" 
            className="inline-block bg-deep-navy text-white px-10 sm:px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-gold transition-colors duration-500"
          >
            Request Private Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
