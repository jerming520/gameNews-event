//global
const startBtn = document.querySelector("button"),
  time = document.querySelector("#time"),
  score = document.querySelector("#score"),
  animals = document.querySelectorAll(".imgs-box > img");
//initial
startBtn.addEventListener("click", startGame, { one: true });
animals.forEach((node) => node.addEventListener("click", () => getCount(node)));
//function
function getCount(node) {
  // console.log("node.src=", node.src);
  if (node.src.includes("up")) {
    node.src = "./img/catch.png";
    setTimeout(() => (node.src = "./img/down.png"), 1000);
    score.textContent = Number(score.textContent) + 1;
    clearTimeout(node.toDownTimerID);
  }
}
//
function startGame() {
  startBtn.disabled = true;
  score.textContent = 0;
  let sec = 15,
    planMs = 13000,
    totalDuck = 30;
  time.textContent = sec;
  //
  const timeID = setInterval(() => {
    time.textContent = --sec;
    if (sec === 0) {
      clearInterval(timeID);
      startBtn.disabled = false;
      startBtn.addEventListener("click", startGame, { one: true });
    }
  }, 1000);
  //
  for (let i = 0; i < totalDuck; i++) {
    const space = Math.floor(Math.random() * 2);
    const delay = Math.floor(Math.random() * 3) + 2;
    const showTimer = Math.floor(Math.random() * planMs);
    setTimeout(() => toUpEvent({ space, delay }), showTimer);
  }
}
//
function toUpEvent({ space, delay }) {
  const targetSpace = animals[space];
  if (targetSpace.src.includes("down")) {
    targetSpace.src = "./img/up.png";
    targetSpace.toDownTimerID = setTimeout(
      () => (targetSpace.src = "./img/down.png"),
      delay * 1000,
    );
  } else {
    setTimeout(() => toUpEvent({ space: (space + 1) % 9, delay }), 100);
  }
}
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 