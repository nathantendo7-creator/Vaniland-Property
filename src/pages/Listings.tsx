import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import MapView from '../components/MapView';
import { Search, X, ChevronDown, Map as MapIcon, List } from 'lucide-react';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);

  const goal = searchParams.get('goal') || 'buy';
  const q = searchParams.get('q') || '';
  const district = searchParams.get('district');

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams(searchParams).toString();
    fetch(`/api/search?${query}`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch listings:", err);
        setLoading(false);
      });
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const districts = ["Kampala", "Wakiso", "Entebbe", "Mukono"];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-warm-white">
      {/* Search and Filters Bar */}
      <div className="bg-deep-navy px-4 py-3 flex flex-col gap-3 z-50 border-b border-gold/20">
        <div className="flex items-center gap-6">
          <div className="flex-grow max-w-lg relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {district && (
                <span className="bg-gold/10 text-gold px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 border border-gold/30">
                  {district} <X size={10} className="cursor-pointer" onClick={() => handleFilterChange('district', '')} />
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder="Address, neighborhood, or reference..."
              className={`w-full ${district ? 'pl-28' : 'pl-4'} pr-10 py-2.5 bg-white/5 border border-white/10 rounded-sm text-[13px] text-white focus:border-gold outline-none transition-all placeholder:text-white/20`}
              value={q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-4 text-gold hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className={`flex items-center space-x-1 border-b-2 pb-1 transition-all ${goal === 'buy' ? 'border-gold text-gold' : 'border-transparent text-white/40'}`}>
              <button onClick={() => handleFilterChange('goal', 'buy')} className="text-[11px] uppercase tracking-widest font-bold">Buy</button>
            </div>
            <div className={`flex items-center space-x-1 border-b-2 pb-1 transition-all ${goal === 'rent' ? 'border-gold text-gold' : 'border-transparent text-white/40'}`}>
              <button onClick={() => handleFilterChange('goal', 'rent')} className="text-[11px] uppercase tracking-widest font-bold">Rent</button>
            </div>
            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            <button className="text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-gold flex items-center gap-2 border border-white/10 px-4 py-2 rounded-sm hover:border-gold/50 transition-all">
              Price <ChevronDown size={14} className="text-gold" />
            </button>
            <button className="text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-gold flex items-center gap-2 border border-white/10 px-4 py-2 rounded-sm hover:border-gold/50 transition-all">
              Filters <ChevronDown size={14} className="text-gold" />
            </button>
          </div>

          <button className="ml-auto bg-gold text-white px-6 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-white hover:text-deep-navy transition-all">
            Save Search
          </button>
        </div>

        {/* Similar Districts Badges */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar border-t border-white/5 pt-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gold mr-1">Locations:</span>
          {districts.map(d => (
            <button 
              key={d}
              onClick={() => handleFilterChange('district', d)}
              className="whitespace-nowrap bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:border-gold hover:text-gold transition-all"
            >
              + {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Content */}
      <div className="flex flex-grow overflow-hidden relative">
        {/* Left Side: Map */}
        <div className={`hidden lg:block ${showMap ? 'w-1/2' : 'w-0'} h-full transition-all duration-500 border-r border-gold/10`}>
          <MapView listings={listings} />
        </div>

        {/* Right Side: List */}
        <div className={`${showMap ? 'w-full lg:w-1/2' : 'w-full'} h-full overflow-y-auto custom-scrollbar bg-warm-white px-6 py-8`}>
          <div className="flex justify-between items-end mb-10 pb-6 border-b border-deep-navy/5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Listings {district ? `in ${district}` : 'found'}</p>
              <h2 className="text-3xl font-montserrat font-light text-deep-navy uppercase tracking-widest">
                Homes for <span className="font-serif-luxury lowercase tracking-normal text-gold">{goal === 'rent' ? 'rent' : 'sale'}</span>
              </h2>
            </div>
            <div className="text-[10px] font-bold text-deep-navy/40 uppercase tracking-widest">
              {listings.length} Results Found
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {listings.map((listing: any) => (
                <ListingCard key={listing.code} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Map Toggle Button Mobile */}
        <button 
          onClick={() => setShowMap(!showMap)}
          className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 bg-deep-navy text-gold px-8 py-4 rounded-full flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl z-[1000] border border-gold/50"
        >
          {showMap ? <><List size={16} /> List View</> : <><MapIcon size={16} /> Map View</>}
        </button>
      </div>
    </div>
  );
}
