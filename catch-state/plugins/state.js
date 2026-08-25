//
const animals = document.querySelectorAll(".imgs-box > img"),
  score = document.querySelector("#score"),
  time = document.querySelector("#time"),
  startBtn = document.querySelector(".info > button");
animals.forEach((node, i) => {
  node.addEventListener("click", () => getCount(i));
});
startBtn.addEventListener("click", startGame);
//
function createInitialState() {
  return {
    cells: Array(animals.length).fill("down"),
    timers: [],
    totalDuck: 30,
    planMs: 11000,
    isPlaying: false,
    score: 0,
    sec: 15,
  };
}
let state = createInitialState();
//
function startGame() {
  startBtn.disabled = true;
  state.timers.forEach(clearTimeout);
  state = createInitialState();
  state.isPlaying = true;
  render();
  const timeID = setInterval(() => {
    --state.sec;
    render();
    if (state.sec === 0) {
      endGame();
    }
  }, 1000);
  state.timers.push(timeID);
  for (let i = 0; i < state.totalDuck; i++) {
    const delay = Math.floor(Math.random() * 3) + 2;
    const showTimer = Math.floor(Math.random() * state.planMs);
    const t = setTimeout(() => {
      spawnDuck(delay, 0);
    }, showTimer);
    state.timers.push(t);
  }
}
//
function spawnDuck(delay, retryCount) {
  if (!state.isPlaying) return;
  if (retryCount >= 30) return;
  const freeSpaces = state.cells
    .map((s, i) => (s === "down" ? i : null))
    .filter((i) => i !== null);
  if (freeSpaces.length === 0) {
    const t = setTimeout(() => {
      spawnDuck(delay, retryCount + 1);
    }, 100);
    state.timers.push(t);
    return;
  }
  const spaceIndex = Math.floor(Math.random() * freeSpaces.length);
  toUpEvent(freeSpaces[spaceIndex], delay);
}
//
function render() {
  score.textContent = state.score;
  time.textContent = state.sec;
  animals.forEach((node, i) => {
    if (state.cells[i] === "down") {
      node.src = "./img/down.png";
    } else if (state.cells[i] === "up") {
      node.src = "./img/up.png";
    } else if (state.cells[i] === "catch") {
      node.src = "./img/catch.png";
    }
  });
}
//
function toUpEvent(spaceIndex, delay) {
  if (!state.isPlaying) return;
  state.cells[spaceIndex] = "up";
  render();
  const t = setTimeout(() => {
    state.cells[spaceIndex] = "down";
    render();
  }, delay * 1000);
  state.timers.push(t);
}
//
function getCount(i) {
  if (!state.isPlaying) return;
  if (state.cells[i] !== "up") return;
  state.cells[i] = "catch";
  state.score++;
  render();
  const t = setTimeout(() => {
    state.cells[i] = "down";
    render();
  }, 1000);
  state.timers.push(t);
}
//
function endGame() {
  state.isPlaying = false;
  state.timers.forEach(clearTimeout);
  startBtn.disabled = false;
}
//
//
//