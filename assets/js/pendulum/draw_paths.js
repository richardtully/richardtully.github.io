class PathDrawer{ 
    // This class defines an object that creates a series of pendulums
    // with particular staring angles and velocities that give a rough
    // outline of the phase space or vector field of the pendulum

    constructor(graph){
        this.graph = graph
        this.pendulum_list = []
        this.tsa = [] // top starting angles
        this.bsa = [] // bot starting points coordinates list
    }

    create_pendulums(){

        let xgap = width/10
        let ygap = xgap/2       

        for (let i = 0; i<width; i+=xgap){
            this.pendulum_list.push(new Pendulum(1,1,1,100,-1,(i - width/2)/(scale*10),(0-height/2)/scale))
                 
        }
        for (let i = 0; i<width; i+=xgap){
                this.pendulum_list.push(new Pendulum(1,1,1,100,-1,(i-width/2)/(scale*10),(height-height/2)/scale))
                 
        }
        for (let i = height/2; i<height; i+=ygap){
                this.pendulum_list.push(new Pendulum(1,1,1,100,-1,(0-width/2)/(scale*10),(i-height/2)/scale))
                 
        }
        for (let i = 0; i<height/2; i+=ygap){
                this.pendulum_list.push(new Pendulum(1,1,1,100,-1,(width-width/2)/(scale*10),(i-height/2)/scale))
                 
        }
    }

    draw_paths(g,d){

        if (this.pendulum_list[1].points_list.length > 140){
            pathDrawer.pendulum_list = []
            pathDrawer.create_pendulums()
            pathDrawer.draw_paths((-1/10)*grav_slider.value(),(1/100)*damp_slider.value())
        }

        for (let i = 0; i<this.pendulum_list.length ; i++){

            if (Math.abs(this.pendulum_list[i].velocity) > 0.5 || Math.abs(this.pendulum_list[i].theta % Math.PI) > 0.1){
                this.pendulum_list[i].accelerate(g,d)
                this.pendulum_list[i].swing()
            }
            
            this.graph.showTrails(this.pendulum_list[i])
        }
    }
}