import { useState, useEffect } from "react";
import { ApiEndpoint } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Playground from "./components/Playground";
import GalleryGrid from "./components/GalleryGrid";
import Docs from "./components/Docs";
import Guestbook from "./components/Guestbook";
import Stats from "./components/Stats";
import SupportModal from "./components/SupportModal";
import Footer from "./components/Footer";

const DEFAULT_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "girl",
    name: "🌸 随机美图",
    endpoint: "wallpapers.gaoops.top/girl",
    url: "https://wallpapers.gaoops.top/girl",
    description: "存储精选，构筑与色调双在线",
    detail: "臻选高清小姐姐和自然光影图库。色彩、构图由独立博客博主精心把关，优雅治愈，极其适合用于个人网站、卡片顶部或多端壁纸。每一张都在审美线上。",
    tag: "精选美图",
    icon: "🌸",
    color: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-50/50",
    accentColor: "text-pink-600",
  },
  {
    id: "avatar",
    name: "✨ 头像图片",
    endpoint: "wallpapers.gaoops.top/avatar",
    url: "https://wallpapers.gaoops.top/avatar",
    description: "二次元风格头像，适合占位与装饰",
    detail: "极具美感的二次元日系、动漫风格卡通头像。无论是用于新注册用户的随机默认头像、用户占位卡，还是独立社区动态看板，都是绝佳的视觉配角。",
    tag: "次元头像",
    icon: "✨",
    color: "from-purple-500 to-indigo-400",
    bgColor: "bg-indigo-50/50",
    accentColor: "text-indigo-600",
  },
  {
    id: "lolita",
    name: "🎀 洛丽塔风格",
    endpoint: "wallpapers.gaoops.top/lolita",
    url: "https://wallpapers.gaoops.top/lolita",
    description: "日系粉系精美图，画风细腻",
    detail: "主打日系粉色系、Lolita 宫廷复古裙装与唯美少女周边。色彩斑斓、画风治愈细腻，一脉承袭软萌浪漫画风，一键勾勒出令人少女心泛滥的梦幻氛围。",
    tag: "日系洛丽",
    icon: "🎀",
    color: "from-rose-400 to-pink-300",
    bgColor: "bg-rose-50/50",
    accentColor: "text-rose-600",
  },
  {
    id: "gif",
    name: "🎬 GIF 动图",
    endpoint: "wallpapers.gaoops.top/gif",
    url: "https://wallpapers.gaoops.top/gif",
    description: "灵动动图，给页面注入生命力",
    detail: "富有叙事张力与动态美学的小图。支持作为博客文章过渡、论坛评论表情、聊天小挂件，或者作为网页异步加载时的 Loading 骨架备选，秒注元气。",
    tag: "动态视觉",
    icon: "🎬",
    color: "from-violet-500 to-purple-400",
    bgColor: "bg-violet-50/30",
    accentColor: "text-purple-600",
  },
  {
    id: "other",
    name: "🖼 精选图库",
    endpoint: "wallpapers.gaoops.top/other",
    url: "https://wallpapers.gaoops.top/other",
    description: "千余张精选 JPG，风格多样",
    detail: "涵盖极简建筑、星辰大海、冷峻赛博、潮流街拍等在内的超大规模精选 JPG 全能图库。包揽数千张高清画幅，不论是哪种风格的项目都能稳妥兼容。",
    tag: "写意画廊",
    icon: "🖼",
    color: "from-teal-500 to-emerald-400",
    bgColor: "bg-teal-50/30",
    accentColor: "text-teal-600",
  },
];

const LOCAL_STORAGE_KEY_CALLS = "gaoops_api_total_calls";
const BASELINE_CALLS = 25849271;

