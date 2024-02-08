//1) we have to access all our buttons in order to change
let buttons = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let newgame = document.querySelector("#newgamebtn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#mess");
let count = 0; //To Track Draw

//2)we need variables to play the game and also,decide which player's turn it is x or o(alternate turn)
let turnO = true; //palyer x , player o
//14)reset means alll the button should be enabled ; turn should not be alternated
const resetGame = () => {};
//3)we are storing  our winning patterns inside a 2D array
const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [2, 4, 6],
];
//15)now we will make our new game btn as well as restart btn
const resetgame = () => {
  turnO = true;
  enableButtons(); //calling the enable funct
  msgContainer.classList.add("hide"); //to add the hide class after game resets
};
//4)we will add eventlisteners to each of the buttons using loops so that we just have
//to write the code once
buttons.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("button was clicked!");
    if (turnO === true) {
      //playero turn if yes
      box.innerText = "O"; //inside box o will be written
      turnO = false; //and then it will be x's turn
    } else {
      box.innerText = "X"; //then inside box x will be written
      turnO = true; //and then it will be x's turn
    }
    //but till this it has a loophole :  5)To prevent clicking the same button multiple times,
    // disable the button after one use
    box.disabled = true;
    count++;
    //6)to check the winner we will create a function which will check after every click

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
//16)game draw f
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableButtons();
};

//14)
const disableButtons = () => {
  for (let button of buttons) {
    button.disabled = true;
  }
};
//15)we will create enableButton f so that when new game retarts we'll be able to click buttons
const enableButtons = () => {
  for (let button of buttons) {
    button.disabled = false;
    button.innerText = ""; //to clear the text content
  }
};

//13)
const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableButtons(); //when this func will run we won't be able to click on any button
};

//7)to check winner we have to check each winning pattern i.e if there is same element on the three
//positions then we have a winner and if not we will check on the next pattern. so we have to
//run a loop over winPatterns
const checkWinner = () => {
  for (let pattern of winpatterns) {
    //8)whenever we will click a box then checkWinner ke paas call jayegi aur checkWinner ek ek krke saare
    // patterns ko nikaalega
    //9)pattern array mei se hum indiviual index nikalengle
    let pos1val = buttons[pattern[0]].innerText; //this is my position 1(do we have 0 or x)
    let pos2val = buttons[pattern[1]].innerText; //position2( do we have 0 or x)
    let pos3val = buttons[pattern[2]].innerText; //position3(do we have 0 or x)
    //10)we have our position stored inside pos1,pos2,pos3 variables.
    //11)buttons waale array ke anddar is index mei jao aur innertext use karke we can print values inside button
    //12) we will use if condition to make sure if our positions are not empty and
    // the program does not declare winner and if our patterns are not emptu then only we will check
    //winpatterns
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        //winning condition
        console.log("winner!", pos1val); //winner and who is the winner
        //14)disable buttons after having one winner
        //13)to show the winner we will make a function
        showWinner(pos1val);
      }
    }
  }
};
newgame.addEventListener("click", resetgame); //our resetgame will be triggered if newgame tn is clicked
reset.addEventListener("click", resetgame); //same for reset button
