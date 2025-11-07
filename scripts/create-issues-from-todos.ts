import { readFileSync } from 'fs';
import { resolve } from 'path';

interface TodoItem {
  title: string;
  body: string;
  labels: string[];
  category: string;
}

/**
 * Parse README.md and extract TODO items with their context
 */
function parseReadmeTodos(readmePath: string): TodoItem[] {
  const content = readFileSync(readmePath, 'utf-8');
  const lines = content.split('\n');
  
  const todos: TodoItem[] = [];
  let currentCategory = '';
  let currentSection = '';
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
      // This is a category-level TODO
      const titleMatch = line.match(/\*\*(.+?)\*\*/);
      if (titleMatch) {
        currentCategory = titleMatch[1];
        
        // Collect description lines (indented with spaces or dashes)
        const description: string[] = [];
        let j = i + 1;
        
        while (j < lines.length && (lines[j].startsWith('  -') || lines[j].trim() === '')) {
          if (lines[j].trim() !== '') {
            description.push(lines[j].trim().replace(/^- /, ''));
          }
          j++;
        }
        
        // Determine labels based on section
        const labels = getLabelsForSection(currentSection);
        
        todos.push({
          title: currentCategory,
          body: description.join('\n'),
          labels,
          category: currentSection
        });
        
        i = j;
        continue;
      }
    }
    
    // Handle sub-items (nested TODOs with indentation)
    if (line.match(/^  - \[ \] /)) {
      const subItemTitle = line.replace(/^  - \[ \] /, '').trim();
      
      if (currentCategory) {
        // This is a sub-item of a category, we'll include it in the body
        // Already handled in the category parsing above
      }
    }
    
    i++;
  }
  
  return todos;
}

/**
 * Get appropriate labels based on the section
 */
function getLabelsForSection(section: string): string[] {
  const labelMap: Record<string, string[]> = {
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
 * Generate GitHub CLI commands to create issues
 */
function generateGhCommands(todos: TodoItem[]): string {
  const commands: string[] = [];
  
  commands.push('#!/bin/bash');
  commands.push('# Auto-generated script to create GitHub issues from README todos');
  commands.push('# Run this script with: bash create-issues.sh');
  commands.push('');
  
  todos.forEach((todo, index) => {
    const title = todo.title.replace(/'/g, "'\\''");
    const body = todo.body.replace(/'/g, "'\\''");
    const labels = todo.labels.join(',');
    const categoryPrefix = todo.category ? `[${todo.category}] ` : '';
    
    commands.push(`echo "Creating issue ${index + 1}/${todos.length}: ${todo.title}"`);
    commands.push(`gh issue create \\`);
    commands.push(`  --title '${categoryPrefix}${title}' \\`);
    commands.push(`  --body '${body}' \\`);
    commands.push(`  --label '${labels}'`);
    commands.push('');
  });
  
  return commands.join('\n');
}

/**
 * Generate a JSON file with all todos for other tools to consume
 */
function generateJson(todos: TodoItem[]): string {
  return JSON.stringify(todos, null, 2);
}

/**
 * Generate a markdown report of all todos
 */
function generateMarkdownReport(todos: TodoItem[]): string {
  const lines: string[] = [];
  
  lines.push('# TODO Items from README');
  lines.push('');
  lines.push(`Total TODO items: ${todos.length}`);
  lines.push('');
  
  // Group by category
  const byCategory = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    acc[todo.category].push(todo);
    return acc;
  }, {} as Record<string, TodoItem[]>);
  
  Object.entries(byCategory).forEach(([category, items]) => {
    lines.push(`## ${category}`);
    lines.push('');
    items.forEach((item, index) => {
      lines.push(`### ${index + 1}. ${item.title}`);
      lines.push('');
      if (item.body) {
        lines.push(item.body);
        lines.push('');
      }
      lines.push(`**Labels:** ${item.labels.join(', ')}`);
      lines.push('');
    });
  });
  
  return lines.join('\n');
}

// Main execution
function main() {
  const readmePath = resolve(process.cwd(), 'README.md');
  console.log(`Parsing todos from: ${readmePath}`);
  
  const todos = parseReadmeTodos(readmePath);
  console.log(`Found ${todos.length} TODO items`);
  
  // Output results
  const output = process.argv[2] || 'markdown';
  
  switch (output) {
    case 'json':
      console.log(generateJson(todos));
      break;
    case 'gh':
      console.log(generateGhCommands(todos));
      break;
    case 'markdown':
    default:
      console.log(generateMarkdownReport(todos));
      break;
  }
}

main();
