import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { to: '/buy', label: 'Buy' },
    { to: '/rent', label: 'Rent' },
    { to: '/sell', label: 'Sell' },
    { to: '/showroom', label: 'Showroom' },
    { to: '/feedback', label: 'Feedback' },
  ];

  return (
    <nav className="bg-deep-navy/95 text-white sticky top-0 z-[100] min-h-20 flex items-center border-b border-gold/20 shadow-xl shadow-black/15 backdrop-blur-xl">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="font-montserrat text-xl sm:text-2xl font-light tracking-[0.26em] uppercase text-gold group-hover:text-white transition-colors">VANILAND</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="text-[11px] uppercase tracking-widest font-semibold text-white/70 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <Link to="/contact" className="border border-gold/30 px-5 py-3 text-[10px] uppercase tracking-[0.22em] font-bold text-gold hover:bg-gold hover:text-white transition-all">Contact</Link>
            <a 
              href="https://wa.me/256758589258" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-all flex items-center gap-2 group text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              Chat
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold p-2" aria-label="Toggle navigation">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-deep-navy border-b border-gold/20 shadow-2xl py-8 px-6 space-y-6">
          {[...links, { to: '/contact', label: 'Contact' }].map((link) => (
            <Link key={link.to} to={link.to} className="block text-[11px] uppercase tracking-widest font-bold text-white/80" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/10">
            <a 
              href="https://wa.me/256758589258" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gold text-[11px] uppercase tracking-widest font-bold"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
