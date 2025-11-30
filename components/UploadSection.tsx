import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, AlertCircle, Scan, Aperture, Palette, Cpu, Sparkles } from 'lucide-react';
import { MOCK_LOADING_STEPS } from '../constants';

interface Props {
  onImageSelected: (base64: string) => void;
  isAnalyzing: boolean;
}

const UploadSection: React.FC<Props> = ({ onImageSelected, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  // Cycle through loading steps if analyzing
  useEffect(() => {
    if (!isAnalyzing) {
      setLoadingStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % MOCK_LOADING_STEPS.length);
    }, 2500); // Slightly slower to allow animations to play out
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const result = e.target.result as string;
          setPreview(result);
          onImageSelected(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="upload-box"
              className="flex flex-col items-center"
            >
               <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Upload Your Photo</h2>
                <p className="text-gray-400">For best results, use a full-body photo with good lighting.</p>
              </div>

              <motion.div
                className={`
                  relative w-full max-w-2xl border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
                  glass-panel flex flex-col items-center justify-center min-h-[400px] overflow-hidden group
                  ${dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-gray-500'}
                `}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                  onChange={handleChange}
                  accept="image/*"
                />
                
                {/* Decorative glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] group-hover:bg-purple-600/30 transition-all pointer-events-none" />

                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-600 flex items-center justify-center mb-6 shadow-xl shadow-purple-900/30 relative z-10"
                >
                  <UploadCloud className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 relative z-10">Drag & Drop or Click</h3>
                <p className="text-gray-400 mb-6 relative z-10">Supports JPG, PNG, WEBP</p>
                
                <div className="flex gap-2 text-sm text-gray-500 bg-black/40 px-4 py-2 rounded-lg border border-white/5 relative z-10">
                  <AlertCircle className="w-4 h-4" />
                  <span>Photos are processed locally & temporarily</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="scanning-ui"
              className="w-full flex flex-col items-center"
            >
              {/* Main Analysis HUD */}
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl mb-8">
                
                {/* User Image Background */}
                {preview && (
                  <motion.img 
                    src={preview} 
                    alt="Scanning"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full object-cover filter brightness-75"
                  />
                )}

                {/* Grid Overlay */}
                <div 
                  className="absolute inset-0 z-10 opacity-30" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 208, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 208, 255, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}
                />

                {/* --- STAGE 0 & 1: SCANNING & GEOMETRY --- */}
                {loadingStepIndex <= 1 && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_#00D0FF] z-20"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <Scan className="w-full h-full p-12 text-cyan-500/20" strokeWidth={0.5} />
                    </div>
                  </>
                )}

                {/* --- STAGE 1: BODY NODES (Simulated) --- */}
                {loadingStepIndex === 1 && (
                  <div className="absolute inset-0 z-20">
                    {[...Array(6)].map((_, i) => (
                       <motion.div
                        key={i}
                        className="absolute w-3 h-3 border border-cyan-400 bg-cyan-400/30 rounded-full shadow-[0_0_10px_#00D0FF]"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${30 + Math.random() * 40}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 1], opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      />
                    ))}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-cyan-500/30 px-3 py-1 rounded text-xs text-cyan-400 font-mono">
                      DETECTING_JOINTS...
                    </div>
                  </div>
                )}

                {/* --- STAGE 2: COLOR EXTRACTION --- */}
                {loadingStepIndex === 2 && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div 
                      className="relative"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full blur-md mix-blend-screen"
                          style={{
                            width: 60,
                            height: 60,
                            backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][i],
                            transform: `rotate(${i * 72}deg) translate(80px) rotate(-${i * 72}deg)`
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <Aperture className="w-16 h-16 text-white/50 animate-pulse" />
                    </motion.div>
                     <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-purple-500/30 px-3 py-1 rounded text-xs text-purple-400 font-mono">
                      EXTRACTING_PALETTE...
                    </div>
                  </div>
                )}

                {/* --- STAGE 3 & 4: AI PROCESSING --- */}
                {loadingStepIndex >= 3 && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mb-6"
                    >
                      <Cpu className="w-20 h-20 text-purple-500" />
                    </motion.div>
                    <motion.div 
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Sparkles className="w-5 h-5 text-purple-400 animate-bounce" style={{ animationDelay: '0s' }} />
                      <Sparkles className="w-5 h-5 text-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <Sparkles className="w-5 h-5 text-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </motion.div>
                  </div>
                )}
                
              </div>

              {/* Text Status Updates */}
              <div className="h-16 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                  {loadingStepIndex === 0 && "Scanning Anatomy"}
                  {loadingStepIndex === 1 && "Identifying Features"}
                  {loadingStepIndex === 2 && "Analyzing Colors"}
                  {loadingStepIndex >= 3 && "Generating Style"}
                </h3>
                
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStepIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-gray-400 font-mono text-sm"
                  >
                    {`> ${MOCK_LOADING_STEPS[loadingStepIndex]}`}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((loadingStepIndex + 1) / MOCK_LOADING_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default UploadSection;