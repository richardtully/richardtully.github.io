
let mode = 1 // show all paths or show pendulum
let scale = 4 //larger means more zoomed in 
var grav_slider
var damp_slider
// var mode_button

let height = 600 // height and width of the canvas
let width = 800
let mode_button = document.getElementById('change_mode')


mode_button.addEventListener('click', function(){
  change_mode()
})

function setup(){
  // mode_button = createButton('Change view')
  // mode_button.mousePressed(change_mode)
  var canvas = createCanvas(width, height);
  canvas.parent('pendulumgoeshere')
  
  background(150) 
  createP('Gravity')
  grav_slider = createSlider(0,20,10)
  createP('Dampening')
  damp_slider = createSlider(85,100,97)
}

function change_mode(){
  mode *= -1
  if(mode == 1){
    pendulum.points_list = []
  } else{
    pathDrawer.pendulum_list = []
    pathDrawer.create_pendulums()
  }
}


let pendulum = new Pendulum(100, 100, 10, 100, -1, Math.PI) // x, y, mass, len, gravity, theta
let graph = new Graph(width, height)
let pathDrawer = new PathDrawer(graph)



function mouseClicked(){
  if (mouseY<height && mouseY>0 && mouseX>0 && mouseX<width){
    pendulum.theta = (mouseX-width/2)/(scale*10)
    pendulum.velocity = (mouseY-height/2)/scale
  }
}

function draw(){

  background(120)
  fill(255)
  stroke(0)
  graph.show_axis()
  if (mode == 1){
    strokeWeight(0)
    fill(255, 255, 255, 150)
    textSize(20)
    text('Click anywhere on the graph',25,40)
    pendulum.accelerate((-1/10)*grav_slider.value(),(1/100)*damp_slider.value())
    pendulum.swing()
    pendulum.show()
    
    graph.show_location(pendulum)
    graph.showTrails(pendulum)

  } else{
    pathDrawer.draw_paths((-1/10)*grav_slider.value(),(1/100)*damp_slider.value())
  }

}