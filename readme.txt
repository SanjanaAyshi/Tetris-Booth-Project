🎮 Tetris Booth Project

An interactive event-based web game built with Phaser 3.
Designed for job fairs and booth events, this project captures leads, engages visitors, and encourages replay through a competitive leaderboard.

📌 Features

📝 Lead Capture Form – requires Name & Phone Number before playing.

🎮 Classic Tetris Gameplay – falling blocks, line clears, scoring, and levels.

📊 Leaderboard – scores are saved in localStorage, sorted by high score, and persist across sessions.

🔒 Privacy-Safe – phone numbers are masked (e.g., *******123).

📱 Responsive & Mobile Ready – with touch controls for booth visitors.

🚀 No npm required – runs directly in browser via Phaser CDN.

🗂 Project Structure
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

🚀 How to Run

Clone the repo or download the folder.

Open index.html directly in a browser.

Recommended: use VS Code Live Server extension to avoid localStorage issues.

Enter Name + Phone Number → Start the game.

Play Tetris → Submit score to the leaderboard.

📖 Game Flow

Start Screen

Form asks for name & phone.

Values stored in memory for the session.

Gameplay

Tetris mechanics: move, rotate, soft/hard drop.

Score increases with line clears & drops.

Levels increase difficulty.

Game Over

Displays final score + masked phone.

Option to submit score.

Leaderboard

Shows top scores (sorted highest first).

Paginated for large events.

Refresh button to reload from localStorage.

🛠️ Tech Stack

Phaser 3 (via CDN)

HTML5 / CSS3

Vanilla JavaScript (modular scenes)

localStorage API for persistence

VS Code + Live Server for testing

🐛 Issues & Fixes

Game didn’t start on submit → fixed by removing preventDefault() on Start button.

Leaderboard not updating in Chrome → fixed by using window.TetrisShared API references instead of destructuring.

Privacy & UX → masked phone numbers and removed “Clear Leaderboard” button.

🎯 Why Event-Ready?

✅ Lead Generation – every player provides contact info.

✅ Engagement – familiar, addictive game keeps visitors around.

✅ Competition – leaderboard motivates replay and interaction.

✅ Offline Ready – no internet required, localStorage keeps scores safe.

✅ Easy Setup – works on any booth PC by opening index.html.

🌟 Future Enhancements

🌐 Backend integration → centralized leaderboard across booths.

📱 QR code rewards → link players to signup pages or offers.

🎁 Prize system → giveaways for top scorers.

📊 Analytics → track plays, unique visitors, and average scores.

🎨 Branding → add sponsor logos, custom backgrounds, or themes.

🏆 Final Outcome

The Tetris Booth Project merges gameplay, lead capture, and persistent scoring into a lightweight, browser-based package.
It’s not just a game — it’s a strategic lead generation tool designed for fairs, expos, and events.
