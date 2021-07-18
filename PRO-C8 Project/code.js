var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["95299868-7916-4cee-9c1c-dc80e1dab548","9dd8f1f3-e0e3-4eb5-bd5a-096f75f332d3","213cc71f-5e7c-4701-9edf-7b89b2a6db86"],"propsByKey":{"95299868-7916-4cee-9c1c-dc80e1dab548":{"name":"soccer","sourceUrl":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png"},"9dd8f1f3-e0e3-4eb5-bd5a-096f75f332d3":{"name":"robot1","sourceUrl":"assets/api/v1/animation-library/gamelab/nWr2zMHCUeCVRl5vawHBxi9C0Pq6bgvZ/category_robots/robot_27.png","frameSize":{"x":374,"y":396},"frameCount":1,"looping":true,"frameDelay":2,"version":"nWr2zMHCUeCVRl5vawHBxi9C0Pq6bgvZ","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":374,"y":396},"rootRelativePath":"assets/api/v1/animation-library/gamelab/nWr2zMHCUeCVRl5vawHBxi9C0Pq6bgvZ/category_robots/robot_27.png"},"213cc71f-5e7c-4701-9edf-7b89b2a6db86":{"name":"robot2","sourceUrl":"assets/api/v1/animation-library/gamelab/0bTmuiCJ4u8A.tUQDW_AVbbLa1iA5XdS/category_robots/robot_30.png","frameSize":{"x":288,"y":392},"frameCount":1,"looping":true,"frameDelay":2,"version":"0bTmuiCJ4u8A.tUQDW_AVbbLa1iA5XdS","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":288,"y":392},"rootRelativePath":"assets/api/v1/animation-library/gamelab/0bTmuiCJ4u8A.tUQDW_AVbbLa1iA5XdS/category_robots/robot_30.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var boundary1 = createSprite(195, 15, 430, 5); //top
var boundary2 = createSprite(15, 200, 5, 430); //left
var boundary3 = createSprite(195, 385, 430, 5);//bottom
var boundary4 = createSprite(385, 200, 5, 430);//right
var boundary5 = createSprite(195, 145, 430, 5);//middle top
var boundary6 = createSprite(195, 255, 430, 5);//middle bottom

boundary1.shapeColor = "white";
boundary2.shapeColor = "white";
boundary3.shapeColor = "white";
boundary4.shapeColor = "white";
boundary5.shapeColor = "white";
boundary6.shapeColor = "white";

var playerMallet = createSprite(200,55,50,10);
var compMallet = createSprite(200,320,50,10);
var goal1 = createSprite(200,25,100,20);
var goal2 = createSprite(200,350,100,20);
var striker = createSprite(200,200,10,10);
striker.setAnimation("soccer");
striker.scale = 0.09

playerMallet.setAnimation("robot1");
playerMallet.scale = 0.09
compMallet.setAnimation("robot2");
compMallet.scale = 0.09
goal1.shapeColor = "yellow";
goal2.shapeColor = "yellow";

var gameState = "serve";
var compScore = 0;
var playerScore = 0;

function draw() {
  background("green");
  createEdgeSprites();
  
   if(gameState === "serve"){
    textSize(15);
    fill("blue");
    text("PRESS SPACE TO SERVE", 130,180);
  }
  fill("yellow");
  textSize(25);
  text(compScore,15,215);
  
  fill("yellow");
   textSize(25);
  text(playerScore,15,190);

  
  createEdgeSprites();
  playerMallet.bounceOff(boundary2);
  playerMallet.bounceOff(boundary4);
  striker.bounceOff(boundary1);
  striker.bounceOff(boundary2);
  striker.bounceOff(boundary3);
  striker.bounceOff(boundary4);
  
  striker.bounceOff(playerMallet);
  striker.bounceOff(compMallet);
  compMallet.bounceOff(boundary2);
  compMallet.bounceOff(boundary4);
  compMallet.x = striker.x;
  compMallet.bounceOff(rightEdge);
  compMallet.bounceOff(leftEdge);
  if (keyDown("RIGHT_ARROW")) {
    playerMallet.x = playerMallet.x+10;
    
  }
  if(keyDown("LEFT_ARROW")){
    playerMallet.x = playerMallet.x-10;
  }
    if(keyDown("space") && gameState=== "serve"){
     serve();
     gameState = "play";
    }
    
    
    
  
  for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
    
  }
  
  if (striker.isTouching(goal1) || striker.isTouching(goal2)) {
  if(striker.isTouching(goal1)){
      compScore = compScore+1;
    }
    if(striker.isTouching(goal2)){
      playerScore = playerScore+1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if(compScore === 5 || playerScore === 5){
    gameState = "over";
    text("Game Over!!", 165, 160);
    text("Press R to Restart", 150, 180);
  }
  if (keyDown("r") && gameState === "over") {
    compScore = 0;
    playerScore = 0;
    gameState = "serve"; 
  }
  drawSprites();
  
}

function serve() {
  striker.velocityX = 6;
  striker.velocityY = -7;
}

function reset() {
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
