import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const goal = searchParams.get('goal') || 'buy';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyCode: '',
    goal: goal,
    budget: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', propertyCode: '', goal: 'buy', budget: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Pattern Header */}
      <div className="h-[340px] w-full bg-deep-navy flex flex-col items-center justify-center text-center px-4 relative overflow-hidden border-b border-gold/30">
        {/* Diagonal Lines Pattern in Gold */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C1A36F 0, #C1A36F 1px, transparent 0, transparent 20px)' }}></div>
        
        <div className="relative z-10">
          <p className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Consultation Request</p>
          <h1 className="text-4xl md:text-6xl font-montserrat font-light text-white uppercase tracking-widest mb-6">
            Begin your <span className="font-serif-luxury lowercase tracking-normal text-gold">journey</span>
          </h1>
          <p className="text-white/50 font-serif-luxury text-xl">Tell us how we can guide you.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-24 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Form Side */}
          <div className="flex-grow max-w-2xl bg-white p-12 shadow-2xl rounded-sm border border-gold/10">
            <h2 className="text-2xl font-montserrat font-light uppercase tracking-widest text-deep-navy mb-12 flex items-center gap-4">
              Inquiry Form <div className="h-[1px] flex-grow bg-gold/30"></div>
            </h2>
            
            {status === 'success' ? (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Send className="text-gold" size={32} />
                </div>
                <h3 className="text-2xl font-montserrat font-light text-deep-navy uppercase tracking-widest mb-4">Request Received</h3>
                <p className="font-serif-luxury text-lg text-slate-500 mb-10">Thank you for reaching out. An expert consultant will contact you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="font-bold text-[10px] uppercase tracking-widest text-gold hover:text-deep-navy transition-colors border-b border-gold pb-1"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-b border-slate-200 py-3 focus:border-gold outline-none transition-colors text-[15px] bg-transparent text-deep-navy"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b border-slate-200 py-3 focus:border-gold outline-none transition-colors text-[15px] bg-transparent text-deep-navy"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-b border-slate-200 py-3 focus:border-gold outline-none transition-colors text-[15px] bg-transparent text-deep-navy"
                      placeholder="+256..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Inquiry Type</label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full border-b border-slate-200 py-3 focus:border-gold outline-none transition-colors text-[15px] bg-transparent text-deep-navy appearance-none"
                    >
                      <option value="buy">Property Acquisition</option>
                      <option value="rent">Residential/Commercial Rental</option>
                      <option value="sell">Property Listing</option>
                      <option value="invest">Investment Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Consultancy Brief (Optional)</label>
                  <textarea
                    rows={1}
                    className="w-full border-b border-slate-200 py-3 focus:border-gold outline-none transition-colors text-[15px] bg-transparent text-deep-navy resize-none"
                    placeholder="Briefly describe your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-deep-navy text-gold px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-xl disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>

          {/* Luxury CTA Side */}
          <div className="lg:w-1/3">
            <div className="relative aspect-[3/4] overflow-hidden group shadow-2xl border border-gold/20">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                alt="Vaniland Expert"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-deep-navy/30"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="bg-white p-10 shadow-2xl relative overflow-hidden border border-gold/10">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold"></div>
                  <h3 className="text-2xl font-montserrat font-light uppercase tracking-widest text-deep-navy mb-6">Expert <br/>Guidance</h3>
                  <p className="font-serif-luxury text-lg text-slate-500 leading-relaxed mb-8">
                    Our senior consultants provide bespoke market analysis for high-net-worth acquisitions and elite developments.
                  </p>
                  <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold border-b border-gold pb-1 hover:text-deep-navy hover:border-deep-navy transition-all">
                    Meet the team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
