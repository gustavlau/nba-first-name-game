let playerGen = document.querySelector('.player-gen');
let playerGenPicture = document.querySelector('.player-gen-picture');



async function getPlayerHeight(){
    // event.preventDefault(); 
    // const name = document.querySelector('input[name="name"]').value;
    while(playerGenPicture.firstChild){ 
        playerGenPicture.removeChild(playerGenPicture.firstChild);               
    }
    const response = await fetch ("https://data.nba.net/data/10s/prod/v1/2020/players.json");
    const data = await response.json();
    console.log(data.league.standard);
    let randomPlayer=data.league.standard[Math.floor(Math.random()*data.league.standard.length)];
    console.log(randomPlayer);
    let playerId=randomPlayer.personId
    console.log(playerId);
    const image = document.createElement('img');
    const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`
    image.setAttribute('src', url);
    playerGenPicture.appendChild(image)
    playerGen.innerText= randomPlayer.lastName;

}

let  generateButton = document.getElementById('generate-player').addEventListener('click', getPlayerHeight)