// Enemies our player must avoid
var Enemy = function(col, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.col    = col;
    this.row    = row;
    this.speed  = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.col = (this.col + (this.speed));
    if (this.col > 599) {
        this.col = 0;
    }
    // Determine enemy position for collision
    this.colpos = Math.round(this.col / 101);
    this.rowpos = this.row / 83;

    // Check for collision
    if (this.colpos == player.col) {
      if (this.rowpos == player.row) {
        player.reset();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

Enemy.prototype.startCol = function() {
      return (Math.floor(Math.random() * 5)) * 101;
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.col    = 2;
    this.row    = 5;
}

Player.prototype.update = function() {
}

Player.prototype.render = function() {
// Keep player in bounds
  if (this.col > 4) {
    this.col = 4;
  }
  if (this.col < 0) {
    this.col = 0;
  }
  if (this.row > 5) {
    this.row = 5;
  }
  if (this.row < .5) {
    this.reset();
  }

  ctx.drawImage(Resources.get(this.sprite), this.col* 101, this.row * 83);
}

// Required player.reset function
Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
}

Player.prototype.handleInput = function(e) {
  switch (e){
    case 'left':
      this.col = this.col -1
      break;
    case 'up':
      this.row = this.row -1
      break;
    case 'right':
      this.col = this.col +1
      break;
    case 'down':
      this.row = this.row +1
      break;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

e1 = new Enemy(0, 83, 3);
e2 = new Enemy(202, 166, 4);
e3 = new Enemy(0, 249, 2);
e4 = new Enemy((Math.floor(Math.random() * (4 -0 +1)) +0) * 101,
               (Math.floor(Math.random() * (3 -1 +1)) +1) * 83,
                Math.floor(Math.random() * (6 -1 +1)) +1)
e5 = new Enemy((Math.floor(Math.random() * (4 -0 +1)) +0) * 101,
               (Math.floor(Math.random() * (3 -1 +1)) +1) * 83,
                Math.floor(Math.random() * (6 -1 +1)) +1)

allEnemies = [e1, e2, e3, e4, e5];

player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
