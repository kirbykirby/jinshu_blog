# 晉書數字典藏 Book of Jin Digital Archive

晉書數字典藏是一个致力于《晉書》全文数字化与翻译的开源项目。本项目旨在通过现代网络技术，为研究者和爱好者提供一个便捷、专业的《晉書》研究平台。

## 🌟 功能特点

- **双语对照**
  - 中英文平行展示
  - 专业的学术翻译
  - 注释和参考文献支持

- **智能搜索**
  - 全文检索功能
  - 支持中英文搜索
  - 实时搜索建议

- **分类浏览**
  - 帝紀（Imperial Chronicles）
  - 列傳（Biographies）
  - 志（Treatises）
  - 載記（Records）

- **学术工具**
  - 注释系统
  - 参考文献管理
  - 交叉引用功能

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone [项目地址]

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 使用方法

1. 访问开发服务器地址（默认为 `http://localhost:4321`）
2. 使用侧边栏导航浏览不同章节
3. 使用搜索功能查找特定内容
4. 点击注释查看详细说明

## 📁 项目结构

```
/
├── src/
│   ├── components/     # 可复用组件
│   ├── layouts/        # 页面布局模板
│   ├── pages/          # 页面路由
│   ├── content/        # 内容集合
│   └── lib/           # 工具函数和类型定义
├── public/            # 静态资源
└── astro.config.mjs   # Astro配置文件
```

## 🛠️ 技术栈

- **核心框架**
  - [Astro](https://astro.build) - 静态站点生成器
  - TypeScript - 类型安全的JavaScript超集

- **样式与UI**
  - CSS Variables - 主题定制
  - Responsive Design - 响应式设计

- **内容管理**
  - Astro Content Collections - 内容管理
  - MDX - Markdown增强

- **工具链**
  - Vite - 开发服务器和构建工具
  - ESLint - 代码质量控制
  - Prettier - 代码格式化

## 📝 贡献指南

我们欢迎各种形式的贡献，包括但不限于：

- 提交新的翻译内容
- 改进现有翻译
- 修复错误
- 改进用户界面
- 添加新功能
