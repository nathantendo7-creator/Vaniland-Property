import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const seedPath = path.resolve(process.cwd(), 'seed/seed-properties.json');
    const properties = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

    let { status, type, district, priceMin, priceMax, beds, q, goal } = req.query;

    // Map goal to status if status is not provided
    if (!status && goal) {
      if (goal === 'buy') status = 'for-sale';
      if (goal === 'rent') status = 'for-rent';
    }

    let results = properties;

    if (status) results = results.filter((p: any) => p.status === status);
    if (type) results = results.filter((p: any) => p.type === type);
    if (district) results = results.filter((p: any) => p.location.district.toLowerCase() === (district as string).toLowerCase());
    if (priceMin) results = results.filter((p: any) => p.price && p.price >= Number(priceMin));
    if (priceMax) results = results.filter((p: any) => p.price && p.price <= Number(priceMax));
    if (beds) results = results.filter((p: any) => p.bedrooms >= Number(beds));
    if (q) {
      const query = (q as string).toLowerCase();
      results = results.filter((p: any) => 
        p.title.toLowerCase().includes(query) || 
        p.location.neighborhood.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query)
      );
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
