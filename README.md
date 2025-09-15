# 🎮 Tetris Booth Project

An interactive, event-ready web game built with **Phaser 3**, designed for job fairs, expos, and booth activations. This lightweight browser-based game captures leads, engages visitors, and encourages replay through a competitive leaderboard.

---

## 📌 Features

- 📝 **Lead Capture Form** – Requires name and phone number before gameplay.
- 🎮 **Classic Tetris Gameplay** – Falling blocks, line clears, scoring, and level progression.
- 📊 **Leaderboard** – Scores saved in `localStorage`, sorted by high score, persistent across sessions.
- 🔒 **Privacy-Safe** – Phone numbers are masked (e.g., `*******123`) for display.
- 📱 **Responsive & Mobile Ready** – Touch controls optimized for booth visitors.
- 🚀 **No npm Required** – Runs directly in browser via Phaser CDN.

---

## 🗂 Project Structure

```text
tetris-booth/
├── index.html              # Entry point; loads Phaser & scenes
├── style.css               # Styling for overlays, forms, and controls
├── main.js                 # Phaser config + shared utilities
├── scenes/
│   ├── StartScene.js       # Lead capture form & transition into game
│   ├── GameScene.js        # Core Tetris mechanics
│   ├── GameOverScene.js    # Final score + submit to leaderboard
│   └── LeaderboardScene.js # Paginated leaderboard with refresh
└── README.md               # Documentation (this file)
```


## 🚀 How to Run

1. Clone the repository or download the folder.
2. Open `index.html` directly in a browser.
3. *(Recommended)* Use **VS Code Live Server** to avoid `localStorage` issues.
4. Enter Name + Phone Number → Start the game.
5. Play Tetris → Submit score to the leaderboard.

---

## 📖 Game Flow

### Start Screen
- Form prompts for name and phone number.
- Values stored in memory for session duration.

### Gameplay
- Classic Tetris mechanics: move, rotate, soft/hard drop.
- Score increases with line clears and drop actions.
- Difficulty increases with levels.

### Game Over
- Displays final score and masked phone number.
- Option to submit score to leaderboard.

### Leaderboard
- Displays top scores (sorted highest first).
- Paginated for large events.
- Refresh button reloads scores from `localStorage`.

---

## 🛠️ Tech Stack

- **Phaser 3** (via CDN)
- **HTML5 / CSS3**
- **Vanilla JavaScript** (modular scenes)
- **localStorage API** for persistence
- **VS Code + Live Server** for testing

---

## 🐛 Known Issues & Fixes

- ✅ Game didn’t start on submit → Fixed by removing `preventDefault()` on Start button.
- ✅ Leaderboard not updating in Chrome → Fixed by using `window.TetrisShared` references instead of destructuring.
- ✅ Privacy & UX → Masked phone numbers and removed “Clear Leaderboard” button.

---

## 🎯 Why It’s Event-Ready

- ✅ **Lead Generation** – Every player provides contact info.
- ✅ **Engagement** – Familiar, addictive gameplay retains visitors.
- ✅ **Competition** – Leaderboard encourages replay and interaction.
- ✅ **Offline Ready** – No internet required; scores persist locally.
- ✅ **Easy Setup** – Works on any booth PC by opening `index.html`.

---

## 🌟 Future Enhancements

- 🌐 Backend integration → Centralized leaderboard across booths.
- 📱 QR code rewards → Link players to signup pages or offers.
- 🎁 Prize system → Giveaways for top scorers.
- 📊 Analytics → Track plays, unique visitors, and average scores.
- 🎨 Branding → Add sponsor logos, custom backgrounds, or themes.

---

## 🏆 Final Outcome

The **Tetris Booth Project** merges gameplay, lead capture, and persistent scoring into a strategic tool for event engagement. It’s more than just a game—it’s a lightweight, browser-based lead generation engine tailored for real-world activation.

---
