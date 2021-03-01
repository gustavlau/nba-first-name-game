let playerGen = document.querySelector('.player-gen');
let playerGenPicture = document.querySelector('.player-gen-picture');
let correctPlayerName = "";
let choice1 = document.getElementById('choice-1');
let choice2 = document.getElementById('choice-2');
let choice3 = document.getElementById('choice-3');
let choice4 = document.getElementById('choice-4');

async function generatePlayer(){
    // event.preventDefault(); 
    // const name = document.querySelector('input[name="name"]').value;
    while(playerGenPicture.firstChild){ 
        playerGenPicture.removeChild(playerGenPicture.firstChild);               
    }
    const response = await fetch ("https://data.nba.net/data/10s/prod/v1/2020/players.json");
    const data = await response.json();
    let fullPlayerArr=data.league.standard    
    shufflePlayersArr(fullPlayerArr);
    console.log(shufflePlayersArr(fullPlayerArr));
    let fourChoice = [fullPlayerArr[0],fullPlayerArr[1], fullPlayerArr[2], fullPlayerArr[3]];
    console.log(fourChoice);

    choice1.innerText = fourChoice[0].firstName;
    choice2.innerText = fourChoice[1].firstName;
    choice3.innerText = fourChoice[2].firstName;
    choice4.innerText = fourChoice[3].firstName;
    let randomPlayer=fourChoice[Math.floor(Math.random()*fourChoice.length)];
    console.log(randomPlayer);    
    let playerId=randomPlayer.personId
    // console.log(playerId);
    const image = document.createElement('img');
    const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
    image.setAttribute('src', url);
    playerGenPicture.appendChild(image)
    playerGen.innerText= randomPlayer.lastName;
    correctPlayerName= randomPlayer.firstName;
    return correctPlayerName;
}

function shufflePlayersArr(arr){
    let j, x, index;
    for (index = arr.length -1; index >0; index--){
        j = Math.floor(Math.random()*(index+1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j]=x;
    }
    return arr;
}

function correctPlayer(player, selection){
    if (player === selection){
        console.log("Correct!");
        generatePlayer();
    }
}

let  generateButton = document.getElementById('generate-player').addEventListener('click', generatePlayer)