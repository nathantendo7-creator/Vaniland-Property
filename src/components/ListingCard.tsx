import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ListingProps {
  listing: any;
}

export default function ListingCard({ listing }: ListingProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = listing.images?.length > 0 ? listing.images : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link to={`/listing/${listing.code}`} className="group block bg-white border border-deep-navy/5 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-deep-navy/80 text-gold text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-sm backdrop-blur-md border border-gold/30">
            Vaniland Original
          </span>
          {listing.status === 'for-sale' && (
            <span className="bg-gold text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-sm w-fit shadow-lg">
              New Listing
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-deep-navy/20 hover:bg-gold transition-all backdrop-blur-sm group/heart">
          <Heart size={18} className="text-white group-hover/heart:fill-white" />
        </button>

        {/* Image Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={prevImage} className="bg-white/90 p-2 rounded-full shadow-xl hover:bg-gold hover:text-white transition-all"><ChevronLeft size={14} /></button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={nextImage} className="bg-white/90 p-2 rounded-full shadow-xl hover:bg-gold hover:text-white transition-all"><ChevronRight size={14} /></button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-deep-navy/60 text-white text-[9px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm tracking-widest">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">{listing.location.neighborhood}</p>
            <h3 className="text-xl font-montserrat font-medium text-deep-navy group-hover:text-gold transition-colors truncate max-w-[200px]">
              {listing.title}
            </h3>
          </div>
          <span className="text-lg font-light text-deep-navy tracking-tight">
            {listing.price ? `UGX ${new Intl.NumberFormat('en-UG').format(listing.price)}` : 'Contact for Price'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-deep-navy/60 font-medium uppercase tracking-widest pt-2 border-t border-deep-navy/5">
          <span className="flex items-center gap-1.5"><span className="text-gold">●</span> {listing.bedrooms} Bed</span>
          <span className="flex items-center gap-1.5"><span className="text-gold">●</span> {listing.bathrooms} Bath</span>
          <span className="flex items-center gap-1.5"><span className="text-gold">●</span> {listing.area || 1200} SQFT</span>
        </div>
      </div>
    </Link>
  );
}
