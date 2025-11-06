# 🎯 Debate Timer

> UNNC Computer Psycho Union Debate Competition Timing System
> A professional, flexible, and easy-to-use debate timer suitable for various debate competitions

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.1-5A0EF8)](https://daisyui.com/)

---

## 📖 Project Introduction

This project is a debate competition timing system developed for UNNC Computer Psycho Union, aiming to provide professional and flexible timing solutions for debate competitions.

Maintainer of the project: [@Gentle-Lijie](https://github.com/Gentle-Lijie), [@HNRobert](https://github.com/HNRobert)


**Core Features:**

- ✨ Visual and JSON dual-mode configuration
- ⏱️ Precise millisecond-level timing system
- 🔔 Intelligent bell reminders (start/warning/end)
- ⌨️ Complete keyboard shortcut support
- 🎨 Elegant gradient themes and animation effects
- 📱 Responsive design, supporting multiple screen sizes
- 🎭 Support for one-sided and two-sided timing modes
- 🚀 Built with Vue 3 + TypeScript + Vite

---

## 🚀 Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (recommended) or npm

### Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Development Mode

```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:5173` to view the application

### Build Production Version

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

---

## 🎮 Usage Instructions

### Keyboard Shortcuts

| Shortcut | Function                  |
| -------- | ------------------------- |
| `Space`  | Start/Pause Timer         |
| `S`      | Switch Timer Side (Dual Mode) |
| `R`      | Reset Current Timer       |
| `←`      | Previous Stage            |
| `→`      | Next Stage                |

### Configure Timer

1. Click the **"Configure"** button in the top right
2. Choose **"Visual Edit"** or **"JSON Source"** mode
3. Add/Edit debate stages
4. Configure speakers, durations, bell timings
5. Save configuration

---

## 📁 Project Structure

```
debate-timer/
├── config/
│   ├── eslint.config.ts       # ESLint configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── vite.config.ts         # Vite configuration
├── src/
│   ├── components/
│   │   └── screen/
│   │       ├── debateTimer.vue          # Core timer component
│   │       └── TimerConfigPanel.vue     # Configuration panel component
│   ├── views/
│   │   └── Screen.vue                   # Main screen view
│   ├── types/
│   │   └── screen.ts                    # TypeScript type definitions
│   ├── utils/
│   │   └── timerDefaults.ts             # Default timer configuration
│   ├── style/
│   │   └── index.css                    # Global styles
│   ├── App.vue                          # Root component
│   └── main.ts                          # Application entry
├── index.html                           # HTML template
├── package.json                         # Project dependencies
└── README.md                            # Chinese README
```

---

## 📝 TODO List

### 🎨 UI/UX Optimization

- [ ] **Optimize configuration panel visual effects**
  - Improve card shadows and spacing
  - Add smoother transition animations
  - Optimize color contrast for better readability
- [ ] **Unify overall UI design language**
  - Unify button styles (size, border radius, shadows)
  - Unify font sizes and line heights
  - Create complete design system documentation

- [ ] **Improve timer display effects**
  - Add more animation effects (like number scrolling)
  - Optimize time color change gradient effects
  - Add progress bar indicators

- [ ] **Responsive design optimization**
  - Optimize tablet display
  - Optimize mobile display
  - Add touch gesture support

### 🔧 Feature Enhancements

- [ ] **Use professional JSON editor**
  - Integrate Monaco Editor or CodeMirror
  - Add syntax highlighting
  - Add autocomplete and error hints

- [ ] **Configuration management features**
  - [ ] Export configuration as JSON file
  - [ ] Import configuration from JSON file
  - [ ] Save multiple configuration presets
  - [ ] Configuration template library (different debate formats)

- [ ] **Custom bell sounds**
  - [ ] Upload custom bell sound files
  - [ ] Adjust bell volume
  - [ ] Test bell functionality

- [ ] **Fullscreen mode**
  - [ ] Add fullscreen toggle button
  - [ ] Optimize layout in fullscreen mode
  - [ ] Support ESC key to exit fullscreen

- [ ] **Theme switching**
  - [ ] Light/dark theme switching
  - [ ] Multiple color schemes
  - [ ] Custom theme editor

- [ ] **Accessibility features**
  - [ ] Add ARIA label support
  - [ ] Optimize keyboard navigation
  - [ ] Screen reader support

### 🏗️ Code Structure Optimization

- [ ] **Component splitting**
  - [ ] Split `debateTimer.vue` (400+ lines) into smaller sub-components
  - [ ] Extract `StageDisplay` component
  - [ ] Extract `TimerDisplay` component
  - [ ] Extract `NavigationControls` component

- [ ] **Logic extraction**
  - [ ] Create `useTimer` composable to manage timing logic
  - [ ] Create `useBell` composable to manage bell logic
  - [ ] Create `useKeyboard` composable to manage keyboard events

- [ ] **Utility function extraction**
  - [ ] Extract bell generation logic to `utils/audio.ts`
  - [ ] Extract time formatting logic to `utils/time.ts`

- [ ] **Add code comments**
  - [ ] Add JSDoc comments to all public functions
  - [ ] Add inline comments to complex logic
  - [ ] Create component usage example documentation

### 🧪 Testing and Quality Assurance

- [ ] **Unit tests**
  - [ ] Write tests for utility functions
  - [ ] Write tests for composables
  - [ ] Set up testing environment with Vitest

- [ ] **Component tests**
  - [ ] Write tests for key components
  - [ ] Use Vue Test Utils
  - [ ] Test keyboard shortcut functionality

- [ ] **E2E tests**
  - [ ] Use Playwright or Cypress
  - [ ] Test complete timing workflow
  - [ ] Test configuration save and load

### 📚 Documentation Completion

- [ ] **Component documentation**
  - [ ] Write usage instructions for each component
  - [ ] Add Props, Events, Slots documentation
  - [ ] Create component API reference

- [ ] **User manual**
  - [ ] Write detailed user operation guide
  - [ ] Add FAQ
  - [ ] Create usage video tutorials

- [ ] **Developer guide**
  - [ ] Write contribution guide (CONTRIBUTING.md)
  - [ ] Code standards explanation
  - [ ] Git commit standards

### 🌐 Internationalization

- [ ] **Multi-language support**
  - [ ] Integrate vue-i18n
  - [ ] Extract all Chinese text
  - [ ] Add English translation
  - [ ] Support language switching

### ⚡ Performance Optimization

- [ ] **Code optimization**
  - [ ] Use `computed` to optimize repeated calculations
  - [ ] Use `v-memo` to optimize list rendering
  - [ ] Lazy load large components

- [ ] **Build optimization**
  - [ ] Configure code splitting
  - [ ] Optimize resource loading
  - [ ] Add PWA support

### 🐛 Known Issue Fixes

- [ ] **TimerConfigPanel validation improvement**
  - [ ] Show specific error messages when save fails
  - [ ] Improve form validation prompts
  - [ ] Add data format validation

- [ ] **Timing precision optimization**
  - [ ] Handle timing deviation in background browser tabs
  - [ ] Use Web Worker for better precision

---

## 🤝 How to Contribute

We welcome all forms of contributions! Whether it's fixing bugs, adding new features, improving documentation, or suggesting ideas.

### Contribution Steps

1. **Fork this repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Submit Pull Request**

### Code Standards

```bash
# Check code style
pnpm lint:check

# Auto-fix code style
pnpm lint:fix

# Format code
pnpm format
```

### Commit Standards

Use [Conventional Commits](https://www/conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code formatting adjustments
- `refactor:` Code refactoring
- `test:` Test related
- `chore:` Build/toolchain related

**Examples:**

```
feat: Add configuration export feature
fix: Fix timer state error when resetting
docs: Update shortcut explanations in README
```

---

## 📖 Learning Resources

### Vue 3

- [Vue 3 Official Documentation](https://vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 TypeScript Support](https://vuejs.org/guide/typescript/overview.html)

### TypeScript

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://typescript.bootcss.com/)

### Tailwind CSS

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Component Library](https://daisyui.com/)

### Toolchain

- [Vite Official Documentation](https://vitejs.dev/)
- [pnpm Documentation](https://pnpm.io/)

---

## 🛠️ Tech Stack

- **Framework**: Vue 3.5 with Composition API
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1 + DaisyUI 5.1
- **Code Standards**: ESLint + Prettier

---

## 📄 License

This project uses the MIT License - see [LICENSE](LICENSE) file for details

---

## 👥 Contributors

Thanks to all classmates who contributed to this project!

<!-- Contributor list can be added here -->

---

## 📮 Contact Us

- **Organization**: UNNC Computer Psycho Union
- **GitHub**: [CompPsyUnion/debate-timer](https://github.com/CompPsyUnion/debate-timer)

---

## 🌟 Star History

If this project helps you, please give us a Star ⭐️

---

<div align="center">

**Built with ❤️ by UNNC Computer Psycho Union**

_Make every debate precisely timed, make every speech resounding_

</div>