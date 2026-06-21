import { Coffee, Heart, Image, Terminal } from "lucide-react";

interface FooterProps {
  onOpenDonate: () => void;
}

export default function Footer({ onOpenDonate }: FooterProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Left column info */}
        <div className="md:col-span-5 space-y-5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">
                Gaoops Random Image API
              </span>
              <p className="text-[10px] text-pink-400 font-mono tracking-wider">RANDOM VISUAL CLOUD // v1.2</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm mx-auto md:mx-0">
            独立研发的多场景随机图片托管与分发网：🌸 随机美图, ✨ 头像图片, 🎀 洛丽塔风格, 🎬 GIF动图, 🖼 精选图库 等全系列视觉端点。极速、美观、安全、全免费。
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            <span>Crafted with ❤️ by Mr. Gao & Global Anycast CDN</span>
          </div>
        </div>

        {/* Middle column link categories */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8 text-center md:text-left">
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              功能导航
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <button
                onClick={() => scrollToSection("playground")}
                className="block hover:text-pink-500 transition cursor-pointer mx-auto md:mx-0"
              >
                在线大厅
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block hover:text-pink-500 transition cursor-pointer mx-auto md:mx-0"
              >
                视觉回廊
              </button>
              <button
                onClick={() => scrollToSection("docs")}
                className="block hover:text-pink-500 transition cursor-pointer mx-auto md:mx-0"
              >
                极简文档
              </button>
              <button
                onClick={() => scrollToSection("stats")}
                className="block hover:text-pink-500 transition cursor-pointer mx-auto md:mx-0"
              >
                可用状态
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              快捷接口
            </h4>
            <div className="space-y-2.5 text-xs font-mono text-slate-500">
              <a
                href="https://wallpapers.gaoops.top/girl"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition"
              >
                /girl (随机少女)
              </a>
              <a
                href="https://wallpapers.gaoops.top/avatar"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition"
              >
                /avatar (唯美头像)
              </a>
              <a
                href="https://wallpapers.gaoops.top/lolita"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition"
              >
                /lolita (日系服装)
              </a>
              <a
                href="https://wallpapers.gaoops.top/gif"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition"
              >
                /gif (灵动动图)
              </a>
              <a
                href="https://wallpapers.gaoops.top/other"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-pink-400 transition"
              >
                /other (精选图库)
              </a>
            </div>
          </div>

        </div>

        {/* Right column sponsor CTA */}
        <div className="md:col-span-3 text-center md:text-left space-y-4.5 bg-slate-900/60 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center justify-center md:justify-start gap-1">
              <Coffee className="w-4 h-4 text-pink-500" />
              <span>给开发者咖啡充能</span>
            </h4>
            <p className="text-2xs text-slate-500 leading-normal font-normal">
              本图片 API 的云端分发全部免费开源，欢迎微薄的赞助以便项目能常青树般维持运转。
            </p>
          </div>

          <button
            onClick={onOpenDonate}
            className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 font-bold rounded-xl text-xs shadow-md shadow-pink-900/15 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-1"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>赞助打赏作者</span>
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-normal text-slate-600 text-center relative z-10">
        <p>© {currentYear} Gaoops Image API. All Rights Reserved.</p>
        <div className="flex gap-4 font-semibold text-slate-500">
          <a href="#" className="hover:text-pink-500">用户许可协议</a>
          <span>·</span>
          <a href="https://www.gaoops.com/" className="hover:text-pink-500">官方博客</a>
          <span>·</span>
          <a href="https://github.com/mrgaoshuiquan" target="_blank" rel="noreferrer" className="hover:text-pink-500">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
