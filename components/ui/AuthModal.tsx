import React from 'react';
import { X, Mail, Facebook, Smartphone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  reason: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, reason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-tupa-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-tupa-500 to-tupa-accent rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-lg shadow-tupa-500/50">
            T
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Entre no TUPÃ</h2>
          <p className="text-slate-400 text-sm px-4">
            {reason || "Crie sua conta para curtir, comentar e marcar presença nos melhores eventos!"}
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onLogin}
            className="w-full bg-white text-slate-900 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition active:scale-95"
          >
            <Smartphone size={20} />
            Continuar com Celular
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition active:scale-95"
          >
            <Facebook size={20} />
            Continuar com Facebook
          </button>

          <button 
            onClick={onLogin}
            className="w-full bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-700 transition active:scale-95 border border-slate-700"
          >
            <Mail size={20} />
            Entrar com E-mail
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
        </div>
      </div>
    </div>
  );
};

export default AuthModal;