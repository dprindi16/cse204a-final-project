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
                            <p class = "player-info"> ${data.data[0].first_name} ${data.data[0].last_name} • ${data.data[0].team.full_name} • Position: ${data.data[0].position}</p>
                            <div class = "row-one"> 
                                <p>Games Played: ${stats.data[0].games_played}</p>
                                <p>Minutes: ${stats.data[0].min}</p>
                                <p>Points: ${stats.data[0].pts}</p>
                            </div>
                            <div class = "row-two"> 
                                <p>Assists: ${stats.data[0].ast}</p>
                                <p>Defensive Rebounds: ${stats.data[0].dreb}</p>
                                <p>Offensive Rebounds: ${stats.data[0].oreb}</p>
                            </div>
                            <div class = "row-three"> 
                                <p>Steals: ${stats.data[0].stl}</p>
                                <p>Blocks: ${stats.data[0].blk}</p>
                                <p>Turnovers: ${stats.data[0].turnover}</p>
                            </div>
                            <div class = "row-four"> 
                                <p>Field Goal %: ${stats.data[0].fg_pct}</p>
                                <p>3 Point %: ${stats.data[0].fg3_pct}</p>
                                <p>Free Throw %: ${stats.data[0].ft_pct}</p>
                            </div>
                        </div>
                            `;
                    console.log(stats.data[0]);
                })
    }  )
});

