import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ListingGrid from '../components/ListingGrid';

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    fetch('/api/search?status=for-rent')
      .then(res => res.json())
      .then(data => setFeaturedListings(data.slice(0, 6)))
      .catch(err => console.error("Failed to fetch listings:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <ListingGrid listings={featuredListings} title="Featured Rentals" subtitle="Discover our top picks for residential and commercial rentals in prime locations." />
    </div>
  );
}
