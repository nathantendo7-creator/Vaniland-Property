import { Link } from 'react-router-dom';
import { Bath, Bed, ChevronLeft, ChevronRight, Heart, MapPin, Maximize2 } from 'lucide-react';
import { useState, type MouseEvent } from 'react';

interface ListingProps {
  listing: any;
  key?: any;
}

export default function ListingCard({ listing }: ListingProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = listing.images?.length > 0 ? listing.images : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];

  const nextImage = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const formattedPrice = listing.price ? `UGX ${new Intl.NumberFormat('en-UG').format(listing.price)}` : 'Contact for Price';

  return (
    <Link to={`/listing/${listing.code}`} className="group block bg-white border border-deep-navy/10 overflow-hidden hover:shadow-2xl hover:shadow-deep-navy/10 transition-all duration-500 relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <img
          src={images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-14">
          <span className="bg-deep-navy/85 text-gold text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.18em] backdrop-blur-md border border-gold/30">
            Vaniland
          </span>
          {listing.status === 'for-sale' && (
            <span className="bg-gold text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.18em] w-fit shadow-lg">
              For Sale
            </span>
          )}
        </div>

        <button className="absolute top-4 right-4 p-2.5 bg-deep-navy/35 hover:bg-gold transition-all backdrop-blur-sm group/heart" aria-label="Save listing">
          <Heart size={18} className="text-white group-hover/heart:fill-white" />
        </button>

        <div className="absolute inset-y-0 left-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={prevImage} className="bg-white/90 p-2 shadow-xl hover:bg-gold hover:text-white transition-all" aria-label="Previous image"><ChevronLeft size={14} /></button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={nextImage} className="bg-white/90 p-2 shadow-xl hover:bg-gold hover:text-white transition-all" aria-label="Next image"><ChevronRight size={14} /></button>
        </div>

        <div className="absolute bottom-4 left-4 bg-deep-navy/70 text-white text-[9px] font-bold px-2.5 py-1.5 backdrop-blur-sm tracking-widest">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        <div className="flex justify-between gap-5 items-start">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold mb-2 flex items-center gap-1.5">
              <MapPin size={12} /> {listing.location.neighborhood}
            </p>
            <h3 className="text-xl font-montserrat font-medium text-deep-navy group-hover:text-gold transition-colors line-clamp-2">
              {listing.title}
            </h3>
          </div>
          <span className="text-base text-right font-semibold text-deep-navy tracking-tight shrink-0 max-w-[150px]">
            {formattedPrice}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-[10px] text-deep-navy/60 font-bold uppercase tracking-widest pt-4 border-t border-deep-navy/10">
          <span className="flex items-center gap-1.5"><Bed size={14} className="text-gold" /> {listing.bedrooms} Bed</span>
          <span className="flex items-center gap-1.5"><Bath size={14} className="text-gold" /> {listing.bathrooms} Bath</span>
          <span className="flex items-center gap-1.5"><Maximize2 size={14} className="text-gold" /> {listing.area || 1200}</span>
        </div>
      </div>
    </Link>
  );
}
