class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: "LeaderboardScene" });
  }

  create() {
    const API = window.TetrisShared;
    const GAME_WIDTH = API.GAME_WIDTH;
    const GAME_HEIGHT = API.GAME_HEIGHT;

    this.add
      .text(GAME_WIDTH / 2, 60, "Leaderboard", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "34px",
        color: "#e6e6e6",
      })
      .setOrigin(0.5);

    this.rows = API.readLeaderboard();
    this.page = 0;
    this.pageSize = 15;

    const headerY = 110;
    this.add.text(24, headerY, "#", {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
      fontSize: "14px",
      color: "#9aa0a6",
    });
    this.add.text(50, headerY, "Name", {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
      fontSize: "14px",
      color: "#9aa0a6",
    });
    this.add
      .text(GAME_WIDTH - 140, headerY, "Phone", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "14px",
        color: "#9aa0a6",
      })
      .setOrigin(0, 0);
    this.add
      .text(GAME_WIDTH - 60, headerY, "Score", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "14px",
        color: "#9aa0a6",
      })
      .setOrigin(0, 0);

    this.listGroup = this.add.group();
    this.renderList();

    const mkButton = (x, y, w, label, color, cb) => {
      const g = this.add
        .rectangle(x + w / 2, y + 22, w, 44, color)
        .setInteractive({ useHandCursor: true });
      const t = this.add
        .text(x + w / 2, y + 22, label, {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "16px",
          color: color === 0xff4d4f ? "#ffffff" : "#0a0a0a",
        })
        .setOrigin(0.5);
      g.on("pointerdown", cb);
      return { g, t };
    };

    mkButton(20, GAME_HEIGHT - 80, 80, "Prev", 0x00d1b2, () => {
      if (this.page > 0) {
        this.page--;
        this.renderList();
      }
    });
    mkButton(110, GAME_HEIGHT - 80, 90, "Next", 0x00d1b2, () => {
      if ((this.page + 1) * this.pageSize < this.rows.length) {
        this.page++;
        this.renderList();
      }
    });
    mkButton(210, GAME_HEIGHT - 80, 90, "Refresh", 0x00d1b2, () => {
      this.rows = API.readLeaderboard();
      this.page = 0;
      this.renderList();
    });
    mkButton(GAME_WIDTH - 140, GAME_HEIGHT - 80, 120, "Menu", 0x00d1b2, () =>
      this.scene.start("StartScene")
    );
  }

  renderList() {
    const { GAME_WIDTH } = window.TetrisShared;
    if (this.listGroup) {
      this.listGroup.clear(true, true);
    }
    const startIndex = this.page * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.rows.length);
    const baseY = 135;
    for (let i = startIndex; i < endIndex; i++) {
      const r = this.rows[i];
      const rowIndex = i - startIndex;
      const y = baseY + rowIndex * 28;
      this.listGroup.add(
        this.add.text(24, y, String(i + 1), {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "16px",
          color: "#e6e6e6",
        })
      );
      this.listGroup.add(
        this.add.text(50, y, r.name || "Player", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "16px",
          color: "#e6e6e6",
        })
      );
      this.listGroup.add(
        this.add
          .text(
            GAME_WIDTH - 140,
            y,
            window.TetrisShared.maskPhone(r.phone || ""),
            {
              fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
              fontSize: "16px",
              color: "#e6e6e6",
            }
          )
          .setOrigin(0, 0)
      );
      this.listGroup.add(
        this.add
          .text(GAME_WIDTH - 60, y, String(r.score || 0), {
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
            fontSize: "16px",
            color: "#e6e6e6",
          })
          .setOrigin(0, 0)
      );
    }
  }
}
