import { useEffect, useState } from "react";
import { TrendingUp, Cpu, Compass, Activity, Server, ShieldAlert } from "lucide-react";

interface StatsProps {
  totalCalls: number;
}

export default function Stats({ totalCalls }: StatsProps) {
  const [latency, setLatency] = useState<number>(24);
  const [activeStatus, setActiveStatus] = useState<boolean>(true);

  // Fluctuating server state diagnostics
  useEffect(() => {
    const latInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3 ms
        const next = prev + delta;
        return next < 18 ? 18 : next > 32 ? 32 : next;
      });
    }, 2800);

    return () => clearInterval(latInterval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section id="stats" className="py-20 bg-slate-50 border-b border-rose-100 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute left-1/3 top-1/2 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none select-none"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-600 px-3.5 py-1 rounded-full text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>实时趋势 · 系统监控</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            📊 <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">运行状态</span> 与全网统计
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            数据透明，全天候高可用保障。累计接收多端项目、小程序、APP 及博客在内的网络请求监控。
          </p>
        </div>

        {/* Major Stat Highlight Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100/50 shadow-md relative overflow-hidden text-center max-w-4xl mx-auto mb-10">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600"></div>

          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
            🚀 全网累计 API 请求调用量 (TOTAL CALLS)
          </p>

          {/* Epic Number Rolling Counter Display */}
          <div className="relative py-4 inline-block">
            <span className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 font-mono select-all bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
              {formatNumber(totalCalls)}
            </span>
            <span className="absolute -top-1.5 -right-6 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
            <span>实时同步中 📈 数据每秒伴随全网客户端波动上浮</span>
          </p>
        </div>

        {/* 3-Column Minor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: Today Stats */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                今日请求调用
              </span>
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-800 font-mono">
                {formatNumber(Math.floor(totalCalls * 0.0053))}
              </p>
              <p className="text-[10px] text-pink-500 font-semibold mt-1">
                +14.8% 同比上周活跃
              </p>
            </div>
          </div>

          {/* Card 2: Micro Latency diagnostics */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                接口响应时延
              </span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">
                <Server className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-800 font-mono">
                {latency} <span className="text-xs text-slate-400 font-sans font-medium">ms</span>
              </p>
              <p className="text-[10px] text-teal-600 font-semibold mt-1">
                边缘可用节点：Cloudflare IP Anycast
              </p>
            </div>
          </div>

          {/* Card 3: Quality assurance */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                高防安全防御
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-800 font-sans">
                正常工作
              </p>
              <p className="text-[10px] text-purple-600 font-semibold mt-1">
                支持 DDoS 高防防护 / WAF
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
