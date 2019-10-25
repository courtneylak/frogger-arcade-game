// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed
    if (this.x > 500) {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
};

//collision function adapted and modified from FEND walkthrough demonstration
Player.prototype.update = function(dt) {
    // first collission detection 
    for (let enemy of allEnemies) {
        let distx = this.x - enemy.x - 30;
        let disty = this.y - enemy.y - 10;
        let distance = Math.sqrt(distx * distx + disty * disty);

        if (distance < 45) {
            this.x = 200;
            this.y = 410;
        };
    };
    // if no collision, player is a winner! modal pop-up appears...
    if (this.y < -50) {
        finishGame();
        this.y = 410;
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case "left":
            this.x -= 100;
            if (this.x < 0 ) {
                this.x = 0;
            };
            break;
        case "right":
            this.x += 100;
            if (this.x > 400) {
                this.x = 400;
            };
            break;
        case "up":
            this.y -= 85;
            break;
        case "down":
            this.y += 85;
            if (this.y < 500) {
                this.y = 410;
            };
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(0, 60, 2), new Enemy(0, 145, 4), new Enemy(0, 230, 3)];

var player = new Player();

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

function finishGame() {
        //if player touches water in images/water-block.png in engine.js; then implement this function:
        console.log('Winner!');
        swal({
            title: 'Congratulations! You made it alive across the highway!', 
            text: `Select 'OK' to replay game; or 'Cancel' to Exit.`,
            buttons: ['Cancel', true],
        }).then(() => {
            gameRestart();
        });
    };

function gameRestart() {
    allEnemies = [new Enemy(0, 60, Math.random()*10), new Enemy(0, 145, Math.random()*10), new Enemy(0, 230, Math.random()*10)];
};
