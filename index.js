const canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})


function Circle(x, y, dx, dy, radius, color) {
    
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy

    this.color = color  
    
    this.radius = radius
    

    this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()
    }    

    //Unused, is suppusoed to correctly return the distance between two nodes taking wrapping into account
   this.getDistance = function (circle) {
        let xDiff = Math.abs(this.x - circle.x)
        let yDiff = Math.abs(this.y - circle.y)
        if(xDiff > window.innerWidth / 2)
        {                       
            xDiff = window.innerWidth - xDiff
        }

        if(yDiff > window.innerHeight / 2)
        {
            yDiff = window.innerHeight - yDiff
        }
        
        return Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2))          
    }

    //Unused, had some issues with this due to the y axis being flipped (I think)
    this.getAngle = function(circle) {
        let xDiff = Math.abs(this.x - circle.x)
        let yDiff = Math.abs(this.y - circle.y)       
        
    
        if(xDiff > window.innerWidth / 2)
        {                       
            xDiff *= -1
        }

        if(yDiff > window.innerHeight / 2)
        {
            yDiff *= -1
        }
        

        return Math.atan2(yDiff, xDiff)

    }

    //Unused, edges werent always detected
    this.edgeDetection = function (circle) {
        return this.getDistance(circle) < this.radius * 2                       
    }   
    

    this.update = function () {      
        
        this.x = (this.x + this.dx) % window.innerWidth
        this.y = (this.y + this.dy) % window.innerHeight
        if(this.x < 0)        
            this.x = window.innerWidth;        

        if(this.y < 0)        
            this.y = window.innerHeight;      
                       
        let sp = 0.01

        for (var i = 0; i < circles.length; i++) 
        { 
            if(this != circles[i])
            {                             
                ctx.beginPath();
                ctx.strokeStyle = Math.random() > .5 ? this.color : circles[i].color
                ctx.lineWidth = 10
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(circles[i].x, circles[i].y)
                ctx.stroke()                  
                      
            }                                   
                     
        }                        
        
        this.draw()                           
    }
}



const randomColorVal = () => {   
    
    switch(Math.floor(Math.random() * 8)) {
        case 0:
            return 'crimson'            
        case 1:
            return 'orangered'   
        case 2:
            return 'yellow'   
        case 3:
            return 'lime'
        case 4:
            return 'cyan'              
        case 5:
            return 'blue'               
        case 6:
            return 'blueviolet'  
        case 7:
            return 'magenta'             
                  
    }

}

const speedConstant = 10
const numCircles = 6

const randomX = () => parseInt(Math.random() * window.innerWidth)
const randomY = () => parseInt(Math.random() * window.innerHeight)
const randomVelocity = () => parseInt((Math.random() * speedConstant + 1) * (Math.random() > .5 ? 1 : -1))

const circles = new Array(numCircles).fill(undefined).map(_ => new Circle(randomX(), randomY(), randomVelocity(), randomVelocity(), 30, 
randomColorVal()))


const gravitationalConstant = 0.5;

//Directional gravity
document.addEventListener('keydown', function(event) {

    if(event.key == 'ArrowLeft')
        circles.forEach(cir => cir.dx -= gravitationalConstant)  
    
    if(event.key == 'ArrowRight')  
        circles.forEach(cir => cir.dx += gravitationalConstant)
    

    if(event.key == 'ArrowUp')          
        circles.forEach(cir => cir.dy -= gravitationalConstant)
    

    if(event.key == 'ArrowDown')
        circles.forEach(cir => cir.dy += gravitationalConstant)
        
})

const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight) 

    ctx.fillStyle = 'black'   
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)    
    
    circles.forEach(cir => cir.update())    

}

animate()
