document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title-screen");
  const select = document.getElementById("select-screen");
  const review = document.getElementById("review-screen");
  const list = document.querySelectorAll("#game-list li");

  const games = [
    { name: "ドラゴンクエストⅠ", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/dq1.png", g: 90, m: 85, s: 80 },
    { name: "ドラゴンクエストⅡ", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/dq2.png", g: 88, m: 83, s: 82 },
    { name: "マリオカート", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/mariokart.png", g: 95, m: 90, s: 75 },
    { name: "スーパーペーパーマリオ", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/paper_mario.png", g: 92, m: 91, s: 89 },
    { name: "スマブラDX", img: "https://raw.githubusercontent.com/kenji-88/kenji-portfolio/main/icons/smash.png", g: 93, m: 88, s: 85 },
  ];

  let index = 0;
  const card = document.getElementById("card");
  const gameTitle = document.getElementById("game-title");
  const graphicsBar = document.getElementById("graphics-bar");
  const musicBar = document.getElementById("music-bar");
  const storyBar = document.getElementById("story-bar");
  const overallBar = document.getElementById("overall-bar");

  function showScreen(target) {
    [title, select, review].forEach(s => s.classList.remove("active"));
    target.classList.add("active");
  }

  // タイトル→セレクトへ
  document.addEventListener("keydown", e => {
    if (title.classList.contains("active") && e.key === "Enter") showScreen(select);
  });
  title.addEventListener("click", () => showScreen(select));

  // 矢印で選択
  document.addEventListener("keydown", e => {
    if (!select.classList.contains("active")) return;
    if (e.key === "ArrowUp") index = (index - 1 + list.length) % list.length;
    if (e.key === "ArrowDown") index = (index + 1) % list.length;
    updateList();
  });

  function updateList() {
    list.forEach((li, i) => li.classList.toggle("selected", i === index));
  }

  document.getElementById("enter").addEventListener("click", () => showReview());

  function showReview() {
    showScreen(review);
    const g = games[index];
    gameTitle.textContent = g.name;
    card.style.backgroundImage = `url(${g.img})`;
    setTimeout(() => {
      graphicsBar.style.width = g.g + "%";
      musicBar.style.width = g.m + "%";
      storyBar.style.width = g.s + "%";
      const overall = Math.round((g.g + g.m + g.s) / 3);
      overallBar.style.width = overall + "%";
      document.getElementById("graphics-val").textContent = g.g;
      document.getElementById("music-val").textContent = g.m;
      document.getElementById("story-val").textContent = g.s;
      document.getElementById("overall-val").textContent = overall;
    }, 300);
  }

  document.getElementById("back").addEventListener("click", () => showScreen(select));

  // 左右のスクロール列に画像を追加
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
