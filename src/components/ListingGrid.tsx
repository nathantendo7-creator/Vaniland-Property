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
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!listings.length) return;

    const cards = gsap.utils.toArray('.listing-card-wrapper');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }, { scope: container, dependencies: [listings] });

  return (
    <section ref={container} className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-gray-500 text-[15px]">{subtitle}</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div key={listing.code} className="listing-card-wrapper">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
