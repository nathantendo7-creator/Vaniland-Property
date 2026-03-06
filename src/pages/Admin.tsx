import { useState, useEffect } from 'react';
import { Users, Home, Phone, Mail, Clock, Plus, Trash2, X, Edit2, Image as ImageIcon, Save, MessageSquare, Star } from 'lucide-react';

interface Property {
  code: string;
  title: string;
  type: string;
  status: string;
  price: number;
  location: {
    district: string;
    neighborhood: string;
  };
  images: string[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
}

const INITIAL_FORM_STATE: Property = {
  code: '',
  title: '',
  type: 'apartment',
  status: 'for-sale',
  price: 0,
  location: { district: 'Kampala', neighborhood: '' },
  images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'],
  description: '',
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  features: []
};

export default function Admin() {
  const [leads, setLeads] = useState<any[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'properties' | 'feedback'>('leads');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [formData, setFormData] = useState<Property>(INITIAL_FORM_STATE);

  const fetchData = async () => {
    try {
      const [leadsRes, propsRes, feedbackRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/search'),
        fetch('/api/feedback')
      ]);
      if (leadsRes.ok && propsRes.ok && feedbackRes.ok) {
        setLeads(await leadsRes.json());
        setProperties(await propsRes.json());
        setFeedback(await feedbackRes.json());
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingCode(null);
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setFormData({
      ...INITIAL_FORM_STATE,
      ...prop,
      location: { ...INITIAL_FORM_STATE.location, ...prop.location },
      images: prop.images?.length ? prop.images : INITIAL_FORM_STATE.images
    });
    setEditingCode(prop.code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCode(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    const method = editingCode ? 'PUT' : 'POST';
    const url = editingCode ? `/api/properties/${editingCode}` : '/api/properties';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingCode ? 'Listing updated!' : 'Listing published!');
        await fetchData();
        closeModal();
      } else {
        const err = await response.json();
        alert(`Error: ${err.error || 'Failed to save'}`);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Network error. Is the server running?");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (code: string) => {
    if (!window.confirm(`Delete property ${code}?`)) return;
    try {
      const res = await fetch(`/api/properties/${code}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Delete this lead record?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Delete lead error:", err);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Delete feedback error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-deep-navy text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-montserrat tracking-widest font-light">VANILAND</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-gold' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Users size={18} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'properties' ? 'bg-gold' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Home size={18} /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'feedback' ? 'bg-gold' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <MessageSquare size={18} /> Feedback
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-montserrat font-light text-deep-navy uppercase tracking-widest">
              {activeTab === 'leads' ? 'Lead Management' : activeTab === 'properties' ? 'Property Inventory' : 'User Feedback'}
            </h2>
            <div className="w-12 h-1 bg-gold mt-2 rounded-full"></div>
          </div>
          {activeTab === 'properties' && (
            <button 
              onClick={openAddModal}
              className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-gold/20 transition-all"
            >
              <Plus size={18} /> Add Listing
            </button>
          )}
        </header>

        {activeTab === 'leads' ? (
          <div className="grid gap-6">
            {leads.length > 0 ? (
              leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((lead) => (
                <div key={lead.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold/30 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-deep-navy text-xl">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-deep-navy">{lead.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock size={12} /> {new Date(lead.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={14} className="text-slate-400" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone size={14} className="text-slate-400" /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="text-[10px] font-bold text-slate-400 uppercase w-16">Goal:</span>
                          <span className="capitalize px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">{lead.goal}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="text-[10px] font-bold text-slate-400 uppercase w-16">Budget:</span>
                          <span className="text-gold font-bold">{lead.budget || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Inquiry Ref</div>
                        <div className="text-gold font-mono font-bold text-lg">#{lead.propertyCode || 'GENERAL'}</div>
                      </div>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="mt-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <Users className="mx-auto h-12 w-12 text-slate-200 mb-4" />
                <p className="text-slate-400 italic">No inquiries captured yet.</p>
              </div>
            )}
          </div>
        ) : activeTab === 'properties' ? (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type/Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((prop) => (
                  <tr key={prop.code} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img 
                          src={prop.images?.[0]} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-sm text-slate-600">
                      {prop.type.replace('-', ' ')} • <span className="text-xs font-bold text-blue-500 uppercase">{prop.status.replace('-', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-deep-navy">
                      UGX {new Intl.NumberFormat('en-UG').format(prop.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(prop)} className="p-2 text-slate-300 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(prop.code)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-6">
            {feedback.length > 0 ? (
              feedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((f) => (
                <div key={f.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-gold/30 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center font-bold text-gold text-xl">
                            {f.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-deep-navy">{f.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Clock size={12} /> {new Date(f.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className={star <= f.rating ? "text-gold fill-gold" : "text-slate-200"} />
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm italic">
                        "{f.message}"
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={12} /> {f.email}
                      </div>
                    </div>

                    <div className="flex flex-col justify-end items-end shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <button 
                        onClick={() => handleDeleteFeedback(f.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        title="Delete Feedback"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <MessageSquare className="mx-auto h-12 w-12 text-slate-200 mb-4" />
                <p className="text-slate-400 italic">No feedback received yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-navy/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-deep-navy">{editingCode ? 'Edit Listing' : 'New Listing'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-deep-navy"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex-grow overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Code</label>
                  <input 
                    required disabled={!!editingCode}
                    value={formData.code} 
                    onChange={e => setFormData({...formData, code: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold disabled:opacity-50"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Title</label>
                  <input 
                    required
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Type</label>
                  <select 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="office">Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                  >
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <input 
                      required
                      value={formData.images[0] || ''} 
                      onChange={e => setFormData({...formData, images: [e.target.value]})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Price (UGX)</label>
                  <input 
                    type="number" required
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Neighborhood</label>
                  <input 
                    required
                    value={formData.location.neighborhood} 
                    onChange={e => setFormData({...formData, location: {...formData.location, neighborhood: e.target.value}})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-gold"
                  />
                </div>
              </div>
              
              <div className="mt-10 flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-6 py-3 font-bold text-slate-400 hover:text-deep-navy transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-gold hover:bg-gold/90 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-gold/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingCode ? 'Save Changes' : 'Publish Listing')}
                  {!saving && <Save size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
