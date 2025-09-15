# QuickOpus2MP3 - 在线音频转换器

一个基于浏览器的音频转换工具，可以将 OPUS、OGG、WebM 格式的音频文件转换为 MP3 格式。所有转换过程完全在浏览器中进行，无需上传文件到服务器，保护您的隐私。

## 特性

- ✅ 支持 OPUS、OGG、WebM 格式转换为 MP3
- ✅ 完全在浏览器端处理，无需服务器
- ✅ 支持文件拖拽上传
- ✅ 实时转换进度显示
- ✅ 可自定义比特率（128/192/320 kbps）
- ✅ 最大支持 100MB 文件
- ✅ 响应式设计，支持移动设备

## 技术栈

- **框架**: Next.js 15.5 (App Router)
- **UI 组件**: Shadcn/UI + Tailwind CSS
- **音频处理**: FFmpeg.wasm v0.12
- **语言**: TypeScript
- **部署**: Vercel/Cloudflare Pages

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 点击部署即可

### 部署到 Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 [Cloudflare Pages](https://pages.cloudflare.com) 创建项目
3. 选择 Next.js 框架预设
4. 点击部署

## 项目结构

```
opus2mp3/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── page.tsx      # 主页面
│   │   ├── layout.tsx    # 布局文件
│   │   └── globals.css   # 全局样式
│   ├── components/       # React 组件
│   │   ├── FileUploader.tsx  # 文件上传组件
│   │   └── ui/           # Shadcn/UI 组件
│   └── lib/              # 工具库
│       └── ffmpeg.ts     # FFmpeg 转换器封装
├── public/               # 静态资源
├── next.config.js        # Next.js 配置
└── package.json          # 项目依赖
```

## 使用说明

1. **选择文件**: 点击上传区域或拖拽文件到上传区域
2. **设置参数**: 可选择音频比特率（默认192kbps）
3. **开始转换**: 点击"开始转换"按钮
4. **下载结果**: 转换完成后点击"下载 MP3"按钮

## 注意事项

- 首次使用时需要加载 FFmpeg.wasm（约30MB），请耐心等待
- 大文件转换可能需要较长时间，请保持页面打开
- 建议使用现代浏览器（Chrome、Firefox、Edge、Safari）

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请提交 [Issue](https://github.com/yourusername/quickopus2mp3/issues)