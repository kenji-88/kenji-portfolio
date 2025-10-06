const titleScreen = document.getElementById("title-screen");
const selectScreen = document.getElementById("select-screen");
const reviewScreen = document.getElementById("review-screen");

const gameList = document.querySelectorAll("#game-list li");
const reviewBox = document.getElementById("review-text");
const gameTitle = document.getElementById("game-title");

let currentIndex = 0;
let currentGame = null;
let typing = false;

// レビュー内容
const reviews = {
  "ドラクエ": [
    "壮大な冒険と感動のストーリー。",
    "世界を救うために旅立つ勇者たちの姿に毎回心を打たれる。",
    "シンプルながら奥深いコマンドバトルが魅力。"
  ],
  "スマブラ": [
    "任天堂のオールスター大乱闘！",
    "物理エンジンの完成度が高く、競技性も抜群。",
    "友達と集まってワイワイやるのが最高。"
  ],
  "マリオ": [
    "誰でも楽しめる2Dアクションの金字塔。",
    "ジャンプの感触、ステージ構成、BGM──すべてが完璧。",
    "シンプルだけど、奥深い。"
  ]
};

// === タイトル画面 ===
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && titleScreen && !selectScreen.classList.contains("visible")) {
    titleScreen.classList.add("hidden");
    selectScreen.classList.remove("hidden");
  }
});

// === セレクト操作 ===
document.addEventListener("keydown", (e) => {
  if (selectScreen.classList.contains("hidden")) return;

  if (e.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + gameList.length) % gameList.length;
    updateSelection();
  }
  if (e.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % gameList.length;
    updateSelection();
  }

  if (e.key === "Enter") {
    const selectedGame = gameList[currentIndex].textContent;
    showReview(selectedGame);
  }
});

function updateSelection() {
  gameList.forEach((li, i) => li.classList.toggle("selected", i === currentIndex));
}

// === レビュー表示 ===
function showReview(game) {
  selectScreen.classList.add("hidden");
  reviewScreen.classList.remove("hidden");
  gameTitle.textContent = game;
  currentGame = game;
  typeText(reviews[game]);
}

// === タイプライター風テキスト ===
function typeText(lines, i = 0) {
  typing = true;
  reviewBox.textContent = "";
  let chars = lines[i].split("");
  let j = 0;
  let interval = setInterval(() => {
    reviewBox.textContent += chars[j++];
    if (j >= chars.length) {
      clearInterval(interval);
      typing = false;
      if (i + 1 < lines.length) {
        setTimeout(() => typeText(lines, i + 1), 800);
      }
    }
  }, 40);
}

// === 戻る ===
document.addEventListener("keydown", (e) => {
  if (reviewScreen.classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") {
    reviewScreen.classList.add("hidden");
    selectScreen.classList.remove("hidden");
  }
});
