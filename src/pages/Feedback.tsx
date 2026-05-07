import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Star, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', rating: 5, message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center p-4 sm:p-6 relative">
      <motion.div initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="max-w-2xl w-full bg-white shadow-2xl shadow-deep-navy/10 overflow-hidden relative z-10 border border-deep-navy/10">
        <div className="bg-deep-navy p-8 sm:p-10 text-white text-center border-b border-gold/20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/15 mb-6">
            <MessageSquare className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-montserrat font-light uppercase tracking-[0.16em] mb-2">Your Feedback</h1>
          <p className="text-slate-400 font-light">Help us improve the Vaniland experience</p>
        </div>

        <div className="p-6 sm:p-10">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Star className="text-gold fill-gold" size={40} />
              </div>
              <h3 className="text-2xl font-montserrat font-light uppercase tracking-[0.12em] text-deep-navy mb-4">Thank You</h3>
              <p className="text-slate-500 mb-8">Your feedback has been received and helps us serve you better.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-gold font-bold hover:underline"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-gold outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-gold outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Rating</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                      className={`w-12 h-12 flex items-center justify-center transition-all ${
                        formData.rating >= num ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <Star size={20} fill={formData.rating >= num ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-gold outline-none transition-all resize-none"
                  placeholder="Tell us about your experience..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gold hover:bg-deep-navy text-white py-4 font-bold uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2 shadow-xl shadow-gold/20 disabled:opacity-70"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>Submit Feedback <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
