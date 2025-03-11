const blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//food
var foodX;
var foodY;

//velocity
velocityX = 0;
velocityY = 0;

let score = 0;
//snake body
var snakeBody=[];

var gameOver =false;
let foodColor ="red";

let resetbtn = document.querySelector(".reset-btn");

window.onload = function(){
    board = document.getElementById("canvas");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    
    randomFood();
    document.addEventListener("keyup", directionSnake);
    setInterval(update, 1000/10);
}

function update(){
    
    if(gameOver){
        return;
    }

    drawGridBackground();

    // // context.fillStyle="white";
    // context.fillRect(0, 0, board.height, board.width);

     // Draw glowing food
     context.shadowColor = foodColor;
     context.shadowBlur = 15;
     context.fillStyle = foodColor;
     context.fillRect(foodX, foodY, blocksize, blocksize);
     context.shadowBlur = 0;

    

    if(foodX == snakeX && foodY == snakeY){
       snakeBody.push([foodX, foodY]);

       randomFood();
       score++; // Update score
       document.querySelector(".Score").innerText = score; // Updating score on UI
    }

    // we are just setting the pointer here
    for(let j=snakeBody.length-1; j>0; j--){
        snakeBody[j] = snakeBody[j-1];
    }

    //now 
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle= "white";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    
    for(let i=0;i<snakeBody.length;i++ ){
        context.fillStyle = "#F5F5F5"; 
        // context.fillStyle = i === 0 ? "#34eb4f" : "#55ff6a"; // Head is darker green
        // context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
        // context.strokeStyle = "#1a1a1a";
        // context.strokeRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }
   
     // Draw glowing snake head
     context.shadowColor = "white";
     context.shadowBlur = 7;
     context.fillStyle = "white";
     context.fillRect(snakeX, snakeY, blocksize, blocksize);
     context.shadowBlur = 0;

    //if snake is hitting boundries
    if(snakeX < 0  || snakeY < 0 || snakeX > cols* blocksize || snakeY > rows * blocksize){
        gameOver = true;
        gameOverScreen();
    }

    //snake hitting itself
    for(let k=0;k<snakeBody.length;k++){
        if(snakeX==snakeBody[k][0] && snakeY == snakeBody[k][1]){
            gameOver=true;
            gameOverScreen();
        }

    }




}


// but now the food should be anywhere randomly
function randomFood(){

    var idx = Math.floor(Math.random() * rows);
    var idy = Math.floor(Math.random() * cols);
    
    foodX = blocksize * idx;
    foodY = blocksize * idy;

    foodColor = getRandomColor();

}
function getRandomColor() {
    const colors = ["red", "blue", "purple", "yellow", "orange", "pink", "cyan", "lime", "magenta"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function directionSnake(e){

    if(e.code == "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1; 
    }
    else if(e.code == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1; 
    }
    else if(e.code == "ArrowLeft" && velocityX!=1){
        velocityX = -1;
        velocityY = 0; 
    }
    else if(e.code == "ArrowRight" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0; 
    }

}

function drawGridBackground() {
    context.fillStyle = "#181825"; // Dark background
    context.fillRect(0, 0, board.width, board.height);

    context.strokeStyle = "#222"; // Grid lines
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            context.strokeRect(i * blocksize, j * blocksize, blocksize, blocksize);
        }
    }
}

function gameOverScreen() {
   
    gameOver = true;
    context.fillStyle = "rgba(48, 39, 78, 0.34)";
    context.fillRect(0, 0, board.width, board.height);
    context.fillStyle = "#f1c40f";
    context.font = "40px Arial";
    context.fillText("Game Over", board.width / 4, board.height / 2);
}



resetbtn.addEventListener("click", ()=>{
        // score=0;
        // document.querySelector(".Score").innerText = score; 
        
        gameOver = false;
        score = 0;
        snakeX = blocksize * 5;
        snakeY = blocksize * 5;
        velocityX = 0;
        velocityY = 0;
        snakeBody = [];
    
        document.querySelector(".Score").innerText = score;
    
        randomFood(); // Generate new food location
        update(); // Restart game
        

})
