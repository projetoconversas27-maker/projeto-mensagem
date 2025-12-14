import React, { useState } from 'react';
import { X, Calendar, MapPin, Type, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Event } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: Omit<Event, 'id' | 'attendees' | 'isSponsored'>) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    imageUrl: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) return;
    
    onSubmit(formData);
    // Reset form mostly, keep random image
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      imageUrl: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
    });
  };

  const handleRandomImage = () => {
    setFormData({
      ...formData,
      imageUrl: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-tupa-700 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-tupa-accent" size={24} />
              Criar Evento
            </h2>
            <p className="text-slate-400 text-xs mt-1">Divulgue sua festa para toda a comunidade TUPÃ</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form - Scrollable Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
          
          {/* Preview Image */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden group border border-slate-700">
            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <button 
                type="button"
                onClick={handleRandomImage}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white/20 flex items-center gap-2"
              >
                <ImageIcon size={16} /> Trocar Capa
              </button>
            </div>
            <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono">
              PREVIEW
            </div>
          </div>

          <form id="create-event-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome do Evento</label>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-500">
                  <Type size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Rave do Futuro 2077"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:border-tupa-500 focus:ring-1 focus:ring-tupa-500 outline-none transition placeholder:text-slate-600"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Data e Hora</label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-500">
                    <Calendar size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Hoje, 23:00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:border-tupa-500 outline-none transition placeholder:text-slate-600"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Local</label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-500">
                    <MapPin size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Club 88"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:border-tupa-500 outline-none transition placeholder:text-slate-600"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Descrição</label>
              <textarea 
                rows={3}
                placeholder="O que vai rolar? Atrações, estilo de música..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-tupa-500 outline-none transition resize-none placeholder:text-slate-600"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl flex gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button 
            form="create-event-form"
            type="submit"
            className="flex-[2] py-3 rounded-xl font-bold bg-gradient-to-r from-tupa-600 to-tupa-500 hover:from-tupa-500 hover:to-tupa-400 text-white shadow-lg shadow-tupa-600/30 transition transform active:scale-95"
          >
            Publicar Evento
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateEventModal;