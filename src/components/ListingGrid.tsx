interface ListingGridProps {
  listings: any[];
  title?: string;
  subtitle?: string;
}
import ListingCard from './ListingCard';

export default function ListingGrid({ listings, title = "Featured Properties", subtitle = "Explore our handpicked selection of premium real estate." }: ListingGridProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-gray-500 text-[15px]">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div key={listing.code}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
