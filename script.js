let playerGen = document.querySelector('.player-gen');
let playerGenPicture = document.querySelector('.player-gen-picture');
let correctPlayerName = "";
let choice1 = document.getElementById('choice-1');
let choice2 = document.getElementById('choice-2');
let choice3 = document.getElementById('choice-3');
let choice4 = document.getElementById('choice-4');

async function generatePlayer(){
    while(playerGenPicture.firstChild){ 
        playerGenPicture.removeChild(playerGenPicture.firstChild);               
    }
    const response = await fetch ("https://data.nba.net/data/10s/prod/v1/2020/players.json");
    const data = await response.json();
    let fullPlayerArr=data.league.standard    
    shufflePlayersArr(fullPlayerArr);
    console.log(shufflePlayersArr(fullPlayerArr));
    let fourChoices = [fullPlayerArr[0],fullPlayerArr[1], fullPlayerArr[2], fullPlayerArr[3]];
    console.log(fourChoices);

    choice1.innerText = fourChoices[0].firstName;
    choice2.innerText = fourChoices[1].firstName;
    choice3.innerText = fourChoices[2].firstName;
    choice4.innerText = fourChoices[3].firstName;

    let randomPlayer=fourChoices[Math.floor(Math.random()*fourChoices.length)];
    // console.log(fourChoices.indexOf(randomPlayer));
    let playerId=randomPlayer.personId
    // console.log(playerId);
    const image = document.createElement('img');
    const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
    image.setAttribute('src', url);
    playerGenPicture.appendChild(image);
    playerGen.innerText= randomPlayer.lastName;
    correctPlayerName= randomPlayer.firstName;
    console.log(correctPlayerName);
}

function shufflePlayersArr(arr){
    let j, x, index;
    for (index = arr.length -1; index > 0; index--){
        j = Math.floor(Math.random()*(index+1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j]=x;
    }
    return arr;
}

generatePlayer();

choice1.addEventListener('click', multipleChoiceTarget);
choice2.addEventListener('click', multipleChoiceTarget);
choice3.addEventListener('click', multipleChoiceTarget);
choice4.addEventListener('click', multipleChoiceTarget);

let scoreTrackerCorrect = document.getElementById('score-correct');
let scoreCorrect = 0;

let scoreTrackerIncorrect = document.getElementById('score-incorrect');
let scoreIncorrect = 0;

let gamesPlayedTracker=document.getElementById('score-totals');
let gamesPlayed = 0;

function resetStyles(){
    choice1.style.cssText="";
    choice2.style.cssText="";
    choice3.style.cssText="";
    choice4.style.cssText="";
}

let timeCheck=false;
function multipleChoiceTarget(e){  
    
    let clickedPlayer = e.target;

    if(clickedPlayer.innerText === correctPlayerName && !timeCheck){  
        timeCheck = true;
         clickedPlayer.style.backgroundColor="green";
         setTimeout(function(){
            scoreCorrect++;
            scoreTrackerCorrect.innerHTML="Correct:"+scoreCorrect;
            gamesPlayed++;
            gamesPlayedTracker.innerHTML="Games Played:"+gamesPlayed;
            timeCheck = false;
            resetStyles();
            generatePlayer();
            
        }, 1000);
        

    } else if(!timeCheck) {
        clickedPlayer.style.backgroundColor="red";
        timeCheck = true;
        setTimeout(function(){
            scoreIncorrect++;
            scoreTrackerIncorrect.innerHTML="Incorrect:"+scoreIncorrect;
            gamesPlayed++;
            gamesPlayedTracker.innerHTML="Games Played:"+gamesPlayed;
            timeCheck = false;
            resetStyles();
            generatePlayer();
        },1000);

    }

}

