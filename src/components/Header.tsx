import { useState } from "react";
import { Coffee, Image, Menu, X, Code, Terminal } from "lucide-react";

interface HeaderProps {
  onOpenDonate: () => void;
}

export default function Header({ onOpenDonate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-100">
              <Image id="logo-icon" className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                随机图片API
              </span>
              <p className="text-[10px] text-rose-400 font-medium tracking-wide">RANDOM IMAGE SERVICE</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => scrollToSection("playground")}
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition"
            >
              在线体验
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition"
            >
              视觉回廊
            </button>
            <button
              onClick={() => scrollToSection("docs")}
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition"
            >
              开发文档
            </button>
            <button
              onClick={() => scrollToSection("guestbook-section")}
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition"
            >
              留言板
            </button>
            <button
              onClick={() => scrollToSection("stats")}
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition"
            >
              运行监控
            </button>
            
            <span className="h-4 w-px bg-slate-200"></span>

            <button
              onClick={onOpenDonate}
              className="flex items-center space-x-1 text-sm font-semibold text-slate-600 hover:text-pink-600 transition bg-rose-50/60 px-3 py-1.5 rounded-full hover:bg-rose-100/60 border border-rose-100"
            >
              <Coffee className="w-4 h-4 text-pink-500" />
              <span>赞助打赏</span>
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-pink-500 focus:outline-none p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-2 pb-6 space-y-3 shadow-lg duration-300">
          <button
            onClick={() => scrollToSection("playground")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-rose-50 hover:text-pink-600 transition"
          >
            在线体验
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-rose-50 hover:text-pink-600 transition"
          >
            视觉回廊
          </button>
          <button
            onClick={() => scrollToSection("docs")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-rose-50 hover:text-pink-600 transition"
          >
            开发文档
          </button>
          <button
            onClick={() => scrollToSection("guestbook-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-rose-50 hover:text-pink-600 transition"
          >
            留言板
          </button>
          <button
            onClick={() => scrollToSection("stats")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-600 hover:bg-rose-50 hover:text-pink-600 transition"
          >
            运行监控
          </button>
          <div className="border-t border-slate-100 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDonate();
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg text-white font-semibold shadow-md active:opacity-90"
            >
              <Coffee className="w-4 h-4 text-white" />
              <span>赞助支持</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
