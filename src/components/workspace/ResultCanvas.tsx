import React from 'react';
import { useAIStore } from '../../store/useAIStore';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Code, Share2, Maximize2, CheckCircle2, Sparkles } from 'lucide-react';

export const ResultCanvas: React.FC = () => {
  const { resultImage, stage, progress } = useAIStore();

  const stages = [
    { id: 'analyzing', label: 'Analyzing Image...' },
    { id: 'extracting', label: 'Extracting Design System...' },
    { id: 'generating', label: 'Generating Layout...' },
    { id: 'enhancing', label: 'Enhancing UI...' },
    { id: 'finalizing', label: 'Finalizing Output...' },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-sm font-medium">AI Generation Workspace</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground transition-colors">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {resultImage ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col gap-6"
            >
              <div className="relative group rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={resultImage} alt="Result" className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="px-4 py-2 bg-violet-500 rounded-lg font-medium flex items-center gap-2 hover:bg-violet-400 transition-colors">
                    <Download size={18} /> Export PNG
                  </button>
                  <button className="px-4 py-2 bg-white/10 rounded-lg font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
                    <Code size={18} /> Get Code
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass p-4 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Design Score</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">94</span>
                    <span className="text-xs text-green-500 mb-1">/ 100</span>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Fidelity</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold">High</span>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Variations</span>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-violet-500/20 flex items-center justify-center text-[10px] font-bold">
                          V{i}
                        </div>
                      ))}
                    </div>
                    <button className="text-xs text-violet-400 hover:underline">+ Generate more</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : stage !== 'idle' ? (
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-4">
                {stages.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors
                      ${i < currentStageIndex ? 'bg-green-500/20 text-green-500' : 
                        i === currentStageIndex ? 'bg-violet-500/20 text-violet-500 animate-pulse' : 
                        'bg-white/5 text-muted-foreground'}
                    `}>
                      {i < currentStageIndex ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <span className={`text-sm font-medium transition-colors
                      ${i <= currentStageIndex ? 'text-foreground' : 'text-muted-foreground'}
                    `}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-violet-500 neon-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                <Sparkles size={32} className="text-violet-500/50" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Ready to Transform</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Upload your images and configure settings to start the AI design engine.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
