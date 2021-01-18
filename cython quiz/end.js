const username = document.querySelector('#username')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const saveScoreBtn = document.querySelector('#saveScoreBtn')

const MAX_HIGH_SCORES = 5

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const minHighScore = 0

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    //window.location = window.location.origin
    window.location.assign('./index.html')
}