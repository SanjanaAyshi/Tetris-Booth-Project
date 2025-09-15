📘 Tetris Booth Project – Documentation
1. Project Overview

Tetris Booth Project is an interactive web-based game built with Phaser 3 and designed specifically for event booths and job fairs.
The goal was to create a fun, engaging way to attract visitors, capture leads (name & phone number), and encourage participation while ensuring smooth performance in a booth setting (offline/online).

This project combines classic gameplay mechanics (Tetris) with event-oriented features such as:

Lead capture form (Name + Phone Number) before playing.

Game leaderboard for competitiveness and retention.

Persistent score tracking (via localStorage) during the entire event.

Responsive UI and touch controls for mobile booth participants.

2. Objectives for an Event-Based Game

When building for an event booth, the requirements are different from a normal web game:

Lead Generation

Collect player name and phone number before they can start.

Store data alongside scores for later retrieval/analysis.

Mask sensitive phone details when displaying publicly for privacy.

Engagement

Use a familiar, addictive game (Tetris) to keep visitors playing longer.

Add a leaderboard to spark competition among attendees.

Provide real-time score updates and replayability.

Booth Performance & Practicality

No dependencies on npm, servers, or internet → runs directly as a static site (index.html).

Local persistence (localStorage) ensures leaderboard survives refreshes or device reboots during the event.

Easy deployment on multiple booth PCs with minimal setup (just open in browser).

Scalability

Modular scene-based architecture for easy extension (more games, branding, sponsorship banners, etc.).

Can later connect to a backend API for centralized leaderboard across multiple booths.

3. Technical Stack

Phaser 3 (via CDN) → Game engine for rendering and mechanics.

HTML5 / CSS3 → Structure and styling, responsive design for mobile & desktop.

Vanilla JavaScript (modular scenes) → Core logic, input handling, utilities.

localStorage API → Persistent storage of leaderboard scores during event.

VS Code + Live Server → Development and local testing.

4. Project Structure
tetris-booth/
├── index.html              # Entry point; loads Phaser & scenes via CDN
├── style.css               # Styling for overlays, forms, mobile controls
├── main.js                 # Phaser config + shared utilities
├── scenes/
│   ├── StartScene.js       # Lead capture form + transition into game
│   ├── GameScene.js        # Core Tetris gameplay (falling blocks, scoring)
│   ├── GameOverScene.js    # Shows final score + submit to leaderboard
│   └── LeaderboardScene.js # Paginated leaderboard (localStorage-backed)
└── README.txt              # Instructions for setup & running

5. Key Features
🎯 Start Screen (Lead Capture)

Collects Name and Phone Number.

Saves values in scene registry for session.

Prevents entry without required fields.

🎮 Gameplay (Tetris Mechanics)

Classic Tetris block spawning, rotation, soft/hard drops.

Scoring System:

Line clears, drop bonuses.

Dynamic level progression.

Pause/Resume option.

Touch Controls for mobile players.

🏁 Game Over Screen

Displays:

Final Score

Player Name

Masked Phone Number (privacy safe).

Offers submission to leaderboard.

📊 Leaderboard

Stores all entries in localStorage.

Sorted by highest score.

Pagination → shows scores in manageable chunks.

Refresh Button → re-sync with latest localStorage.

No Clear button (removed for event fairness).

6. Issues & Fixes (Development Log)

Issue 1: Start button blocked game launch

Cause: preventDefault() blocked form submission.

Fix: Removed preventDefault() so form data submits correctly.

Issue 2: Leaderboard not updating in Chrome

Cause: Destructuring TetrisShared methods lost this context.

Fix: Use direct API reference (const API = window.TetrisShared;).

Issue 3: Privacy & UX

Masked phone numbers (*******123) for public display.

Removed Clear Leaderboard button to prevent accidental wipes.

7. How to Run

Open index.html in a browser (Chrome/Firefox/Edge).

Recommended: VS Code Live Server to avoid localStorage/file:// issues.

Fill out Name + Phone Number → Start Game.

Play Tetris.

Submit score → View Leaderboard.

8. Event-Specific Benefits

Lead Data Capture: Collects phone numbers in a fun, non-intrusive way.

Booth Attraction: Bright visuals + familiar game draw attention.

Engagement Loop: Competitive leaderboard encourages multiple plays.

Data Privacy: Masking phone numbers ensures sensitive info isn’t fully exposed.

Offline Ready: Works without internet; leaderboard persists via localStorage.

9. Possible Future Enhancements

To make the game even more powerful as a lead generation tool, future upgrades could include:

Backend Integration → Store scores + player data in a central database for multiple booths or events.

QR Code Generation → After game over, generate a QR with a discount link, career site, or product page.

Brand Customization → Add sponsor logos, branded backgrounds, or prize banners.

Prize Mechanics → Award top daily scorers with giveaways.

Multi-Device Leaderboard → Sync across multiple event PCs via WebSocket/REST API.

Analytics → Track number of plays, unique players, average score for reporting.

10. Final Outcome

The Tetris Booth Project successfully combines gameplay, lead capture, and persistent scoring into a lightweight, browser-based package.
It is designed for simplicity, reliability, and maximum engagement at events, while also being scalable for future business/marketing needs.

This makes it not only a fun booth game but also a strategic lead generation tool.