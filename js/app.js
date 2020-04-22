// Whole-script strict mode syntax
"use strict";

//Define Character constructor
var Character = function(sprite, snd, col, row) {
  this.sprite = sprite;
  this.snd = snd;
  this.col = col;
  this.row = row;
};

//Add methods to Character.prototype
Character.prototype.playSnd = function(sound) {
  var snd = new Audio(sound);
  snd.play();
};

##########################
Line added to break linter
##########################

// Enemies our player must avoid constructor
var Enemy = function(col, row, speed) {
  Character.call(this, 'images/enemy-bug.png', 'sounds/doh1_y.wav', col, row);
  this.speed  = speed;
};

// Be sure to get all of Characters methods
Enemy.prototype = Object.create(Character.prototype);

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

    // Check for collision and call player.reset
    // function if there is a collision
    if (this.colpos == player.col) {
      if (this.rowpos == player.row) {
        this.playSnd(this.snd);
        player.reset();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  Character.call(this, 'images/char-boy.png', 'sounds/thats_good.wav', 2, 5);
};

//Again be sure to get Character's methods
Player.prototype = Object.create(Character.prototype);

Player.prototype.render = function() {
// Keep player in bounds by limiting max and min rows and columns
  if (this.col > 4) {
    this.col = 4;
  }
  if (this.col < 0) {
    this.col = 0;
  }
  if (this.row > 5) {
    this.row = 5;
  }
  if (this.row < '.5') {
    this.playSnd(this.snd);
    this.reset();
  }

  ctx.drawImage(Resources.get(this.sprite), this.col* 101, this.row * 83);
};

// Required player.reset function
Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
};

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
};

//This function plays a sound

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var e1 = new Enemy(0, 83, 3);
var e2 = new Enemy(202, 166, 4);
var e3 = new Enemy(0, 249, 2);
var e4 = new Enemy((Math.floor(Math.random() * (4 -0 +1)) +0) * 101,
               (Math.floor(Math.random() * (4 -1 +1)) +1) * 83,
                Math.floor(Math.random() * (6 -1 +1)) +1);
var e5 = new Enemy((Math.floor(Math.random() * (4 -0 +1)) +0) * 101,
               (Math.floor(Math.random() * (4 -1 +1)) +1) * 83,
                Math.floor(Math.random() * (6 -1 +1)) +1);

var allEnemies = [e1, e2, e3, e4, e5];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Included here are the tradition WASD gaming controlsw
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
