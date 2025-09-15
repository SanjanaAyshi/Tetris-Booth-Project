class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  init(data) {
    this.finalScore = data?.score || 0;
    this.playerName = data?.name || "Player";
    this.playerPhone = data?.phone || "";
  }

  create() {
    const API = window.TetrisShared;
    const GAME_WIDTH = API.GAME_WIDTH;
    const GAME_HEIGHT = API.GAME_HEIGHT;

    this.add
      .text(GAME_WIDTH / 2, 140, "Game Over", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "40px",
        color: "#e6e6e6",
      })
      .setOrigin(0.5);

    const masked = API.maskPhone(this.playerPhone);
    this.add
      .text(GAME_WIDTH / 2, 200, `${this.playerName} (${masked})`, {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "16px",
        color: "#9aa0a6",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 240, `Score: ${this.finalScore}`, {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "22px",
        color: "#e6e6e6",
      })
      .setOrigin(0.5);

    const mkButton = (y, label, cb) => {
      const w = 220,
        h = 44;
      const x = (GAME_WIDTH - w) / 2;
      const g = this.add
        .rectangle(x + w / 2, y + h / 2, w, h, 0x00d1b2)
        .setInteractive({ useHandCursor: true });
      const t = this.add
        .text(x + w / 2, y + h / 2, label, {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "18px",
          color: "#0a0a0a",
        })
        .setOrigin(0.5);
      g.on("pointerdown", cb);
      return { g, t };
    };

    mkButton(300, "Submit Score", () => {
      API.addLeaderboardRow({
        name: this.playerName,
        phone: this.playerPhone,
        score: this.finalScore,
        ts: Date.now(),
      });
      this.scene.start("LeaderboardScene", { from: "GameOver" });
    });

    mkButton(360, "Play Again", () => {
      this.scene.start("GameScene");
    });

    mkButton(420, "Main Menu", () => {
      this.scene.start("StartScene");
    });
  }
}
