const gameInstructions = {
    slidingPuzzle: "Arrange the tiles by sliding them into the empty space to form the complete image. Use arrow keys or click on tiles adjacent to the empty space.",
    picturePuzzle: "Reassemble the scrambled pieces of the picture by dragging and dropping them into their correct positions.",
    minesweeper: "Click on squares to reveal them. Avoid mines! Numbers indicate how many neighboring squares contain mines.",
    tetriminoPuzzle: "Rotate and move the falling blocks to complete horizontal lines without gaps. Use arrow keys to control the blocks."
};

function startGame(gameKey) {
    const instructions = gameInstructions[gameKey];
    if (instructions) {
        showInstructions(instructions, () => {
            // Placeholder for game initialization logic
            alert(`Starting ${gameKey}...`);
        });
    } else {
        alert("Game not found.");
    }
}

function showInstructions(instructions, callback) {
    const modal = document.getElementById("gameInstructions");
    const instructionsText = document.getElementById("instructionsText");
    instructionsText.textContent = instructions;
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        callback();
    }, 3000);
}

function closeInstructions() {
    const modal = document.getElementById("gameInstructions");
    modal.style.display = "none";
}
