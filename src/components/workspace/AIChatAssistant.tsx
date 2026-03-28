import React from 'react';
import { MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const suggestions = [
    "Improve contrast",
    "Make it more modern",
    "Change color system",
    "Add more spacing"
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/40 hover:scale-110 transition-transform neon-glow z-50"
      >
        <MessageSquare className="text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 glass rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="p-4 bg-violet-600 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-white" />
                <span className="font-bold text-sm text-white">Design Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 h-64 overflow-y-auto p-4 space-y-4">
              <div className="bg-white/5 rounded-xl p-3 text-xs text-muted-foreground">
                Hello! I'm your AI Design Assistant. How can I help you refine your generation?
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                  <button key={s} className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] text-violet-400 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a command..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-violet-500/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-violet-500 hover:text-violet-400">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
