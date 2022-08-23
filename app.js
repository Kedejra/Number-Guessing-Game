/*
GAME FUNCTION:
-Player must guess a number between a min and a max
-Player gets a certain amount of opportunities to guess
-Notify Player of remaining guesses
-Notify Player of the correct answer if they loose
-Let player choose to play again
*/

//Game values
let min=getMin(), 
    max=getMaxNum(min),
    winnerNum= getWinningNum(min,max),
    guessesLeft=3;

//UI ELEMENTS
    const UIgame= document.querySelector('#game'),
          UIminNum= document.querySelector('.min-num'),
          UImaxNum= document.querySelector('.max-num'),
          UIplayBtn=document.getElementById('play-btn'),
          UIentry= document.querySelector('#entry'),
          UImessage= document.querySelector('.message'),
          body = document.getElementById('body');

//Assign UI min and max
UIminNum.textContent=min;
UImaxNum.textContent=max;
console.log(winnerNum);
console.log(max);

//Play again Listener
//mousedown because it allows the play again to show and not just change upon click
UIgame.addEventListener('mousedown', function(e)
{
    if(e.target.classList.contains('play-again'))
    {
        window.location.reload();
    }
});
//Listen for guess/ play click
UIplayBtn.addEventListener('click',function(e)
{
   let guess= parseInt(UIentry.value);
    console.log(guess);
   //validating entry
   //is nan is a function that test if an input is not a number
   if(isNaN(guess) || guess < min || guess > max)
   {
    //back ticks cuz you have variable values in there
    setMessage(`Please enter a number ${min} and ${max}`, 'orange');
   }

   //Check for winning number ie winning case
   if(guess ===winnerNum)
   {
    gameOver(true,`YOU WON!  ${winnerNum} is the winning number`);
    // UIentry.disabled =true;
    // body.className = ' light-green lighten-3 ';
    // setMessage(`YOU WON!  ${winnerNum} is the winning number`,'green');
    // //  GAME OVER WON - PLAY AGAIN
}
   else
   {
     guessesLeft -=1;
     if(guessesLeft===0)
     {
        //Game Over Lost
        gameOver(false,`You Lost! Better Luck Next Time!  Correct Number was: ${winnerNum}`);
        //The code below was replaced by the code above. made it into a function
        // UIentry.disabled=true;
        // body.className = ' brown lighten-1';
        // setMessage(`You Lost! Better Luck Next Time!  Correct Number was: ${winnerNum}`,'orange');
     }
     else
     {
        //clear input
        UIentry.value="";

        setMessage(`${guess} is not correct! Try again! Guesses Left: ${guessesLeft}`,'orange');
     }
   }
    e.preventDefault();
});

//set message function
function setMessage(msg,colour)
{
    UImessage.style.color=colour;
    UImessage.textContent=msg;
}

//GAME OVER FUNCTION 
//WILL BE CALLED AT THE END OF EACH GAME WIN OR LOOSE FOR GAME OVER FEATURES

function gameOver(winCase,msg)
{
    let colour;
    let msgColour;
    //turnary operator
    winCase === true ? colour ='light-green lighten-3' : colour='brown lighten-1';
    winCase === true ? msgColour ='green' : msgColour='red';
    UIentry.disabled=true;
    UImessage.style.color=msgColour;
    body.className = colour;
    setMessage(msg);

    //PLAY AGAIN
    UIplayBtn.value = 'PLAY AGAIN';
    UIplayBtn.className+= 'play-again';

}

//Setting winning number 
function getWinningNum(min,max)
{
   return Math.floor(Math.random()*(max-min+1)+min);
}

//Setting min Number
function getMin()
{
    // let min=0;
     let max=6;
    // return Math.floor(Math.random() * (max - min + 1)+min);
    return Math.floor(Math.random() * max);
}
//setting the maximum number
function getMaxNum(min)
{
    let max=98;
    return Math.floor(Math.random() * (max - min)+(min+2));
}
