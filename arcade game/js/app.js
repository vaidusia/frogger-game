// Enemies our player must avoid
var Enemy = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200 + 10);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    if (this.x > 505) {
        this.x = 0;
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function() {
    "use strict";
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.setStartPosition();
};


// Start position of the player
Player.prototype.setStartPosition = function() {
    this.x = 202;
    this.y = 404;
};


Player.prototype.update = function() {
    // Moves the player back to the start square if he reaches the water
    if (this.y <= 0) {
        this.score++;
        this.setStartPosition();
    }
    // Moves the player back to the start position if he collides with the enemy
    for (var enemyObject in allEnemies) {
        if (this.x >= allEnemies[enemyObject].x - 99 && this.x <= allEnemies[enemyObject].x + 99) {
            if (this.y >= allEnemies[enemyObject].y - 10 && this.y <= allEnemies[enemyObject].y + 10) {
                this.score--;
                this.setStartPosition();
            }
        }
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),  this.x , this.y);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score " + this.score, 20,80);
};

// Moves the player
Player.prototype.handleInput = function(key) {
    if (key == 'right' && this.x + 101 < 505) {
        this.x += 101;
    }
    if (key == 'left' && this.x - 101 >= 0) {
        this.x -= 101;
    }
    if (key == 'down' && this.y + 83 < 487) {
        this.y += 83;
    }
    if (key == 'up' && this.y - 83 >= -11) {
        this.y -= 83;
    }
};



// Create 3 objects of class Enemy and push them in the array allEnemies
var enemy1 = new Enemy(0, 63);
var enemy2 = new Enemy(0, 145);
var enemy3 = new Enemy(0, 228);

var allEnemies = [enemy1, enemy2, enemy3];

// Create 1 object of class Player
var player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
player.handleInput(allowedKeys[e.keyCode]);
});



