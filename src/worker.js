
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Route to the Durable Object for WebSocket connections
    if (url.pathname === "/websocket") {
      // We'll use a single room for everyone for simplicity: "global-room"
      const id = env.GAME_ROOM.idFromName("global-room");
      const obj = env.GAME_ROOM.get(id);
      return obj.fetch(request);
    }

    // Serve static assets for everything else
    // Note: In some Wrangler configs, this might be automatic, but this ensures fallback.
    return env.ASSETS.fetch(request);
  }
};

// Durable Object Class
export class GameRoom {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Map(); // ws -> { id, snake, color, score, velocity }
    this.food = { x: 15, y: 15 };
    this.gridSize = 20;
    this.tileCount = 20; // 400px / 20px
    this.colors = ['#0ff', '#f0f', '#ff0', '#0f0', '#00f'];
    
    // Start Game Loop
    this.lastTimestamp = 0;
    this.intervalCallback = undefined;
  }

  async fetch(request) {
    const upgradeHeader = request.headers.get('Upgrade');
    if (!upgradeHeader || upgradeHeader !== 'websocket') {
      return new Response('Expected Upgrade: websocket', { status: 426 });
    }

    const [client, server] = Object.values(new WebSocketPair());

    await this.handleSession(server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async handleSession(ws) {
    ws.accept();

    // Create Player
    const playerId = crypto.randomUUID().split('-')[0];
    const color = this.colors[this.sessions.size % this.colors.length];
    
    const player = {
      id: playerId,
      ws: ws,
      snake: [
        { x: Math.floor(Math.random() * this.tileCount), y: Math.floor(Math.random() * this.tileCount) }
      ],
      color: color,
      velocity: { x: 0, y: 0 },
      score: 0,
      ready: false
    };

    this.sessions.set(ws, player);
    
    // Start Loop if first player
    if (!this.intervalCallback) {
      this.startGameLoop();
    }

    ws.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'input') {
          // Handle Input: { x: 1, y: 0 }
          // Prevent 180 turns
          const p = this.sessions.get(ws);
          if (p) {
            if ((data.x === 1 && p.velocity.x !== -1) || 
                (data.x === -1 && p.velocity.x !== 1) ||
                (data.y === 1 && p.velocity.y !== -1) ||
                (data.y === -1 && p.velocity.y !== 1)) {
               p.velocity = { x: data.x, y: data.y };
            }
          }
        }
      } catch (err) {
        console.error("Msg Error", err);
      }
    });

    ws.addEventListener('close', () => {
      this.sessions.delete(ws);
      if (this.sessions.size === 0) {
        this.stopGameLoop();
      }
    });
  }

  startGameLoop() {
    this.intervalCallback = setInterval(() => {
      this.gameTick();
    }, 100); // 10 FPS for server
  }

  stopGameLoop() {
    if (this.intervalCallback) {
      clearInterval(this.intervalCallback);
      this.intervalCallback = undefined;
    }
  }

  gameTick() {
    const players = [];
    
    // Update all snakes
    for (const [ws, player] of this.sessions) {
      const head = { 
        x: player.snake[0].x + player.velocity.x, 
        y: player.snake[0].y + player.velocity.y 
      };

      // Wrap around logic for multiplayer fun (or collision?) -> Let's do Wrap for now
      if (head.x < 0) head.x = this.tileCount - 1;
      if (head.x >= this.tileCount) head.x = 0;
      if (head.y < 0) head.y = this.tileCount - 1;
      if (head.y >= this.tileCount) head.y = 0;

      // Check Food
      let ate = false;
      if (head.x === this.food.x && head.y === this.food.y) {
        player.score += 10;
        ate = true;
        this.placeFood();
      }

      // Move
      if (player.velocity.x !== 0 || player.velocity.y !== 0) {
        player.snake.unshift(head);
        if (!ate) {
          player.snake.pop();
        }
      }

      players.push({
        id: player.id,
        snake: player.snake,
        color: player.color,
        score: player.score
      });
    }

    // Broadcast State
    const state = JSON.stringify({
      type: 'state',
      players: players,
      food: this.food
    });

    for (const [ws, player] of this.sessions) {
      try {
        ws.send(state);
      } catch(e) {
        // Handle broken pipe?
      }
    }
  }

  placeFood() {
    this.food = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
  }
}
