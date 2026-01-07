
import React, { useState, useEffect } from 'react';
import { analyzeText } from './services/geminiService';
import { AnalysisResult, VocabularyItem } from './types';

// Icons & Micro-Components
const IconSparkles = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 px-4 py-3">
    <div className="max-w-7xl mx-auto glass-card rounded-2xl px-6 h-14 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-xl shadow-md float-animation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-tight text-slate-800">LexiAnalyzer<span className="text-blue-600">.</span></span>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Band 9 Core</span>
        </div>
      </div>
      <div className="hidden md:flex space-x-6 text-sm font-semibold text-slate-500">
        <button className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 py-1">Analyze</button>
        <button className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 py-1">Resources</button>
        <button className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 py-1">Benchmarks</button>
      </div>
    </div>
  </nav>
);

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-24 space-y-6">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 relative z-10"></div>
    </div>
    <div className="text-center space-y-2">
      <p className="text-xl font-bold text-slate-800 tracking-tight">Deconstructing Syntax...</p>
      <p className="text-sm text-slate-400 font-medium">Matching semantic patterns against academic corpora</p>
    </div>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="text-center py-32 px-6">
    <div className="relative inline-block mb-8">
      <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-10 rounded-full"></div>
      <div className="relative glass-card inline-flex items-center justify-center w-24 h-24 text-indigo-500 rounded-3xl shadow-xl transform -rotate-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/></svg>
      </div>
    </div>
    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Awaiting Academic Content</h3>
    <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed">
      Provide a paragraph from an IELTS Reading passage or a Writing task response to begin the deep linguistic analysis.
    </p>
  </div>
);

