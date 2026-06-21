# 🌸 Gaoops Random Image API Hub

<p align="center">
  <img src="https://wallpapers.gaoops.top/girl" width="100%" alt="Gaoops Random Image" style="border-radius: 16px; object-fit: cover; aspect-ratio: 16/9;" />
</p>

<p align="center">
  <a href="https://wallpapers.gaoops.top"><img src="https://img.shields.io/badge/Platform-Cloudflare_Pages-orange?style=flat-square&logo=cloudflare" alt="Platform"></a>
  <a href="https://wallpapers.gaoops.top"><img src="https://img.shields.io/badge/Storage-Cloudflare_R2-blue?style=flat-square&logo=cloudflare" alt="Storage"></a>
  <a href="https://github.com/mrgaoshuiquan"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/Render-React_19_%26_Vite-61dafb?style=flat-square&logo=react" alt="React">
</p>

本项目是为 **Gaoops 随机图片 API 服务** 量身打造的高奢感、高颜值的官网展示及交互调试端系统。采用 **React 19**、**Vite**、**Tailwind CSS** 与 **Motion** 动画库构建，完美融合并充分利用本 API 自身的各大精美图片端点资源进行背景和画幅美化修饰，在前端建立了一个沉浸式的图片流调试场（Playground）与完整的接口配置调试体系。

🌐 **部署预览版**: Cloudflare Pages 静态一键部署支持。

---

## ✨ 核心特性

- **🎨 接口深度装饰 (重中之重)**：网站所有配图、Banner 背景、作者头像、示例博客排版、洛丽塔混合摄影橱窗展示等组件，全部引用自 `wallpapers.gaoops.top` 的真实 API。每一次刷新，整个网站都会焕发全新的视觉美学！
- **🌸 五大王牌端点全线覆盖**：
  - `🌸 随机美图` (`/girl`) - R2 精选高分妹子图，色调画幅双在线。
  - `✨ 头像图片` (`/avatar`) - 二次元专属占位与互动头像。
  - `🎀 洛丽塔风格` (`/lolita`) - 日系少女感与精细画风。
  - `🎬 GIF 动图` (`/gif`) - 灵动循环，高帧无损不沉闷。
  - `🖼 精选图库` (`/other`) - 千余张高保真极简、人文、科幻背景。
- **🎮 实时交互测试场 (Playground)**：支持在网页多端点一键切换、一键“刷新（换一张）”，提供真实网络重定向延迟监测（Latency Tracking），并针对开发者一键生成 `HTML`、`Markdown` 及 `URL` 引入代码。
- **📊 脉冲实时运营看板**：采用原生高性能无依赖 SVG 计算折线，模拟全球数十亿次 API 请求吞吐趋势图（1.2B+）；并引入本地调用累计监听器。
- **💖 专属扫码赞助打赏模块**：优雅的一键打赏弹窗（包含微信收款码安全防护框架），完美支撑存储和流量开销续标。
- **📚 零时启动极速集成**：无需任何 API Key 甚至鉴权头，完美避开浏览器 CORS 跨域限制，支持在各种静态、动态及后台自动化（Python/cURL）脚本中即刻调用。

---

## 🚀 极速部署至 Cloudflare Pages

本项目针对 **Cloudflare Pages** 完美适配，您可在 1 分钟内完成全站部署：

### 方式 A：GitHub 直接导入部署（首选推荐）

1. 将本项目代码上传到您的 GitHub 仓库。
2. 登录并进入 **Cloudflare Dashboard**，导航至 `Compute` -> `Pages` -> **Create a project** -> **Connect to Git**。
3. 选择您上传的 GitHub 仓库，配置以下构建参数：
   - **Framework preset (框架预设)**: `Vite` (或者选择 `None`)
   - **Build command (构建命令)**: `npm run build`
   - **Output directory (输出路径)**: `dist`
4. 点击 **Save and Deploy** 按钮，等待几十秒构建成功，您即可拥有专属公共访问域名。

### 方式 B：Cloudflare Wrangler CLI 命令行部署

```bash
# 1. 安装项目源依赖
npm install

# 2. 本地执行打包编译
npm run build

# 3. 使用 Cloudflare Wrangler 一键发布 (若未登录会提示扫码鉴权)
npx wrangler pages deploy dist
```

---

## 🛠️ 本地开发指南

```bash
# 克隆仓库
git clone https://github.com/YourUsername/gaoops-api-website.git
cd gaoops-api-website

# 安装项目依赖 (采用 Vite + Tailwind v4 编译环境)
npm install

# 启动本地实时热更新开发服务器
npm run dev
```
本地运行成功后，访问控制台输出的地址（默认为 `http://localhost:3000`）即可进入预览和调试。

---

## 💡 开发集成示例

为了最大化兼容您的前端项目，建议调用大图时加入 `referrerpolicy="no-referrer"`：

### HTML `<img>` 标签直接渲染
```html
<img src="https://wallpapers.gaoops.top/girl" referrerpolicy="no-referrer" alt="Gaoops 随机精品美图" />
```

### Markdown 引入
```markdown
![Gaoops 随机大图](https://wallpapers.gaoops.top/other)
```

---

## 📁 核心项目结构简要

```text
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # 渐变毛玻璃导航浮动栏
│   │   ├── Hero.tsx               # 动态视觉大图直透 Banner 
│   │   ├── ApiPlayground.tsx      # 支持切换/刷新/复制代码的图片试验场
│   │   ├── IntegrationShowcase.tsx# 真实融入博客/聊天头像/极简相册的复合美化示例
│   │   ├── StatsShowcase.tsx      # SVG 折线实时流量吞吐大屏
│   │   ├── CodeSamples.tsx        # 包含 HTML/Markdown/JS/Python 的代码选择卡
│   │   ├── FaqSection.tsx         # 常见集成与CORS安全答疑折叠面板
│   │   ├── Footer.tsx             # 渐进信息展示底部栏与捐赠通道
│   │   └── DonationModal.tsx      # 微信直扫赞助支持打赏浮窗
│   ├── data.ts                    # 存储通道 Endpoint 与 Q&As 元数据
│   ├── types.ts                   # 接口定义数据规范
│   ├── App.tsx                    # 全平台主视图路由状态锚点驱动
│   └── index.css                  # Tailwind CSS v4 与 Google Outfit 极奢字体渲染
```

---

## 💖 赞助捐赠支持

本站属于无盈利性质的主动维护项目，图片存储于全球 Cloudflare R2 智能存储介质，服务器域名和流量带宽仍对原作者有长期的运维负载压迫。特别感谢您的慷慨解囊！

<p align="center">
  <img src="https://image.gaoops.com/wechat2.png" width="280px" alt="微信收款码" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

如果您觉得本项目让您的网页眼前一亮，请不吝赏原作者一杯香醇的拿铁 ☕️，感谢相伴与包容！

---

## 📜 许可证

本项目开源代码采用 [MIT License](./LICENSE) 授权许可发布。图片和美术版权由原画师或原出处拥有，严禁使用本站 API 进行任何非法的批量爬虫攻击或侵害画幅版权的商业出售行为。
