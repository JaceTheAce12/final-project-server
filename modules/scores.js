function generateRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGolfScores(rounds, holes) {
    const scores = [];
    for (let i = 0; i < rounds; i++) {
        const roundScores = [];
        for (let j = 0; j < holes; j++) {
            roundScores.push({ hole: j + 1, score: generateRandomScore(1, 10) });
        }
        scores.push({ round: i + 1, scores: roundScores });
    }
    return scores;
}

const golfScores = generateGolfScores(4, 18);
console.log(golfScores);

module.exports = golfScores;