const screens = document.querySelectorAll(".screen");
const titleScreen = document.getElementById("title-screen");
const selectScreen = document.getElementById("select-screen");
const reviewScreen = document.getElementById("review-screen");

const gameList = document.querySelectorAll("#game-list li");
const gameTitle = document.getElementById("game-title");
const reviewDesc = document.getElementById("review-desc");
const statusList = document.getElementById("status-list");

const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const btnEnter = document.getElementById("btn-enter");
const btnBack = document.getElementById("btn-back");

let currentIndex = 0;

// === データ ===
const games = {
  "ドラクエⅢ": {
    desc: "壮大な冒険と感動のストーリー。世界を救う勇者たちの姿に心を打たれる。",
    stats: {
      "音楽 🎵": 9,
      "グラフィック 🎨": 8,
      "バトル ⚔️": 10,
      "ストーリー 💭": 9,
      "没入感 ❤️": 9
    }
  },
  "スマブラ": {
    desc: "任天堂オールスターが大乱闘！物理エンジンの完成度が高く、競技性も抜群。",
    stats: {
      "操作性 🎮": 10,
      "グラフィック 🎨": 9,
      "ステージ数 🏟️": 10,
      "熱中度 🔥": 9,
      "バランス ⚖️": 8
    }
  },
  "マリオ": {
    desc: "誰でも楽しめる2Dアクションの金字塔。ジャンプの気持ちよさと完成されたステージ。",
    stats: {
      "操作性 🎮": 9,
      "デザイン 🎨": 10,
      "難易度 ⚙️": 7,
      "リプレイ性 🔁": 9,
      "BGM 🎵": 10
    }
  }
};

// === 画面切り替え ===
function showScreen(target) {
  screens.forEach(s => s.classList.remove("active"));
  target.classList.add("active");
}

// === 選択更新 ===
function updateSelection() {
  gameList.forEach((li, i) => li.classList.toggle("selected", i === currentIndex));
}

// === レビュー表示 ===
function showReview(game) {
  showScreen(reviewScreen);
  const data = games[game];
  gameTitle.textContent = game;
  reviewDesc.textContent = data.desc;
  statusList.innerHTML = "";

  Object.entries(data.stats).forEach(([label, value]) => {
    const stat = document.createElement("div");
    stat.classList.add("status");
    stat.innerHTML = `
      <div class="status-label">${label}</div>
      <div class="status-bar"><div class="status-fill"></div></div>
      <div class="status-value">${value}/10</div>
    `;
    statusList.appendChild(stat);
    setTimeout(() => {
      stat.querySelector(".status-fill").style.width = `${value * 10}%`;
    }, 100);
  });
}

// === 操作共通 ===
function handleInput(direction) {
  if (selectScreen.classList.contains("active")) {
    if (direction === "up") {
      currentIndex = (currentIndex - 1 + gameList.length) % gameList.length;
      updateSelection();
    } else if (direction === "down") {
      currentIndex = (currentIndex + 1) % gameList.length;
      updateSelection();
    } else if (direction === "enter") {
      const selectedGame = gameList[currentIndex].textContent;
      showReview(selectedGame);
    }
  } else if (reviewScreen.classList.contains("active") && direction === "enter") {
    showScreen(selectScreen);
  }
}

// === PCキーボード ===
document.addEventListener("keydown", e => {
  if (titleScreen.classList.contains("active") && e.key === "Enter") {
    showScreen(selectScreen);
  } else if (e.key === "ArrowUp") handleInput("up");
  else if (e.key === "ArrowDown") handleInput("down");
  else if (e.key === "Enter") handleInput("enter");
});

// === スマホタップ ===
["touchstart", "click"].forEach(evt => {
  titleScreen.addEventListener(evt, () => showScreen(selectScreen));
  btnUp.addEventListener(evt, () => handleInput("up"));
  btnDown.addEventListener(evt, () => handleInput("down"));
  btnEnter.addEventListener(evt, () => handleInput("enter"));
  btnBack.addEventListener(evt, () => showScreen(selectScreen));
});
