//introducing the variables 
var lady ,lady_running, ground, ground_running, score, ground_inv, rand_clouds, cloud, cloud_running, restartsp, restartImg, lady_stop, treasure_val;
var obstacle, obst1, obst2, obst3, obst4, obst5, obst6, obst, randst, clouds_grp, obstacle_grp, gameoverImage, gameover;
var lady_jump, lady_die, lady_chkpoint, cash500Img, cash500G, cash2kImg, cash2kG, diamondsImg, diamondsG, diamondkohG, diamondkohImg, jewelG, jewelImg; 
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var sound1 = "playsound";

//preloading the graphics of trex for running animation 
function preload(){
  lady_running = loadAnimation ("lady_fr1.png", "lady_fr2.png", "lady_fr3.png", "lady_fr4.png");
  ground_running = loadImage ("stroad.png");
  lady_stop = loadAnimation ("lady_frstop.png");
 lady_die = loadSound ("die.mp3");
lady_jump = loadSound ("jump.mp3");
lady_chkpoint = loadSound ("checkpoint.mp3");

 //loading cloud images
 cloud1 = loadImage ("Large-cloud1.png");
  cloud2 = loadImage ("Large-cloud2.png");
  cloud3 = loadImage ("Large-cloud3.png");

 //loading obstacle images
  obst1 = loadImage ("Stone1-rmbg.png");
  obst2 = loadImage ("angrydog.png");
  obst3 = loadImage ("cactus.png");
  obst4 = loadImage ("greek-soldier.png");
  obst5 = loadAnimation ("fire_01.png", "fire_02.png", "fire_03.png", "fire_04.png", "fire_05.png","fire_06.png","fire_07.png","fire_08.png","fire_09.png","fire_010.png","fire_011.png","fire_012.png","fire_013.png","fire_014.png","fire_015.png","fire_016.png","fire_017.png");
  obst6 = loadImage ("snake.png");

//loading treasure images  
  cash500Img = loadImage ("500-rupeebund.png");
  cash2kImg = loadImage ("2000-rupeebund.png");
  jewelImg = loadImage ("jewel.png");
  diamondkohImg = loadImage ("diamond.png");
  goldbnglImg = loadImage ("goldbngl.png"); 
  diamondsImg = loadImage ("diamonds.png");

  gameoverImage = loadImage ("gameOvernobg.png");
  restartImg = loadImage ("restart.png");
}

//creating the canvas trex and ground sprites for the setup
function setup() {

  //creating the canvas where trex runs
  createCanvas(windowWidth, windowHeight);
   //initialising the score as 0 
  score = 0;
  treasure_val = 0

  ground_inv = createSprite (width/2, height-50, width*6, 20);
 
   //creating the ground sprite
  ground = createSprite(width/2,height-30,width*6,30);
  ground.addImage ("GROUNDMOVING", ground_running);
  ground.scale = 1.5;
  ground_inv.visible = false; 
 
  //create a trex sprite
    lady = createSprite(100,height-250, 80, 40);
 
    //lady animation 
    lady.addAnimation ("LADYMOVING", lady_running);
    lady.addAnimation ("LADYSTOPPED", lady_stop);
    //resizing the trex to the canvas
    lady.scale = 0.88;
     
    gameover = createSprite (width/2,height/2-80, 200, 55);
    gameover.addImage (gameoverImage);
    gameover.scale = 0.7;
       lady.setCollider ("circle", 0, 0, 100);
      // lady.debug = true;
  restartsp = createSprite (width/2,height/2+120, 200, 55);
  restartsp.addImage (restartImg);
  restartsp.scale = 0.35;

  //creating obstacle, clouds and different treasure items group
    obstacle_grp = createGroup();
    clouds_grp = createGroup(); 
    cash500G = createGroup();
    cash2kG = createGroup();
    jewelG = createGroup();
    goldbnglG = createGroup();
    diamondsG = createGroup();
    diamondkohG = createGroup();
    }

