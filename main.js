// Main entry point: initializes Phaser game and registers scenes.
// Runs without any build tools. Open index.html directly or use a static server.

(function () {
  const GAME_WIDTH = 360; // Logical size; canvas scales responsively
  const GAME_HEIGHT = 640;

  // Simple helpers for cross-scene usage
  window.TetrisShared = {
    GAME_WIDTH,
    GAME_HEIGHT,
    version: "1.0.0",
    maskPhone: function (phone) {
      if (!phone) return "";
      const digits = String(phone);
      if (digits.length <= 3)
        return "*".repeat(Math.max(0, digits.length - 1)) + digits.slice(-1);
      return "*".repeat(Math.max(0, digits.length - 3)) + digits.slice(-3);
    },
    leaderboardKey: "phaser_tetris_leaderboard_v1",
    readLeaderboard: function () {
      try {
        const raw = localStorage.getItem(this.leaderboardKey);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) return parsed;
        return [];
      } catch (e) {
        return [];
      }
    },
    writeLeaderboard: function (rows) {
      try {
        localStorage.setItem(this.leaderboardKey, JSON.stringify(rows || []));
      } catch (e) {}
    },
    addLeaderboardRow: function (row) {
      const rows = this.readLeaderboard();
      rows.push(row);
      rows.sort((a, b) => b.score - a.score);
      this.writeLeaderboard(rows.slice(0, 100));
    },
  };

  const config = {
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#111318",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [StartScene, GameScene, GameOverScene, LeaderboardScene],
  };

  // Create game
  window.game = new Phaser.Game(config);
})();
