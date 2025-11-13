# Scripts for Creating GitHub Issues from README TODOs

这个目录包含了从 README.md 文件中提取 TODO 项并创建 GitHub Issues 的脚本。

This directory contains scripts to extract TODO items from README.md and create GitHub Issues.

## 文件说明 (Files)

### 1. `create-issues-from-todos.ts`
TypeScript 脚本，用于解析 README.md 并生成不同格式的输出。

TypeScript script to parse README.md and generate different output formats.

**用法 (Usage):**
```bash
# 生成 Markdown 报告 (Generate Markdown report)
npx tsx scripts/create-issues-from-todos.ts markdown

# 生成 JSON 格式 (Generate JSON format)
npx tsx scripts/create-issues-from-todos.ts json

# 生成 GitHub CLI 脚本 (Generate GitHub CLI script)
npx tsx scripts/create-issues-from-todos.ts gh > scripts/create-issues.sh
```

### 2. `create-issues.cjs`
Node.js 脚本，直接使用 GitHub CLI 创建 Issues。

Node.js script to directly create Issues using GitHub CLI.

**用法 (Usage):**
```bash
# 查看将要创建的 Issues（不实际创建）(Dry run - preview without creating)
node scripts/create-issues.cjs --dry-run

# 实际创建 Issues (Actually create the issues)
node scripts/create-issues.cjs
```

### 3. `create-issues.sh`
自动生成的 Bash 脚本，包含所有 `gh issue create` 命令。

Auto-generated Bash script containing all `gh issue create` commands.

**用法 (Usage):**
```bash
# 直接运行脚本 (Run the script directly)
bash scripts/create-issues.sh
```

## 前置要求 (Prerequisites)

### 方法 1: 使用 Node.js 脚本 (Using Node.js script)

1. **安装 GitHub CLI:**
   ```bash
   # macOS
   brew install gh
   
   # Windows
   winget install GitHub.cli
   
   # Linux
   sudo apt install gh
   ```

2. **认证 GitHub CLI:**
   ```bash
   gh auth login
   ```

3. **运行脚本:**
   ```bash
   node scripts/create-issues.cjs --dry-run  # 先预览
   node scripts/create-issues.cjs            # 实际创建
   ```

### 方法 2: 使用生成的 Shell 脚本 (Using generated shell script)

1. **生成脚本:**
   ```bash
   npx tsx scripts/create-issues-from-todos.ts gh > scripts/create-issues.sh
   chmod +x scripts/create-issues.sh
   ```

2. **认证 GitHub CLI:**
   ```bash
   gh auth login
   ```

3. **运行脚本:**
   ```bash
   bash scripts/create-issues.sh
   ```

## TODO 项解析规则 (TODO Parsing Rules)

脚本会从 README.md 中提取以下格式的 TODO 项：

The script extracts TODO items in the following format from README.md:

```markdown
### 🎨 UI/UX 优化

- [ ] **优化配置面板的视觉效果**
  - 改进卡片阴影和间距
  - 添加更流畅的过渡动画
  - 优化颜色对比度，提升可读性
```

**提取结果 (Extracted as):**
- **标题 (Title)**: `[🎨 UI/UX 优化] 优化配置面板的视觉效果`
- **描述 (Description)**: 缩进的子项列表 (List of indented sub-items)
- **标签 (Labels)**: 根据章节自动分配 (Auto-assigned based on section)

## 标签映射 (Label Mapping)

| 章节 (Section) | 标签 (Labels) |
|----------------|---------------|
| 🎨 UI/UX 优化 | `enhancement`, `ui/ux`, `design` |
| 🔧 功能增强 | `enhancement`, `feature` |
| 🏗️ 代码结构优化 | `refactor`, `code-quality` |
| 🧪 测试与质量保证 | `testing`, `quality` |
| 📚 文档完善 | `documentation` |
| 🌐 国际化 | `i18n`, `enhancement` |
| ⚡ 性能优化 | `performance`, `enhancement` |
| 🐛 已知问题修复 | `bug`, `fix` |

## 统计信息 (Statistics)

当前 README.md 中包含 **25 个** TODO 项，分布在 **8 个** 不同的类别中。

The current README.md contains **25** TODO items across **8** different categories.

## 注意事项 (Notes)

1. **避免重复创建 (Avoid Duplicates)**: 运行脚本前，请确认这些 Issues 尚未创建，以避免重复。

2. **批量创建限制 (Rate Limiting)**: GitHub API 有速率限制。脚本会在每个 Issue 创建之间添加 1 秒延迟。

3. **权限要求 (Permissions)**: 需要对仓库有写入权限才能创建 Issues。

4. **标签预创建 (Label Creation)**: 确保仓库中已经创建了相应的标签。如果标签不存在，Issues 仍会创建，但不会附加标签。

## 示例输出 (Example Output)

```
📖 Reading README.md...

📝 Found 25 TODO items to convert to issues

🚀 Creating issues using GitHub CLI (gh)...

Creating issue 1/25: 优化配置面板的视觉效果
Creating issue https://github.com/CompPsyUnion/debate-timer/issues/1
Creating issue 2/25: 统一整体 UI 设计语言
Creating issue https://github.com/CompPsyUnion/debate-timer/issues/2
...

✅ Created 25 issues
```

## 故障排除 (Troubleshooting)

### 问题: gh: command not found
**解决方案**: 安装 GitHub CLI
```bash
brew install gh  # macOS
```

### 问题: Error: GitHub CLI is not authenticated
**解决方案**: 运行 gh auth login
```bash
gh auth login
```

### 问题: Error: could not create issue
**解决方案**: 检查权限和网络连接
- 确认你有仓库的写入权限
- 检查网络连接
- 查看 GitHub CLI 的详细日志：`gh issue create --help`

## 开发 (Development)

如果你想修改脚本的行为：

If you want to modify the script behavior:

1. 编辑 `create-issues-from-todos.ts` 更改解析逻辑
2. 编辑 `create-issues.cjs` 更改 Issue 创建逻辑
3. 运行测试确保脚本正常工作

## 许可证 (License)

MIT License - 与主项目相同
