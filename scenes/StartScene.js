class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    const { GAME_WIDTH, GAME_HEIGHT } = window.TetrisShared;

    // Title
    this.add
      .text(GAME_WIDTH / 2, 120, "TETRIS", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "48px",
        color: "#e6e6e6",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 170, "Booth Edition", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "18px",
        color: "#9aa0a6",
      })
      .setOrigin(0.5);

    // Hook up DOM start form overlay
    const overlay = document.getElementById("start-overlay");
    const form = document.getElementById("start-form");
    const startButton = document.getElementById("start-submit");
    const leaderButton = document.getElementById("view-leaderboard");
    overlay.classList.add("visible");

    const submitHandler = (e) => {
      e.preventDefault();
      const name = String(
        document.getElementById("playerName").value || ""
      ).trim();
      const phone = String(
        document.getElementById("playerPhone").value || ""
      ).trim();
      if (!name || !phone) {
        alert("Please enter both name and phone number.");
        return;
      }
      this.registry.set("playerName", name);
      this.registry.set("playerPhone", phone);
      overlay.classList.remove("visible");
      this.scene.start("GameScene");
    };

    form.addEventListener("submit", submitHandler, { once: true });
    leaderButton.onclick = () => {
      overlay.classList.remove("visible");
      this.scene.start("LeaderboardScene", { from: "StartScene" });
    };

    // Version footer
    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT - 24,
        `v${window.TetrisShared.version}`,
        {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "12px",
          color: "#6b7280",
        }
      )
      .setOrigin(0.5);
  }
}
