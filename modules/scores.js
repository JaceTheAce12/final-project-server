function generateRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomDate = () => {
    const year = 2024;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month}-${day}`;
}

function generateGolfScores(rounds, holes, playerName, courseIds) {
    const scores = [];
    const date = generateRandomDate(); 

    for (let i = 0; i < rounds; i++) {
        const roundScores = {};
        let totalScore = 0;

        for (let j = 0; j < holes; j++) {
            const score = generateRandomScore(1, 10);
            roundScores[j] = score.toString();
            totalScore += score;
        }

        const courseId = courseIds[Math.floor(Math.random() * courseIds.length)];

        scores.push({
            date: date,
            playerName: playerName,
            round: i + 1,
            roundScores: roundScores,
            totalScore: totalScore,
            courseId: courseId 
        });
    }

    return scores;
}

const courseIds = [1, 2, 3, 4];

const golfScores = generateGolfScores(10, 18, "Jace Randolph", courseIds);
console.log(golfScores);

const rounds = golfScores;

module.exports = rounds;