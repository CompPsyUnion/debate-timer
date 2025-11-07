#!/usr/bin/env node

/**
 * Create GitHub issues from README todos
 * 
 * This is a standalone script that:
 * - Reads TODO items from README.md
 * - Creates GitHub issues via GitHub CLI
 * - Handles authentication automatically
 * - Removes emojis from issue titles
 * 
 * Usage:
 *   GITHUB_TOKEN=ghp_your_token_here node scripts/create-github-issues.cjs
 *   
 * Or set the token directly in the script (line 30)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// CONFIGURATION
// ============================================================================

// Set your GitHub token here or use GITHUB_TOKEN environment variable
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// Repository information (auto-detected from git or set manually)
const REPO_OWNER = 'CompPsyUnion';
const REPO_NAME = 'debate-timer';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Remove emoji characters from text
 */
function removeEmojis(text) {
  // Remove emoji characters - comprehensive Unicode emoji ranges
  // Also removes variation selectors and zero-width joiners
  return text
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{FE00}-\u{FE0F}]|[\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse README.md and extract TODO items
 */
function parseReadmeTodos(readmePath) {
  const content = fs.readFileSync(readmePath, 'utf-8');
  const lines = content.split('\n');
  
  const todos = [];
  let currentSection = '';
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Detect main section headers (### level)
    if (line.startsWith('### ')) {
      currentSection = line.replace('### ', '').trim();
      i++;
      continue;
    }
    
    // Detect category (bold items that are TODOs)
    if (line.match(/^- \[ \] \*\*/)) {
      const titleMatch = line.match(/\*\*(.+?)\*\*/);
      if (titleMatch) {
        const title = titleMatch[1];
        
        // Collect description lines
        const description = [];
        let j = i + 1;
        
        while (j < lines.length && (lines[j].startsWith('  -') || lines[j].trim() === '')) {
          if (lines[j].trim() !== '') {
            description.push(lines[j].trim().replace(/^- /, ''));
          }
          j++;
        }
        
        const labels = getLabelsForSection(currentSection);
        
        todos.push({
          title: title,
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
  
  return todos;
}

/**
 * Get appropriate labels based on the section
 */
function getLabelsForSection(section) {
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

/**
 * Authenticate with GitHub CLI using the token
 */
function authenticateGitHub(token) {
  console.log('🔐 Authenticating with GitHub...');
  
  try {
    // Set the token for gh CLI
    execSync(`echo "${token}" | gh auth login --with-token`, { 
      stdio: 'pipe',
      env: { ...process.env, GH_TOKEN: token }
    });
    console.log('✅ Authentication successful\n');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed');
    console.error('   Please check your token and ensure it has repo permissions');
    return false;
  }
}

/**
 * Create a single issue using GitHub CLI
 */
function createIssue(todo, issueNumber, totalIssues, token) {
  // Remove emojis from category and title
  const categoryClean = removeEmojis(todo.category);
  const titleClean = removeEmojis(todo.title);
  const title = `[${categoryClean}] ${titleClean}`;
  const labels = todo.labels.join(',');
  
  console.log(`Creating issue ${issueNumber}/${totalIssues}: ${titleClean}`);
  
  try {
    // Use array form to avoid shell injection
    const args = [
      'issue', 'create',
      '--repo', `${REPO_OWNER}/${REPO_NAME}`,
      '--title', title,
      '--body', todo.body,
      '--label', labels
    ];
    
    execSync(`gh ${args.map(arg => {
      // Properly escape arguments for shell
      if (arg.includes(' ') || arg.includes('\n') || arg.includes('"') || arg.includes("'")) {
        return "'" + arg.replace(/'/g, "'\\''") + "'";
      }
      return arg;
    }).join(' ')}`, { 
      stdio: 'pipe',
      env: { ...process.env, GH_TOKEN: token }
    });
    return true;
  } catch (error) {
    console.error(`❌ Failed to create issue: ${titleClean}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('📖 GitHub Issues Creator\n');
  console.log('='.repeat(60));
  console.log('');
  
  // Check if token is provided
  if (!GITHUB_TOKEN) {
    console.error('❌ Error: GitHub token not provided');
    console.error('   Please set GITHUB_TOKEN environment variable or edit the script');
    console.error('   Example: GITHUB_TOKEN=ghp_xxx node scripts/create-github-issues.cjs');
    process.exit(1);
  }
  
  // Authenticate with GitHub
  if (!authenticateGitHub(GITHUB_TOKEN)) {
    process.exit(1);
  }
  
  // Parse README.md
  const readmePath = path.join(process.cwd(), 'README.md');
  console.log(`📄 Reading todos from: ${readmePath}\n`);
  
  if (!fs.existsSync(readmePath)) {
    console.error(`❌ Error: README.md not found at ${readmePath}`);
    process.exit(1);
  }
  
  const todos = parseReadmeTodos(readmePath);
  console.log(`📝 Found ${todos.length} TODO items\n`);
  console.log('='.repeat(60));
  console.log('');
  
  // Create issues
  console.log('🚀 Creating GitHub issues...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const success = createIssue(todo, i + 1, todos.length, GITHUB_TOKEN);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('');
  console.log('='.repeat(60));
  console.log('');
  console.log(`✅ Created ${successCount} issues successfully`);
  if (failCount > 0) {
    console.log(`❌ Failed to create ${failCount} issues`);
  }
  console.log('');
  console.log('🎉 Done!');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
