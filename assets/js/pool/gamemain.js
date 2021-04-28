let game = 0
let balls = [];
let strikes = [];
let barrierthickness = 30
pocketsize = 90 // this is not the actual size in pixels



ballradius = 20

let temp = 0



function setup() {
  var canvas = createCanvas(1000, 600);
  canvas.parent('poolgamegoeshere')
  
  background(200);

  let xstart = 0.6*width // x value of the starting position of the first ball in the triangle

  let startingcoordinates = [[xstart,height/2]]
  startingcoordinates.push([1+xstart+(3**0.5)*ballradius, height/2 - ballradius])
  startingcoordinates.push([1+xstart+(3**0.5)*ballradius, height/2 + ballradius])
  startingcoordinates.push([2+xstart+2*(3**0.5)*ballradius, height/2 - 2*ballradius])
  startingcoordinates.push([2+xstart+2*(3**0.5)*ballradius, height/2])
  startingcoordinates.push([2+xstart+2*(3**0.5)*ballradius, height/2 + 2*ballradius])
  startingcoordinates.push([3+xstart+3*(3**0.5)*ballradius, height/2 + 3*ballradius])
  startingcoordinates.push([3+xstart+3*(3**0.5)*ballradius, height/2 + ballradius])
  startingcoordinates.push([3+xstart+3*(3**0.5)*ballradius, height/2 - ballradius])
  startingcoordinates.push([3+xstart+3*(3**0.5)*ballradius, height/2 - 3*ballradius])





  let playerball = new Ball2(ballradius,300,height/2,0,0,ballradius**3)
  playerball.playerball = 1
  playerball.changeColour()
  balls.push(playerball)
  console.log(playerball)

  for(let i=0;i<startingcoordinates.length;i++){
    print('here we go')
    balls[i+1] = new Ball2(ballradius, startingcoordinates[i][0],startingcoordinates[i][1] ,0,0,ballradius**3)
  }

  // top left
  balls.push(new Ball2(barrierthickness, 0, pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, pocketsize, 0,0,0,9999999999999999))

  // top right
  balls.push(new Ball2(barrierthickness, width, pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, width-pocketsize, 0,0,0,9999999999999999))

  // bottom left
  balls.push(new Ball2(barrierthickness, 0, height-pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, pocketsize, height,0,0,9999999999999999))

  // bottom right
  balls.push(new Ball2(barrierthickness, width, height-pocketsize,0,0,9999999999999999))
  balls.push(new Ball2(barrierthickness, width-pocketsize, height,0,0,9999999999999999))
}



let selected = false

function mousePressed(){
  game = 1
  let x = mouseX
  let y = mouseY
  if(dist(balls[0].x, balls[0].y, x, y) < balls[0].r){ //&& temp == 0){
    selected = balls[0]
    return
  }else{
    selected = false
  }
}

function drawBarriers(){
  strokeWeight(0)
  fill(69,157,114)

  topbarrier = rect(pocketsize, 0, width - 2*pocketsize, barrierthickness)
  bottomtopbarrier = rect(pocketsize, height-barrierthickness, width - 2*pocketsize, barrierthickness)

  leftbarrier = rect(0, pocketsize, barrierthickness, height - 2*pocketsize)
  rightbarrier = rect(width-barrierthickness, pocketsize, barrierthickness, height - 2*pocketsize)
}
  
function draw() {
  strokeWeight(0)
  stroke(0)
  background(215,206,178);
  temp = 0
  activeballs = []

  for (i = 0; i< balls.length; i++){
    if(balls[i].potted == 0){
      activeballs.push(balls[i])
    }
  }

  for(i=0;i<(activeballs.length-1);i++){
    for(j=i+1;j<activeballs.length;j++){
      detectCollision(activeballs[i],activeballs[j])
    }
  } 

  for(i=activeballs.length-1;i>=0;i--){
    
    activeballs[i].move()
    activeballs[i].show()
    activeballs[i].checkifpotted()

    temp += ((activeballs[i].xspeed)**2 + (activeballs[i].yspeed)**2)**0.5
  }

  drawBarriers()

  for(i=0;i<strikes.length;i++){
    strikes[i].show()
  }

  temp /= balls.length

  if(game == 0){
    textSize(40)
    text('Click and drag the blue ball',100,100)
  }
  
}

function mouseDragged(){
  if(selected != false){
    strike1 = new Strike(selected.x, selected.y, mouseX, mouseY)
    strikes[0] = strike1
  }
}
function mouseReleased(){
  if(selected != false){
    strike1.shoot(selected)
    strikes = []
  }
}

// Sound effects:

var ballSoundLoud = new Howl({
  src: ['assets/sounds/click1.mp3'],
  volume: 0.8
});
var ballSoundQuiet = new Howl({
  src: ['assets/sounds/click1.mp3'],
  volume: 0.2
});

var edgeSoundLoud = new Howl({
  src: ['assets/sounds/woodimpact.mp3'],
  volume: 0.8
});

var edgeSoundQuiet = new Howl({
  src: ['assets/sounds/woodimpact.mp3'],
  volume: 0.1
});

var potSound = new Howl({
  src: ['assets/sounds/rock.mp3'],
});