function draw(){
 //creating background
 background("light blue");
  
  drawSprites();  
//  sound1 = "playsound" ;
  //giving a title to the game
  console.log(sound1); 
  textSize(40);
  fill("red");
     text("THE JEWEL COLLECTION GAME!", width/2-340, 35); 

  //putting the score and money collected on top left   
    textSize(16);
   text ("SCORE : "+ score, 30, 30); 
    fill("green");
    text ("Treasure Value (in Lakhs):  "+ treasure_val, 24, 60);
       
   if (gamestate ==PLAY) 
   {
     if (keyDown ("space") || (touches.length >0))
    {
      //assigning the Y velocity to the lady on pressing space
      lady.velocityY = -8;
       lady_jump.play();
       touches = [];
     }
   
    //pulling down the lady from the jumping height
    lady.velocityY = lady.velocityY + 0.6;
    // adding the score according to the framecounts covered
      score = score + Math.round(frameCount/200);
      if ((score % 200 === 0) && (score > 0))
    {
      lady_chkpoint.play() ; 
    }
       
  // ground.velocityX = -(2 + 2 * (score/400));
   
    if (ground.x < 660) {
     ground.x = ground.width/2;
           }
    //fixing the lady to the ground sprite 
    lady.collide (ground_inv);
    gameover.visible = false;
    restartsp.visible = false;

       //calling the functions rand_clouds, treasure items and obstacle
      rand_clouds();
      createcash500();
      createcash2k();
      createjewel();
      creatediamondkoh();
      creategoldbngl();
      creatediamonds();
      obstacle();
      
      if (cash500G.isTouching(lady)) {
        cash500G.destroyEach();
        treasure_val=treasure_val+5;
      }
      else if (cash2kG.isTouching(lady)) {
        cash2kG.destroyEach();
        treasure_val=treasure_val+20;
       }
      else if (jewelG.isTouching(lady)) {
        jewelG.destroyEach();
        treasure_val=treasure_val+1;
       }
      else if (diamondkohG.isTouching(lady)) {
        diamondkohG.destroyEach();
        treasure_val=treasure_val+2;
       }
      else if (goldbnglG.isTouching(lady)) {
        goldbnglG.destroyEach();
        treasure_val=treasure_val+4;
       } 
      else if (diamondsG.isTouching(lady)) {
        diamondsG.destroyEach();
          treasure_val=treasure_val+40;
      }
      else if (obstacle_grp.isTouching(lady)) 
      {
        gamestate = END;
      }
   }
   else if (gamestate == END) 
   {
    gameover.visible = true;
    restartsp.visible = true; 
   
    ground.velocityX = 0;
    lady.velocityY = 0;
    lady.changeAnimation ("LADYSTOPPED", lady_stop);
    lady_die.play();
    clouds_grp.setVelocityXEach (0);
    obstacle_grp.setVelocityXEach (0);
    cash500G.setVelocityXEach (0);
    cash2kG.setVelocityXEach (0);
    jewelG.setVelocityXEach (0);
    diamondkohG.setVelocityXEach (0);
    goldbnglG.setVelocityXEach (0);
    diamondsG.setVelocityXEach (0);
    clouds_grp.setLifetimeEach(-1);
    obstacle_grp.setLifetimeEach(-1);
    cash500G.setLifetimeEach(-1);
    cash2kG.setLifetimeEach(-1);
    jewelG.setLifetimeEach(-1);
    diamondkohG.setLifetimeEach(-1);
    goldbnglG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
                                                                                                                                                                                                                                                                                                                                                  
    lady.collide (ground_inv);
    
      if (keyDown ("enter") || (touches.length >0))
    {
      //restarting the game on pressing Enter key
      restartgm();
       touches = [];
     }
   }
  }

function rand_clouds() 
{
if (frameCount % 70 === 0) 
{
  cloud = createSprite (width-20, 20, 120, 60);
  cloud.scale = 0.6;
  cloud.velocityX  = -6;
  
  cloud.y = Math.round(random(35,height-500));

//adjusting the cloud depth
cloud.depth = lady.depth;
cloud.depth = gameover.depth;
cloud.depth = restartsp.depth;
lady.depth = lady.depth + 1;
gameover.depth = gameover.depth + 2;
restartsp.depth = restartsp.depth + 2;
clouds_grp.add(cloud);

var rand = Math.round(random(1,3));

//adding random images to clouds
if (rand == 1) 
{
  cloud.addImage ("1st_Cloud", cloud1);}
  else if (rand == 2) 
  {
    cloud.addImage ("2nd_Cloud", cloud2);}
    else 
     {
      cloud.addImage ("3rd_Cloud", cloud3);} 
    
      cloud.lifetime = 720;
    }
    
  } 
