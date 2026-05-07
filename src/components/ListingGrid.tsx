import { useRef } from 'react';
import ListingCard from './ListingCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ListingGridProps {
  listings: any[];
  title?: string;
  subtitle?: string;
}

export default function ListingGrid({ listings, title = "Featured Properties", subtitle = "Explore our handpicked selection of premium real estate." }: ListingGridProps) {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!listings.length) return;

    // Header reveal
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 90%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Card reveals with clip-path (The "Luxury Reveal")
    const cards = gsap.utils.toArray('.listing-card-wrapper');
    cards.forEach((card: any) => {
      const image = card.querySelector('img');
      const content = card.querySelector('.card-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      tl.fromTo(card, 
        { clipPath: 'inset(100% 0% 0% 0%)' }, 
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' }
      )
      .from(image, {
        scale: 1.3,
        duration: 2,
        ease: 'power2.out'
      }, 0)
      .from(content, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8');
    });
  }, { scope: container, dependencies: [listings] });

  return (
    <section ref={container} className="py-24 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div ref={titleRef} className="mb-14 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-gold font-bold text-[10px] uppercase tracking-[0.32em] mb-4">Featured portfolio</p>
            <h2 className="text-3xl md:text-5xl font-montserrat font-light tracking-[0.08em] uppercase mb-5">{title}</h2>
            <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">{subtitle}</p>
          </div>
          <div className="hidden lg:block w-40 h-px bg-gold/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
          {listings.map((listing) => (
            <div key={listing.code} className="listing-card-wrapper overflow-hidden bg-white">
              <div className="card-content">
                <ListingCard listing={listing} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
