import React from 'react';
import { Message, MessageType } from '../../types';
import { Heart, MoreHorizontal, Crown } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isOwn?: boolean;
  onLike: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwn, onLike }) => {
  if (message.type === MessageType.SYSTEM) {
    return (
      <div className="flex justify-center my-4 px-4">
        <div className="bg-slate-800/50 border border-tupa-500/30 text-tupa-100 text-xs py-2 px-4 rounded-full text-center shadow-lg backdrop-blur-sm">
          ✨ {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 px-4 py-3 hover:bg-white/5 transition duration-200 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        <img 
          src={message.userAvatar} 
          alt={message.userName} 
          className={`w-10 h-10 rounded-full object-cover border-2 ${message.isVip ? 'border-amber-400' : 'border-slate-700'}`}
        />
        {message.isVip && (
          <div className="absolute -top-1 -right-1 bg-amber-400 text-black p-[2px] rounded-full">
            <Crown size={10} fill="black" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[85%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-bold ${message.isVip ? 'text-amber-400' : 'text-slate-200'}`}>
            {message.userName}
          </span>
          <span className="text-xs text-slate-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className={`text-sm leading-relaxed text-slate-300 ${isOwn ? 'bg-tupa-700/50 p-3 rounded-2xl rounded-tr-none' : ''}`}>
          {message.content}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onLike(); }}
            className="flex items-center gap-1 text-slate-500 hover:text-pink-500 transition text-xs group"
          >
            <Heart size={14} className={message.likes > 0 ? "fill-pink-500 text-pink-500" : "group-hover:scale-110 transition"} />
            <span>{message.likes > 0 ? message.likes : 'Curtir'}</span>
          </button>
          <button className="text-slate-600 hover:text-white transition">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;