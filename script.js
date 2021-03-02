let playerGen = document.querySelector('.player-gen');
let playerGenPicture = document.querySelector('.player-gen-picture');
let playerGenDesc = document.querySelector('.player-gen-desc');
let correctPlayerName = "";
let choice1 = document.getElementById('choice-1');
let choice2 = document.getElementById('choice-2');
let choice3 = document.getElementById('choice-3');
let choice4 = document.getElementById('choice-4');
let switchName = document.getElementById('switch-name');
let switchImg = document.getElementById('switch-img');
let switchDesc = document.getElementById('switch-desc');
let test = true;

async function generatePlayer(){
    while(playerGenPicture.firstChild){ 
        playerGenPicture.removeChild(playerGenPicture.firstChild);               
    }
    const response = await fetch ("https://data.nba.net/data/10s/prod/v1/2020/players.json");
    const data = await response.json();
    
    let fullPlayerArr=data.league.standard
    for(i=0; i<fullPlayerArr.length; i++){
        if(fullPlayerArr[i].isActive===false){
            delete fullPlayerArr[i];
        }
    }
    let filteredArr = fullPlayerArr.filter(Boolean);
    console.log(filteredArr);
    
    shufflePlayersArr(filteredArr);
    let fourChoices = [filteredArr[0],filteredArr[1], filteredArr[2], filteredArr[3]];
    // console.log(fourChoices);

    choice1.innerText = fourChoices[0].firstName;
    choice2.innerText = fourChoices[1].firstName;
    choice3.innerText = fourChoices[2].firstName;
    choice4.innerText = fourChoices[3].firstName;

    let randomPlayer=fourChoices[Math.floor(Math.random()*fourChoices.length)];
    // console.log(fourChoices.indexOf(randomPlayer));
    let playerId=randomPlayer.personId
    const image = document.createElement('img');
    const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
    image.setAttribute('src', url);
    playerGenPicture.appendChild(image);
    let convertTeamId = parseInt(randomPlayer.teamId); //converts json teamId into integer to feed into function switcher which takes an int argument
    // switcher(convertTeamId);
    playerGen.innerText= randomPlayer.lastName;
    playerGenDesc.innerText = "This player is a " + randomPlayer.heightFeet +"'"+ randomPlayer.heightInches+"\"\ "+randomPlayer.weightPounds+"lbs "+ randomPlayer.teamSitesOnly.posFull+" on the "+ switcher(convertTeamId);  
    correctPlayerName= randomPlayer.firstName;
    console.log(correctPlayerName);
}

switchName.addEventListener('change', switchNameTog);
switchImg.addEventListener('change', switchImgTog);
switchDesc.addEventListener('change', switchDescTog);

function switchNameTog (){
    if(switchName.checked){
        playerGen.style.display="block";
        playerGenDesc.style.display="none";
    } else {
        playerGen.style.display="none";
    }
}

function switchImgTog (){
    if(switchImg.checked){
        playerGenPicture.style.display="block";
        playerGenDesc.style.display="none";
    } else {
        playerGenPicture.style.display="none";
    }
}

function switchDescTog(){
    if(switchDesc.checked){
        // playerGenPicture.style.display="none";
        // playerGen.style.display="none";
        playerGenDesc.style.display="block";
    }

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

function fillTeamId(team){
    
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
         clickedPlayer.style.color="white";
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
        clickedPlayer.style.color="white";
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


//function converts the teamId data in the jason file into a usable "teamName" string
function switcher(jsonTeamId){
    let team = [{
        "teamId": 1610612737,
        "teamName": "Atlanta Hawks",
    },
    {
        "teamId": 1610612738,
        "teamName": "Boston Celtics",
    },
    {
        "teamId": 1610612751,
        "teamName": "Brooklyn Nets",
    },
    {
        "teamId": 1610612766,
        "teamName": "Charlotte Hornets",
    },
    {
        "teamId": 1610612741,
        "teamName": "Chicago Bulls",
    },
    {
        "teamId": 1610612739,
        "teamName": "Cleveland Cavaliers",
    },
    {
        "teamId": 1610612742,
        "teamName": "Dallas Mavericks",
    },
    {
        "teamId": 1610612743,
        "teamName": "Denver Nuggets",
    },
    {
        "teamId": 1610612765,
        "teamName": "Detroit Pistons",
    },
    {
        "teamId": 1610612744,
        "teamName": "Golden State Warriors",
    },
    {
        "teamId": 1610612745,
        "teamName": "Houston Rockets",
    },
    {
        "teamId": 1610612754,
        "teamName": "Indiana Pacers",
    },
    {
        "teamId": 1610612746,
        "teamName": "Los Angeles Clippers",
    },
    {
        "teamId": 1610612747,
        "teamName": "Los Angeles Lakers",
    },
    {
        "teamId": 1610612763,
        "teamName": "Memphis Grizzlies",
    },
    {
        "teamId": 1610612748,
        "teamName": "Miami Heat",
    },
    {
        "teamId": 1610612749,
        "teamName": "Milwaukee Bucks",
    },
    {
        "teamId": 1610612750,
        "teamName": "Minnesota Timberwolves",
    },
    {
        "teamId": 1610612740,
        "teamName": "New Orleans Pelicans",
    },
    {
        "teamId": 1610612752,
        "teamName": "New York Knicks",
    },
    {
        "teamId": 1610612760,
        "teamName": "Oklahoma City Thunder",
    },
    {
        "teamId": 1610612753,
        "teamName": "Orlando Magic",
    },
    {
        "teamId": 1610612755,
        "teamName": "Philadelphia 76ers",
    },
    {
        "teamId": 1610612756,
        "teamName": "Phoenix Suns",
    },
    {
        "teamId": 1610612757,
        "teamName": "Portland Trail Blazers",
    },
    {
        "teamId": 1610612758,
        "teamName": "Sacramento Kings",
    },
    {
        "teamId": 1610612759,
        "teamName": "San Antonio Spurs",
    },
    {
        "teamId": 1610612761,
        "teamName": "Toronto Raptors",
    },
    {
        "teamId": 1610612762,
        "teamName": "Utah Jazz",
    },
    {
        "teamId": 1610612764,
        "teamName": "Washington Wizards",
    }];

    let dataMatch = team[team.map(function(item){return item.teamId;}).indexOf(jsonTeamId)]
    return dataMatch.teamName;

}

