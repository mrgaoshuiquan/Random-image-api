import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap, RefreshCw, Layers } from "lucide-react";
import { ApiEndpoint } from "../types";

interface HeroProps {
  endpoints: ApiEndpoint[];
  onSelectEndpoint: (id: string) => void;
  onRefreshAll: () => void;
  refreshKeys: { [key: string]: number };
}

export default function Hero({ endpoints, onSelectEndpoint, onRefreshAll, refreshKeys }: HeroProps) {
  const scrollToPlayground = () => {
    document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-300 to-rose-300 rounded-full blur-3xl opacity-30 select-none pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-300 to-violet-300 rounded-full blur-3xl opacity-30 select-none pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left text column */}
        <div className="lg:col-span-6 flex flex-col space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600 px-4.5 py-1.5 rounded-full text-xs font-semibold self-center lg:self-start border border-pink-200/50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>让网站充满生命，全站 API 强力驱动</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 sm:leading-tight">
              构建极速精美的
              <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                随机图片 API 服务
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              多重画风无拘定义，千兆带宽极速分发。
              无论是博客装饰、卡片占位、社交头像，亦或是个性壁纸，一键对接，让你的网站在每次刷新时，都呈现一场惊艳的视觉邂逅。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={scrollToPlayground}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl transition duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>立即在线体验</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-300" />
            </button>

            <button
              onClick={onRefreshAll}
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-2xl shadow-sm border border-slate-200 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-pink-500" />
              <span>全网随机唤醒</span>
            </button>
          </motion.div>

          {/* Quick Stats badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 max-w-lg mx-auto lg:mx-0 text-left"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> AVG LATENCY
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-800">
                &lt;35<span className="text-xs font-semibold text-slate-400">ms</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3 h-3 text-pink-500" /> TOTAL POOL
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-800">
                10K<span className="text-xs font-semibold text-slate-400">+张</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SLA UPTIME</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-500">
                99.99<span className="text-xs font-semibold text-slate-400">%</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right floating decorative collage */}
        <div id="hero-collage" className="lg:col-span-6 relative h-[380px] sm:h-[460px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/10 to-transparent pointer-events-none rounded-3xl border border-dashed border-rose-200/50"></div>

          {/* Core Interactive Card Deck */}
          <div className="relative w-full h-full max-w-[420px] flex items-center justify-center z-20">
            {endpoints.map((end, index) => {
              // Standard styling stack depending on the index
              let rotation = "rotate-0";
              let translateStyles = "translate-x-0 translate-y-0";
              let zIndex = "z-10";

              if (index === 0) { // girl
                rotation = "-rotate-6 hover:-rotate-12";
                translateStyles = "-translate-x-12 -translate-y-8";
                zIndex = "z-30";
              } else if (index === 1) { // avatar
                rotation = "rotate-4 hover:rotate-8";
                translateStyles = "translate-x-14 -translate-y-12";
                zIndex = "z-20";
              } else if (index === 2) { // lolita
                rotation = "rotate-12 hover:rotate-18";
                translateStyles = "translate-x-8 translate-y-24";
                zIndex = "z-40";
              } else if (index === 3) { // gif
                rotation = "-rotate-12 hover:-rotate-6 md:scale-95";
                translateStyles = "-translate-x-20 translate-y-16";
                zIndex = "z-15";
              } else { // other
                rotation = "rotate-1 md:scale-105";
                translateStyles = "translate-x-0 translate-y-2";
                zIndex = "z-25";
              }

              // Dynamic live URL with refresh key to bypass browser cache
              const liveUrl = `${end.url}?_t=${refreshKeys[end.id] || 0}`;

              return (
                <motion.div
                  key={end.id}
                  className={`absolute w-44 sm:w-48 bg-white p-2.5 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 hover:scale-105 transition duration-500 cursor-pointer ${rotation} ${translateStyles} ${zIndex}`}
                  whileHover={{ scale: 1.1, zIndex: 100 }}
                  onClick={() => onSelectEndpoint(end.id)}
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={liveUrl}
                      alt={end.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                      {end.tag}
                    </span>
                  </div>
                  <div className="pt-2 pb-1 text-center">
                    <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1">
                      <span>{end.name}</span>
                    </p>
                    <p className="text-[9px] text-slate-400 truncate mt-0.5">{end.endpoint}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="absolute bottom-1 font-mono text-[10px] text-slate-400 select-none animate-pulse">
            👆 点击任意极精美照片，体验并实时重新调用
          </div>
        </div>
      </div>
    </section>
  );
}
