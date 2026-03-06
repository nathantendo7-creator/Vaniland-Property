import { useLocation } from 'react-router-dom';

const CONTENT: Record<string, { title: string; subtitle: string; body: string }> = {
  'property-management': {
    title: 'Property Management',
    subtitle: 'Preserving value, optimizing returns.',
    body: 'Our senior management team oversees a premium portfolio of residential and commercial assets. We provide end-to-end services including tenant vetting, maintenance coordination, and financial reporting, ensuring your investment remains a hands-off generator of wealth.'
  },
  'land-valuation': {
    title: 'Land Valuation',
    subtitle: 'Precision in market analysis.',
    body: 'Vaniland provides certified valuation services for large-scale land acquisitions and development sites. Our reports are grounded in current market data, future urban planning trends, and deep local insight.'
  },
  'investment-projects': {
    title: 'Investment Projects',
    subtitle: 'Strategic growth opportunities.',
    body: 'We identify and curate high-yield off-plan and brownfield development opportunities. From luxury multi-unit residential projects to commercial hubs, we guide investors through the full project lifecycle.'
  },
  'corporate-leasing': {
    title: 'Corporate Leasing',
    subtitle: 'Bespoke workspace solutions.',
    body: 'Tailored leasing strategies for multinational corporations and growing local enterprises. We match prime office inventory with specific operational needs, handling negotiations and fit-out advisory.'
  },
  'privacy': {
    title: 'Privacy Policy',
    subtitle: 'Your data, protected.',
    body: 'At Vaniland Property Consultants, we are committed to safeguarding your personal information. This policy outlines how we collect, use, and protect your data in accordance with international standards and local regulations.'
  },
  'terms': {
    title: 'Terms of Service',
    subtitle: 'The foundation of our partnership.',
    body: 'By engaging with Vaniland Property Consultants, you agree to our professional standards and operational terms. We prioritize transparency and integrity in every transaction.'
  }
};

export default function InfoPage() {
  const location = useLocation();
  const slug = location.pathname.split('/').pop() || '';
  const content = CONTENT[slug] || { title: 'Information', subtitle: 'Vaniland Consultancy', body: 'Content coming soon.' };

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="h-[300px] w-full bg-deep-navy flex flex-col items-center justify-center text-center px-4 relative overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C1A36F 0, #C1A36F 1px, transparent 0, transparent 20px)' }}></div>
        <div className="relative z-10">
          <p className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Vaniland Expertise</p>
          <h1 className="text-4xl md:text-5xl font-montserrat font-light text-white uppercase tracking-widest mb-4">
            {content.title}
          </h1>
          <p className="text-white/50 font-serif-luxury text-xl">{content.subtitle}</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto py-24 px-6 md:px-8">
        <div className="prose prose-slate max-w-none">
          <p className="font-serif-luxury text-2xl text-deep-navy/80 leading-relaxed mb-12 border-l-4 border-gold pl-8">
            {content.body}
          </p>
          <div className="h-[1px] w-full bg-deep-navy/10 my-16"></div>
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <p>
              As a premier consultancy in Uganda, our approach is defined by discretion, precision, and an unwavering commitment to our clients' long-term success. Whether you are expanding a corporate footprint or securing a family legacy, Vaniland provides the strategic scaffolding required for elite real estate maneuvers.
            </p>
            <p>
              Contact our head office for a detailed brief or to schedule a private consultation with one of our senior partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
