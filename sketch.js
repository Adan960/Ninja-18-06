var gameState = "play";
var ninjaGirl;
var ninjaGirlImg,ninjaGirlParadaEsquerdaImg;
var backgroundImg;
var ninjaGirlCorrendoDireita;
var ninjaGirlCorrendoEsquerda;
var ninjaGirlAtacandoDireita;
var pos = "direita";
var invisibleGround;
var ninjaGirlJumpDireita;
var ninjaGirlJumpEsquerda;
var ninjaGirlMorrendoD;
var girlMorta, girlMortaImg;
var adaga;
var adagaImg;
var contAdaga = 3;
var contaAdaga;
var ada_a;
var ada_b;
var ada_c;
var adagaE;
var vida = 3;
var placar;
var placarImg;
var seta, setaImg;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
// colocar "Body"
const body = Matter.Body;

function preload()
{
  ninjaGirlImg = loadImage("girlparada.gif");
  backgroundImg = loadImage("background1.gif");
  ninjaGirlCorrendoEsquerda = loadImage("girlcorrendoesquerda.gif");
  ninjaGirlCorrendoDireita = loadImage("girlcorrendodireita.gif");
  ninjaGirlParadaEsquerdaImg = loadImage("girlparadaesquerda.gif");
  ninjaGirlAtacandoDireita = loadImage("girlatacandodireita.gif");
  ninjaGirlJumpDireita = loadImage("Jump.png");
  ninjaGirlJumpEsquerda = loadImage("JumpE.png");
  adagaImg = loadImage("Kunai.png");
  placarImg = loadImage("Placar.png");
  ninjaGirlMorrendoD = loadImage("girlmorrendodireita.png");
  setaImg = loadImage("seta.png");
  girlMortaImg = loadImage("girlmorta.png");
  

  ninjaGirlMorrendoD.looping= false;
  
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Crie os Corpos aqui.

	ninjaGirl = createSprite(windowWidth/5, windowHeight/2,20,20);
	ninjaGirl.addImage(ninjaGirlImg);
	ninjaGirl.scale = 0.5;

	World.add(world, ninjaGirl);

	invisibleGround = createSprite(width/2,height-10,width,125);
	invisibleGround.visible = false;

  contaAdaga = createSprite(100,240,10,10);
  contaAdaga.visible = false;

  ada_a = createSprite(windowWidth/7,windowHeight/13,20,20);
  ada_a.addImage(adagaImg);
  ada_a.rotation = -90,
  ada_a.scale = 0.6;

  ada_b = createSprite(windowWidth/8,windowHeight/13,20,20);
  ada_b.addImage(adagaImg);
  ada_b.rotation = -90,
  ada_b.scale = 0.6;

  ada_c = createSprite(windowWidth/9,windowHeight/13,20,20);
  ada_c.addImage(adagaImg);
  ada_c.rotation = -90,
  ada_c.scale = 0.6;

  placar = createSprite(windowWidth/2,windowHeight/13,20,20);
  placar.addImage(placarImg);
  placar.scale = 0.8;

  girlMorta = createSprite(ninjaGirl.x,ninjaGirl.y,10,10)
  girlMorta.addImage(girlMortaImg);
  girlMorta.scale = 0.5;
  girlMorta.velocityY = -7;

  seta = createSprite(ninjaGirl.x, ninjaGirl.y - 20,10,10);



	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);
  ninjaGirl.velocityY += 1.85;
  ninjaGirl.collide(invisibleGround);

  drawSprites();


  if(vida <= 0){
    gameState = "end";
  }
  if(gameState == "end"){
    placar.visible = false;
    ninjaGirl.addImage(ninjaGirlMorrendoD);
  }











  // estado do jogo é PLAY

  if(gameState == "play"){
  
  seta.x = ninjaGirl.x
  seta.y = ninjaGirl.y - 150;
  seta.addImage(setaImg);
  seta.scale = 0.3;


  if(contAdaga < 3){
  
    contaAdaga.velocityX = 1;
  }
  else{
    contaAdaga.velocityX = 0;
  }
  if(contaAdaga.x > 300){
    contAdaga++;
    contaAdaga.x = 100;
  }
  if(keyDown("w") && ninjaGirl.y >= height/1.4){
	ninjaGirl.velocityY = -30;
  }
  if(ninjaGirl.y <= height/1.4 && pos != "esquerda"){
    ninjaGirl.addImage(ninjaGirlJumpDireita);
  }
  if(ninjaGirl.y <= height/1.4 && pos != "direita"){
    ninjaGirl.addImage(ninjaGirlJumpEsquerda);
  }

  if(keyDown("A")){
    ninjaGirl.position.x = ninjaGirl.position.x -10;
	  pos = "esquerda";
  if(ninjaGirl.y > height/1.4){
    ninjaGirl.addImage(ninjaGirlCorrendoEsquerda); 
  }
  }
  if(keyDown("D") && pos != "ataque"){
    ninjaGirl.position.x = ninjaGirl.position.x +10;
    pos = "direita";
    if(ninjaGirl.y > height/1.4){
      ninjaGirl.addImage(ninjaGirlCorrendoDireita); 
    }
  }
  if(keyDown("O")){
	ninjaGirl.addImage(ninjaGirlAtacandoDireita);
  }
  if(keyDown("P") && contAdaga > 0 && pos == "direita"){
    createAdagaD();
    contAdaga --;
    }
    if(keyDown("P") && contAdaga > 0 && pos == "esquerda"){
      createAdagaE();
      contAdaga --;
      }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "direita" && vida > 0){
	ninjaGirl.addImage(ninjaGirlImg);
  }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "esquerda" && vida > 0){
    ninjaGirl.addImage(ninjaGirlParadaEsquerdaImg);;
}
if(contAdaga > 0){
  ada_c.visible = true;
}
else{
  ada_c.visible = false;
}
if(contAdaga > 1){
  ada_b.visible = true;
}
else{
  ada_b.visible = false;
}
if(contAdaga > 2){
  ada_a.visible = true;
}
else{
  ada_a.visible = false;
}
console.log(contAdaga);
  }
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight); 
}
function createAdagaD () {
  adaga = createSprite(100,100,50,50);
  adaga.addImage(adagaImg);
  adaga.velocityX = 17;
  adaga.x = ninjaGirl.x;
  adaga.y = ninjaGirl.y;
  adaga.lifetime = 100;
}
function createAdagaE () {
  adagaE = createSprite(100,100,50,50);
  adagaE.addImage(adagaImg);
  adagaE.velocityX = -17;
  adagaE.x = ninjaGirl.x;
  adagaE.y = ninjaGirl.y;
  adagaE.lifetime = 100;
  adagaE.rotation = 180;
}