import React from 'react';
import { Header } from './components/layout/Header';
import { UploadZone } from './components/workspace/UploadZone';
import { ControlPanel } from './components/workspace/ControlPanel';
import { ResultCanvas } from './components/workspace/ResultCanvas';
import { HistorySidebar } from './components/workspace/HistorySidebar';
import { AIChatAssistant } from './components/workspace/AIChatAssistant';
import { useAIStore } from './store/useAIStore';
import { aiService } from './services/aiService';
import { motion } from 'motion/react';

export default function App() {
  const { 
    referenceImage, setReferenceImage,
    userImage, setUserImage,
    setResultImage,
    stage, setStage,
    setProgress,
    settings,
    useCredit,
    addHistory
  } = useAIStore();

  const handleGenerate = async () => {
    if (!referenceImage || !userImage) return;
    if (!useCredit()) {
      alert("Out of credits!");
      return;
    }

    try {
      setStage('analyzing');
      setProgress(10);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 95));
      }, 500);

      // Step 1: Analyze Reference
      const designSystem = await aiService.analyzeDesign(referenceImage);
      setStage('extracting');
      setProgress(30);

      // Step 2: Transform
      setStage('generating');
      setProgress(50);
      const result = await aiService.transformDesign(userImage, designSystem, settings);
      
      setStage('enhancing');
      setProgress(80);
      
      setStage('finalizing');
      setProgress(95);

      clearInterval(interval);
      setResultImage(result);
      setStage('completed');
      setProgress(100);

      addHistory({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        referenceImage,
        userImage,
        resultImage: result,
        score: 92 + Math.floor(Math.random() * 8),
        settings: { ...settings }
      });

    } catch (error) {
      console.error(error);
      setStage('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          {/* Workspace Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Design Workspace</h1>
            <p className="text-sm text-muted-foreground">Transform your product UI using AI-driven structural fidelity.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Uploads */}
            <div className="lg:col-span-3 space-y-6">
              <UploadZone 
                label="Reference Inspiration" 
                image={referenceImage} 
                onUpload={setReferenceImage}
                onClear={() => setReferenceImage(null)}
              />
              <UploadZone 
                label="Your Product UI" 
                image={userImage} 
                onUpload={setUserImage}
                onClear={() => setUserImage(null)}
              />
              
              <div className="glass p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Smart Suggestions</h3>
                <ul className="space-y-2">
                  <li className="text-[10px] flex items-center gap-2 text-violet-400">
                    <div className="w-1 h-1 rounded-full bg-violet-500" />
                    Use high-contrast references
                  </li>
                  <li className="text-[10px] flex items-center gap-2 text-violet-400">
                    <div className="w-1 h-1 rounded-full bg-violet-500" />
                    Maintain layout structure
                  </li>
                </ul>
              </div>
            </div>

            {/* Middle Column: Controls & Result */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                  <ResultCanvas />
                </div>
                <div className="w-full xl:w-auto flex flex-col gap-4">
                  <ControlPanel />
                  <button 
                    onClick={handleGenerate}
                    disabled={!referenceImage || !userImage || (stage !== 'idle' && stage !== 'completed' && stage !== 'error')}
                    className="w-full py-4 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-xl shadow-violet-500/20 transition-all active:scale-95"
                  >
                    Generate Transformation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HistorySidebar />
      </main>

      <AIChatAssistant />
    </div>
  );
}
