document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title-screen");
  const select = document.getElementById("select-screen");
  const review = document.getElementById("review-screen");
  const rankingScreen = document.getElementById("ranking-screen");
  const list = document.querySelectorAll("#game-list li");

  const games = [
    { name: "ドラゴンクエストⅠ", img: "icons/dq1.png", g: 90, m: 85, s: 80, text: "初代として冒険の始まりを感じた名作。" },
    { name: "ドラゴンクエストⅡ", img: "icons/dq2.png", g: 88, m: 83, s: 82, text: "仲間と冒険できるようになり、世界が広がった。" },
    { name: "マリオカート", img: "icons/mariokart.png", g: 95, m: 90, s: 75, text: "スピード感と駆け引きが最高！" },
    { name: "スーパーペーパーマリオ", img: "icons/paper_mario.png", g: 92, m: 91, s: 89, text: "ストーリー性が強く、世界観に引き込まれた。" },
    { name: "スマブラDX", img: "icons/smash.png", g: 93, m: 88, s: 85, text: "全キャラが魅力的。究極の対戦ゲーム。" },
  ];

  let index = 0;
  const card = document.getElementById("card");
  const gameTitle = document.getElementById("game-title");
  const reviewText = document.getElementById("review-text");
  const bars = {
    g: document.getElementById("graphics-bar"),
    m: document.getElementById("music-bar"),
    s: document.getElementById("story-bar"),
    o: document.getElementById("overall-bar")
  };

  function showScreen(target) {
    [title, select, review, rankingScreen].forEach(s => s.classList.remove("active"));
    target.classList.add("active");
  }

  title.addEventListener("click", () => showScreen(select));
  document.addEventListener("keydown", e => {
    if (title.classList.contains("active") && e.key === "Enter") showScreen(select);
  });

  document.addEventListener("keydown", e => {
    if (!select.classList.contains("active")) return;
    if (e.key === "ArrowUp") index = (index - 1 + list.length) % list.length;
    if (e.key === "ArrowDown") index = (index + 1) % list.length;
    updateList();
  });

  list.forEach((li, i) => {
    li.addEventListener("click", () => {
      index = i;
      updateList();
      showReview();
    });
  });

  document.getElementById("enter").addEventListener("click", showReview);
  document.getElementById("back").addEventListener("click", () => showScreen(select));

  // 🏆 ランキングボタン
  document.getElementById("ranking").addEventListener("click", showRanking);
  document.getElementById("back-to-select").addEventListener("click", () => showScreen(select));

  function updateList() {
    list.forEach((li, i) => li.classList.toggle("selected", i === index));
  }

  function showReview() {
    showScreen(review);
    const g = games[index];
    gameTitle.textContent = g.name;
    card.style.backgroundImage = `url(${g.img})`;
    reviewText.textContent = g.text;
    const overall = Math.round((g.g + g.m + g.s) / 3);
    setTimeout(() => {
      bars.g.style.width = g.g + "%";
      bars.m.style.width = g.m + "%";
      bars.s.style.width = g.s + "%";
      bars.o.style.width = overall + "%";
      document.getElementById("graphics-val").textContent = g.g;
      document.getElementById("music-val").textContent = g.m;
      document.getElementById("story-val").textContent = g.s;
      document.getElementById("overall-val").textContent = overall;
    }, 300);
  }

  function showRanking() {
    showScreen(rankingScreen);
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = "";
    const sorted = [...games].map(g => ({
      name: g.name,
      score: Math.round((g.g + g.m + g.s) / 3)
    })).sort((a, b) => b.score - a.score);
    sorted.forEach((g, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${g.name} — ${g.score}点`;
      rankingList.appendChild(li);
    });
  }

  // カセット列生成
  const left = document.querySelector(".left-scroll");
  const right = document.querySelector(".right-scroll");
  for (let i = 0; i < 10; i++) {
    const imgL = document.createElement("img");
    const imgR = document.createElement("img");
    const rand = games[i % games.length].img;
    imgL.src = rand;
    imgR.src = rand;
    left.appendChild(imgL);
    right.appendChild(imgR);
  }
});
