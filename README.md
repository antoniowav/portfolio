# Terminal-Style Developer Portfolio

A modern, accessible developer portfolio with a distinctive terminal aesthetic built using Next.js, TypeScript, and SRCL-inspired components.

## ✨ Features

- **Terminal Aesthetic**: Distinctive command-line inspired design with typing animations
- **Performance Focused**: Sub-1s load times with optimized assets and SSG
- **Fully Accessible**: WCAG 2.1 AA compliant with keyboard navigation support
- **Theme System**: Multiple color schemes (Dark, Light, Amber, Blue) with system preference detection
- **Responsive Design**: Mobile-first approach with fluid layouts
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and JSON-LD structured data
- **Type Safe**: Built with TypeScript for reliable development experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/antoniowav/terminal-portfolio.git
cd terminal-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to [http://localhost:10000](http://localhost:10000)

## 🛠️ Available Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start development server on port 10000 |
| `npm run build`     | Build production-ready application     |
| `npm start`         | Start production server                |
| `npm run lint`      | Run ESLint code quality checks         |
| `npm run format`    | Format code with Prettier              |
| `npm run typecheck` | Run TypeScript compiler checks         |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   └── [feature]/         # Feature-specific pages
├── components/            # React components
│   ├── HeroSection.tsx    # Homepage hero with typing animation
│   ├── ActionBar.tsx      # Navigation and theme controls
│   └── TypingAnimation.tsx # Terminal-style typing effects
├── ui/                    # SRCL-inspired UI components
│   ├── Button.tsx         # Button component with variants
│   └── Card.tsx           # Card component for content display
├── data/                  # Static data and content
│   └── index.ts           # Projects, skills, and personal info
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared interfaces and types
├── styles/                # Global styles and themes
│   └── globals.scss       # SCSS variables and utilities
└── lib/                   # Utility functions and helpers
```

## 🎨 Customization

### Personal Information

Update your personal details in `src/data/index.ts`:

```typescript
export const author: Author = {
  name: 'Your Name',
  email: 'your.email@example.com',
  bio: 'Your professional bio...',
  // ... other details
}
```

### Projects

Add your projects to the `projects` array in `src/data/index.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'unique-project-id',
    slug: 'project-url-slug',
    title: 'Project Title',
    summary: 'Brief project description',
    // ... other project data
  },
]
```

### Themes

The portfolio supports multiple color themes. Customize theme colors in `src/styles/globals.scss`:

```scss
// Add custom theme
[data-theme='custom'] {
  --color-accent-primary: #ff6b35;
  --color-accent-secondary: #f7931e;
  // ... other color variables
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut       | Action               |
| -------------- | -------------------- |
| `Ctrl/Cmd + T` | Cycle through themes |
| `Ctrl/Cmd + O` | Switch font families |
| `Ctrl/Cmd + G` | Toggle grid overlay  |

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Configure environment variables** (if needed)
3. **Deploy automatically** on every push to main

### Manual Build

```bash
npm run build
npm start
```

## 📊 Performance

The portfolio is optimized for excellent performance:

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized LCP, FID, and CLS
- **Bundle Size**: Minimal JavaScript with code splitting
- **Image Optimization**: Next.js Image component with AVIF/WebP support

## ♿ Accessibility

Built with accessibility as a priority:

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators throughout

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code
npm run format
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SRCL (www-sacred)** - Terminal UI design system inspiration
- **Next.js Team** - Amazing React framework
- **Vercel** - Excellent hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

Antonio Piattelli - [hello@antoniopiattelli.com](mailto:hello@antoniopiattelli.com)

Project Link: [https://github.com/antoniopiattelli/terminal-portfolio](https://github.com/antoniopiattelli/terminal-portfolio)

---

**Built with ❤️ and ☕**
