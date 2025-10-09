document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title-screen");
  const select = document.getElementById("select-screen");
  const review = document.getElementById("review-screen");
  const rankingScreen = document.getElementById("ranking-screen");
  const list = document.querySelectorAll("#game-list li");

  const games = [
    // g: グラフィック, m: 音楽, s: ストーリー
    { name: "ドラゴンクエストⅠ", img: "icons/dq1.png",bg:"icons/dq1_bg.png", g: 82, m: 88, s: 83, text: "ドラクエの原点。勇者一人というドラクエでは珍しい編成。ストーリーも短く、手軽にできるのがおすすめ。ストーリーの印象はあまりないが、曲がとても良い。" },
    { name: "ドラゴンクエストⅡ 悪霊の神々", img: "icons/dq2.png", bg:"icons/dq2_bg.png", g: 83, m: 88, s: 84, text: "かなり王道な作品。いい作品イメージはあるが、あまり印象的ではないかも。シドーが強かった。ローレシアの王子がサマルトリアの王子（トンヌラ）とムーンブルクの王女（プリン）を連れて冒険に行く物語。" },
    { name: "ドラゴンクエストⅢ そして伝説へ...", img: "icons/dq3.png", bg:"icons/dq3_bg.png", g: 88, m: 90, s: 89, text: "ドラクエの中で初めてやった作品。リメイク版ともにプレイしたが、ストーリー、曲、全てすばらしい。ドラクエ初心者にも刺さるはずだが、コアなファンほど好きな作品だと思う。曲が好きすぎて目覚ましにしたが、朝うるさい音で起こしてきて嫌いになりそう。" },
    { name: "ドラゴンクエストⅣ 導かれし者たち", img: "icons/dq4.png", bg:"icons/dq4_bg.png", g: 89, m: 93, s: 92, text: "とにかくストーリーが神。ゲーム終盤の全員集合した時は普通に涙流れる。フルパーティー後の馬車のマーチやマーニャミネアのジプシーダンスなど、神曲も勢揃い。戦闘曲の生か死かはドラクエ屈指の神曲" },
    { name: "ドラゴンクエストⅤ 天空の花嫁", img: "icons/dq5.png", bg:"icons/dq5_bg.png", g: 89, m: 92, s: 94, text: "ドラクエの中でも一二を争う人気作。結婚相手として、幼馴染か新しく出会ったお嬢様か（+α）選ぶ必要があるが、個人的には幼馴染を選ばない人は人じゃないと思っている。また、幼少期に父を失くすシーンがとても印象的で、トラウマになってる人も多いはず。また、モンスターを仲間にして戦う形式が面白く、個人的に大好きな作品の一つ。" }, 
    { name: "ドラゴンクエストⅥ 幻の大地", img: "icons/dq6.png", bg:"icons/dq6_bg.png", g: 89, m: 87, s: 85, text: "個人的にはあまり刺さらなかった作品。ゲームとしては王道で面白いが、キャラクターが多く、終始使わないキャラクターも出てきたので、感情移入がしづらかった。" },
    { name: "ドラゴンクエストⅦ エデンの戦士たち", img: "icons/dq7.png", bg:"icons/dq7_bg.png", g: 89, m: 87, s: 88, text: "好き嫌いが分かれる作品だが、自分は好き。石板を集めながら短編のストーリーをこなしていくのだが、鬱な話も多く、後味が悪い時もある。また、ストーリー自体はドラクエの中でも一二を争う長さで、依頼事（おつかい）もよくされるので、ぐだぐだになりやすい。色々回りながら攻略したため、クリアまでに100時間程度はかかった。" },
    { name: "ドラゴンクエストⅧ 空と海と大地と呪われし姫君", img: "icons/dq8.png", bg:"icons/dq8_bg.png", g: 90, m: 88, s: 89, text: "初めて3Dグラフィックが使われ、とても臨場感が出る作品。キャッチコピーは「見渡す限りの世界がある」だが、その通り世界がパッと広がっていてワクワクする作品。最初の負けイベントを負けイベントだと気づかず、レベルアップに勤しんだ結果結局勝てなかったのはいい思い出。" },
    { name: "ドラゴンクエストⅪ 過ぎ去りし時を求めて", img: "icons/dq11.png", bg:"icons/dq11_bg.png", g: 95, m: 95, s: 95, text: "グラフィック、曲、ストーリーともに最高だった作品。過去作からの伏線や曲のアレンジが盛り込まれており、涙なしではプレイできない。単純にプレイ難易度やストーリーがわかりやすく、ドラクエ初心者にもおすすめの作品。ぜひ皆一度はプレイしてみてほしい。" },
    { name: "ドラゴンクエスト モンスターズ テリーのワンダーランド", img: "icons/dqm1.png", bg:"icons/dqm1_bg.png", g: 92, m: 87, s: 95, text: "モンスターズシリーズの一作目。モンスター同士を配合して強くさせるという画期的なシステムで、最高に面白い作品。ジョーカーよりストーリー性があって飽きない。" },
    { name: "ドラゴンクエスト モンスターズ イルとルカの不思議な鍵", img: "icons/dqm2.png", bg:"icons/dqm2_bg.png", g: 92, m: 87, s: 95, text: "テリワンとほぼ同じゲーム。あまり新しい要素を色濃く感じなかったが、前作同様とてもおもしろかった。曲は普通（普通に最高）だが、ストーリー性、ゲーム性は文句なし。" },
    { name: "ドラゴンクエスト モンスターズ 魔族の王子とエルフの旅", img: "icons/dqm3.png", bg:"icons/dqm3_bg.png", g: 93, m: 87, s: 94, text: "ドラクエⅣのアナザーストーリーとして、ピサロ視点が描かれてる。ドラクエⅣが好きな人にはぜひお勧めしたい作品。モンスターズとしてのゲームの楽しさはもちろんのこっており、モンスターズ好きの自分としては最高だった。SとLなどのサイズ機能や、3枠廃止などは微妙だった。" },
    { name: "ドラゴンクエスト モンスターズ ジョーカー", img: "icons/dqmj1.png", bg:"icons/dqmj1_bg.png", g: 90, m: 89, s: 96, text: "きっとみんなの青春のゲーム。学校終わりにDSでやっていた人も多いはず（自分はDSが禁止されていたので大人になってからプレイした）。テリワンやイルルカなどモンスターズシリーズは色々出てるが、一番記憶に残ってる作品。ドラクエの全作品の中で3本の指に入るくらい好き。" },
    { name: "ドラゴンクエスト モンスターズ ジョーカー2", img: "icons/dqmj2.png", bg:"icons/dqmj2_bg.png", g: 90, m: 89, s: 96, text: "DQMJ1と同様、最高のゲーム。自分は大人になってからプレイしたのですでに廃止されていたが、オンライン機能が追加されたらしい？全然悪い意味ではなくDQMJ1とほぼ同じ感じ。ナンバリングしかやったことがない人はぜひやってほしい。" },
    { name: "ドラゴンクエスト ヒーローズⅡ 双子の王と予言の終わり", img: "icons/dqheros2.png", bg:"icons/dqheros2_bg.png", g: 93, m: 90, s: 96, text: "ドラクエには珍しいアクションゲーム。あまり期待せずプレイしたが、いい意味で期待を裏切られた。ドラクエはターン性が多いのであまり急ぐシーンはないが、アクションゲームとしてハラハラドキドキしながらプレイできた。2しかやっていないので、1もやりたいところ。" },
    { name: "ドラゴンクエスト ビルダーズ アレフガルドを復活せよ", img: "icons/dqbuild.png", bg:"icons/dqbuild_bg.png", g: 92, m: 88, s: 93, text: "ドラクエとマイクラの融合という、聞くだけでワクワクするゲーム。予想通りとても面白かった。操作性が難しかったが、小学生から大人まで誰でも楽しめる作品だと思う。" },
    { name: "ドラゴンクエスト ソード 仮面の女王と鏡の塔", img: "icons/dqsword.png", bg:"icons/dqsword_bg.png", g: 94, m: 93, s: 96, text: "Wiiリモコンを剣に見立てて、モンスターを倒していく斬新なゲーム。自分の青春を語る上で外せない作品。昔のゲームなので知らない人も多いかもしれないが、とても面白いので一度はやってみてほしい。あと突きがむずい。" },
    { name: "ドラゴンクエスト スライムもりもりドラゴンクエスト2 大戦車としっぽ団", img: "icons/dqslime2.png", bg:"icons/dqslime2_bg.png", g: 85, m: 85, s: 85, text: "DSゲーム。スライムを操作して、敵を倒していくアクションゲーム。はるか昔のDSの記憶なのであまり詳細は覚えていないが、スライムが可愛くて癒される。ゲーム性も面白かった気がする。" },
    { mame: "ドラゴンクエスト タクト", img: "icons/dqtact.png", bg:"icons/dqtact_bg.png", g: 84, m: 84, s: 86, text: "スマホゲーム。タクティクス系のゲームで、戦略を練りながら操作していく系。ガチャが面白くて続けていたが、ある日を境に飽きてしまった。" },
    { mame: "ドラゴンクエスト ウォーク", img: "icons/dqwalk.png", bg:"icons/dqwalk_bg.png", g: 85, m: 83, s: 88, text: "スマホゲーム。ポケモンGOのドラクエ版。歩きながらモンスターを倒していく。一時期激ハマりし、早朝でも夜中でも関係なく家を飛び出してボスを倒しに行ってた。アイテムスポット（街にランダムに生成）が家から届く範囲に1つあって最高だった" },
    { name: "ドラゴンクエスト モンスターパレード", img: "icons/dqmp.png", bg:"icons/dqmp_bg.png", g: 89, m: 89, s: 93, text: "モンスターを集めて戦わせるゲーム（パソコン、スマホ）。ガチャ要素もあるが課金ゲーではないという良い感じのバランスで、難易度も丁度良く、かなりハマってた。2020年にサービス終了してしまい、結構ショックだった。" },
    { name: "ドラゴンクエスト モンスターバトルロード", img: "icons/dqbattle.png", bg:"icons/dqbattle_bg.png", g: 0, m: 0, s: 0, text: "アーケードゲーム。カードを集めて、モンスターを強くしていくゲーム。正直ドラクエの中で一番好きなシリーズ？だが、ゲームとしてはあまり印象がない。カードを集めるのが楽しすぎて、早く戻ってきてほしい。後継機種はあまり面白くなかった。" },
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
  // ① フラッシュ要素を作成
  const flash = document.createElement("div");
  flash.classList.add("fade-flash");
  document.body.appendChild(flash);

  // ② 現在の画面を切り替え
  [title, select, review, rankingScreen].forEach(s => s.classList.remove("active"));
  target.classList.add("active");

  // ③ 一定時間後にフェードを削除
  setTimeout(() => flash.remove(), 800);
}


  title.addEventListener("click", () => showScreen(select));
  document.addEventListener("keydown", e => {
    if (title.classList.contains("active") && e.key === "Enter") showScreen(select);
  });

  document.addEventListener("keydown", e => {
    if (!select.classList.contains("active")) return;
    if (e.key === "ArrowUp") index = (index - 1 + list.length) % list.length;
    if (e.key === "ArrowDown") index = (index + 1) % list.length;
    if (e.key === "Enter") showReview();
    updateList();
  });

