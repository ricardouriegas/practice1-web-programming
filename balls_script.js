const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Ball class to define properties of each ball
class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;  // Horizontal speed
        this.dy = dy;  // Vertical speed
        this.color = color;
    }

    // Method to draw the ball
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Update ball position and detect collision with canvas edges
    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;  // Reverse direction on X axis
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;  // Reverse direction on Y axis
        }

        this.x += this.dx;  // Update X position
        this.y += this.dy;  // Update Y position

        this.draw();
    }
}

// Function to generate random colors
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// Create an array to store multiple balls
let balls = [];
for (let i = 0; i < 50; i++) {  // Generate 50 balls
    const radius = Math.random() * 20 + 10;  // Random radius between 10 and 30
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 4;  // Random speed between -2 and 2 (X axis)
    const dy = (Math.random() - 0.5) * 4;  // Random speed between -2 and 2 (Y axis)
    const color = getRandomColor();  // Random color for each ball
    balls.push(new Ball(x, y, radius, dx, dy, color));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    balls.forEach(ball => ball.update());  // Update each ball's position

    requestAnimationFrame(animate);  // Continue the animation
}

// Start the animation
animate();