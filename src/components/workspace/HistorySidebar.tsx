import React from 'react';
import { useAIStore } from '../../store/useAIStore';
import { History, Clock, Star, Trash2 } from 'lucide-react';

export const HistorySidebar: React.FC = () => {
  const { history } = useAIStore();

  return (
    <div className="w-64 glass border-l border-white/10 flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <History size={18} className="text-violet-500" />
        <h2 className="font-semibold text-sm">Generation History</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40 space-y-2">
            <Clock size={32} />
            <p className="text-xs">No history yet</p>
          </div>
        ) : (
          history.map(gen => (
            <div key={gen.id} className="group relative glass rounded-xl overflow-hidden cursor-pointer hover:border-violet-500/50 transition-all">
              <img src={gen.resultImage || ''} alt="History" className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100" />
              <div className="p-2 flex justify-between items-center">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(gen.timestamp).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500" />
                  <span className="text-[10px] font-bold">{gen.score}</span>
                </div>
              </div>
              <button className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-white/5">
        <button className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          View all generations
        </button>
      </div>
    </div>
  );
};
