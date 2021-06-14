// Game Constant & Variable
let direction={x:0, y:0 };

const foodSound=new Audio('Music/food.mp3');
const gameOverSound= new Audio('Music/gameover.mp3');
const moveSound = new Audio('Music/move.mp3');

let speed=5;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    { 
        x:13,
        y:15
    }
]
food ={x:8 , y: 7};
inputDir={x:0,y:0};
// GAme Function
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;

    gameEngine();
}

function isCollide(snake)
{
    //if snake touch itself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
        
    }
    // if touches the boundery
    // if(snake[0].x>=18 ||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0)
    // {
    //     return true;
    // }
}
function gameEngine()
{ 
    //part 1: updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again");
        snakeArr=[
            {
                x:13,
                y:15
            }
        ]
        score=0;
    }
    // This part is to make wall transmisable
    if(snakeArr[0].x>=18)
    {
        snakeArr[0].x=0;
    }
    else if(snakeArr[0].x<=0)
    {
        snakeArr[0].x=18;
    }
    if(snakeArr[0].y>=18)
    {
        snakeArr[0].y=0;
    }
    else if(snakeArr[0].y<=0)
    {
        snakeArr[0].y=18;
    }

    // if you have eaten the food ,increament the score & regenerate the food
    if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y)
    {
        foodSound.play();
        score+=10;
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //Moving The Snake
    for (let i = snakeArr.length-2; i>=0 ;i--) {
        const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
     
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //part 2: display the snake & food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            
            snakeElement.classList.add('head');
        }
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

} 






// Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    
    moveSound.play();

    switch(e.key)
    {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})

