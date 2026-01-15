import React, { useState } from 'react';
import BusYatraVisualGuide from './BusYatraVisualGuide';
import ERDiagramFlow from './ERDiagramFlow';
import { Database, Workflow } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState('flow'); // 'flow' or 'guide'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                BusYatra Database Visualization
              </h1>
            </div>

            {/* View Switcher */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveView('flow')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'flow'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Workflow className="w-5 h-5" />
                ER Diagram Flow
              </button>
              <button
                onClick={() => setActiveView('guide')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'guide'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Database className="w-5 h-5" />
                Visual Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="transition-all duration-300">
        {activeView === 'flow' ? <ERDiagramFlow /> : <BusYatraVisualGuide />}
      </div>

      {/* Footer */}
      <div className="bg-black/30 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              <p className="font-semibold text-white mb-1">BusYatra Project - Internship 2026</p>
              <p>Database Design & Architecture Visualization</p>
            </div>
            <div className="text-right">
              <p>Created with React + Vite + Tailwind CSS</p>
              <p className="text-purple-400 mt-1">Current View: {activeView === 'flow' ? 'ER Diagram Flow' : 'Visual Guide'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;