import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Download, Terminal, Code2, Layers, BookOpen } from 'lucide-react';
import { PROMPTS_LIST } from '../data/promptsData';
import confetti from 'canvas-confetti';

interface PromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptsModal: React.FC<PromptsModalProps> = ({ isOpen, onClose }) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(PROMPTS_LIST[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPrompt = PROMPTS_LIST.find((p) => p.id === selectedPromptId) || PROMPTS_LIST[0];

  const handleCopyPrompt = (promptText: string, id: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadAllPrompts = () => {
    const fullContent = `# 🚀 بطروخ هيخليك صاروخ - Master Prompt Suite for Google Flow Studio / AI Studio

${PROMPTS_LIST.map(
  (p, idx) => `## ${idx === 0 ? '⭐ ' : ''}${p.title}
*القسم: ${p.category}*
*الوصف: ${p.description}*

\`\`\`
${p.promptText}
\`\`\`
`
).join('\n---\n\n')}
`;

    const blob = new Blob([fullContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Batroukh_Seafood_Prompts_Kit.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050A18]/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl bg-[#0A1128] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#050A18] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-600/20 text-orange-400">
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold font-heading text-lg sm:text-xl text-white">
                دليل البرومبتات الاحترافي (Master Prompt Studio)
              </h3>
              <p className="text-xs text-white/60">
                برومبتات Google Flow Studio وAI Studio لتطوير وتكرار مشروع بطروخ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAllPrompts}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold transition-colors"
              title="تحميل كملف Markdown"
            >
              <Download className="w-4 h-4 text-orange-400" />
              <span>تحميل الكل (.md)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns on Desktop) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Prompts Navigation List (4 cols) */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-l border-white/10 overflow-y-auto p-3 space-y-1.5 max-h-[30vh] md:max-h-none bg-[#050A18]/60">
            <div className="text-[11px] font-bold text-white/50 px-2 py-1 flex items-center justify-between">
              <span>قائمة البرومبتات (10 برومبت + Master):</span>
            </div>

            {PROMPTS_LIST.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => setSelectedPromptId(prompt.id)}
                className={`w-full text-right p-3 rounded-2xl transition-all flex flex-col gap-1 border ${
                  selectedPromptId === prompt.id
                    ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-md font-bold'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">{prompt.title}</span>
                  {prompt.isMaster && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold">
                      Master
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-white/40 truncate">{prompt.category}</span>
              </button>
            ))}
          </div>

          {/* Active Prompt Preview & Copy Box (8 cols) */}
          <div className="md:col-span-8 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-[#0A1128]">
            <div className="space-y-4">
              {/* Active Prompt Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {currentPrompt.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    {currentPrompt.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyPrompt(currentPrompt.promptText, currentPrompt.id)}
                  className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(234,88,12,0.35)] active:scale-95 shrink-0 self-start sm:self-auto"
                >
                  {copiedId === currentPrompt.id ? (
                    <>
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                      <span>تم النسخ بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ البرومبت 📋</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Container */}
              <div className="relative rounded-2xl bg-[#050A18] border border-white/10 p-4 font-mono text-xs sm:text-sm text-white/90 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-orange-500 selection:text-black">
                {currentPrompt.promptText}
              </div>
            </div>

            {/* Prompt Usage Guidance */}
            <div className="p-3.5 rounded-2xl bg-[#050A18] border border-white/10 text-xs text-white/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-500 shrink-0" />
                <span>انسخ هذا البرومبت واستخدمه مباشرة في AI Studio أو Google Flow Studio لإنشاء أو تعديل أي قسم.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
