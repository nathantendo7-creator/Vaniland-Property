import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, ArrowLeft, Phone, Mail, CheckCircle2 } from 'lucide-react';
import PropertyMap from '../components/PropertyMap';

export default function ListingDetail() {
  const { code } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/listing/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Listing not found');
        return res.json();
      })
      .then(data => {
        setListing(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
        <h2 className="text-2xl font-montserrat text-deep-navy mb-4">Property Not Found</h2>
        <p className="text-slate-500 mb-8">{error}</p>
        <Link to="/listings" className="text-gold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Listings
        </Link>
      </div>
    );
  }

  const formattedPrice = listing.price
    ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: listing.currency }).format(listing.price)
    : 'Contact for valuation';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="h-[50vh] min-h-[400px] relative bg-slate-200">
        <img
          src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80`}
          alt={listing.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/listings" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 text-sm uppercase tracking-wider font-medium transition-colors">
              <ArrowLeft size={16} /> Back to Properties
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {listing.status.replace('-', ' ')}
              </span>
              {listing.premium && (
                <span className="bg-deep-navy/80 backdrop-blur text-gold border border-gold/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Premium Collection
                </span>
              )}
              <span className="text-white/80 font-mono text-sm ml-auto">REF: {listing.code}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-light text-white mb-2">{listing.title}</h1>
            <p className="text-xl text-slate-200 flex items-center gap-2 font-light">
              <MapPin size={20} className="text-gold" />
              {listing.location.neighborhood}, {listing.location.district}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-montserrat text-deep-navy mb-6 uppercase tracking-widest">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                  <Bed size={24} className="text-gold mb-2" />
                  <span className="text-2xl font-light text-deep-navy">{listing.bedrooms}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
                  <Bath size={24} className="text-gold mb-2" />
                  <span className="text-2xl font-light text-deep-navy">{listing.bathrooms}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg col-span-2 md:col-span-2">
                  <span className="text-2xl font-light text-deep-navy mb-1">{listing.type}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Property Type</span>
                </div>
              </div>
            </section>

            {listing.description && (
              <section>
                <h2 className="text-2xl font-montserrat text-deep-navy mb-6 uppercase tracking-widest">Description</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
                  <p>{listing.description}</p>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-montserrat text-deep-navy mb-6 uppercase tracking-widest">Location</h2>
              <div className="h-[400px]">
                <PropertyMap location={listing.location} />
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-deep-navy text-white p-8 rounded-xl shadow-xl border border-white/10">
              <p className="text-sm text-gold uppercase tracking-widest mb-2 font-medium">Asking Price</p>
              <p className="text-3xl font-light mb-8">{formattedPrice}</p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Call Us</p>
                    <p className="font-medium">+256-758-589258</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Email</p>
                    <p className="font-medium">info@VanilandProperty.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-lg font-montserrat mb-4">Interested in this property?</h3>
                <Link
                  to={`/contact?property=${listing.code}`}
                  className="block w-full text-center bg-gold hover:bg-yellow-600 text-white py-4 rounded-lg uppercase tracking-widest text-sm font-bold transition-colors shadow-lg"
                >
                  Schedule a Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
