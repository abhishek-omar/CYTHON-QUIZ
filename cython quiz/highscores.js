const highScores = JSON.parse(localStorage.getItem("highScores")) || []

//JS file meant for highscore page.

const highScoresList = document.querySelector('#highScoresList')

const hg=0

// initially set highscore = 0

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")