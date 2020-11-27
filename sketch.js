var tower,towerImage;
var door,doorimage;
var climber,climberImage;
var climbersGroup,doorGroup;
var ghost,ghostStanding,ghostJumping;
var invinsibleblock;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var spookysound;

  function preload () {
    towerImage = loadImage("tower.png");
    doorimage = loadImage("door.png");
    climberImage = loadImage("climber.png");
    ghostStanding = loadImage("ghost-standing.png");
    ghostJumping = loadImage("ghost-jumping.png");
    spookysound = loadSound("spooky.wav");
  
  }

function setup () {
createCanvas(600,600);
  
  spookysound.loop();
tower = createSprite(300,300,600,600);
tower.addImage(towerImage);
tower.velocityY = 3;

climberGroup = new Group();
doorGroup = new Group();
invinsibleblockGroup = new Group();
  
  
  ghost = createSprite(300,300,40,40);
  ghost.addImage(ghostStanding);
  ghost.scale = 0.3;
  

}

function draw () {
background("black")

  
  if (gamestate === PLAY){
      if (tower.y>500) {
 tower.y=300;
  }
    ghost.velocityY = 4;

      if (keyDown("space")){
      ghost.velocityY = -2;

    }

    if (keyDown("Left_Arrow")){
      ghost.x = ghost.x-2;
    }

    if (keyDown("Right_Arrow")){
      ghost.x = ghost.x+2;
    }
     if (climberGroup.isTouching(ghost)){
  ghost.velocityY=0;
     }
     if (invinsibleblockGroup.isTouching(ghost)||ghost.y>=600){
    gamestate = END; 
   ghost.destroy();
  } 
    
     spawndoors ();
    
   }
  
 else if (gamestate === END){
   tower.visible = false;
   doorGroup.destroyEach();
   climberGroup.destroyEach();
   
   textFont("Verdana");
   textSize (50);
   fill ("yellow");
   text("GAME OVER",150,300);
 } 
  
  drawSprites();
}

function spawndoors () {
  if(frameCount %200 ===0){
  door = createSprite(Math.round(random(150,400)),20,100,50);
  door.addImage(doorimage);
  door.velocityY = 3;
  doorGroup.add(door);
  door.lifetime = 200;
  
  climber = createSprite(door.x,70,100,50);
  climber.addImage(climberImage);
  climber.velocityY = 3;
  climberGroup.add(climber);
  climber.lifetime = 200;
    
    //ghost.depth = door.depth;
    //ghost.depth = ghost.depth+1;
    ghost.depth = climber.depth + 1;
    
    
    
  invinsibleblock = createSprite(door.x,75,80,20);
  invinsibleblock.velocityY = 3;
  invinsibleblock.visible = false;
  invinsibleblock.lifetime = 200;
  invinsibleblockGroup.add(invinsibleblock);
  
    
    
  }
}