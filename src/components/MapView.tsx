import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  listings: any[];
}

const getCoordinates = (location: any): [number, number] => {
  if (location.lat && location.lon) return [location.lat, location.lon];
  
  const map: Record<string, [number, number]> = {
    'kyanja': [0.3833, 32.6000],
    'kira': [0.3950, 32.6400],
    'bweyogerere': [0.3500, 32.6600],
    'namugongo': [0.3900, 32.6500],
    'ntinda': [0.3500, 32.6167],
    'buwaate': [0.4000, 32.6100],
    'najjera': [0.3800, 32.6200],
  };
  
  const key = location.neighborhood.toLowerCase();
  return map[key] || [0.3476, 32.5825]; // Default Kampala
};

export default function MapView({ listings }: MapViewProps) {
  const center: [number, number] = [0.3476, 32.5825]; // Kampala center

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer center={center} zoom={11} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((listing) => {
          const position = getCoordinates(listing.location);
          const formattedPrice = listing.price
            ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: listing.currency }).format(listing.price)
            : 'Contact for valuation';

          return (
            <Marker key={listing.code} position={position}>
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="h-24 bg-slate-200 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gold font-bold uppercase tracking-widest mb-1">
                    {listing.location.neighborhood}
                  </p>
                  <h3 className="font-montserrat font-semibold text-deep-navy mb-1 leading-tight">
                    {listing.title}
                  </h3>
                  <p className="text-sm font-bold text-deep-navy mb-3">{formattedPrice}</p>
                  <Link 
                    to={`/listing/${listing.code}`}
                    className="block w-full text-center bg-deep-navy text-white py-2 rounded text-xs font-medium hover:bg-gold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
