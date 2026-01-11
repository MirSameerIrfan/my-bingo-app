# 🎲 Soc Ops

**Break the ice with bingo.** Turn any social mixer into an interactive game where connections happen naturally.

---

## ✨ What is Soc Ops?

Soc Ops is a modern social bingo game designed for in-person events, team mixers, and networking sessions. Players explore the room, meet new people, and mark off squares as they discover shared experiences and interesting facts.

**🎯 Game Rules:**

- 24 randomized conversation starters + 1 free space
- Find people who match each square
- First to get 5 in a row wins!

Built with React 19, TypeScript, and Tailwind CSS v4.

---

## 🚀 Quick Start

Get up and running in 30 seconds:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start playing!

---

## 🛠️ Development

**Prerequisites:**

- [Node.js 22+](https://nodejs.org/)

**Available Commands:**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
npm run lint     # Check code quality
```

**Mandatory Checklist Before Commit:**

- [ ] `npm run lint` — No ESLint errors
- [ ] `npm run build` — TypeScript compiles cleanly
- [ ] `npm run test` — All Vitest tests pass

---

## 🎨 Customize Your Game

Want to personalize the experience? Here's what you can customize:

**📝 Questions**: Edit [`src/data/questions.ts`](src/data/questions.ts) to add your own prompts  
**🎭 Design**: Modify colors and styles in [`src/index.css`](src/index.css)  
**⚙️ Game Logic**: Adjust board size and win conditions in [`src/utils/bingoLogic.ts`](src/utils/bingoLogic.ts)

**Pro Tip**: Check out the [Lab Guide](.lab/GUIDE.md) for a complete workshop on customizing every aspect of the game using VS Code AI agents.

---

## 🌐 Deploy to GitHub Pages

Every push to `main` automatically deploys to GitHub Pages. Your game will be live at:

```
https://{your-username}.github.io/{your-repo-name}
```

**Setup Steps:**

1. Go to your repo's **Settings → Pages**
2. Set source to **GitHub Actions**
3. Push to `main` branch
4. 🎉 Your game is live!

---

## 🏗️ Architecture

Clean separation of concerns for maintainability:

- **Pure Logic**: [`src/utils/bingoLogic.ts`](src/utils/bingoLogic.ts) — Game rules, no React
- **State Management**: [`src/hooks/useBingoGame.ts`](src/hooks/useBingoGame.ts) — React hook for game state
- **Components**: [`src/components/`](src/components/) — Presentational UI components
- **Persistence**: LocalStorage with schema versioning

---

## 📦 Tech Stack

- **React 19** — Latest features with functional components
- **TypeScript** — Strict mode for type safety
- **Tailwind CSS v4** — Modern utility-first styling
- **Vite** — Lightning-fast build tooling
- **Vitest** — Unit testing framework

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Found a bug?** Open an issue  
**Have an idea?** Start a discussion  
**Want to help?** Submit a pull request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙌 Credits

Created by Harald Kirschner ([@digitarald](https://github.com/digitarald))  
Part of the [VS Code Agent Lab](https://github.com/microsoft/vscode-agent-lab-soc-ops) workshop

**Made with ❤️ for better human connections**
