import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white py-20 border-t border-gold/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <h3 className="font-montserrat text-2xl font-light tracking-[0.3em] uppercase text-gold">VANILAND</h3>
            <p className="font-serif-luxury text-lg text-white/50 leading-relaxed max-w-[240px]">
              Excellence in consultancy for the discerning Ugandan real estate investor.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Navigation</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              <li><Link to="/listings?goal=buy" className="hover:text-gold transition-colors">Buy Portfolio</Link></li>
              <li><Link to="/listings?goal=rent" className="hover:text-gold transition-colors">Rentals</Link></li>
              <li><Link to="/showroom" className="hover:text-gold transition-colors">Virtual Showroom</Link></li>
              <li><Link to="/feedback" className="hover:text-gold transition-colors">Client Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Expertise</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              <li><Link to="/expertise/property-management" className="hover:text-gold transition-colors">Property Management</Link></li>
              <li><Link to="/expertise/land-valuation" className="hover:text-gold transition-colors">Land Valuation</Link></li>
              <li><Link to="/expertise/investment-projects" className="hover:text-gold transition-colors">Investment Projects</Link></li>
              <li><Link to="/expertise/corporate-leasing" className="hover:text-gold transition-colors">Corporate Leasing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Head Office</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              <li className="text-white hover:text-gold transition-colors"><a href="tel:+256758589258">+256-758-589258</a></li>
              <li className="hover:text-gold transition-colors"><a href="mailto:info@VanilandProperty.com">info@VanilandProperty.com</a></li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
            &copy; {new Date().getFullYear()} Vaniland Property Consultants. Established Excellence.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
