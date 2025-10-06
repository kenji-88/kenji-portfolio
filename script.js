const screens = document.querySelectorAll(".screen");
const titleScreen = document.getElementById("title-screen");
const selectScreen = document.getElementById("select-screen");
const reviewScreen = document.getElementById("review-screen");

const gameListElement = document.getElementById("game-list");
const gameTitle = document.getElementById("game-title");
const reviewDesc = document.getElementById("review-desc");
const statusList = document.getElementById("status-list");

const btnUp = document.getElementById("btn-up");
const btnDown = document.getElementById("btn-down");
const btnEnter = document.getElementById("btn-enter");
const btnBack = document.getElementById("btn-back");

let currentIndex = 0;

// === ゲームデータ ===
const games = {
  // === ドラクエシリーズ ===
  "ドラクエⅠ": {
    desc: "すべての原点。勇者が一人で竜王に挑むクラシックRPG。",
    stats: { 音楽: 8, ストーリー: 7, バトル: 7, 雰囲気: 8, 歴史的価値: 10 }
  },
  "ドラクエⅡ": {
    desc: "仲間とともに冒険へ。シリーズ初のパーティ制。",
    stats: { 音楽: 9, ストーリー: 8, バトル: 7, 仲間感: 9, 難易度: 8 }
  },
  "ドラクエⅢ": {
    desc: "勇者と仲間の自由な旅。シリーズ最高傑作との呼び声も高い。",
    stats: { 音楽: 10, ストーリー: 10, バトル: 9, 自由度: 10, 没入感: 9 }
  },
  "ドラクエⅣ": {
    desc: "5章構成の群像劇。AIバトルが新鮮だった。",
    stats: { 音楽: 9, ストーリー: 9, バトル: 8, キャラ魅力: 10, 演出: 9 }
  },
  "ドラクエⅤ": {
    desc: "親子三代にわたる壮大な物語。結婚イベントが伝説に。",
    stats: { 音楽: 10, ストーリー: 10, 感動度: 10, 仲間モンスター: 9, 没入感: 10 }
  },
  "ドラクエⅥ": {
    desc: "夢と現実の二重世界。哲学的な物語が光る。",
    stats: { 音楽: 8, ストーリー: 8, バトル: 9, システム: 9, 世界観: 9 }
  },
  "ドラクエⅦ": {
    desc: "最も長大な物語。村人のドラマが深い。",
    stats: { 音楽: 9, ストーリー: 10, 長さ: 10, 感情移入: 10, 世界構築: 10 }
  },
  "ドラクエⅧ": {
    desc: "シリーズ初の3D化。トロデ王と旅する大冒険。",
    stats: { 音楽: 10, グラフィック: 10, バトル: 9, ストーリー: 9, 自由度: 9 }
  },
  "ドラクエⅨ": {
    desc: "通信プレイで仲間と冒険。すれ違いが社会現象に。",
    stats: { 音楽: 8, マルチ性: 10, カスタム性: 9, やりこみ: 10, 世界観: 8 }
  },
  "ドラクエⅩ": {
    desc: "オンラインRPG化で大転換。世界観と交流の深さが魅力。",
    stats: { 音楽: 9, ストーリー: 9, バトル: 8, コミュニティ: 10, 世界観: 10 }
  },
  "ドラクエⅪ": {
    desc: "原点回帰と進化が融合した傑作。美しい映像と音楽。",
    stats: { 音楽: 10, ストーリー: 10, キャラ魅力: 10, システム: 10, 感動: 10 }
  },
  "ドラクエモンスターズ": {
    desc: "モンスターを仲間に育てるスピンオフ。配合システムが革命的。",
    stats: { 音楽: 8, やりこみ: 10, システム: 9, 中毒性: 10, 戦略性: 9 }
  },

  // === マリオシリーズ ===
  "スーパーマリオブラザーズ": {
    desc: "アクションゲームの金字塔。全てはここから始まった。",
    stats: { 操作性: 10, ステージ構成: 9, 難易度: 8, 中毒性: 10, 歴史的価値: 10 }
  },
  "スーパーマリオワールド": {
    desc: "スーパーファミコン初のマリオ。ヨッシー登場で世界が広がる。",
    stats: { 操作性: 10, グラフィック: 9, 音楽: 9, ステージ: 10, 冒険感: 10 }
  },
  "スーパーマリオ64": {
    desc: "3Dマリオの革命。自由な操作感と箱庭探索の魅力。",
    stats: { 操作性: 10, 自由度: 10, カメラ: 8, 世界観: 10, 影響力: 10 }
  },
  "スーパーマリオサンシャイン": {
    desc: "ポンプを使った水アクションが新鮮な南国冒険。",
    stats: { 操作性: 9, 雰囲気: 10, ステージ: 8, 新規性: 10, 難易度: 8 }
  },
  "スーパーマリオギャラクシー": {
    desc: "宇宙を駆けるマリオ。重力ギミックと音楽が感動的。",
    stats: { 音楽: 10, ステージ: 10, 操作性: 9, 雰囲気: 10, 創造性: 10 }
  },
  "スーパーマリオオデッセイ": {
    desc: "キャッピーと共に世界を旅する自由な3Dアクション。",
    stats: { 音楽: 10, 自由度: 10, 世界観: 10, ステージ: 10, 楽しさ: 10 }
  }
};

// === ゲームリスト生成 ===
const gameNames = Object.keys(games);
gameNames.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  gameListElement.appendChild(li);
});
const gameList = document.querySelectorAll("#game-list li");

// === 画面切り替え ===
function showScreen(target) {
  screens.forEach(s => s.classList.remove("active"));
  target.classList.add("active");
}

// === 選択更新 ===
function updateSelection() {
  gameList.forEach((li, i) => li.classList.toggle("selected", i === currentIndex));
  gameList[currentIndex].scrollIntoView({ block: "center", behavior: "smooth" });
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

// === キーボード操作 ===
document.addEventListener("keydown", e => {
  if (titleScreen.classList.contains("active") && e.key === "Enter") {
    showScreen(selectScreen);
  } else if (e.key === "ArrowUp") handleInput("up");
  else if (e.key === "ArrowDown") handleInput("down");
  else if (e.key === "Enter") handleInput("enter");
});

// === スマホ操作（pointerdownで統一） ===
function onTap(el, fn) {
  el.addEventListener("pointerdown", fn, { passive: true });
}

onTap(titleScreen, () => showScreen(selectScreen));
onTap(btnUp, () => handleInput("up"));
onTap(btnDown, () => handleInput("down"));
onTap(btnEnter, () => handleInput("enter"));
onTap(btnBack, () => showScreen(selectScreen));
