import React from 'react';
import { useAIStore } from '../../store/useAIStore';
import { Sliders, Zap, Sparkles, Layers, Palette, Type } from 'lucide-react';
import { motion } from 'motion/react';

export const ControlPanel: React.FC = () => {
  const { settings, updateSettings, stage, credits } = useAIStore();

  const presets = ['Minimal', 'Brutalist', 'Glass', 'Futuristic'];

  const Slider = ({ label, icon: Icon, value, field }: { label: string, icon: any, value: number, field: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Icon size={14} />
          {label}
        </div>
        <span className="text-xs font-mono text-violet-400">{value}%</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value}
        onChange={(e) => updateSettings({ [field]: parseInt(e.target.value) })}
        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
      />
    </div>
  );

  return (
    <div className="glass rounded-2xl p-6 space-y-8 w-full max-w-sm">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <Sliders size={18} className="text-violet-500" />
        <h2 className="font-semibold">Similarity Control</h2>
      </div>

      <div className="space-y-6">
        <Slider label="Layout Similarity" icon={Layers} value={settings.layout} field="layout" />
        <Slider label="Color Similarity" icon={Palette} value={settings.color} field="color" />
        <Slider label="Typography Similarity" icon={Type} value={settings.typography} field="typography" />
        <Slider label="Creativity Level" icon={Sparkles} value={settings.creativity} field="creativity" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Style Presets</span>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(p => (
            <button
              key={p}
              onClick={() => updateSettings({ preset: p })}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${settings.preset === p 
                  ? 'bg-violet-500 text-white neon-glow' 
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-muted-foreground">Credits remaining</span>
          <span className="text-xs font-bold text-violet-400">{credits}</span>
        </div>
        <button 
          disabled={stage !== 'idle' && stage !== 'completed' && stage !== 'error'}
          className="w-full py-3 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-500/20"
        >
          <Zap size={18} />
          {stage === 'idle' ? 'Generate UI' : 'Regenerate'}
        </button>
      </div>
    </div>
  );
};
