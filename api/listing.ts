import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { code } = req.query;
    const seedPath = path.resolve(process.cwd(), 'seed/seed-properties.json');
    const properties = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

    const listing = properties.find((p: any) => p.code === code);
    
    if (listing) {
      return res.status(200).json(listing);
    } else {
      return res.status(404).json({ error: "Listing not found" });
    }
  } catch (error) {
    console.error("Listing fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
