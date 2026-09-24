import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Demo } from './pages/Demo';
import { Compare } from './pages/Compare';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'demo' | 'compare'>('home');

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <Home
            onStartCompare={() => setActiveTab('compare')}
            onTryDemo={() => setActiveTab('demo')}
          />
        )}

        {activeTab === 'demo' && (
          <Demo onGoToCompare={() => setActiveTab('compare')} />
        )}

        {activeTab === 'compare' && <Compare />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
