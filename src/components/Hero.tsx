import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (activeTab === 'sell') {
      navigate('/contact?goal=sell');
    } else {
      navigate(`/listings?goal=${activeTab}&q=${trimmedQuery}`);
    }
  };

  return (
    <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
          alt="Luxury Real Estate"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-deep-navy/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extralight text-white tracking-[0.1em] uppercase mb-4 drop-shadow-2xl">
          Find your <span className="font-serif-luxury lowercase tracking-normal">place</span>
        </h1>
        <p className="text-white/80 font-serif-luxury text-xl md:text-2xl mb-12 tracking-wide">
          Curated excellence in Ugandan real estate
        </p>
        
        <div className="bg-white/10 backdrop-blur-xl p-2 rounded-sm border border-white/20 shadow-2xl max-w-3xl mx-auto">
          <div className="flex gap-1 mb-2">
            {(['buy', 'rent', 'sell'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm ${
                  activeTab === tab 
                    ? 'bg-gold text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSearch} className="bg-white flex p-1 rounded-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="District, neighborhood, or property reference..."
              className="flex-grow py-4 px-6 text-sm outline-none text-deep-navy placeholder:text-slate-400 font-medium"
            />
            <button 
              type="submit"
              className="bg-deep-navy text-gold px-8 hover:bg-gold hover:text-white transition-all flex items-center justify-center group"
            >
              <Search size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
