import { useState, useEffect } from "react";
import { RefreshCw, MapPin, Heart, MessageCircle, Calendar, Sparkles, Smile, ArrowUpRight } from "lucide-react";
import { ApiEndpoint } from "../types";

interface GalleryGridProps {
  endpoints: ApiEndpoint[];
  refreshKeys: { [key: string]: number };
  onRefreshId: (id: string) => void;
  onIncrementCalls: (amount: number) => void;
}

export default function GalleryGrid({
  endpoints,
  refreshKeys,
  onRefreshId,
  onIncrementCalls,
}: GalleryGridProps) {
  const [gridComments, setGridComments] = useState<any[]>([]);
  const [loadingLive, setLoadingLive] = useState<boolean>(true);
  const [localRefresh, setLocalRefresh] = useState<number>(0);

  useEffect(() => {
    const fetchGridComments = async () => {
      try {
        const res = await fetch("https://comment.gaoops.com/api/comment?path=%2F");
        if (res.ok) {
          const json = await res.json();
          let fetched: any[] = [];
          if (json && Array.isArray(json.data)) {
            fetched = json.data;
          } else if (json && json.data && Array.isArray(json.data.data)) {
            fetched = json.data.data;
          }
          if (fetched.length > 0) {
            setGridComments(fetched.slice(0, 3));
            setLoadingLive(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed fetching comments in Grid:", err);
      }
      setGridComments([]);
      setLoadingLive(false);
    };
    fetchGridComments();
  }, [localRefresh]);
  
  const handleSingleRefresh = (id: string) => {
    onRefreshId(id);
    onIncrementCalls(1);
    if (id === "avatar") {
      setLocalRefresh(prev => prev + 1);
    }
  };

  // Find endpoints
  const girlEp = endpoints.find((e) => e.id === "girl") || endpoints[0];
  const avatarEp = endpoints.find((e) => e.id === "avatar") || endpoints[1];
  const lolitaEp = endpoints.find((e) => e.id === "lolita") || endpoints[2];
  const gifEp = endpoints.find((e) => e.id === "gif") || endpoints[3];
  const otherEp = endpoints.find((e) => e.id === "other") || endpoints[4];

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-rose-100 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600 px-3.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>实境集成展示 · 生态体验</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            🎭 <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">视觉回廊</span> 网页装饰典范
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            想知道 API 是如何点缀真实网页的？以下五个精致的卡片模版正由对应的 API 端点实时加载装饰，见证普通网页的华丽蜕变。
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: 3 Smaller Templates */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Member Profile Card - USING AVATAR API */}
            <div className="bg-white rounded-3xl p-6 border border-rose-100/40 shadow-sm relative group overflow-hidden">
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-slate-100 text-slate-500 select-none">
                  端点: /avatar
                </span>
                <button
                  onClick={() => handleSingleRefresh("avatar")}
                  className="p-1.5 bg-white/90 hover:bg-white rounded-full text-slate-500 hover:text-pink-600 transition shadow-xs hover:shadow-md cursor-pointer"
                  title="刷新此卡片头像"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                {/* Live Avatar */}
                <div className="relative group shrink-0">
                  <div className="w-20 auto-h h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-pink-400">
                    <img
                      src={`${avatarEp.url}?_t=${refreshKeys[avatarEp.id] || 0}`}
                      alt="Avatar Live Deco"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white select-none">
                    L5
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h4 className="text-base font-bold text-slate-800">
                      洛可可の晴空
                    </h4>
                    <span className="inline-block text-[9px] font-bold bg-amber-100/80 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-md self-center">
                      签约作者
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono tracking-wide flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    <span>次元彼岸 · 幻想乡</span>
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal bg-pink-50/40 p-2.5 rounded-xl border border-pink-100/30">
                    “画风治愈、细腻，生活需要二次元来点缀。每一张头像都是灵感拼图，感谢 Gaoops 提供的精美随机支持！”
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-pink-600">
                      <Heart className="w-3.5 h-3.5 fill-pink-100 text-pink-500" /> 1.2k 赞
                    </span>
                    <span className="flex items-center gap-1 cursor-pointer hover:text-pink-600">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400" /> 345 评论
                    </span>
                    <span className="ml-auto text-[10px] text-slate-300 font-mono">
                      ID: avatar_showcase
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Anime Shop card / Lolita product - USING LOLITA API */}
            <div className="bg-white rounded-3xl p-6 border border-rose-100/40 shadow-sm relative overflow-hidden">
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-slate-100 text-slate-500 select-none">
                  端点: /lolita
                </span>
                <button
                  onClick={() => handleSingleRefresh("lolita")}
                  className="p-1.5 bg-white/90 hover:bg-white rounded-full text-slate-500 hover:text-pink-600 transition shadow-xs hover:shadow-md cursor-pointer"
                  title="刷新日系大图"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Live Image in center left */}
                <div className="col-span-1 sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                  <img
                    src={`${lolitaEp.url}?_t=${refreshKeys[lolitaEp.id] || 0}`}
                    alt="Lolita Live Deco"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                </div>

                {/* Body elements right */}
                <div className="col-span-1 sm:col-span-7 space-y-3.5">
                  <div className="inline-flex items-center space-x-1.5 bg-rose-50 text-pink-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-rose-100">
                    <span>日系洛丽塔风格</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 leading-tight">
                    洛丽塔画册臻选 Collection
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    画风精巧细腻，粉系浪漫。本卡片调用的是洛丽塔随机图库端点，每次进入均能随心更换背景与服饰卡，带给你极富梦幻和风的精巧体验。
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-rose-500 font-extrabold text-base">
                      $0.00
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 select-none">
                      开源免费
                    </span>
                    <button
                      onClick={() => handleSingleRefresh("lolita")}
                      className="ml-auto flex items-center space-x-1 text-xs text-pink-600 border border-rose-200/50 hover:bg-rose-50/50 px-3 py-1.5 rounded-xl transition cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 text-pink-500" />
                      <span>换个款式</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Dynamic Interactive Loader Badge - USING GIF API */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
              {/* Abs grid effect */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl select-none pointer-events-none"></div>

              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-white/20 text-white select-none backdrop-blur-xs">
                  端点: /gif
                </span>
                <button
                  onClick={() => handleSingleRefresh("gif")}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition cursor-pointer"
                  title="刷新GIF"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                {/* Live GIF preview in tiny card */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 p-1 shrink-0">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/20">
                    <img
                      src={`${gifEp.url}?_t=${refreshKeys[gifEp.id] || 0}`}
                      alt="GIF Live Deco"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <h4 className="text-base font-bold flex items-center justify-center sm:justify-start gap-1">
                    <span>灵动视界 / Dynamic Loaders</span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  </h4>
                  <p className="text-xs text-pink-100 leading-relaxed flex-1">
                    提供灵巧动图。您可以将本接口内嵌作为网页等待缓冲图、趣味装饰贴图、或社交论坛表情占位，为整个静态网页赋予跃动的生命。
                  </p>
                  <p className="text-[10px] text-pink-200/90 font-mono">
                    ENDPOINT: wallpapers.gaoops.top/gif
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Social Comments Showcase - USING AVATAR API (Modern Dark Slate Theme) */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 text-slate-100 relative overflow-hidden shadow-xl text-left">
              {/* background atmospheric glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Title Header with the Button */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6 relative z-10">
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm">💬</span>
                  <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    <span>场景 B: 现代社交评论区 & 多人头像</span>
                  </h4>
                </div>
                
                <button
                  onClick={() => handleSingleRefresh("avatar")}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-pink-400 border border-slate-700/60 rounded-xl text-xs font-bold text-slate-300 transition duration-200 cursor-pointer"
                  title="刷新全部头像"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-pulse" />
                  <span>换批成员</span>
                </button>
              </div>

              {/* Comments Stream */}
              <div className="space-y-4 relative z-10">
                {loadingLive ? (
                  <div className="space-y-4">
                    <div className="animate-pulse flex space-x-3 items-start">
                      <div className="rounded-xl bg-slate-800 h-10 w-10"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-slate-800 rounded w-1/4"></div>
                        <div className="space-y-1">
                          <div className="h-2 bg-slate-800 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : gridComments.length > 0 ? (
                  gridComments.map((cmt, idx) => {
                    const isEven = idx % 2 === 1;
                    const visualAvatar = cmt.avatar || `${avatarEp.url}?_t=${refreshKeys[avatarEp.id] || 0}&user=${encodeURIComponent(cmt.nick)}`;
                    return (
                      <div key={cmt.objectId || idx} className={`flex gap-3 items-start ${isEven ? "flex-row-reverse" : ""}`}>
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700 shadow-sm relative group">
                          <img
                            src={visualAvatar}
                            alt={cmt.nick}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none"
                          />
                        </div>
                        <div className={`${isEven ? "bg-purple-950/20 border-purple-900/30 text-right" : "bg-slate-800/80 border-slate-700/40 text-left"} rounded-2xl p-3.5 border flex-1 space-y-1`}>
                          <div className={`flex items-center gap-2 ${isEven ? "justify-end" : ""}`}>
                            {isEven && (
                              <span className="text-[9px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/25 px-1.5 py-0.5 rounded">
                                Visitor
                              </span>
                            )}
                            <span className="text-xs font-bold text-slate-200 transition">
                              {cmt.nick}
                            </span>
                            {!isEven && (
                              <span className="text-[9px] font-black bg-pink-500/15 text-pink-400 border border-pink-500/25 px-1.5 py-0.5 rounded">
                                User
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-normal text-left">
                            {cmt.comment.replace(/<\/?[^>]+(>|$)/g, "")}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {/* Comment 1: Left */}
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700 shadow-sm relative group">
                        <img
                          src={`${avatarEp.url}?_t=${refreshKeys[avatarEp.id] || 0}&user=qianyue`}
                          alt="User 千雪酱"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none"
                        />
                      </div>
                      <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm p-3.5 border border-slate-700/40 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-200 hover:text-pink-400 cursor-pointer transition">
                            千雪酱 ✨
                          </span>
                          <span className="text-[9px] font-black bg-pink-500/15 text-pink-400 border border-pink-500/25 px-1.5 py-0.5 rounded">
                            版主
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          哇塞！这个二次元卡通头像 API 的画风简直太赞了！刚好可以用于我的个人动漫论坛的默认占位头像上，每一次生成都是高清可爱的二次元萌图！
                        </p>
                      </div>
                    </div>

                    {/* Comment 2: Right (Developer Hoshino) */}
                    <div className="flex gap-3 items-start flex-row-reverse">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700 shadow-sm relative group">
                        <img
                          src={`${avatarEp.url}?_t=${refreshKeys[avatarEp.id] || 0}&user=hoshino`}
                          alt="User 星野原"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none"
                        />
                      </div>
                      <div className="bg-purple-950/20 rounded-2xl rounded-tl-sm p-3.5 border border-purple-900/30 flex-1 space-y-1 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[9px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/25 px-1.5 py-0.5 rounded">
                            Developer
                          </span>
                          <span className="text-xs font-bold text-slate-200 hover:text-purple-400 cursor-pointer transition">
                            星野原
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal text-left">
                          是的，我测试了，加载极快，R2直传节点确实给力。最重要是支持 no-referrer，不用担心防盗链和跨域拦截，直接填入 src 就可以！
                        </p>
                      </div>
                    </div>

                    {/* Comment 3: Left */}
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700 shadow-sm relative group">
                        <img
                          src={`${avatarEp.url}?_t=${refreshKeys[avatarEp.id] || 0}&user=pudding`}
                          alt="User 布丁喵喵"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none"
                        />
                      </div>
                      <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm p-3.5 border border-slate-700/40 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-200 hover:text-pink-400 cursor-pointer transition">
                            布丁喵喵
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          哈哈，点击上面的“换批成员”，全体用户的头像还可以一起变神气哦！太有趣了！🚀
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 font-mono text-[9px] sm:text-[10px] text-slate-500 leading-relaxed text-left">
                * 头像接口: <code className="text-pink-400">wallpapers.gaoops.top/avatar</code>。自带高可用多散列，每次渲染都是精挑细选的 21 世纪次元代表力作。
              </div>
            </div>

          </div>

          {/* Right Grid: 2 Greater Templates (Full Banner / Full Poster) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 4. Elegant Story Blog Header - USING GIRL API */}
            <div className="bg-white rounded-3xl overflow-hidden border border-rose-100/40 shadow-sm relative group flex flex-col justify-between">
              
              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-slate-900/60 text-white select-none backdrop-blur-xs">
                  端点: /girl
                </span>
                <button
                  onClick={() => handleSingleRefresh("girl")}
                  className="p-1.5 bg-white/90 hover:bg-white rounded-full text-slate-500 hover:text-pink-600 transition shadow-sm cursor-pointer"
                  title="刷新美图背景"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Live Banner image */}
              <div className="relative aspect-[16/10] bg-slate-100 w-full overflow-hidden">
                <img
                  src={`${girlEp.url}?_t=${refreshKeys[girlEp.id] || 0}`}
                  alt="Girl Live Deco"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              {/* Cards Body */}
              <div className="p-6 pt-2 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 2026.06.21
                  </span>
                  <span>READ: 3.4K</span>
                </div>
                
                <h4 className="text-base font-bold text-slate-800 hover:text-pink-600 transition cursor-pointer flex items-center gap-1.5">
                  <span>寻找自然的光影艺术与精美构图</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  光影是极富张力的自然语言。在此端点中，千余张精挑细选的高级壁画图涵盖多样自然、优雅人像与构色场景，为大型网页顶部 Header 或横版 Banner 注入最惊艳的灵魂画布。
                </p>
                
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  {/* Miniature Author */}
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-rose-200"></div>
                    <span className="text-xs font-semibold text-slate-600">Gaoops Premium</span>
                  </div>
                  <span className="text-[10px] text-pink-400 font-bold bg-pink-50 border border-pink-100/50 px-2 py-0.5 rounded-full select-none">
                    推荐首选
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Poster / Full Card background - USING OTHER API */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-rose-900/10 shadow-sm relative aspect-[3/4] group flex flex-col justify-end p-6">
              
              {/* Full background image, styled live from endpoint other */}
              <div className="absolute inset-0 z-0 bg-slate-900">
                <img
                  src={`${otherEp.url}?_t=${refreshKeys[otherEp.id] || 0}`}
                  alt="Other Live Deco"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 select-none group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10"></div>
              </div>

              <div className="absolute top-4 right-4 z-20 flex space-x-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-full bg-slate-950/80 text-teal-400 select-none backdrop-blur-xs border border-teal-500/20">
                  端点: /other
                </span>
                <button
                  onClick={() => handleSingleRefresh("other")}
                  className="p-1.5 bg-slate-950/80 hover:bg-slate-950 rounded-full text-teal-400 hover:text-teal-300 transition shadow-sm cursor-pointer border border-teal-500/15"
                  title="刷新海报背景"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Text Container */}
              <div className="relative z-10 space-y-3 text-left">
                <div className="inline-flex items-center space-x-1.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  <span>多风格 JPG 宇宙</span>
                </div>
                
                <h4 className="text-xl font-extrabold text-white leading-snug">
                  千余张精选 JPG 的终极狂欢
                </h4>
                
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  此组件演示了如何将 API 作为全屏卡片或手机墙纸式的设计背景。不仅拥有完美契合多端视窗的自适应体验，还能让用户每次重新打开，都是不同的风景线。
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    STATUS: LIVE CDN
                  </span>
                  <button
                    onClick={() => handleSingleRefresh("other")}
                    className="flex items-center space-x-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 hover:underline cursor-pointer"
                  >
                    <span>随机换一张背景</span>
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
