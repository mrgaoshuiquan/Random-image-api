import { useState } from "react";
import { Copy, Check, Terminal, Code, Cpu, ExternalLink } from "lucide-react";
import { ApiEndpoint } from "../types";

interface DocsProps {
  endpoints: ApiEndpoint[];
  onIncrementCalls: (amount: number) => void;
}

export default function Docs({ endpoints, onIncrementCalls }: DocsProps) {
  const [activeTab, setActiveTab] = useState<string>("curl");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    onIncrementCalls(1);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getDocCode = () => {
    const demoUrl = "https://wallpapers.gaoops.top/girl";
    switch (activeTab) {
      case "curl":
        return `# 使用 curl 发起 GET 请求并自动跟踪 302 重定向到图片
curl -L "${demoUrl}" -o random_image.jpg`;
      case "html":
        return `<!-- 在 HTML 中直接当作 src 属性引用，每次刷新都会随机换图 -->
<img 
  src="${demoUrl}" 
  alt="随机精美壁纸" 
  width="800" 
  height="600" 
  loading="lazy" 
/>`;
      case "markdown":
        return `# 在 Markdown 中直接引用，如 GitHub Readme、个人博客等
![随机壁纸](${demoUrl})`;
      case "javascript":
        return `// 方式 1: 直接给图片元素赋值
const imageEl = document.getElementById("my-img");
imageEl.src = "${demoUrl}";

// 方式 2: 使用 fetch 获取重定向后的源文件真实 URL
fetch("${demoUrl}", {
  method: "GET",
  redirect: "follow", // 该参数会自动跟踪 302 重定向
})
.then(response => {
  // 获取重定向后的实际图片绝对地址
  console.log("图片真实物理地址:", response.url);
})
.catch(err => console.error("获取失败:", err));`;
      case "python":
        return `import requests

# 发送请求，默认自动追踪 302 重定向
url = "${demoUrl}"
response = requests.get(url)

if response.status_code == 200:
    # 获取重定向后的真实图片链接
    print("真实物理地址:", response.url)
    
    # 写入本地保存为文件
    with open("random_pic.jpg", "wb") as f:
        f.write(response.content)
    print("下载成功！")`;
      default:
        return "";
    }
  };

  return (
    <section id="docs" className="py-20 bg-white border-b border-rose-100 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl pointer-events-none select-none"></div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 px-3.5 py-1 rounded-full text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>极简集成 · 秒级部署</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            📖 <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">开发文档</span> 与快速指南
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            API 基于标准的 HTTP 302 临时重定向协议。无需任何 API Key，没有繁琐的鉴权，支持直接渲染，支持跨域访问。
          </p>
        </div>

        {/* Core documentation tabs & panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left panel: Info and Endpoint Table */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                <span>接口规范</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    核心响应逻辑 (HTTP 302)
                  </p>
                  <p className="text-slate-500 leading-normal">
                    请求接口时，服务器会以 <code className="text-pink-600 font-bold bg-pink-50 px-1 py-0.5 rounded font-mono">302 Found</code> 定向至精选图库中的直链、或由底层高防 CDN 缓存。您可以直接将 API 填入 HTML 的 <code className="text-purple-600 font-mono font-bold">&lt;img&gt;</code>、Markdown 的图片表达式中。
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    CDN 缓存控制 (Cache-Control)
                  </p>
                  <p className="text-slate-500 leading-normal">
                    为了确保每次请求都能呈现随机美图，接口服务器设置了禁缓响应头。如果浏览器缓存了图片，您可以在 URL 后面随意添加一个随机参数，例如：<code className="text-purple-600 font-mono font-bold">?t=123</code> 强制浏览器刷新。
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Quick Reference */}
            <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100/40 text-xs text-purple-800 space-y-3">
              <p className="font-bold flex items-center gap-1">
                <span>💡 推荐小贴士 (Pro Tip)</span>
              </p>
              <p className="leading-relaxed">
                若需用于网站背景并适配多端，推荐使用 <b>🌸 随机美图 (/girl)</b> 或 <b>🖼 精选图库 (/other)</b> 接口，画幅多为高清横屏宽幅噢！
              </p>
            </div>
          </div>

          {/* Right panel: Terminal-style Code Snippet Playground */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex-1 flex flex-col">
              {/* Header bar of editor */}
              <div className="bg-slate-950 px-5 py-4 border-b border-slate-800/60 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <span className="w-3 w-h h-3 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-3 w-h h-3 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-3 w-h h-3 rounded-full bg-emerald-500 inline-block"></span>
                  </div>
                  <span className="h-4 w-px bg-slate-800"></span>
                  <p className="text-[11px] font-mono font-bold text-slate-400">integration_guide_302.md</p>
                </div>

                <button
                  onClick={() => handleCopy(getDocCode(), "guide-code")}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                >
                  {copiedType === "guide-code" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">已复制代码</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制代码</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code category tabs */}
              <div className="bg-slate-950/40 border-b border-slate-800/40 flex overflow-x-auto text-xs font-mono font-semibold text-slate-400">
                {[
                  { id: "curl", label: "cURL" },
                  { id: "html", label: "HTML img" },
                  { id: "markdown", label: "Markdown" },
                  { id: "javascript", label: "JavaScript" },
                  { id: "python", label: "Python" },
                ].map((tab) => {
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        onIncrementCalls(1);
                      }}
                      className={`px-5 py-3 border-b-2 font-medium tracking-wide transition cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "border-pink-500 text-white bg-slate-900/50"
                          : "border-transparent hover:text-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Textarea code renderer */}
              <div className="flex-1 p-5 sm:p-6 font-mono text-[11px] sm:text-xs text-pink-300/95 leading-relaxed overflow-y-auto whitespace-pre select-all bg-slate-900/90 h-[280px]">
                {getDocCode()}
              </div>

              {/* Bottom tag bar */}
              <div className="bg-slate-950/60 px-5 py-3 border-t border-slate-800/40 text-[10px] text-slate-500 font-mono flex justify-between">
                <span>UTF-8 // UNIX</span>
                <span>🔥 响应速度 &lt; 35ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
