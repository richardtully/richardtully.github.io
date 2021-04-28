class Graph{
	constructor(width, height){
		this.h = height
		this.w = width
		this.x = 0
		this.y = 0
		this.point = []
	}

	show_axis(){
		strokeWeight(1)
		stroke(30)
		// axis
		line(width/2, 0, width/2, height)
		line(0, height/2, width, height/2)
	}

	show_location(pendulum){
		this.point = [this.w/2 + scale * 10 * pendulum.theta, this.h/2 + (scale * pendulum.velocity)]
		circle(this.point[0], this.point[1],5)
	}

	showTrails(pendulum){
		strokeWeight(0.6);
		stroke(255)

		if (pendulum.points_list.length > 2000 && mode == 1){ // clean canvas after a while (when in pendulum mode)
			pendulum.points_list = [[0,0]]
		}

		for(let i = 0; i < (pendulum.points_list.length-1); i++){

			let x1 = pendulum.points_list[i][0] * scale*10 + this.w/2
			let y1 = pendulum.points_list[i][1] * scale + this.h/2
			let x2 = pendulum.points_list[i+1][0] * scale*10 + this.w/2
			let y2 = pendulum.points_list[i+1][1] * scale + this.h/2
			if (dist(x1,y1,x2,y2) < 50){
				// The path is red when the pendulum is at high velocity
				stroke(Math.abs(y1-height/2),255-(Math.abs(y1-height/2))/2,50) 
				line(x1,y1,x2,y2)
			}		
		}
	}
}