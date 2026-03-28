import React from 'react';
import { Layout, CreditCard, User, Bell, Search, Menu } from 'lucide-react';
import { useAIStore } from '../../store/useAIStore';

export const Header: React.FC = () => {
  const { credits } = useAIStore();

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Layout size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">VisualSynth <span className="text-violet-500">AI</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground">Workspace</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Assets</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
          <CreditCard size={14} className="text-violet-400" />
          <span className="text-xs font-bold">{credits} <span className="text-muted-foreground font-normal">Credits</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full text-muted-foreground transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-indigo-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <User size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
