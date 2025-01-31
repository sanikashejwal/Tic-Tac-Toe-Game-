let boxes=document.querySelectorAll(".box");
let resetBtn =document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#New-btn");
let msgContainer=document.querySelector(".msg-container");
let msg =document.querySelector("#msg");
let currentTurnDisplay = document.querySelector("#current-turn");
let turnO=true;//playerX,playerO
const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];
let filledCount = 0; 
const updateCurrentTurnDisplay = () => {
    currentTurnDisplay.innerText = `Current Turn: ${turnO ? "O" : "X"}`;
};

boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
     if(turnO){
        box.innerText="O";
        turnO=false;
     }else{
        box.innerText="X";
        turnO=true;
     }
     box.disabled=true;
     filledCount++;
     checkWinner();
     updateCurrentTurnDisplay();
    });
});
const disableBoxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const enableBoxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    filledCount = 0;
    turnO = true; // Reset turn to O at the start of a new game
    updateCurrentTurnDisplay();
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const resetgame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const checkWinner=()=>{
    for(pattern of winPatterns){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;
        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val === pos2Val  && pos2Val=== pos3Val ){
                console.log("winner",pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
if (filledCount === boxes.length) {
    showDraw();
}
};

newGameBtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);
updateCurrentTurnDisplay();