const DetailCard: React.FC<{ item: VocabularyItem }> = ({ item }) => (
  <div className="group relative glass-card rounded-3xl p-1 mb-8 transition-all hover:shadow-2xl hover:-translate-y-1">
    {item.isHighValue && (
      <div className="absolute -top-3 -right-3 z-10">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white uppercase tracking-widest">
          High Value Word
        </div>
      </div>
    )}
    
    <div className="bg-white rounded-[1.4rem] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Term Section */}
        <div className="lg:col-span-4 p-8 bg-slate-50 border-r border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{item.pos}</span>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">{item.word}</h3>
            <p className="mt-4 text-slate-600 leading-relaxed font-medium">{item.englishMeaning}</p>
            <p className="mt-2 text-xl text-blue-800 academic-font italic font-medium">{item.bengaliMeaning}</p>
          </div>
          
          <div className="mt-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Memory Hook</h4>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-sm italic text-slate-600 relative">
               <span className="absolute -top-2 -left-2 text-xl">💡</span>
               {item.memoryHook}
             </div>
          </div>
        </div>

        {/* Intelligence Section */}
        <div className="lg:col-span-8 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contextual Examples</h4>
                <div className="space-y-4">
                  <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-200 before:rounded-full">
                    <p className="text-slate-800 font-semibold academic-font text-lg italic leading-snug">"{item.exampleSentence}"</p>
                    <p className="mt-2 text-sm text-slate-500 font-medium academic-font italic">{item.banglaExample}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Paraphrased (Band 8+)</span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{item.paraphrasedSentence}"</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Synonym Matrix</h4>
                <div className="flex flex-wrap gap-2">
                  {item.alternatives.map((alt, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors cursor-default">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em] mb-4">IELTS Expert Strategy</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase block">Why it works:</span>
                    <p className="text-xs text-indigo-900 font-medium mt-0.5">{item.bandInsight.reason}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase block">The Trap:</span>
                    <p className="text-xs text-indigo-900 font-medium mt-0.5">{item.bandInsight.mistake}</p>
                  </div>
                  {item.registerWarning && (
                    <div className="bg-rose-100 text-rose-800 p-2 rounded-lg text-[10px] font-bold border border-rose-200">
                      ⚠️ WARNING: {item.registerWarning}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 text-white">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Task Optimization</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold bg-slate-800 px-2 py-0.5 rounded text-blue-400 min-w-[50px]">W:T1</span>
                    <p className="text-[11px] text-slate-300 leading-tight">{item.taskUsage.task1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold bg-slate-800 px-2 py-0.5 rounded text-indigo-400 min-w-[50px]">W:T2</span>
                    <p className="text-[11px] text-slate-300 leading-tight">{item.taskUsage.task2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold bg-slate-800 px-2 py-0.5 rounded text-emerald-400 min-w-[50px]">R:S</span>
                    <p className="text-[11px] text-slate-300 leading-tight">{item.taskUsage.reading}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'detailed' | 'table'>('detailed');

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeText(inputText);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          <h1 className="text-5xl md:text-7xl font-[800] text-slate-900 tracking-tighter leading-none mb-6">
            Master Academic <br/>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">English Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            IELTS-specific semantic analyzer that transforms reading passages into structured Band 9 learning modules.
          </p>
        </section>

        {/* Input Section */}
        <section className="mb-20">
          <div className="glass-card rounded-[2.5rem] p-2 shadow-2xl relative overflow-hidden">
             <div className="bg-white rounded-[2.2rem] p-8 md:p-12 relative z-10">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste IELTS paragraph here (e.g., 'The rapid urbanization observed in developing nations has precipitated a plethora of socio-economic dilemmas...')"
                  className="w-full h-48 px-4 py-2 text-2xl font-semibold academic-font text-slate-800 placeholder:text-slate-200 border border-slate-50 rounded-2xl bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all resize-none custom-scrollbar outline-none"
                />
                
                <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-8">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Synthesizing...
                      </span>
                    ) : (
                      <>
                        Analyze Complexity
                        <span className="group-hover:translate-x-1 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </span>
                      </>
                    )}
                  </button>
                </div>
             </div>
          </div>
        </section>

        {/* Results Navigation */}
        {result && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 animate-in slide-in-from-bottom-4 duration-700">
             <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Linguistic Breakdown</h2>
                <p className="text-slate-500 font-medium">Extracted {result.vocabulary.length} high-impact terms from the source text.</p>
             </div>
             <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                <button 
                  onClick={() => setViewMode('detailed')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'detailed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Expert Mode
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Quick Scan
                </button>
             </div>
          </div>
        )}

        {/* Dynamic Display Area */}
        {isAnalyzing ? (
          <Loader />
        ) : error ? (
          <div className="glass-card p-6 border-rose-100 text-rose-600 font-bold text-center rounded-3xl">
            {error}
          </div>
        ) : result ? (
          <div className="animate-in fade-in duration-1000">
            {/* Summary Overlay */}
            <div className="relative group mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative glass-card rounded-[2.4rem] p-10 border-slate-100">
                 <div className="flex items-center gap-2 mb-4">
                    <IconSparkles />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Executive Summary</span>
                 </div>
                 <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight academic-font italic">
                   "{result.summary}"
                 </p>
              </div>
            </div>

            {viewMode === 'detailed' ? (
              <div className="grid grid-cols-1 gap-4">
                {result.vocabulary.map((item, idx) => (
                  <DetailCard key={idx} item={item} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Term & POS</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Definition & Context</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Synonyms</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Band Insight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.vocabulary.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-8 py-8 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{item.word}</span>
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md self-start uppercase">{item.pos}</span>
                            {item.isHighValue && <span className="text-[8px] font-black text-amber-600 mt-1 uppercase">⭐ High Value</span>}
                          </div>
                        </td>
                        <td className="px-8 py-8 align-top">
                           <p className="text-sm font-bold text-slate-800 leading-tight">{item.englishMeaning}</p>
                           <p className="text-sm text-blue-800 font-medium academic-font italic mt-2">{item.bengaliMeaning}</p>
                        </td>
                        <td className="px-8 py-8 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            {item.alternatives.map((alt, i) => (
                              <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">{alt}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-8 align-top">
                          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs">{item.bandInsight.reason}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      <footer className="mt-40 border-t border-slate-100 pt-20 pb-20 relative overflow-hidden bg-slate-50/50">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">Developed for the Future of Learning</h3>
            <p className="text-slate-500 font-medium">Empowering candidates with Band 9 linguistic intelligence.</p>
          </div>
          
          <div className="mb-10 inline-flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Created by</span>
            <span className="text-lg font-bold text-slate-900 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100">Dipalok Sen</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-[10px] font-black tracking-widest uppercase">
           
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              IELTS Corpus 2024
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Bilingual Synthesis
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