function restartgm()
{
  //create a function restart 
  gamestate = PLAY;
  gameover.visible = false;
  restartsp.visible = false;
  obstacle_grp.destroyEach();
  clouds_grp.destroyEach();
  cash500G.destroyEach();
  cash2kG.destroyEach();
  diamondkohG.destroyEach();
  diamondsG.destroyEach();
  jewelG.destroyEach();
  goldbnglG.destroyEach();
  score = 0;
  treasure_val = 0;

  lady.changeAnimation ("LADYMOVING", lady_running);
  lady_die.stop();
}

function obstacle () 
{
  if (frameCount % 130 === 0) 
  {
  //creating obstacle sprite and group
    obst = createSprite (width-20, height-120, 50, 20);
    obst.velocityX  = -12;
    obst.lifetime = 700; 
    obstacle_grp.add(obst);

 //generating random obstacles on the screen
 var randst = Math.round(random(1,6));
 
 //adding random images to the obstacles
  switch (randst)
  {
  case 1: obst.addImage ("1st_OBSTACLE", obst1);
          obst.scale = 0.9;
          break;
  case 2: obst.addImage ("2nd_OBSTACLE", obst2);
          obst.scale = 0.35;
          break;
  case 3: obst.addImage ("3rd_OBSTACLE", obst3);
          obst.scale = 0.4;
          break;
  case 4: obst.addImage ("4th_OBSTACLE", obst4);
          obst.scale = 0.5;
          break;
  case 5: obst.addAnimation ("5th_OBSTACLE", obst5);
          obst.scale = 0.9;
          break;
  case 6: obst.addImage ("6th_OBSTACLE", obst6);
          obst.scale = 0.6;
          break;
  default: break;
        }  
    }
  } 

         
function createcash500() {
  if (frameCount % 200 === 0) {
  var cash5 = createSprite(width-20,height-120, 60, 30);
  cash5.addImage(cash500Img);
  cash5.scale=0.25;
  cash5.velocityX = -12;
  cash5.lifetime = 550;
  cash500G.add(cash5);
  }
}

function createcash2k() {
  if (frameCount % 230 === 0) {
  var cash2k = createSprite(width-20, height-120, 60, 30);
  cash2k.addImage(cash2kImg);
  cash2k.scale=0.25;
  cash2k.velocityX = -12;
  cash2k.lifetime = 550;
  cash2kG.add(cash2k);
  }
}

function creatediamonds() {
  if (frameCount % 320 === 0) {
  var diamnds = createSprite(width-20, height-120, 50,50);
  diamnds.addImage(diamondsImg);
  diamnds.scale=0.25;
  diamnds.velocityX = -12;
  diamnds.lifetime = 550;
  diamondsG.add(diamnds);
  }
}

function creatediamondkoh() {
  if (frameCount % 370 === 0) {
  var diamkoh = createSprite(width-20, height-120, 80,50);
  diamkoh.addImage(diamondkohImg);
  diamkoh.scale=0.25;
  diamkoh.velocityX = -11;
  diamkoh.lifetime = 550;
  diamondkohG.add(diamkoh);
  }
}

function creategoldbngl() {
  if (frameCount % 430 === 0) {
  var gbngles = createSprite(width-20, height-120, 60, 50);
  gbngles.addImage(goldbnglImg);
  gbngles.scale=0.25;
  gbngles.velocityX = -10;
  gbngles.lifetime = 550;
  goldbnglG.add(gbngles);
  }
}

function createjewel() {
  if (frameCount % 550 === 0) {
  var jwels = createSprite(width-20, height-120, 50, 50);
  jwels.addImage(jewelImg);
  jwels.scale=0.25;
  jwels.velocityX = -13;
  jwels.lifetime = 550;
  jewelG.add(jwels);
  }
}
