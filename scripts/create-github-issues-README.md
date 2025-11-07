# GitHub Issues Creator - Standalone Script

这是一个独立的脚本，用于从 README.md 中提取 TODO 项并自动创建 GitHub Issues。

This is a standalone script to extract TODO items from README.md and automatically create GitHub Issues.

## 特点 (Features)

- ✅ 自动认证 GitHub (Automatic GitHub authentication)
- ✅ 从 README.md 提取所有 TODO 项 (Extracts all TODO items from README.md)
- ✅ 自动移除标题中的 emoji (Automatically removes emojis from titles)
- ✅ 支持自定义标签 (Supports custom labels)
- ✅ 独立运行，无需其他依赖 (Standalone, no other dependencies)

## 使用方法 (Usage)

### 方法 1: 使用环境变量 (Using environment variable)

```bash
# 设置 token 并运行脚本
GITHUB_TOKEN=ghp_your_token_here node scripts/create-github-issues.cjs
```

### 方法 2: 直接设置环境变量 (Set environment variable directly)

在运行脚本前设置环境变量:
```bash
export GITHUB_TOKEN=ghp_your_token_here
node scripts/create-github-issues.cjs
```

**注意**: 不建议在脚本中硬编码 token，这可能导致 token 意外泄露到版本控制系统中。

## 前置要求 (Prerequisites)

1. **Node.js** (已安装 / Installed)
2. **GitHub CLI (`gh`)** (已安装 / Installed)
   ```bash
   # macOS
   brew install gh
   
   # Windows
   winget install GitHub.cli
   
   # Linux
   sudo apt install gh
   ```
3. **GitHub Personal Access Token (PAT)** 需要以下权限:
   - `repo` (完整仓库访问权限)
   - 或者 `public_repo` (如果是公开仓库)

## 创建 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" > "Generate new token (classic)"
3. 设置 token 名称，例如: "Issue Creator"
4. 选择权限:
   - ✅ `repo` (或 `public_repo`)
5. 点击 "Generate token"
6. 复制生成的 token (以 `ghp_` 开头)

## 脚本功能 (Script Features)

### 解析规则 (Parsing Rules)

脚本会从 README.md 中提取以下格式的 TODO 项:

```markdown
### 🎨 UI/UX 优化

- [ ] **优化配置面板的视觉效果**
  - 改进卡片阴影和间距
  - 添加更流畅的过渡动画
```

### Issue 格式 (Issue Format)

生成的 Issue:
- **标题 (Title)**: `[UI/UX 优化] 优化配置面板的视觉效果` (无 emoji)
- **描述 (Body)**: 所有子项的列表
- **标签 (Labels)**: 根据章节自动分配

### 标签映射 (Label Mapping)

| 章节 (Section) | 标签 (Labels) |
|----------------|---------------|
| UI/UX 优化 | `enhancement`, `ui/ux`, `design` |
| 功能增强 | `enhancement`, `feature` |
| 代码结构优化 | `refactor`, `code-quality` |
| 测试与质量保证 | `testing`, `quality` |
| 文档完善 | `documentation` |
| 国际化 | `i18n`, `enhancement` |
| 性能优化 | `performance`, `enhancement` |
| 已知问题修复 | `bug`, `fix` |

## 运行示例 (Example Run)

```bash
$ GITHUB_TOKEN=ghp_xxx node scripts/create-github-issues.cjs

📖 GitHub Issues Creator

============================================================

🔐 Authenticating with GitHub...
✅ Authentication successful

📄 Reading todos from: /path/to/README.md

📝 Found 25 TODO items

============================================================

🚀 Creating GitHub issues...

Creating issue 1/25: 优化配置面板的视觉效果
Creating issue 2/25: 统一整体 UI 设计语言
Creating issue 3/25: 改进计时器显示效果
...
Creating issue 25/25: 计时精度优化

============================================================

✅ Created 25 issues successfully

🎉 Done!
```

## 预期结果 (Expected Results)

运行此脚本将在 GitHub 仓库中创建 **25 个 Issues**，分布在以下类别:

1. **UI/UX 优化** (4 issues)
   - 优化配置面板的视觉效果
   - 统一整体 UI 设计语言
   - 改进计时器显示效果
   - 响应式设计优化

2. **功能增强** (6 issues)
   - 使用专业的 JSON 编辑器
   - 配置管理功能
   - 铃声自定义
   - 全屏模式
   - 主题切换
   - 辅助功能

3. **代码结构优化** (4 issues)
   - 组件拆分
   - 逻辑提取
   - 工具函数提取
   - 添加代码注释

4. **测试与质量保证** (3 issues)
   - 单元测试
   - 组件测试
   - E2E 测试

5. **文档完善** (3 issues)
   - 组件文档
   - 用户手册
   - 开发者指南

6. **国际化** (1 issue)
   - 多语言支持

7. **性能优化** (2 issues)
   - 代码优化
   - 构建优化

8. **已知问题修复** (2 issues)
   - TimerConfigPanel 验证改进
   - 计时精度优化

## 注意事项 (Notes)

1. **避免重复**: 运行前请确认这些 Issues 尚未创建
2. **速率限制**: 脚本在每个 Issue 之间会等待 1 秒，避免触发 GitHub API 速率限制
3. **Token 安全**: 
   - 不要将含有 token 的脚本提交到 Git
   - 使用后可以考虑撤销该 token
   - 使用环境变量是更安全的方式

## 故障排除 (Troubleshooting)

### 问题: gh: command not found
**解决**: 安装 GitHub CLI
```bash
brew install gh  # macOS
```

### 问题: Authentication failed
**解决**: 
- 检查 token 是否正确
- 确认 token 有 `repo` 权限
- 确认 token 未过期

### 问题: Failed to create issue
**解决**:
- 检查网络连接
- 确认有仓库的写入权限
- 检查仓库名称和所有者是否正确

## 许可证 (License)

MIT License - 与主项目相同
