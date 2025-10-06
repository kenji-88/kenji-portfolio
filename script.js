const screens = document.querySelectorAll(".screen");
const titleScreen = document.getElementById("title-screen");
const selectScreen = document.getElementById("select-screen");
const gameListScreen = document.getElementById("game-list-screen");
const reviewScreen = document.getElementById("review-screen");
const rankingScreen = document.getElementById("ranking-screen");

const categoryList = document.getElementById("category-list");
const gameList = document.getElementById("game-list");
const categoryTitle = document.getElementById("category-title");
const rankingList = document.getElementById("ranking-list");
const gameTitle = document.getElementById("game-title");
const reviewDesc = document.getElementById("review-desc");
const statusList = document.getElementById("status-list");
const card = document.createElement("div"); // 画像カード
card.id = "card";
document.querySelector(".gallery")?.appendChild(card);

// ボタン
const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const btnEnter = document.getElementById("btn-enter");
const btnUpGame = document.getElementById("btn-up-game");
const btnDownGame = document.getElementById("btn-down-game");
const btnEnterGame = document.getElementById("btn-enter-game");
const btnBack = document.getElementById("btn-back");
const btnBackCategory = document.getElementById("btn-back-category");
const btnRanking = document.getElementById("btn-ranking");
const btnBackRanking = document.getElementById("btn-back-ranking");

let currentIndex = 0;
let currentCategory = "";

// === データ構造 ===
const categories = {
  "ドラゴンクエスト": [
    { name: "ドラクエⅠ", desc: "竜王を倒す最初の冒険。", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/dq1.png", stats: { ストーリー: 8, 音楽: 8, 雰囲気: 9 } },
    { name: "ドラクエⅡ", desc: "三人の勇者が挑む壮大な旅。", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/dq2.png", stats: { ストーリー: 9, 冒険感: 10, 音楽: 9 } }
  ],
  "スーパーマリオ": [
    { name: "スーパーペーパーマリオ", desc: "2D×3Dの独創的ギミック。", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/paper_mario.png", stats: { ストーリー: 9, デザイン: 10, 独創性: 9 } },
    { name: "マリオカート", desc: "誰とでも盛り上がれるレース。", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/mariokart.png", stats: { 楽しさ: 10, バランス: 9, 操作性: 9 } }
  ]
};

// === 共通処理 ===
function showScreen(target) {
  screens.forEach(s => s.classList.remove("active"));
  target.classList.add("active");
}
function updateSelection(list, index) {
  list.forEach((li, i) => li.classList.toggle("selected", i === index));
}

// === カテゴリ表示 ===
function showCategories() {
  showScreen(selectScreen);
  categoryList.innerHTML = "";
  Object.keys(categories).forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.addEventListener("pointerdown", () => showGames(cat));
    categoryList.appendChild(li);
  });
  currentIndex = 0;
  updateSelection(categoryList.querySelectorAll("li"), currentIndex);
}

// === ゲームリスト ===
function showGames(category) {
  currentCategory = category;
  showScreen(gameListScreen);
  categoryTitle.textContent = category;
  gameList.innerHTML = "";
  categories[category].forEach(g => {
    const li = document.createElement("li");
    li.textContent = g.name;
    li.addEventListener("pointerdown", () => showReview(g));
    gameList.appendChild(li);
  });
  currentIndex = 0;
  updateSelection(gameList.querySelectorAll("li"), currentIndex);
}

// === レビュー画面 ===
function showReview(game) {
  showScreen(reviewScreen);
  card.style.backgroundImage = `url(${game.img})`;
  gameTitle.textContent = game.name;
  reviewDesc.textContent = game.desc;
  statusList.innerHTML = "";
  Object.entries(game.stats).forEach(([label, value]) => {
    const stat = document.createElement("div");
    stat.classList.add("status");
    stat.innerHTML = `
      <div class="status-label">${label}</div>
      <div class="status-bar"><div class="status-fill"></div></div>
      <div class="status-value">${value}/10</div>
    `;
    statusList.appendChild(stat);
    setTimeout(() => stat.querySelector(".status-fill").style.width = `${value * 10}%`, 100);
  });
}

// === ランキング ===
function showRanking() {
  showScreen(rankingScreen);
  const ranked = Object.values(categories).flat().map(g => ({
    name: g.name,
    avg: Object.values(g.stats).reduce((a, b) => a + b) / Object.values(g.stats).length
  })).sort((a, b) => b.avg - a.avg);
  rankingList.innerHTML = "";
  ranked.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${r.name} — 平均${r.avg.toFixed(1)}点`;
    rankingList.appendChild(li);
  });
}

// === ナビゲーション ===
function handleNavigation(list, direction, enterAction) {
  if (direction === "up") {
    currentIndex = (currentIndex - 1 + list.length) % list.length;
  } else if (direction === "down") {
    currentIndex = (currentIndex + 1) % list.length;
  } else if (direction === "enter") {
    enterAction(list[currentIndex]);
  }
  updateSelection(list, currentIndex);
}

// === イベント ===
titleScreen.addEventListener("pointerdown", () => showCategories());
btnRanking.addEventListener("pointerdown", () => showRanking());
btnBackRanking.addEventListener("pointerdown", () => showCategories());
btnBackCategory.addEventListener("pointerdown", () => showCategories());
btnBack.addEventListener("pointerdown", () => showGames(currentCategory));

// 矢印ボタン
btnUp.addEventListener("pointerdown", () => handleNavigation(categoryList.querySelectorAll("li"), "up", showGames));
btnDown.addEventListener("pointerdown", () => handleNavigation(categoryList.querySelectorAll("li"), "down", showGames));
btnEnter.addEventListener("pointerdown", () => showGames(Object.keys(categories)[currentIndex]));
btnUpGame.addEventListener("pointerdown", () => handleNavigation(gameList.querySelectorAll("li"), "up", showReview));
btnDownGame.addEventListener("pointerdown", () => handleNavigation(gameList.querySelectorAll("li"), "down", showReview));
btnEnterGame.addEventListener("pointerdown", () => showReview(categories[currentCategory][currentIndex]));

// === キーボード操作 ===
document.addEventListener("keydown", e => {
  if (titleScreen.classList.contains("active") && e.key === "Enter") {
    showCategories();
    return;
  }

  const catItems = categoryList.querySelectorAll("li");
  const gameItems = gameList.querySelectorAll("li");

  if (selectScreen.classList.contains("active")) {
    if (e.key === "ArrowUp") handleNavigation(catItems, "up", showGames);
    if (e.key === "ArrowDown") handleNavigation(catItems, "down", showGames);
    if (e.key === "Enter") showGames(Object.keys(categories)[currentIndex]);
    if (e.key === "r") showRanking();
  }

  if (gameListScreen.classList.contains("active")) {
    if (e.key === "ArrowUp") handleNavigation(gameItems, "up", showReview);
    if (e.key === "ArrowDown") handleNavigation(gameItems, "down", showReview);
    if (e.key === "Enter") showReview(categories[currentCategory][currentIndex]);
    if (e.key === "Escape") showCategories();
  }

  if (reviewScreen.classList.contains("active") && e.key === "Escape") {
    showGames(currentCategory);
  }

  if (rankingScreen.classList.contains("active") && e.key === "Escape") {
    showCategories();
  }
});
