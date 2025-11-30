
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import UploadSection from './components/UploadSection';
import ResultsPage from './components/ResultsPage';
import FeaturesPage from './components/FeaturesPage';
import ShowcasePage from './components/ShowcasePage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import CustomCursor from './components/CustomCursor';
import { AppState, UserAnalysis, OutfitRecommendation } from './types';
import * as GeminiService from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Landing);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<UserAnalysis | null>(null);
  const [initialOutfit, setInitialOutfit] = useState<OutfitRecommendation | undefined>(undefined);

  const handleStart = () => {
    setAppState(AppState.Uploading);
  };

  const handleNavigate = (state: AppState) => {
    // If navigating away from flow, reset user flow data? 
    // Maybe keep it if they just want to check pricing.
    setAppState(state);
  };

  const handleImageSelected = async (base64: string) => {
    setUserImage(base64);
    setAppState(AppState.Analyzing);
    
    try {
      // 1. Vision Analysis
      const analysisResult = await GeminiService.analyzeUserImage(base64);
      setAnalysis(analysisResult);
      setAppState(AppState.Results);

    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Could not analyze image. Please ensure your API Key is valid and the image is clear.");
      setAppState(AppState.Uploading);
    }
  };

  const handleReset = () => {
    setAppState(AppState.Landing);
    setUserImage(null);
    setAnalysis(null);
    setInitialOutfit(undefined);
  };

  return (
    <div className="text-white min-h-screen flex flex-col">
      {appState === AppState.Landing && <CustomCursor />}
      
      <Navigation onNavigate={handleNavigate} appState={appState} />
      
      <main className="flex-grow">
        {appState === AppState.Landing && (
          <LandingPage onStart={handleStart} />
        )}

        {appState === AppState.Features && <FeaturesPage />}
        
        {appState === AppState.Showcase && <ShowcasePage />}
        
        {appState === AppState.Pricing && <PricingPage />}

        {appState === AppState.About && <AboutPage />}

        {appState === AppState.Blog && <BlogPage />}

        {appState === AppState.Contact && <ContactPage />}

        {appState === AppState.Auth && <AuthPage />}

        {(appState === AppState.Uploading || appState === AppState.Analyzing) && (
          <UploadSection 
            onImageSelected={handleImageSelected} 
            isAnalyzing={appState === AppState.Analyzing}
          />
        )}

        {appState === AppState.Results && analysis && userImage && (
          <ResultsPage 
            analysis={analysis}
            initialOutfit={initialOutfit}
            originalImage={userImage}
          />
        )}
      </main>

      {/* Hide footer on Auth page for cleaner look, or keep it. Let's keep it but maybe minimal? Standard is fine. */}
      {appState !== AppState.Auth && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
