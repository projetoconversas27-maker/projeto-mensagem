import React from 'react';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onInteract: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onInteract }) => {
  return (
    <div 
      className="flex-shrink-0 w-80 relative group cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-tupa-500 transition-all duration-300"
      onClick={onInteract}
    >
      {/* Image Background */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        {event.isSponsored && (
          <span className="absolute top-3 left-3 bg-tupa-accent text-slate-900 text-xs font-bold px-2 py-1 rounded-md shadow-lg shadow-tupa-accent/50">
            DESTAQUE
          </span>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); onInteract(); }}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-red-500 hover:bg-white/10 transition"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{event.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-3">{event.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-tupa-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-tupa-400" />
            <span className="truncate max-w-[100px]">{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <Users size={14} />
            <span>{event.attendees} confirmados</span>
          </div>
          <button className="text-xs bg-slate-800 hover:bg-tupa-600 text-white px-3 py-1.5 rounded-lg transition font-medium">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;