let clickSearch = document.getElementById("search-button");
let playerInput = document.getElementById("player-name");

clickSearch.addEventListener("click", () => {
    let playerName = playerInput.value;
    let url = `https://www.balldontlie.io/api/v1/players?search=${playerName}`;
    console.log(url)
    fetch(url)
        .then((response)=>response.json())
        .then((data) => {
            let id = data.data[0].id;
            console.log(data.data[0]);
            let finalUrl = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${id}`;
            fetch(finalUrl)
                .then((response)=>response.json())
                .then((stats) => {
                    output.innerHTML= `
                        <div class = "statistics">
                            <p class = "player-info"> ${data.data[0].first_name} ${data.data[0].last_name} | ${data.data[0].team.full_name} | Position: ${data.data[0].position}</p>
                            <div class = "main-stats">
                            <div class = "column"> 
                                <p>Games Played: ${stats.data[0].games_played}</p>
                                <p>Minutes: ${stats.data[0].min}</p>
                                <p>Points: ${stats.data[0].pts}</p>
                                <p>Assists: ${stats.data[0].ast}</p>
                            </div>
                            <div class = "column"> 
                                <p>Defensive Rebs: ${stats.data[0].dreb}</p>
                                <p>Turnovers: ${stats.data[0].turnover}</p>
                                <p>Steals: ${stats.data[0].stl}</p>
                                <p>Blocks: ${stats.data[0].blk}</p>
                            </div>
                            <div class = "column"> 
                                <p>Offensive Rebs: ${stats.data[0].oreb}</p>
                                <p>Field Goal: ${stats.data[0].fg_pct}</p>
                                <p>3 Point: ${stats.data[0].fg3_pct}</p>
                                <p>Free Throw: ${stats.data[0].ft_pct}</p>
                            </div>
                            </div>
                        </div>
                            `;
                    console.log(stats.data[0]);
                })
                .catch(() => {
                    if (playerName.length == 0){
                        output.innerHTML = `<h2>Please enter a name</h2>`;
                    } else{
                        output.innerHTML = `<h2>Please enter the full name of an NBA player name who played in 2021-2022</h2>`;
                    }
                })
    }  )
});

