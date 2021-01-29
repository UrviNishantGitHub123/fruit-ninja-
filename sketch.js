var knife,knifeImage,gameoverimage,knife_sound,gameover_sound;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var enemy,monster,enemyGroup,monsterImage;
var PLAY = 1;
var END =0 ;
var gamestate = PLAY;
function preload(){
   knifeImage = loadImage("sword.png");
   fruit1Image = loadImage("fruit1.png");
   fruit2Image = loadImage("fruit2.png");
   fruit3Image = loadImage("fruit3.png");
   fruit4Image = loadImage("fruit4.png");
   monsterImage = loadAnimation("alien1.png","alien2.png");
   gameoverimage = loadImage("gameover.png");
   knife_sound = loadSound("knifeSwooshSound.mp3");
  gameover_sound = loadSound("gameover.mp3");
  
}

function setup() {
    createCanvas(500,500);
    knife = createSprite(50,250,20,20);
    score = 0;
    
    fruitGroup = createGroup();
    enemyGroup = createGroup();
}

function draw(){
  background("black");
  fruits();
  Enemy();
  if(gamestate===PLAY){ 
     knife.x = World.mouseX;
     knife.y = World.mouseY;
     knife.addImage(knifeImage);
    
     
    
    if(knife.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      knife_sound.play();
    }
    if(knife.isTouching(enemyGroup)){
       gamestate=END;
       knife.addImage(gameoverimage);
       gameover_sound.play();
       }
  } 
  if(gamestate===END){
    
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
    score = 0;
     knife.x=250;
     knife.y=250;
     
  }
  drawSprites();
  
  text("Score : "+ score,300,30);
  
}


function fruits () {
  if (World.frameCount%100===0) {
     position = Math.round(random(1,2));
     fruit = createSprite(400,200,20,20);
     fruit.scale=0.25;
     
     r = Math.round(random(1,4))
     if (r===1){
      fruit.addImage(fruit1Image);
       score = score+10;
     }
     else if(r===2){
      fruit.addImage(fruit2Image);
       score = score+5;
     }
     else if(r===3){
      fruit.addImage(fruit3Image);
       score = score+9;
     }
     else if(r===4){
      fruit.addImage(fruit4Image); 
       score = score+ 7;
     }
     if(position==1){
      fruit.x=400
      fruit.velocityX = -(7+(score/10));       
     }
      else if (position==2){
      fruit.x=0
      fruit.velocityX = 7+(score/10); 
      } 
    fruit.y= Math.round(random(50,420));
    
   // fruit.velocityX=-6;
    fruit.lifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount%290===0) {
    monster = createSprite(450,250,20,20); 
    monster.addAnimation("alien",monsterImage);
    monster.y = Math.round(random(120,440));
    monster.velocityX=-(8+(score/10));
    monster.lifetime = 100;
    
    enemyGroup.add(monster);
    
  }
  
}