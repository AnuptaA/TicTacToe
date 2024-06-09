/* define HTML elements as variables */
const restart = document.getElementsByClassName("restart-btn-cnt")[0];
const reset = document.getElementsByClassName("reset-btn-cnt")[0];
const spaces = document.getElementsByClassName("space");
const p1_score = document.getElementsByClassName("p1-score")[0];
const p2_score = document.getElementsByClassName("p2-score")[0];
const turn = document.getElementsByClassName("turn")[0];

/* define JavaScript variables */
var p1_ctr = 0;
var p2_ctr = 0;
var currChar = "X";
var roundEnd = false;
var gridChars = [];

/* define functions */
function addTile(event) {
  if (!roundEnd) {
    var element = event.currentTarget;
    var p = element.querySelector("p");
    if (p.textContent === "") {
      p.textContent = currChar;
      currChar = currChar === "X" ? "O" : "X";
      turn.textContent = `Player ${
        currChar === "X" ? "1 (X)" : "2 (O)"
      }'s Turn`;
    }
    checkEnd();
  }
}

function checkEnd() {
  if (!checkRows() && !checkColumns() && !checkDiagonals()) {
    checkTie();
  }
  p1_score.textContent = p1_ctr;
  p2_score.textContent = p2_ctr;
}

function checkRows() {
  if (checkIndices(0, 1, 2) || checkIndices(3, 4, 5) || checkIndices(6, 7, 8)) {
    return true;
  }
  return false;
}

function checkColumns() {
  if (checkIndices(0, 3, 6) || checkIndices(1, 4, 7) || checkIndices(2, 5, 8)) {
    return true;
  }
  return false;
}

function checkDiagonals() {
  if (checkIndices(0, 4, 8) || checkIndices(2, 4, 6)) return true;
  return false;
}

function checkTie() {
  if (isTie()) {
    turn.textContent = `This round has ended in a tie.`;
    restart.querySelector("button").textContent = "Next Round";
  }
}

function isTie() {
  for (var i = 0; i < gridChars.length; i++) {
    if (gridChars[i].textContent === "") return false;
  }
  return true;
}

function checkIndices(x, y, z) {
  if (gridChars[x].textContent === "X" || gridChars[x].textContent === "O") {
    if (
      gridChars[x].textContent === gridChars[y].textContent &&
      gridChars[y].textContent === gridChars[z].textContent
    ) {
      if (gridChars[x].textContent === "X") {
        p1_ctr++;
        turn.textContent = `Player 1 Wins!`;
      } else {
        p2_ctr++;
        turn.textContent = `Player 2 Wins!`;
      }
      roundEnd = true;
      restart.querySelector("button").textContent = "Next Round";
      return true;
    }
    return false;
  }
}

function restartRound() {
  currChar = "X";
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].querySelector("p").textContent = "";
    turn.textContent = "Player 1 (X)'s Turn";
  }
  roundEnd = false;
  restart.querySelector("button").textContent = "Restart Round";
}

function resetGame() {
  p1_ctr = 0;
  p2_ctr = 0;
  p1_score.textContent = p1_ctr;
  p2_score.textContent = p2_ctr;
  restartRound();
}

/* apply functions to buttons */
for (var i = 0; i < spaces.length; i++) {
  gridChars.push(spaces[i].querySelector("p"));
}

for (var i = 0; i < spaces.length; i++) {
  spaces[i].addEventListener("click", addTile);
}
restart.addEventListener("click", restartRound);
reset.addEventListener("click", resetGame);
