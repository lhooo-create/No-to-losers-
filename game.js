
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 380, width: 40, height: 40, color: 'yellow', vy: 0, onGround: false };
let gravity = 1;
let keys = { left: false, right: false };

let obstacles = [{ x: 300, y: 420, width: 80, height: 20 }, { x: 500, y: 400, width: 100, height: 20 }];
let keyItem = { x: 700, y: 420, width: 20, height: 20, taken: false };
let door = { x: 750, y: 380, width: 40, height: 100 };

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = 'red';
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
}

function drawKey() {
  if (!keyItem.taken) {
    ctx.fillStyle = 'gold';
    ctx.fillRect(keyItem.x, keyItem.y, keyItem.width, keyItem.height);
  }
}

function drawDoor() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(door.x, door.y, door.width, door.height);
}

function moveLeft() {
  keys.left = true;
  player.x -= 10;
}

function moveRight() {
  keys.right = true;
  player.x += 10;
}

function jump() {
  if (player.onGround) {
    player.vy = -15;
    player.onGround = false;
  }
}

function update() {
  player.vy += gravity;
  player.y += player.vy;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.vy = 0;
    player.onGround = true;
  }

  // collision with obstacles
  for (let obs of obstacles) {
    if (player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y + player.height > obs.y &&
        player.y < obs.y + obs.height) {
      player.y = obs.y - player.height;
      player.vy = 0;
      player.onGround = true;
    }
  }

  // key pickup
  if (!keyItem.taken &&
      player.x < keyItem.x + keyItem.width &&
      player.x + player.width > keyItem.x &&
      player.y < keyItem.y + keyItem.height &&
      player.y + player.height > keyItem.y) {
    keyItem.taken = true;
  }

  // door
  if (keyItem.taken &&
      player.x < door.x + door.width &&
      player.x + player.width > door.x &&
      player.y < door.y + door.height &&
      player.y + player.height > door.y) {
    alert("🏆 فزت! مبروك يا بطل");
    player.x = 50; keyItem.taken = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  drawKey();
  drawDoor();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
