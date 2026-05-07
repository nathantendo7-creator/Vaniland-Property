import { http, HttpResponse } from 'msw';
import seedData from '../../seed/seed-properties.json';

const getProperties = () => {
  return seedData;
};

export const handlers = [
  // Intercept Search API
  http.get('/api/search', ({ request }) => {
    const url = new URL(request.url);
    let status = url.searchParams.get('status');
    const goal = url.searchParams.get('goal');
    const type = url.searchParams.get('type');
    const district = url.searchParams.get('district');
    const priceMin = url.searchParams.get('priceMin');
    const priceMax = url.searchParams.get('priceMax');
    const beds = url.searchParams.get('beds');
    const q = url.searchParams.get('q');

    // Map goal to status
    if (!status && goal) {
      if (goal === 'buy') status = 'for-sale';
      if (goal === 'rent') status = 'for-rent';
    }

    let results = [...getProperties()];

    if (status) results = results.filter((p: any) => p.status === status);
    if (type) results = results.filter((p: any) => p.type === type);
    if (district) results = results.filter((p: any) => p.location.district.toLowerCase() === district.toLowerCase());
    if (priceMin) results = results.filter((p: any) => p.price && p.price >= Number(priceMin));
    if (priceMax) results = results.filter((p: any) => p.price && p.price <= Number(priceMax));
    if (beds) results = results.filter((p: any) => p.bedrooms >= Number(beds));
    if (q) {
      const query = q.toLowerCase();
      results = results.filter((p: any) => 
        p.title.toLowerCase().includes(query) || 
        p.location.neighborhood.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query)
      );
    }

    return HttpResponse.json(results);
  }),

  // Intercept Listing Detail API
  http.get('/api/listing/:code', ({ params }) => {
    const { code } = params;
    const listing = getProperties().find((p: any) => p.code === code);
    
    if (listing) {
      return HttpResponse.json(listing);
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),
];
