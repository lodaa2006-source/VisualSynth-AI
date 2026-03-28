import { create } from 'zustand';

export type GenerationStage = 
  | 'idle'
  | 'analyzing'
  | 'extracting'
  | 'generating'
  | 'enhancing'
  | 'finalizing'
  | 'completed'
  | 'error';

export interface Generation {
  id: string;
  timestamp: number;
  referenceImage: string | null;
  userImage: string | null;
  resultImage: string | null;
  score: number;
  settings: {
    similarity: number;
    layout: number;
    color: number;
    typography: number;
    creativity: number;
    preset: string;
  };
  designSystem?: {
    colors: string[];
    typography: string;
    spacing: string;
    patterns: string[];
  };
}

interface AIStore {
  stage: GenerationStage;
  progress: number;
  referenceImage: string | null;
  userImage: string | null;
  resultImage: string | null;
  history: Generation[];
  credits: number;
  settings: {
    similarity: number;
    layout: number;
    color: number;
    typography: number;
    creativity: number;
    preset: string;
  };
  
  setStage: (stage: GenerationStage) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  setReferenceImage: (img: string | null) => void;
  setUserImage: (img: string | null) => void;
  setResultImage: (img: string | null) => void;
  updateSettings: (settings: Partial<AIStore['settings']>) => void;
  addHistory: (gen: Generation) => void;
  useCredit: () => boolean;
}

export const useAIStore = create<AIStore>((set, get) => ({
  stage: 'idle',
  progress: 0,
  referenceImage: null,
  userImage: null,
  resultImage: null,
  history: [],
  credits: 50,
  settings: {
    similarity: 70,
    layout: 80,
    color: 60,
    typography: 50,
    creativity: 30,
    preset: 'Minimal',
  },

  setStage: (stage) => set({ stage }),
  setProgress: (progress) => set((state) => ({ 
    progress: typeof progress === 'function' ? progress(state.progress) : progress 
  })),
  setReferenceImage: (referenceImage) => set({ referenceImage }),
  setUserImage: (userImage) => set({ userImage }),
  setResultImage: (resultImage) => set({ resultImage }),
  updateSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),
  addHistory: (gen) => set((state) => ({ 
    history: [gen, ...state.history] 
  })),
  useCredit: () => {
    const { credits } = get();
    if (credits > 0) {
      set({ credits: credits - 1 });
      return true;
    }
    return false;
  },
}));
