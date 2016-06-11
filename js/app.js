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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

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
  ctx.drawImage(Resources.get(this.sprite), this.col* 101, this.row * 83);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

e1 = new Enemy(0, 83, 1);
e2 = new Enemy(202, 166, 2);
e3 = new Enemy(0, 249, 1);
allEnemies = [e1, e2, e3];

player = new Player;

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
