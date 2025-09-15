class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.boardCols = 10;
    this.boardRows = 20;
    this.cellSize = 24;
    this.dropIntervalMs = 800; // base; reduced by level
    this.level = 1;
    this.linesCleared = 0;
    this.score = 0;
    this.isPaused = false;
    this.activePiece = null;
    this.nextPieceType = null;
    this.board = [];
    this.timer = null;
    this.colors = {
      I: 0x4dd2ff,
      J: 0x4d6bff,
      L: 0xffa64d,
      O: 0xffeb3b,
      S: 0x66ffa6,
      T: 0xd17cff,
      Z: 0xff6666,
    };
  }

  create() {
    const { GAME_WIDTH } = window.TetrisShared;

    // Center playfield
    const playWidth = this.boardCols * this.cellSize;
    const playHeight = this.boardRows * this.cellSize;
    this.playOriginX = (GAME_WIDTH - playWidth) / 2;
    this.playOriginY = 40;

    // Reset state
    this.level = 1;
    this.linesCleared = 0;
    this.score = 0;
    this.isPaused = false;
    this.board = Array.from({ length: this.boardRows }, () =>
      Array(this.boardCols).fill(0)
    );

    // Score/level UI
    this.scoreText = this.add.text(12, 8, "Score: 0", {
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
      fontSize: "16px",
      color: "#e6e6e6",
    });
    this.levelText = this.add
      .text(GAME_WIDTH - 12, 8, "Level: 1", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
        fontSize: "16px",
        color: "#e6e6e6",
      })
      .setOrigin(1, 0);

    // Outline of playfield
    const g = this.add.graphics();
    g.lineStyle(2, 0x39414f, 1);
    g.strokeRect(
      this.playOriginX - 2,
      this.playOriginY - 2,
      playWidth + 4,
      playHeight + 4
    );

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyRotate = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.keyPause = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.keyHardDrop = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Touch controls visibility
    const touch = document.getElementById("touch-controls");
    touch.classList.remove("hidden");
    this.wireTouchControls(touch);

    // Piece queue
    this.bag = [];
    this.spawnNewPiece();

    // Main drop timer
    this.resetTimer();
  }

  shutdown() {
    const touch = document.getElementById("touch-controls");
    if (touch) touch.classList.add("hidden");
    if (this.timer) this.timer.remove(false);
  }

  update() {
    if (this.isPaused) return;

    // Keyboard step inputs with repeat handling
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.tryMove(-1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.tryMove(1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.keyRotate)) this.tryRotate();
    if (this.cursors.down.isDown) this.softDrop();
    if (Phaser.Input.Keyboard.JustDown(this.keyHardDrop)) this.hardDrop();
    if (Phaser.Input.Keyboard.JustDown(this.keyPause)) this.togglePause();
  }

  wireTouchControls(root) {
    const left = document.getElementById("btn-left");
    const right = document.getElementById("btn-right");
    const rotate = document.getElementById("btn-rotate");
    const down = document.getElementById("btn-down");
    const pauseBtn = document.getElementById("btn-pause");

    const onHold = (el, fn) => {
      let t;
      const start = (e) => {
        e.preventDefault();
        fn();
        t = setInterval(fn, 110);
      };
      const end = () => {
        clearInterval(t);
      };
      el.addEventListener("touchstart", start);
      el.addEventListener("mousedown", start);
      el.addEventListener("touchend", end);
      el.addEventListener("mouseup", end);
      el.addEventListener("mouseleave", end);
    };

    onHold(left, () => this.tryMove(-1, 0));
    onHold(right, () => this.tryMove(1, 0));
    onHold(down, () => this.softDrop());
    rotate.addEventListener("click", (e) => {
      e.preventDefault();
      this.tryRotate();
    });
    pauseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.togglePause();
    });
  }

  resetTimer() {
    if (this.timer) this.timer.remove(false);
    const interval = Math.max(80, this.dropIntervalMs - (this.level - 1) * 70);
    this.timer = this.time.addEvent({
      delay: interval,
      loop: true,
      callback: () => {
        if (!this.isPaused) this.tick();
      },
    });
  }

  getPieces() {
    return ["I", "J", "L", "O", "S", "T", "Z"];
  }

  takeFromBag() {
    if (this.bag.length === 0) {
      this.bag = this.getPieces().sort(() => Math.random() - 0.5);
    }
    return this.bag.pop();
  }

  spawnNewPiece() {
    const type = this.nextPieceType || this.takeFromBag();
    this.nextPieceType = this.takeFromBag();
    const matrix = this.getPieceMatrix(type);
    const piece = {
      type,
      x: Math.floor(this.boardCols / 2) - 2,
      y: -1,
      rotation: 0,
      matrix,
    };
    this.activePiece = piece;
    if (!this.validPosition(piece, 0, 0, piece.matrix)) {
      this.gameOver();
    }
    this.redraw();
  }

  getPieceMatrix(type, rotation = 0) {
    const shapes = {
      I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      O: [
        [1, 1],
        [1, 1],
      ],
      S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    };
    let m = shapes[type].map((row) => row.slice());
    for (let i = 0; i < rotation; i++) {
      m = this.rotateMatrix(m);
    }
    return m;
  }

  rotateMatrix(m) {
    const N = m.length;
    const res = Array.from({ length: N }, () => Array(N).fill(0));
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) res[x][N - 1 - y] = m[y][x];
    return res;
  }

  validPosition(piece, dx, dy, testMatrix = null) {
    const m = testMatrix || piece.matrix;
    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; x++) {
        if (!m[y][x]) continue;
        const nx = piece.x + x + dx;
        const ny = piece.y + y + dy;
        if (nx < 0 || nx >= this.boardCols || ny >= this.boardRows)
          return false;
        if (ny >= 0 && this.board[ny][nx]) return false;
      }
    }
    return true;
  }

  tryMove(dx, dy) {
    if (!this.activePiece) return;
    const p = this.activePiece;
    if (this.validPosition(p, dx, dy)) {
      p.x += dx;
      p.y += dy;
      this.redraw();
      return true;
    }
    return false;
  }

  tryRotate() {
    const p = this.activePiece;
    if (!p) return;
    const nextRot = (p.rotation + 1) % 4;
    const rotated = this.getPieceMatrix(p.type, nextRot);
    // Basic wall kicks
    const kicks = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, -1],
      [-2, 0],
      [2, 0],
    ];
    for (const [dx, dy] of kicks) {
      if (this.validPosition(p, dx, dy, rotated)) {
        p.x += dx;
        p.y += dy;
        p.rotation = nextRot;
        p.matrix = rotated;
        this.redraw();
        return;
      }
    }
  }

  softDrop() {
    if (this.tryMove(0, 1)) {
      this.addScore(1); // soft drop point
    }
  }

  hardDrop() {
    let dropped = 0;
    while (this.tryMove(0, 1)) dropped++;
    this.addScore(2 * dropped);
    this.lockPiece();
  }

  tick() {
    if (!this.tryMove(0, 1)) {
      this.lockPiece();
    }
  }

  lockPiece() {
    const p = this.activePiece;
    if (!p) return;
    const m = p.matrix;
    for (let y = 0; y < m.length; y++)
      for (let x = 0; x < m[y].length; x++)
        if (m[y][x]) {
          const bx = p.x + x;
          const by = p.y + y;
          if (
            by >= 0 &&
            by < this.boardRows &&
            bx >= 0 &&
            bx < this.boardCols
          ) {
            this.board[by][bx] = p.type;
          }
        }

    const cleared = this.clearLines();
    if (cleared > 0) {
      const scores = { 1: 100, 2: 300, 3: 500, 4: 800 };
      this.addScore((scores[cleared] || 0) * this.level);
      this.linesCleared += cleared;
      const newLevel = 1 + Math.floor(this.linesCleared / 10);
      if (newLevel !== this.level) {
        this.level = newLevel;
        this.levelText.setText(`Level: ${this.level}`);
        this.resetTimer();
      }
    }

    this.spawnNewPiece();
  }

  clearLines() {
    let lines = 0;
    for (let y = this.boardRows - 1; y >= 0; y--) {
      if (this.board[y].every((v) => !!v)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(this.boardCols).fill(0));
        lines++;
        y++;
      }
    }
    if (lines > 0) this.redraw();
    return lines;
  }

  addScore(pts) {
    this.score += pts;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.pauseText = this.add
        .text(this.scale.width / 2, this.scale.height / 2, "PAUSED", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu",
          fontSize: "32px",
          color: "#e6e6e6",
        })
        .setOrigin(0.5);
    } else if (this.pauseText) {
      this.pauseText.destroy();
      this.pauseText = null;
    }
  }

  gameOver() {
    this.shutdown();
    const name = this.registry.get("playerName") || "Player";
    const phone = this.registry.get("playerPhone") || "";
    this.scene.start("GameOverScene", { score: this.score, name, phone });
  }

  redraw() {
    if (this.boardGraphics) this.boardGraphics.destroy();
    const g = this.add.graphics();
    this.boardGraphics = g;

    // Draw cells
    for (let y = 0; y < this.boardRows; y++) {
      for (let x = 0; x < this.boardCols; x++) {
        const t = this.board[y][x];
        if (t) {
          const color = this.colors[t] || 0xffffff;
          this.drawCell(g, x, y, color);
        } else {
          g.lineStyle(1, 0x202531, 0.25);
          g.strokeRect(
            this.playOriginX + x * this.cellSize,
            this.playOriginY + y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }

    // Draw active piece
    const p = this.activePiece;
    if (p) {
      for (let y = 0; y < p.matrix.length; y++)
        for (let x = 0; x < p.matrix[y].length; x++)
          if (p.matrix[y][x])
            this.drawCell(g, p.x + x, p.y + y, this.colors[p.type] || 0xffffff);
    }
  }

  drawCell(g, x, y, color) {
    if (y < 0) return;
    const ox = this.playOriginX + x * this.cellSize;
    const oy = this.playOriginY + y * this.cellSize;
    g.fillStyle(color, 1);
    g.fillRect(ox + 1, oy + 1, this.cellSize - 2, this.cellSize - 2);
    // subtle inset highlight
    g.lineStyle(1, 0x0b0e14, 0.5);
    g.strokeRect(ox + 0.5, oy + 0.5, this.cellSize - 1, this.cellSize - 1);
  }
}
