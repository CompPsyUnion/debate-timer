Parsing todos from: /home/runner/work/debate-timer/debate-timer/README.md
Found 25 TODO items
#!/bin/bash
# Auto-generated script to create GitHub issues from README todos
# Run this script with: bash create-issues.sh

echo "Creating issue 1/25: 优化配置面板的视觉效果"
gh issue create \
  --title '[🎨 UI/UX 优化] 优化配置面板的视觉效果' \
  --body '改进卡片阴影和间距
添加更流畅的过渡动画
优化颜色对比度，提升可读性' \
  --label 'enhancement,ui/ux,design'

echo "Creating issue 2/25: 统一整体 UI 设计语言"
gh issue create \
  --title '[🎨 UI/UX 优化] 统一整体 UI 设计语言' \
  --body '统一按钮样式（大小、圆角、阴影）
统一字体大小和行高
制定完整的设计系统文档' \
  --label 'enhancement,ui/ux,design'

echo "Creating issue 3/25: 改进计时器显示效果"
gh issue create \
  --title '[🎨 UI/UX 优化] 改进计时器显示效果' \
  --body '添加更多的动画效果（如数字滚动）
优化时间变色的渐变效果
添加进度条指示器' \
  --label 'enhancement,ui/ux,design'

echo "Creating issue 4/25: 响应式设计优化"
gh issue create \
  --title '[🎨 UI/UX 优化] 响应式设计优化' \
  --body '优化平板设备显示
优化手机端显示
添加触摸手势支持' \
  --label 'enhancement,ui/ux,design'

echo "Creating issue 5/25: 使用专业的 JSON 编辑器"
gh issue create \
  --title '[🔧 功能增强] 使用专业的 JSON 编辑器' \
  --body '集成 Monaco Editor 或 CodeMirror
添加语法高亮
添加自动补全和错误提示' \
  --label 'enhancement,feature'

echo "Creating issue 6/25: 配置管理功能"
gh issue create \
  --title '[🔧 功能增强] 配置管理功能' \
  --body '[ ] 导出配置为 JSON 文件
[ ] 从 JSON 文件导入配置
[ ] 保存多个配置预设
[ ] 配置模板库（不同辩论赛制）' \
  --label 'enhancement,feature'

echo "Creating issue 7/25: 铃声自定义"
gh issue create \
  --title '[🔧 功能增强] 铃声自定义' \
  --body '[ ] 上传自定义铃声文件
[ ] 调整铃声音量
[ ] 测试铃声功能' \
  --label 'enhancement,feature'

echo "Creating issue 8/25: 全屏模式"
gh issue create \
  --title '[🔧 功能增强] 全屏模式' \
  --body '[ ] 添加全屏切换按钮
[ ] 优化全屏模式下的布局
[ ] 支持 ESC 键退出全屏' \
  --label 'enhancement,feature'

echo "Creating issue 9/25: 主题切换"
gh issue create \
  --title '[🔧 功能增强] 主题切换' \
  --body '[ ] 明暗主题切换
[ ] 多种配色方案
[ ] 自定义主题编辑器' \
  --label 'enhancement,feature'

echo "Creating issue 10/25: 辅助功能"
gh issue create \
  --title '[🔧 功能增强] 辅助功能' \
  --body '[ ] 添加 ARIA 标签支持
[ ] 键盘导航优化
[ ] 屏幕阅读器支持' \
  --label 'enhancement,feature'

echo "Creating issue 11/25: 组件拆分"
gh issue create \
  --title '[🏗️ 代码结构优化] 组件拆分' \
  --body '[ ] 将 `debateTimer.vue` (400+ 行) 拆分为更小的子组件
[ ] 提取 `StageDisplay` 组件
[ ] 提取 `TimerDisplay` 组件
[ ] 提取 `NavigationControls` 组件' \
  --label 'refactor,code-quality'

echo "Creating issue 12/25: 逻辑提取"
gh issue create \
  --title '[🏗️ 代码结构优化] 逻辑提取' \
  --body '[ ] 创建 `useTimer` composable 管理计时逻辑
