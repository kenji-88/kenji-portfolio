// === タイトル画面 ===
const titleScreen = document.getElementById('title-screen');
const gameScreen = document.getElementById('game-screen');
let gameStarted = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !gameStarted) {
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  titleScreen.style.transition = 'opacity 1s';
  titleScreen.style.opacity = 0;

  setTimeout(() => {
    titleScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame();
  }, 1000);
}

// === ゲーム画面 ===
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hero = new Image();
  const field = new Image();
  hero.src = "assets/hero.png"; // 小さな勇者のドット絵
  field.src = "assets/field.png"; // 草原背景

  let heroX = canvas.width / 2;
  let heroY = canvas.height / 2;
  const speed = 5;

  let showMenu = false;
  let selectedIndex = 0;
  const options = ["経歴", "特技", "SNS"];

  const messageBox = document.getElementById("message-box");
  const menu = document.getElementById("menu");
  const messageContent = document.getElementById("message-content");
  const textContent = document.getElementById("text-content");

  const messages = {
    "経歴": "慶應義塾大学大学院 理工学研究科。AI・画像認識研究。",
    "特技": "Python / ROS / YOLO / 画像処理 / チームリーダー経験",
    "SNS": "GitHub: yoshizakikenji / X(Twitter): @kenji_ai_lab"
  };

  function draw() {
    ctx.drawImage(field, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(hero, heroX - 16, heroY - 16, 32, 32);

    requestAnimationFrame(draw);
  }
  draw();

  // 移動操作
  window.addEventListener("keydown", (e) => {
    if (!showMenu) {
      switch (e.key) {
        case "ArrowUp": heroY -= speed; break;
        case "ArrowDown": heroY += speed; break;
        case "ArrowLeft": heroX -= speed; break;
        case "ArrowRight": heroX += speed; break;
        case "Enter":
          messageBox.classList.remove("hidden");
          showMenu = true;
          updateMenu();
          break;
      }
    } else {
      if (messageContent.classList.contains("hidden")) {
        // メニュー選択中
        if (e.key === "ArrowUp") {
          selectedIndex = (selectedIndex - 1 + options.length) % options.length;
          updateMenu();
        } else if (e.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % options.length;
          updateMenu();
        } else if (e.key === "Enter") {
          const selected = options[selectedIndex];
          menu.classList.add("hidden");
          messageContent.classList.remove("hidden");
          textContent.textContent = messages[selected];
        } else if (e.key === "Escape") {
          messageBox.classList.add("hidden");
          showMenu = false;
        }
      } else {
        // メッセージ閲覧中
        if (e.key === "Enter") {
          messageContent.classList.add("hidden");
          menu.classList.remove("hidden");
          updateMenu();
        }
      }
    }

    heroX = Math.max(16, Math.min(canvas.width - 16, heroX));
    heroY = Math.max(16, Math.min(canvas.height - 16, heroY));
  });

  function updateMenu() {
    const menuItems = menu.querySelectorAll("p");
    menuItems.forEach((item, i) => {
      item.classList.toggle("selected", i === selectedIndex);
      item.textContent = (i === selectedIndex ? "> " : "　") + options[i];
    });
  }
}
