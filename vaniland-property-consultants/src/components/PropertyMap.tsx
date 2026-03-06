import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  location: {
    district: string;
    neighborhood: string;
    lat?: number | null;
    lon?: number | null;
  };
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

export default function PropertyMap({ location }: PropertyMapProps) {
  const position = getCoordinates(location);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer center={position} zoom={14} className="w-full h-full" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