[ ] 创建 `useBell` composable 管理铃声逻辑
[ ] 创建 `useKeyboard` composable 管理键盘事件' \
  --label 'refactor,code-quality'

echo "Creating issue 13/25: 工具函数提取"
gh issue create \
  --title '[🏗️ 代码结构优化] 工具函数提取' \
  --body '[ ] 将铃声生成逻辑提取到 `utils/audio.ts`
[ ] 将时间格式化逻辑提取到 `utils/time.ts`' \
  --label 'refactor,code-quality'

echo "Creating issue 14/25: 添加代码注释"
gh issue create \
  --title '[🏗️ 代码结构优化] 添加代码注释' \
  --body '[ ] 为所有公共函数添加 JSDoc 注释
[ ] 为复杂逻辑添加行内注释
[ ] 创建组件使用示例文档' \
  --label 'refactor,code-quality'

echo "Creating issue 15/25: 单元测试"
gh issue create \
  --title '[🧪 测试与质量保证] 单元测试' \
  --body '[ ] 为工具函数编写测试
[ ] 为 composables 编写测试
[ ] 使用 Vitest 搭建测试环境' \
  --label 'testing,quality'

echo "Creating issue 16/25: 组件测试"
gh issue create \
  --title '[🧪 测试与质量保证] 组件测试' \
  --body '[ ] 为关键组件编写测试
[ ] 使用 Vue Test Utils
[ ] 测试键盘快捷键功能' \
  --label 'testing,quality'

echo "Creating issue 17/25: E2E 测试"
gh issue create \
  --title '[🧪 测试与质量保证] E2E 测试' \
  --body '[ ] 使用 Playwright 或 Cypress
[ ] 测试完整的计时流程
[ ] 测试配置保存与加载' \
  --label 'testing,quality'

echo "Creating issue 18/25: 组件文档"
gh issue create \
  --title '[📚 文档完善] 组件文档' \
  --body '[ ] 为每个组件编写使用说明
[ ] 添加 Props、Events、Slots 文档
[ ] 创建组件 API 参考' \
  --label 'documentation'

echo "Creating issue 19/25: 用户手册"
gh issue create \
  --title '[📚 文档完善] 用户手册' \
  --body '[ ] 编写详细的用户操作指南
[ ] 添加常见问题解答 (FAQ)
[ ] 制作使用视频教程' \
  --label 'documentation'

echo "Creating issue 20/25: 开发者指南"
gh issue create \
  --title '[📚 文档完善] 开发者指南' \
  --body '[ ] 编写贡献指南 (CONTRIBUTING.md)
[ ] 代码规范说明
[ ] Git 提交规范' \
  --label 'documentation'

echo "Creating issue 21/25: 多语言支持"
gh issue create \
  --title '[🌐 国际化] 多语言支持' \
  --body '[ ] 集成 vue-i18n
[ ] 提取所有中文文本
[ ] 添加英文翻译
[ ] 支持语言切换' \
  --label 'i18n,enhancement'

echo "Creating issue 22/25: 代码优化"
gh issue create \
  --title '[⚡ 性能优化] 代码优化' \
  --body '[ ] 使用 `computed` 优化重复计算
[ ] 使用 `v-memo` 优化列表渲染
[ ] 懒加载大型组件' \
  --label 'performance,enhancement'

echo "Creating issue 23/25: 构建优化"
gh issue create \
  --title '[⚡ 性能优化] 构建优化' \
  --body '[ ] 配置代码分割
[ ] 优化资源加载
[ ] 添加 PWA 支持' \
  --label 'performance,enhancement'

echo "Creating issue 24/25: TimerConfigPanel 验证改进"
gh issue create \
  --title '[🐛 已知问题修复] TimerConfigPanel 验证改进' \
  --body '[ ] 在保存失败时显示具体错误信息
[ ] 改进表单验证提示
[ ] 添加数据格式校验' \
  --label 'bug,fix'

echo "Creating issue 25/25: 计时精度优化"
gh issue create \
  --title '[🐛 已知问题修复] 计时精度优化' \
  --body '[ ] 处理浏览器后台标签页计时偏差
[ ] 使用 Web Worker 提高精度' \
  --label 'bug,fix'

