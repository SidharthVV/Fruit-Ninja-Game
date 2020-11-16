var PLAY,END,gameState;

var randy,randFruit;
var knife,enemy1,fruitGroup,enemyGroup,randFruit;
var knifeImg,fruit1,fruit2,fruit3,fruit4;
var score,gameOver,gameOverText,gameOverSound,knifeSound;

function preload(){
  
  enemy1 = loadAnimation("alien1.png" , "alien2.png","alien1.png","alien2.png");
  
  knifeImg = loadImage("sword.png") ;
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverText = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3");
}

function setup (){
  createCanvas(600,500);
  
  // game state
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  //sprite knife
  knife = createSprite(300,250,20,20);
  knife.addImage(knifeImg);
  knife.scale = 0.6 ;
  knife.setCollider("circle",0,0,30);
  
  
  // group
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  // score
  score = 0 ;
}

function draw(){
 background('lightblue');
 drawSprites();
 
  
  // game state  play  
  if(gameState === PLAY){
     textSize(20);
     text("Score : " + score ,270,30 );
     knife.x = mouseX;
     knife.y = mouseY; 
     fruit();
     enemies();
    if(knife.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score = score + 1;
      knifeSound.play();
    }
    
    // swiching game state to end
     if(knife.isTouching(enemyGroup)){
        gameState = END ; 
        knifeSound.play();
    }
    
    //game state end
    if(gameState === END){
      gameOver = createSprite(300,250,10,10);
      gameOver.addImage(gameOverText);
      gameOverSound.play();
      knife.x = 200;
      knife.y = 200;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      
    }
   }
 
    
}

// function for fruit
function fruit(){
  
 // creating fruit in frame count 80 
  if (frameCount %80 === 0){
    var fruit = createSprite(600,250,10,10);
        fruit.scale = 0.2;
        fruit.y = Math.round(random(40,460));
        fruit.lifetime = 100;
    
    var randFruit = Math.round(random(1,4));
    var posf = Math.round(random(1,2));
    
    if(posf === 1){
       fruit.x = 600;
       fruit.velocityX = -(7+(score/4));
    }
    if(posf === 2){
       fruit.x = 0;
       fruit.velocityX = (7+(score/4));
    }
    // random type of fruit
      if(randFruit === 1){
        fruit.addImage(fruit1);
      }
      if(randFruit === 2){
        fruit.addImage(fruit2);
      }
      if(randFruit === 3){
        fruit.addImage(fruit3);
      }
      if(randFruit === 4){
        fruit.addImage(fruit4);
      }
    
      fruitGroup.add(fruit);
    
  }
}

// function for enemy in frame count 200
function enemies(){
  //creating enemy in frame count 200
  if (frameCount %200 === 0){
    var enemy = createSprite(600,250,10,10);
        enemy.scale = 0.7;
        enemy.velocityX = -7;
        enemy.y = Math.round(random(40,460));
        enemy.lifetime = 100;
        enemy.addAnimation("m",enemy1);
        enemyGroup.add(enemy);
    var posm = Math.round(random(1,2));
    
    if(posm === 1){
       enemy.x = 600;
       enemy.velocityX = -(8+(score/10));
    }
    if(posm === 2){
       enemy.x = 0;
       enemy.velocityX = (8+(score/10));
   }
}
}