以下是面向小白开发者的“极简、零后端”MVP产品需求文档（PRD），详细到具体实施步骤与工具使用。

# QuickOpus2MP3 零后端MVP PRD

## 一、产品概述
- **定位**：纯前端在线 OPUS 转 MP3，零后端部署，适合小白快速上线。  
- **目标**：让用户在浏览器中一键上传、转换、下载，无需服务器和运维。  
- **核心价值**：  
  - 极简开发：无后端代码  
  - 零运维：部署到 Vercel 或 Cloudflare Pages  
  - 即点即用：支持单文件转换  

***

## 二、目标用户
- Web 开发新手，倾向 AI 辅助编程  
- 内容创作者、播客制作者需快速格式转换  
- 偏好免安装、在线工具的普通用户  

***

## 三、MVP 功能

### 1. 首页与上传
- **页面布局**：  
  - 标题：QuickOpus2MP3  
  - 文件选择区：拖拽或点击上传 OPUS 文件  
  - 转换按钮：仅在选中文件后可点击  
- **技术要点**：  
  - Next.js App Router  
  - Shadcn/UI 提供文件上传组件  
  - Tailwind CSS 快速布局  

### 2. 浏览器内转换
- **工具**：ffmpeg.wasm  
- **流程**：  
  1. 用户选中文件后，前端用 File API 读取文件  
  2. 初始化 ffmpeg.wasm 实例  
  3. 加载 .wasm 核心（CDN 引入）  
  4. 调用 ffmpeg.run 将 OPUS 转为 MP3  
  5. 获取输出二进制，生成 Blob  

### 3. 转换进度反馈
- **展示**：  
  - Shadcn/UI 进度条组件  
  - 文本提示：“转换中：xx%”  
- **实现**：ffmpeg.wasm 支持进度回调，更新组件状态  

### 4. 下载功能
- **展示**：转换完成后显示“下载 MP3”按钮  
- **实现**：  
  - URL.createObjectURL 生成临时下载链接  
  - 点击触发 a.download  

### 5. 异常处理
- 支持文件类型校验，仅限 .opus  
- 转换失败弹窗提示错误，可重试  
- 文件大小限制（建议 ≤50 MB），超限提示  

***

## 四、技术选型与工具

| 模块       | 技术/库                  | 说明                                |
| ---------- | ------------------------ | ----------------------------------- |
| 框架       | Next.js (App Router)     | 轻量、零配置                        |
| UI 库      | Shadcn/UI + Tailwind CSS | 可复用组件、快速样式                |
| 音频处理   | ffmpeg.wasm              | 完全浏览器端，无需后端              |
| HTTP 客户端| Axios（可选）            | 若需外部 API，当前可省略            |
| 部署       | Vercel 或 Cloudflare Pages | GitHub 一键部署                     |
| IDE 支持   | AI IDE（如 GitHub Copilot） | 辅助编写代码、小白友好           |

***

## 五、详细实现步骤

1. **初始化项目**  
   - 在 AI IDE 中运行：`npx create-next-app@latest quickopus2mp3 --typescript --eslint`  
   - 选择 App Router，集成 Tailwind CSS（按提示安装）  

2. **集成 Shadcn/UI**  
   - 安装：`npm install shadcn-ui`  
   - 按文档生成文件：`npx shadcn-ui init`  
   - 引入上传、按钮、进度条组件  

3. **引入 ffmpeg.wasm**  
   - 安装依赖：`npm install @ffmpeg/ffmpeg @ffmpeg/core`  
   - 在 pages 或 app 页面中：  
     ```tsx
     import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
     const ffmpeg = createFFmpeg({ log: true });
     await ffmpeg.load();
     const data = await fetchFile(file);
     await ffmpeg.FS('writeFile', 'input.opus', data);
     await ffmpeg.run('-i', 'input.opus', 'output.mp3');
     const mp3 = ffmpeg.FS('readFile', 'output.mp3');
     ```
4. **实现上传与进度**  
   - 上传：Shadcn/UI `<FileUpload>`，回调获取文件  
   - 进度回调：  
     ```tsx
     ffmpeg.setProgress(({ ratio }) => {
       setProgress(Math.round(ratio*100));
     });
     ```
5. **生成并下载 MP3**  
   - 将 `mp3` Uint8Array 转 Blob：  
     ```tsx
     const blob = new Blob([mp3.buffer], { type: 'audio/mpeg' });
     const url = URL.createObjectURL(blob);
     ```
   - 渲染下载按钮：`<a href={url} download="output.mp3">下载 MP3</a>`

6. **异常与文件大小校验**  
   - 校验后缀：`file.name.endsWith('.opus')`  
   - 大小限制：`file.size < 50*1024*1024`  

7. **部署到 Vercel**  
   - 推送到 GitHub  
   - 在 Vercel 导入项目，一键部署  

***

## 六、里程碑与预期

- Day 1：环境搭建、UI 页面原型  
- Day 2：上传与 ffmpeg 加载、基本转换  
- Day 3：进度条、下载功能、异常处理  
- Day 4：样式优化、部署与测试  

完成后用户可在浏览器中**零配置**完成 OPUS→MP3 转换，真正实现“极简、零后端”。