
var shooter,shooterImage,bullet;
var enimie,enimies,enimieImage;
var Lbar,Rbar;
var bullets,bar;
var PLAY = 1;
var gameState = PLAY,END =0;
var score=0,gameOver,gameOverImg;

function preload(){
  shooterImage = loadImage("jet.png");
  enimieImage = loadAnimation("alien.png","alien2.png","alien3.png","alien4.png","alien5.png","alien6.png","alien7.png","alien8.png","alien9.png");
  gameOverImg = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(650, 550);
  
  shooter = createSprite(400,450,50,80);
  shooter.addImage(shooterImage);
  shooter.scale = 0.18
  
  bullets = new Group();
  enimies = new Group();
  
  Lbar = createSprite(0,300,3,600);
  Rbar = createSprite(650,300,3,600);
  
  
}

function draw() {
  background(01,18,66);
  
  //shooter.x = mouseX;
  if(gameState === PLAY){
  
  shooter.collide(Lbar);
  shooter.collide(Rbar);
  if(keyWentDown(LEFT_ARROW)){
    shooter.velocityX = -9;
  }
  if(keyWentDown(RIGHT_ARROW)){
    shooter.velocityX = 9;
  }
  if(keyWentUp(LEFT_ARROW)){
    shooter.velocityX = 0;
  }
  if(keyWentUp(RIGHT_ARROW)){
    shooter.velocityX = 0;
  }
  
  
  if(keyDown(UP_ARROW)){
    spawnBullets();
  }
  
  if(bullets.isTouching(enimies)){
    enimies.destroyEach();
    bullets.destroyEach();
    score = score + 5;
  }
    if(score == 100){
      gameState = END;
    }

  
  spawnEnimies();
 
  
  fill(225);
  text(mouseX +"  "+mouseY,mouseX,mouseY);
    textSize(20);
  text("score: " + score,windowWidth - 250,50);
  }
  
  if(gameState === END ){
    bar = createSprite(325,275,650,550);
    bar.shapeColor = "black";
    gameOver = createSprite(windowWidth/2,windowHeight/2);
    gameOver.addImage(gameOverImg);
    enimies.destroyEach();
    
    enimies.setVelocityYEach(0);
    
    
  }
  
   drawSprites();
  
}

function spawnBullets(){
      if(frameCount%5 ===0){
 bullet = createSprite(shooter.x,shooter.y - 40,5,10);
    bullet.velocityY = -5;
        bullet.shapeColor = "yellow";
        
        bullet.lifetime = 150;
        bullets.add(bullet);
      
    }
}

function spawnEnimies(){
  if(frameCount%50 === 0){
    
    enimie = createSprite(random(50,600),-100,30,30);
    enimie.velocityY += 7;
    enimie.addAnimation("ani",enimieImage);
    enimie.scale = 0.1;

    
    enimies.lifetime = 150;
    enimies.add(enimie);
  }
}






