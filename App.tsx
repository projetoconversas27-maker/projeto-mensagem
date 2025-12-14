import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon, Bell, Search, Send, PlusCircle, Home, Calendar, MessageCircle, Menu, LogOut, Flame } from 'lucide-react';
import { User, Message, Event, MessageType } from './types';
import { INITIAL_EVENTS, INITIAL_MESSAGES } from './constants';
import { generateAIResponse } from './services/geminiService';
import AuthModal from './components/ui/AuthModal';
import EventCard from './components/ui/EventCard';
import ChatMessage from './components/ui/ChatMessage';
import CreateEventModal from './components/ui/CreateEventModal';

function App() {
  // Global State
  const [user, setUser] = useState<User | null>(null);
  
  // UI State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState("");
  const [activeTab, setActiveTab] = useState<'chat' | 'events'>('chat'); // For mobile toggle logic
  
  // Data State
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auth Gate Function: The core UX requirement
  const requireAuth = (action: () => void, reason: string) => {
    if (user) {
      action();
    } else {
      setAuthReason(reason);
      setIsAuthModalOpen(true);
    }
  };

  // Mock Login
  const handleLogin = () => {
    setUser({
      id: 'me',
      name: 'Visitante Vip',
      avatarUrl: 'https://picsum.photos/50/50?random=100',
      isVip: false
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Interaction Handlers
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    requireAuth(async () => {
      const newUserMsg: Message = {
        id: Date.now().toString(),
        userId: user!.id,
        userName: user!.name,
        userAvatar: user!.avatarUrl,
        content: inputValue,
        timestamp: Date.now(),
        type: MessageType.TEXT,
        likes: 0,
        isVip: user!.isVip
      };

      setMessages(prev => [...prev, newUserMsg]);
      setInputValue("");
      setIsTyping(true);

      // Simulate AI/Bot response
      try {
        // Only reply sometimes or if addressed (Simulated by 100% here for demo)
        const responseText = await generateAIResponse(newUserMsg.content);
        
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                userId: 'system',
                userName: 'TUPÃ Bot',
                userAvatar: 'https://picsum.photos/50/50?random=99',
                content: responseText,
                timestamp: Date.now(),
                type: MessageType.TEXT,
                likes: 0,
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
      } catch (e) {
          setIsTyping(false);
      }

    }, "Entre para conversar com a galera!");
  };

  const handleCreateEventClick = () => {
    requireAuth(() => {
      setIsCreateEventModalOpen(true);
    }, "Crie sua conta para divulgar eventos!");
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'attendees' | 'isSponsored'>) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      attendees: 1, // The creator attends automatically
      isSponsored: false
    };
    
    // Add new event to the beginning of the list
    setEvents(prev => [newEvent, ...prev]);
    setIsCreateEventModalOpen(false);
    
    // Optional: Send a message to chat about the new event
    const systemMsg: Message = {
      id: Date.now().toString() + '_sys',
      userId: 'system',
      userName: 'TUPÃ Bot',
      userAvatar: 'https://picsum.photos/50/50?random=99',
      content: `🔥 Novo evento criado: "${newEvent.title}" em ${newEvent.location}!`,
      timestamp: Date.now(),
      type: MessageType.SYSTEM,
      likes: 0
    };
    setMessages(prev => [...prev, systemMsg]);
  };

  const handleLikeMessage = (id: string) => {
    requireAuth(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      ));
    }, "Entre para curtir mensagens!");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 max-w-7xl mx-auto shadow-2xl overflow-hidden relative">
      
      {/* --- HEADER --- */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
           {/* Mobile Menu Icon (Visual only) */}
           <button className="lg:hidden text-white mr-2">
            <Menu size={24} />
           </button>
           <h1 className="text-2xl font-black bg-gradient-to-r from-tupa-400 to-tupa-accent bg-clip-text text-transparent tracking-tighter">
            TUPÃ
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="p-2 text-slate-400 hover:text-white transition relative"
            onClick={() => requireAuth(() => alert("Notificações"), "Veja suas notificações!")}
          >
            <Bell size={20} />
            {user && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                <img src={user.avatarUrl} alt="Me" className="w-8 h-8 rounded-full border border-tupa-500" />
                <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-red-400">
                    <LogOut size={16}/>
                </button>
            </div>
          ) : (
            <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 bg-slate-100 text-slate-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition"
            >
                <UserIcon size={16} />
                <span className="hidden sm:inline">Entrar / Cadastrar</span>
                <span className="sm:hidden">Entrar</span>
            </button>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        
        {/* EVENT HIGHLIGHTS SECTION (Horizontal Scroll) */}
        <div className="flex-shrink-0 bg-slate-950/50 backdrop-blur-sm z-10 border-b border-slate-800 pb-2">
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-white font-bold flex items-center gap-2">
                    <Flame size={18} className="text-orange-500 fill-orange-500" />
                    Destaques
                </h2>
                <button className="text-xs text-tupa-400 font-semibold hover:text-white transition">
                    Ver todos
                </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar snap-x snap-mandatory">
                <div 
                    onClick={handleCreateEventClick}
                    className="flex-shrink-0 w-24 flex flex-col items-center justify-center gap-2 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl hover:bg-slate-800 hover:border-tupa-500 cursor-pointer transition snap-start"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-tupa-400">
                        <PlusCircle size={24} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold text-center leading-tight">Criar<br/>Evento</span>
                </div>
                {events.map(event => (
                    <div key={event.id} className="snap-start">
                        <EventCard event={event} onInteract={() => requireAuth(() => alert(`Abrindo ${event.title}`), "Entre para ver detalhes do evento!")} />
                    </div>
                ))}
            </div>
        </div>

        {/* GLOBAL CHAT SECTION (Fill remaining space) */}
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-slate-950 to-tupa-900/20 relative">
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 custom-scrollbar scroll-smooth">
                {/* Chat Header inside feed */}
                <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/50 flex justify-between items-center">
                    <span>Chat Global • Ao Vivo</span>
                    <span className="flex items-center gap-1 text-emerald-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        1.2k online
                    </span>
                </div>

                <div className="py-2">
                    {messages.map((msg, index) => (
                        <ChatMessage 
                            key={msg.id} 
                            message={msg} 
                            isOwn={user?.id === msg.userId}
                            onLike={() => handleLikeMessage(msg.id)}
                        />
                    ))}
                    {isTyping && (
                         <div className="px-4 py-2 text-xs text-slate-500 italic flex items-center gap-1">
                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></span>
                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                            TUPÃ Bot digitando...
                         </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Chat Input Area (Fixed Bottom above Nav) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pb-4 lg:pb-4 z-30">
                <div className="relative max-w-2xl mx-auto flex items-end gap-2">
                    <div className="flex-1 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700 focus-within:border-tupa-500 focus-within:ring-1 focus-within:ring-tupa-500/50 transition-all flex items-center overflow-hidden">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Mande um salve pra galera..."
                            className="w-full bg-transparent text-white p-4 outline-none placeholder:text-slate-500"
                        />
                        <button 
                            className="p-3 text-slate-400 hover:text-white transition"
                            onClick={() => requireAuth(() => alert("Camera"), "Entre para enviar fotos!")}
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div>
                    <button 
                        onClick={handleSendMessage}
                        className={`p-4 rounded-full transition-all shadow-lg shadow-tupa-500/20 ${inputValue.trim() ? 'bg-tupa-500 hover:bg-tupa-600 text-white rotate-0' : 'bg-slate-800 text-slate-500 cursor-not-allowed rotate-45'}`}
                    >
                        <Send size={20} className={inputValue.trim() ? "ml-0.5" : ""} />
                    </button>
                </div>
            </div>

        </div>
      </div>

      {/* Auth Modal (Overlay) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        reason={authReason}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onSubmit={handleSaveEvent}
      />

    </div>
  );
}

export default App;