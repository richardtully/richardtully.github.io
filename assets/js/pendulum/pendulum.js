class Pendulum{
	constructor(xpivot, ypivot, mass, length, gravity, theta, velocity){
		this.mass = mass
		this.length = length
		this.gravity = gravity 
		this.theta = theta // angle the pendulum makes with the 6 O'clock hand
		this.velocity = velocity
		this.points_list =[] // all the points in the phase space. (angle,veloctiy) coordinates

		
		// the end of the pendulum that stays still (the pivot)
		this.xpivot = xpivot
		this.ypivot = ypivot

		// the end of the pendulum with the weight
		this.x = this.xpivot+this.length*Math.sin(this.theta)
		this.y = this.ypivot+this.length*Math.cos(this.theta)

		this.angular_velocity = this.velocity / this.length
		this.acc = this.gravity * Math.sin(this.theta)
		
	}
	show(){
		fill(0)
		stroke(0)
		strokeWeight(2)
		line(this.xpivot, this.ypivot, this.x, this.y)
		circle(this.x, this.y, 12)

	}
	swing(){
		this.theta += this.angular_velocity 

		this.x = this.xpivot+this.length * Math.sin(this.theta)
		this.y = this.ypivot+this.length * Math.cos(this.theta)
		this.points_list.push([this.theta,this.velocity])
	}

	accelerate(g,d){
		this.gravity = g
		this.acc = this.gravity * Math.sin(this.theta)
		this.velocity +=  this.acc
		this.velocity *= d
		this.angular_velocity = this.velocity / this.length
	}

}