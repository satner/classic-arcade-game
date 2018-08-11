// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    if (isEnemyOutOfX(this.x)) {
      this.x = -50;
      this.speed = getRandomInt(150, 550);
    }

    if (hasCollision(this.x, this.y, player.x, player.y)) {
          document.body.innerHTML = '';
          document.body.innerHTML = '  <img src="./images/busted.jpg" alt="busted image"> </img>';
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/Rock.png';
}

Player.prototype.update = function () {
  if (playerReachRight(this.x)) {
    this.x = 400;
  }

  if (playerReachLeft(this.x)) {
    this.x = 0;
  }

  if (playerReachTop(this.y)) {
    this.y= 400;
  }

  if (playerReachBottom(this.y)) {
    this.y = 400;
  }

  //console.log(this.x, this.y);
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyStroke) {
  switch (keyStroke) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 40;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 40;
      break;
  }
};

var canvasX = 505;
var canvasY = 606;
// Extra function for enemy
function isEnemyOutOfX(x) {
  if (x > canvasX) {
    return true;
  }
}

// Extra function for player
function playerReachRight(x) {
  if (x > 400) {
    return true;
  }
}

function playerReachLeft(x) {
  if (x < 0) {
    return true;
  }
}

function playerReachTop(y) {
  if (y < 40) {
    return true;
  }
}

function playerReachBottom(y) {
  if (y > 400) {
    return true;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function hasCollision(enemyX, enemyY, playerX, playerY) {
  if (enemyX + 50 > playerX &&
      playerX + 50 > enemyX &&
      enemyY + 50 > playerY &&
      playerY + 50 > enemyY) {
    return true;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(202, 400, 50);

let enemyStaringPostions = 40;
for (let i = 0; i < 4; i++) {
  allEnemies.push(new Enemy(-50, enemyStaringPostions, getRandomInt(150, 550)));
  enemyStaringPostions += 60;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
