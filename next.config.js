/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 优化配置
  output: 'standalone',

  // 禁用图片优化（Cloudflare Pages 不支持）
  images: {
    unoptimized: true,
  },

  // 保留必要的 CORS headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },


  // 确保客户端组件正确打包
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

module.exports = nextConfig;