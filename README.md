# 🎯 辩论计时器 | Debate Timer

> UNNC Computer Psycho Union 辩论赛计时系统  
> 一个专业、灵活、易用的辩论计时器，适合各类辩论赛事使用

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.1-5A0EF8)](https://daisyui.com/)

---

## 📖 项目简介

本项目是为 UNNC Computer Psychology Union 开发的辩论赛计时系统，旨在为辩论赛提供专业、灵活的计时解决方案。

**核心特性：**

- ✨ 可视化与 JSON 双模式配置
- ⏱️ 精确到毫秒的计时系统
- 🔔 智能响铃提醒（开始/警告/结束）
- ⌨️ 完整的键盘快捷键支持
- 🎨 优雅的渐变主题与动画效果
- 📱 响应式设计，支持多种屏幕尺寸
- 🎭 支持单边与双边计时模式
- 🚀 基于 Vue 3 + TypeScript + Vite 构建

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发模式

```bash
pnpm dev
# 或
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

### 预览生产构建

```bash
pnpm preview
# 或
npm run preview
```

---

## 🎮 使用说明

### 键盘快捷键

| 快捷键  | 功能                     |
| ------- | ------------------------ |
| `Space` | 开始/暂停计时            |
| `S`     | 切换计时侧面（双边模式） |
| `R`     | 重置当前计时器           |
| `←`     | 上一阶段                 |
| `→`     | 下一阶段                 |

### 配置计时器

1. 点击右上角 **"配置"** 按钮
2. 选择 **"可视化编辑"** 或 **"JSON源码"** 模式
3. 添加/编辑辩论阶段
4. 配置发言者、时长、响铃时机
5. 保存配置

---

## 📁 项目结构

```
debate-timer/
├── config/
│   ├── eslint.config.ts       # ESLint 配置
│   ├── postcss.config.js      # PostCSS 配置
│   ├── tailwind.config.js     # Tailwind CSS 配置
│   ├── tsconfig.json          # TypeScript 配置
│   ├── vite.config.ts         # Vite 配置
├── src/
│   ├── components/
│   │   └── screen/
│   │       ├── debateTimer.vue          # 核心计时器组件
│   │       └── TimerConfigPanel.vue     # 配置面板组件
│   ├── views/
│   │   └── Screen.vue                   # 主屏幕视图
│   ├── types/
│   │   └── screen.ts                    # TypeScript 类型定义
│   ├── utils/
│   │   └── timerDefaults.ts             # 默认计时器配置
│   ├── style/
│   │   └── index.css                    # 全局样式
│   ├── App.vue                          # 根组件
│   └── main.ts                          # 应用入口
├── index.html                           # HTML 模板
├── package.json                         # 项目依赖
└── README.md                            # 中文 README
```

---

## 📝 待完成任务清单 (TODO)

### 🎨 UI/UX 优化

- [ ] **优化配置面板的视觉效果**
  - 改进卡片阴影和间距
  - 添加更流畅的过渡动画
  - 优化颜色对比度，提升可读性
- [ ] **统一整体 UI 设计语言**
  - 统一按钮样式（大小、圆角、阴影）
  - 统一字体大小和行高
  - 制定完整的设计系统文档

- [ ] **改进计时器显示效果**
  - 添加更多的动画效果（如数字滚动）
  - 优化时间变色的渐变效果
  - 添加进度条指示器

- [ ] **响应式设计优化**
  - 优化平板设备显示
  - 优化手机端显示
  - 添加触摸手势支持

### 🔧 功能增强

- [ ] **使用专业的 JSON 编辑器**
  - 集成 Monaco Editor 或 CodeMirror
  - 添加语法高亮
  - 添加自动补全和错误提示

- [ ] **配置管理功能**
  - [ ] 导出配置为 JSON 文件
  - [ ] 从 JSON 文件导入配置
  - [ ] 保存多个配置预设
  - [ ] 配置模板库（不同辩论赛制）

- [ ] **铃声自定义**
  - [ ] 上传自定义铃声文件
  - [ ] 调整铃声音量
  - [ ] 测试铃声功能

- [ ] **全屏模式**
  - [ ] 添加全屏切换按钮
  - [ ] 优化全屏模式下的布局
  - [ ] 支持 ESC 键退出全屏

- [ ] **主题切换**
  - [ ] 明暗主题切换
  - [ ] 多种配色方案
  - [ ] 自定义主题编辑器

- [ ] **辅助功能**
  - [ ] 添加 ARIA 标签支持
  - [ ] 键盘导航优化
  - [ ] 屏幕阅读器支持

### 🏗️ 代码结构优化

- [ ] **组件拆分**
  - [ ] 将 `debateTimer.vue` (400+ 行) 拆分为更小的子组件
  - [ ] 提取 `StageDisplay` 组件
  - [ ] 提取 `TimerDisplay` 组件
  - [ ] 提取 `NavigationControls` 组件

- [ ] **逻辑提取**
  - [ ] 创建 `useTimer` composable 管理计时逻辑
  - [ ] 创建 `useBell` composable 管理铃声逻辑
  - [ ] 创建 `useKeyboard` composable 管理键盘事件

- [ ] **工具函数提取**
  - [ ] 将铃声生成逻辑提取到 `utils/audio.ts`
  - [ ] 将时间格式化逻辑提取到 `utils/time.ts`

- [ ] **添加代码注释**
  - [ ] 为所有公共函数添加 JSDoc 注释
  - [ ] 为复杂逻辑添加行内注释
  - [ ] 创建组件使用示例文档

### 🧪 测试与质量保证

- [ ] **单元测试**
  - [ ] 为工具函数编写测试
  - [ ] 为 composables 编写测试
  - [ ] 使用 Vitest 搭建测试环境

- [ ] **组件测试**
  - [ ] 为关键组件编写测试
  - [ ] 使用 Vue Test Utils
  - [ ] 测试键盘快捷键功能

- [ ] **E2E 测试**
  - [ ] 使用 Playwright 或 Cypress
  - [ ] 测试完整的计时流程
  - [ ] 测试配置保存与加载

### 📚 文档完善

- [ ] **组件文档**
  - [ ] 为每个组件编写使用说明
  - [ ] 添加 Props、Events、Slots 文档
  - [ ] 创建组件 API 参考

- [ ] **用户手册**
  - [ ] 编写详细的用户操作指南
  - [ ] 添加常见问题解答 (FAQ)
  - [ ] 制作使用视频教程

- [ ] **开发者指南**
  - [ ] 编写贡献指南 (CONTRIBUTING.md)
  - [ ] 代码规范说明
  - [ ] Git 提交规范

### 🌐 国际化

- [ ] **多语言支持**
  - [ ] 集成 vue-i18n
  - [ ] 提取所有中文文本
  - [ ] 添加英文翻译
  - [ ] 支持语言切换

### ⚡ 性能优化

- [ ] **代码优化**
  - [ ] 使用 `computed` 优化重复计算
  - [ ] 使用 `v-memo` 优化列表渲染
  - [ ] 懒加载大型组件

- [ ] **构建优化**
  - [ ] 配置代码分割
  - [ ] 优化资源加载
  - [ ] 添加 PWA 支持

### 🐛 已知问题修复

- [ ] **TimerConfigPanel 验证改进**
  - [ ] 在保存失败时显示具体错误信息
  - [ ] 改进表单验证提示
  - [ ] 添加数据格式校验

- [ ] **计时精度优化**
  - [ ] 处理浏览器后台标签页计时偏差
  - [ ] 使用 Web Worker 提高精度

---

## 🤝 如何贡献

我们欢迎所有形式的贡献！无论是修复 bug、添加新功能、改进文档，还是提出建议。

### 贡献步骤

1. **Fork 本仓库**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

### 代码规范

```bash
# 检查代码风格
pnpm lint:check

# 自动修复代码风格
pnpm lint:fix

# 格式化代码
pnpm format
```

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具链相关

**示例：**

```
feat: 添加配置导出功能
fix: 修复计时器重置时的状态错误
docs: 更新 README 中的快捷键说明
```

---

## 📖 学习资源

### Vue 3

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue 3 组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 TypeScript 支持](https://vuejs.org/guide/typescript/overview.html)

### TypeScript

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 中文手册](https://typescript.bootcss.com/)

### Tailwind CSS

- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [DaisyUI 组件库](https://daisyui.com/)

### 工具链

- [Vite 官方文档](https://vitejs.dev/)
- [pnpm 文档](https://pnpm.io/)

---

## 🛠️ 技术栈

- **框架**: Vue 3.5 with Composition API
- **语言**: TypeScript 5.8
- **构建工具**: Vite 7.1
- **样式**: Tailwind CSS 4.1 + DaisyUI 5.1
- **代码规范**: ESLint + Prettier

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 👥 贡献者

感谢所有为这个项目做出贡献的同学！

<!-- 这里可以添加贡献者列表 -->

---

## 📮 联系我们

- **组织**: UNNC Computer Psychology Union
- **GitHub**: [CompPsyUnion/debate-timer](https://github.com/CompPsyUnion/debate-timer)

---

## 🌟 Star History

如果这个项目对你有帮助，请给我们一个 Star ⭐️

---

<div align="center">

**Built with ❤️ by UNNC Computer Psycho Union**

_让每一场辩论都精准计时，让每一次发言都掷地有声_

</div>
