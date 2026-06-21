import { useState, useEffect } from "react";
import { Link, Copy, Check, RefreshCw, Code, ExternalLink } from "lucide-react";
import { ApiEndpoint } from "../types";

interface PlaygroundProps {
  endpoints: ApiEndpoint[];
  selectedId: string;
  onSelectId: (id: string) => void;
  refreshKeys: { [key: string]: number };
  onRefreshId: (id: string) => void;
  onIncrementCalls: (amount: number) => void;
}

export default function Playground({
  endpoints,
  selectedId,
  onSelectId,
  refreshKeys,
  onRefreshId,
  onIncrementCalls,
}: PlaygroundProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedEndpoint = endpoints.find((e) => e.id === selectedId) || endpoints[0];

  const currentT = refreshKeys[selectedEndpoint.id] || 0;
  const liveImageUrl = `${selectedEndpoint.url}?_t=${currentT}`;

  useEffect(() => {
    setIsLoading(true);
  }, [selectedId, currentT]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onIncrementCalls(1);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    onRefreshId(selectedEndpoint.id);
    onIncrementCalls(1);
  };

  const formats = [
    {
      id: "url",
      label: "直接链接",
      code: selectedEndpoint.url,
    },
    {
      id: "markdown",
      label: "Markdown",
      code: `![Gaoops 随机图片](${selectedEndpoint.url})`,
    },
    {
      id: "html",
      label: "HTML",
      code: `<img src="${selectedEndpoint.url}" alt="Gaoops 随机图片" />`,
    },
    {
      id: "bbcode",
      label: "BBCode",
      code: `[img]${selectedEndpoint.url}[/img]`,
    },
  ];

  return (
    <section id="playground" className="py-20 bg-white border-y border-rose-100 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-20 pointer-events-none select-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            🎨 <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">在线大厅</span> 极速赏析
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            实时测试随机图片 API 调用，轻量设计，无阻快速。每次刷新都会唤醒最新一次的美图调取。
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-12">
          {endpoints.map((end) => {
            const isSelected = end.id === selectedId;
            return (
              <button
                key={end.id}
                onClick={() => {
                  onSelectId(end.id);
                  onIncrementCalls(1);
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-rose-400 shadow-md shadow-pink-100"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-pink-600 border-slate-200"
                }`}
              >
                <span className="text-sm">{end.icon}</span>
                <span>{end.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Sandbox Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-slate-50/70 border border-rose-100/40 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Left Column: Interactive Image Render */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-pink-100/50 text-pink-700 px-3 py-1 rounded-full text-[11px] font-bold border border-pink-200/40">
                <span>接口标签</span>
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                <span>{selectedEndpoint.tag}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                {selectedEndpoint.name} API
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {selectedEndpoint.detail} 使用此接口将极大地提升独立站、博客、社区、占位等视觉美感，图片色调经过多重算法和纯手工精选，保证加载品质。
              </p>
            </div>

            {/* Config & URL Details */}
            <div className="bg-white rounded-2xl p-5 border border-rose-100/60 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  请求方式: <span className="text-pink-600 font-extrabold font-sans">GET</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  参数: <span className="text-slate-600 font-sans font-medium">无</span>
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-100">
                <code className="text-2s sm:text-xs font-mono text-slate-700 truncate mr-2 select-all">
                  {selectedEndpoint.url}
                </code>
                <button
                  onClick={() => handleCopy(selectedEndpoint.url, "direct-api-url")}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200 hover:border-pink-300 rounded-lg text-slate-600 hover:text-pink-600 transition cursor-pointer"
                  title="复制接口地址"
                >
                  {copiedType === "direct-api-url" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Syntaxes Formats Picker */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-pink-500" /> 一键集成调用代码
              </span>
              <div className="space-y-2.5">
                {formats.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between bg-white rounded-xl py-2.5 px-4 border border-rose-100/40 shadow-2xs hover:border-rose-200/50 transition group"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[10px] font-bold text-slate-400 mb-0.5">{f.label}</p>
                      <code className="text-[11px] font-mono text-pink-600 truncate block select-all">
                        {f.code}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy(f.code, f.id)}
                      className="p-2 text-slate-400 hover:text-pink-600 hover:bg-rose-50 rounded-lg transition shrink-0 cursor-pointer"
                    >
                      {copiedType === f.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Polaroid/Device Render Mock */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm sm:max-w-md bg-white p-4 pb-6 rounded-3xl shadow-xl shadow-slate-900/5 border border-rose-100/80 relative group flex flex-col">
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900/5 flex items-center justify-center">
                {isLoading && (
                  <div className="absolute inset-0 z-30 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="w-8 h-8 text-pink-500 animate-spin" />
                    <span className="text-[11px] font-bold text-pink-600 tracking-wider">正在调取真实接口...</span>
                  </div>
                )}

                <img
                  src={liveImageUrl}
                  alt="Live API Preview"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${isLoading ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>

              {/* Action buttons embedded below */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {selectedEndpoint.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    实时极速载入 ⚡ Live Render
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shrink-0 text-white text-xs font-bold rounded-xl shadow-md shadow-pink-100 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    <span>随机换一张</span>
                  </button>

                  <a
                    href={selectedEndpoint.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 hover:bg-slate-50 text-slate-500 hover:text-pink-600 border border-slate-200 rounded-xl transition flex items-center"
                    title="在新标签页中打开原始格式"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <span className="text-[10px] text-slate-400 font-mono mt-3">
              当前缓存标签: <code className="text-pink-500 font-bold">_t={currentT}</code>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
