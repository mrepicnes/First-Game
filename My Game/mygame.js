/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;

var player;

var cursors;

var stars;

var score = 0;

var scoreText
function preload() {

game.load.image('sky', 'Assets/sky.png');
game.load.image('ground', 'Assets/platform.png');
game.load.image('star', 'Assets/star.png');
game.load.spritesheet('dude', 'Assets/dude.png', 62, 64);
}

function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.sprite(0, 0, 'sky');


platforms = game.add.group();
platforms.enableBody = true;
var ground = platforms.create(0, game.world.height - 64, 'ground');
ground.scale.setTo(2, 2);
ground.body.immovable = true;
var ledge = platforms.create(40, 420, 'ground');
  ledge.body.immovable = true;
ledge = platforms.create(200, 250, 'ground');
  ledge.body.immovable = true;

//Star code
scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
stars = game.add.group();
stars.enableBody = true;
for (var i = 0; i < 12; i++)

{
  var star = stars.create(i * 70, 0, 'star');
  star.body.gravity.y = 0.7 + Math.random() * 100;
  star.body.bounce.y = 0.7 + Math.random() * 0.2;
}
 {
     star.body.gravity.y = 0.7 + Math.random() * 100;
     star.body.bounce.y = 0.7 + Math.random() * 0.2;
 }

// Player COde
player = game.add.sprite(30, game.world.height - 150, 'dude');
game.physics.arcade.enable(player);
player.body.bounce.y = 0;
player.body.gravity.y = 350;
player.body.collideWorldBounds = true;
player.animations.add('stand', [0, 1, 2], 10, true);
player.animations.add('left', [3, 4, 5], 10, true);
player.animations.add('right', [ 6, 7, 8], 10, true);

cursors = game.input.keyboard.createCursorKeys();


}

function update() {
    
var hitPlatform = game.physics.arcade.collide(player, platforms);
var starHitPlatform = game.physics.arcade.collide(stars, platforms);
player.body.velocity.x = 0;

      if (cursors.left.isDown) {
        player.body.velocity.x = -150;
    
        player.animations.play('left');
}   
     else if (cursors.right.isDown)
     
{
      player.body.velocity.x = 150;
    
     player.animations.play('right');
}
 else
  {
      player.animations.stop();
    
      player.frame = 1;
  }
      if (cursors.up.isDown && player.body.touching.down && hitPlatform)
  {
   player.body.velocity.y = -350;   
  }
game.physics.arcade.overlap(player, stars, collectStar, null, this);
function collectStar (player, star) {
    star.kill();
    score++;
}

    scoreText.text = "Score: " + score;
}