export default function App() {
  const [endpoints] = useState<ApiEndpoint[]>(DEFAULT_ENDPOINTS);
  const [selectedId, setSelectedId] = useState<string>("girl");
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);
  const [totalCalls, setTotalCalls] = useState<number>(BASELINE_CALLS);

  // Maintain separate refresh indices for all categories to invalidate browser cache dynamically
  const [refreshKeys, setRefreshKeys] = useState<{ [key: string]: number }>({
    girl: Date.now(),
    avatar: Date.now() + 1,
    lolita: Date.now() + 2,
    gif: Date.now() + 3,
    other: Date.now() + 4,
  });

  // Pull baseline statistics from localStorage, or initialize with randomized baseline
  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY_CALLS);
    if (cached) {
      const parsed = parseInt(cached, 10);
      if (!isNaN(parsed) && parsed >= BASELINE_CALLS) {
        setTotalCalls(parsed);
        return;
      }
    }
    const initialSeed = BASELINE_CALLS + Math.floor(Math.random() * 50000);
    setTotalCalls(initialSeed);
    localStorage.setItem(LOCAL_STORAGE_KEY_CALLS, initialSeed.toString());
  }, []);

  // Set up background simulation of global calls
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalCalls((prev) => {
        // Increment by a small random real-time fluctuation (1 to 4 requests)
        const increment = Math.floor(Math.random() * 4) + 1;
        const next = prev + increment;
        localStorage.setItem(LOCAL_STORAGE_KEY_CALLS, next.toString());
        return next;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const handleIncrementCalls = (amount: number) => {
    setTotalCalls((prev) => {
      const next = prev + amount;
      localStorage.setItem(LOCAL_STORAGE_KEY_CALLS, next.toString());
      return next;
    });
  };

  const handleRefreshSingleEndpoint = (id: string) => {
    setRefreshKeys((prev) => ({
      ...prev,
      [id]: Date.now(),
    }));
  };

  const handleRefreshAllEndpoints = () => {
    setRefreshKeys({
      girl: Date.now(),
      avatar: Date.now() + 1,
      lolita: Date.now() + 2,
      gif: Date.now() + 3,
      other: Date.now() + 4,
    });
    handleIncrementCalls(5);
  };

  const handleOpenDonate = () => {
    setIsDonateOpen(true);
  };

  const handleSelectEndpoint = (id: string) => {
    setSelectedId(id);
    // Smooth scroll down to playground
    const section = document.getElementById("playground");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-pink-100 selection:text-pink-700">
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-[45%] h-[600px] bg-gradient-to-l from-rose-200/10 via-pink-100/5 to-transparent blur-3xl pointer-events-none select-none"></div>

      <Header onOpenDonate={handleOpenDonate} />

      <main className="relative">
        
        {/* HERO SECTION with live poloraid canvases */}
        <Hero
          endpoints={endpoints}
          onSelectEndpoint={handleSelectEndpoint}
          onRefreshAll={handleRefreshAllEndpoints}
          refreshKeys={refreshKeys}
        />

        {/* STATS COUNT OVERVIEW */}
        <Stats totalCalls={totalCalls} />

        {/* MAIN SANDBOX PLAYGROUND */}
        <Playground
          endpoints={endpoints}
          selectedId={selectedId}
          onSelectId={setSelectedId}
          refreshKeys={refreshKeys}
          onRefreshId={handleRefreshSingleEndpoint}
          onIncrementCalls={handleIncrementCalls}
        />

        {/* VISUAL GALLERY - ELEGANT INTEGRATIONS */}
        <GalleryGrid
          endpoints={endpoints}
          refreshKeys={refreshKeys}
          onRefreshId={handleRefreshSingleEndpoint}
          onIncrementCalls={handleIncrementCalls}
        />

        {/* COMPREHENSIVE DOCS SECTION */}
        <Docs endpoints={endpoints} onIncrementCalls={handleIncrementCalls} />

        {/* GUESTBOOK SECTION */}
        <Guestbook
          avatarEndpointUrl="https://wallpapers.gaoops.top/avatar"
          onIncrementCalls={handleIncrementCalls}
        />

      </main>

      <Footer onOpenDonate={handleOpenDonate} />

      {/* SUPPORT MODAL FOR SCANNING WECHAT2 QR */}
      <SupportModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        onIncrementCalls={handleIncrementCalls}
      />
    </div>
  );
}
