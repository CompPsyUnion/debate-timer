#!/usr/bin/env node

/**
 * Create GitHub issues from README todos
 * 
 * This script reads the README.md file, extracts TODO items,
 * and creates GitHub issues using either GitHub CLI or Octokit.
 * 
 * Usage:
 *   node scripts/create-issues.js                    # Create issues using gh CLI
 *   node scripts/create-issues.js --use-api          # Create issues using Octokit API
 *   node scripts/create-issues.js --dry-run          # Show what would be created
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TodoParser {
  constructor(readmePath) {
    this.readmePath = readmePath;
    this.todos = [];
  }

  parse() {
    const content = fs.readFileSync(this.readmePath, 'utf-8');
    const lines = content.split('\n');
    
    let currentSection = '';
    let currentCategory = '';
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Detect main section headers (### level)
      if (line.startsWith('### ')) {
        currentSection = line.replace('### ', '').trim();
        currentCategory = '';
        i++;
        continue;
      }
      
      // Detect category (bold items that are TODOs)
      if (line.match(/^- \[ \] \*\*/)) {
        const titleMatch = line.match(/\*\*(.+?)\*\*/);
        if (titleMatch) {
          currentCategory = titleMatch[1];
          
          // Collect description lines
          const description = [];
          let j = i + 1;
          
          while (j < lines.length && (lines[j].startsWith('  -') || lines[j].trim() === '')) {
            if (lines[j].trim() !== '') {
              description.push(lines[j].trim().replace(/^- /, ''));
            }
            j++;
          }
          
          const labels = this.getLabelsForSection(currentSection);
          
          this.todos.push({
            title: currentCategory,
            body: description.join('\n'),
            labels,
            category: currentSection
          });
          
          i = j;
          continue;
        }
      }
      
      i++;
    }
    
    return this.todos;
  }

  getLabelsForSection(section) {
    const labelMap = {
      '🎨 UI/UX 优化': ['enhancement', 'ui/ux', 'design'],
      '🎨 UI/UX Optimization': ['enhancement', 'ui/ux', 'design'],
      '🔧 功能增强': ['enhancement', 'feature'],
      '🔧 Feature Enhancements': ['enhancement', 'feature'],
      '🏗️ 代码结构优化': ['refactor', 'code-quality'],
      '🏗️ Code Structure Optimization': ['refactor', 'code-quality'],
      '🧪 测试与质量保证': ['testing', 'quality'],
      '🧪 Testing and Quality Assurance': ['testing', 'quality'],
      '📚 文档完善': ['documentation'],
      '📚 Documentation Completion': ['documentation'],
      '🌐 国际化': ['i18n', 'enhancement'],
      '🌐 Internationalization': ['i18n', 'enhancement'],
      '⚡ 性能优化': ['performance', 'enhancement'],
      '⚡ Performance Optimization': ['performance', 'enhancement'],
      '🐛 已知问题修复': ['bug', 'fix'],
      '🐛 Known Issue Fixes': ['bug', 'fix'],
    };
    
    return labelMap[section] || ['enhancement'];
  }
}

class IssueCreator {
  constructor(todos, options = {}) {
    this.todos = todos;
    this.dryRun = options.dryRun || false;
    this.useApi = options.useApi || false;
  }

  async createIssues() {
    console.log(`\n📝 Found ${this.todos.length} TODO items to convert to issues\n`);
    
    if (this.dryRun) {
      console.log('🔍 DRY RUN MODE - No issues will be created\n');
      this.todos.forEach((todo, index) => {
        console.log(`${index + 1}. [${todo.category}] ${todo.title}`);
        console.log(`   Labels: ${todo.labels.join(', ')}`);
        console.log(`   Body: ${todo.body.substring(0, 50)}...`);
        console.log('');
      });
      return;
    }

    if (this.useApi) {
      await this.createIssuesViaApi();
    } else {
      await this.createIssuesViaGhCli();
    }
  }

  async createIssuesViaGhCli() {
    console.log('🚀 Creating issues using GitHub CLI (gh)...\n');
    
    // Check if gh is authenticated
    try {
      execSync('gh auth status', { stdio: 'ignore' });
    } catch (error) {
      console.error('❌ Error: GitHub CLI is not authenticated.');
      console.error('   Please run: gh auth login');
      process.exit(1);
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < this.todos.length; i++) {
      const todo = this.todos[i];
      const issueNumber = i + 1;
      const title = `[${todo.category}] ${todo.title}`;
      const labels = todo.labels.join(',');
      
      console.log(`Creating issue ${issueNumber}/${this.todos.length}: ${todo.title}`);
      
      try {
        const command = `gh issue create --title "${title.replace(/"/g, '\\"')}" --body "${todo.body.replace(/"/g, '\\"')}" --label "${labels}"`;
        execSync(command, { stdio: 'inherit' });
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to create issue: ${todo.title}`);
        failCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\n✅ Created ${successCount} issues`);
    if (failCount > 0) {
      console.log(`❌ Failed to create ${failCount} issues`);
    }
  }

  async createIssuesViaApi() {
    console.log('🚀 Creating issues using Octokit API...\n');
    console.error('❌ Error: Octokit is not installed.');
    console.error('   Please install it with: npm install @octokit/rest');
    console.error('   Or use GitHub CLI instead: node scripts/create-issues.js');
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const useApi = args.includes('--use-api');

  const readmePath = path.join(process.cwd(), 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.error(`❌ Error: README.md not found at ${readmePath}`);
    process.exit(1);
  }

  console.log('📖 Reading README.md...');
  const parser = new TodoParser(readmePath);
  const todos = parser.parse();

  const creator = new IssueCreator(todos, { dryRun, useApi });
  await creator.createIssues();
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