setInterval(() => {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  // ランダムな位置（画面上部 or 左側）
  star.style.top = Math.random() * 50 + "vh";
  star.style.left = Math.random() * 50 + "vw";

  document.getElementById("title-screen").appendChild(star);
  setTimeout(() => star.remove(), 3000);
}, 4000);



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
  
    const reviewBg = document.getElementById("review-bg");
    reviewBg.style.backgroundImage = `url(${g.bg || g.img})`;

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

    // ソートして上位5件だけ取得
    const top5 = [...games]
      .map(g => ({
        name: g.name,
        score: Math.round((g.g + g.m + g.s) / 3)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // 👈 上位5件だけ表示

    // 表示処理
    top5.forEach((g, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${g.name} — ${g.score}点`;
      rankingList.appendChild(li);
    });
  }

  // 🏰 タイトル → セレクト（スマホでも可）
// ✅ タップとクリックの多重発火防止版
// ✅ 完全版：スマホとPCで分離し、2重発火を防止
function enableTap(el, action) {
  let startY = 0;
  let moved = false;
  let locked = false; // 多重実行ロック

  const execute = () => {
    if (locked) return;
    locked = true;
    action();
    setTimeout(() => locked = false, 700); // 次の入力までの待機時間
  };

  if ("ontouchstart" in window) {
    // 📱 スマホ・タブレット専用
    el.addEventListener("touchstart", e => {
      startY = e.touches[0].clientY;
      moved = false;
    }, { passive: true });

    el.addEventListener("touchmove", e => {
      const diff = Math.abs(e.touches[0].clientY - startY);
      if (diff > 10) moved = true; // スクロール操作ならキャンセル
    }, { passive: true });

    el.addEventListener("touchend", e => {
      if (!moved) execute();
      e.preventDefault(); // ← click イベントをブロック！
    });
  } else {
    // 💻 PC専用
    el.addEventListener("click", () => {
      execute();
    });
  }
}



  // ← TITLE ボタン機能
document.getElementById("back-to-title").addEventListener("click", () => showScreen(title));
enableTap(document.getElementById("back-to-title"), () => showScreen(title));


  // 🎮 ゲームリスト（スマホタップ対応）
  list.forEach((li, i) => {
    enableTap(li, () => {
      index = i;
      updateList();
      showReview();
    });
  });

  // 🏆 ボタンもスマホ対応
  enableTap(document.getElementById("enter"), showReview);
  enableTap(document.getElementById("back"), () => showScreen(select));
  enableTap(document.getElementById("ranking"), showRanking);
  enableTap(document.getElementById("back-to-select"), () => showScreen(select));

  
  // カセット列生成
  const left = document.querySelector(".left-scroll");
  const right = document.querySelector(".right-scroll");
  for (let i = 0; i < 40; i++) {
    const imgL = document.createElement("img");
    const imgR = document.createElement("img");
    const rand = games[i % games.length].img;
    imgL.src = rand;
    imgR.src = rand;
    left.appendChild(imgL);
    right.appendChild(imgR);
  }
});

// 🎯 スクロールインジケータ制御
const scrollIndicator = document.getElementById("scroll-indicator");

gameList.addEventListener("scroll", () => {
  const atBottom = gameList.scrollTop + gameList.clientHeight >= gameList.scrollHeight - 5;
  scrollIndicator.classList.toggle("hidden", atBottom);
});

// 初期状態（スクロール不要なら非表示）
if (gameList.scrollHeight <= gameList.clientHeight) {
  scrollIndicator.classList.add("hidden");
}
