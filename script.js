// ===== dummy video pool =====
const VIDEOS = [
  { title: "10분만에 뇌 비우는 브이로그", channel: "느긋채널", colors: ["#F26849", "#F2BE22"] },
  { title: "역시 웃긴 사람들 모음.zip", channel: "웃참실패", colors: ["#D982CA", "#F2BE22"] },
  { title: "아무 생각 없이 보는 요리 ASMR", channel: "조용한부엌", colors: ["#3FBF5F", "#0F97A6"] },
  { title: "고양이가 주인공인 다큐 하이라이트", channel: "냥편집국", colors: ["#0F97A6", "#D982CA"] },
  { title: "밤에 듣기 좋은 이상한 잡학사전", channel: "밤샘지식", colors: ["#D94032", "#F2BE22"] },
];

const BUBBLE_LINES = [
  "오키, 이거 추천함~",
  "일단 이거. 별 수 없음.",
  "고민 끝. 이거로 가자.",
  "오케이 이거 틀어놔.",
];

const REROLL_LINES = [
  "오키, 다시 골라줄게.",
  "음... 이건 어때.",
  "그럼 이건 어떰?",
];

let lastIndex = -1;

// ===== state =====
const answers = { mood: null, weight: null };

// ===== nav =====
function goTo(screenName) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(`screen-${screenName}`).classList.add("active");
  if (screenName === "check") resetCheck();
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", () => goTo(el.dataset.nav));
});

// ===== check flow =====
function resetCheck() {
  answers.mood = null;
  answers.weight = null;
  document.querySelectorAll(".mood-card, .weight-card").forEach((c) => c.classList.remove("selected"));
  showQuestion(1);
}

function showQuestion(step) {
  document.querySelectorAll(".question").forEach((q) => q.classList.remove("active"));
  document.getElementById(`q${step}`).classList.add("active");
  document.querySelectorAll(".dot").forEach((d) => {
    d.classList.toggle("on", Number(d.dataset.step) <= step);
  });
}

document.querySelectorAll(".mood-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".mood-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    answers.mood = card.dataset.mood;
    setTimeout(() => showQuestion(2), 180);
  });
});

document.querySelectorAll(".weight-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".weight-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    answers.weight = card.dataset.weight;
    setTimeout(() => {
      renderResult(false);
      goTo("result");
    }, 180);
  });
});

// ===== result =====
function pickVideo() {
  if (VIDEOS.length === 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * VIDEOS.length);
  } while (idx === lastIndex);
  lastIndex = idx;
  return idx;
}

function renderResult(isReroll) {
  const idx = pickVideo();
  const video = VIDEOS[idx];

  document.getElementById("result-title").textContent = video.title;
  document.getElementById("result-channel").textContent = video.channel;

  const thumb = document.getElementById("result-thumb");
  thumb.style.setProperty("--bg-thumb-a", video.colors[0]);
  thumb.style.setProperty("--bg-thumb-b", video.colors[1]);

  const lines = isReroll ? REROLL_LINES : BUBBLE_LINES;
  document.getElementById("result-bubble").textContent =
    lines[Math.floor(Math.random() * lines.length)];
}

document.getElementById("btn-reroll").addEventListener("click", () => {
  renderResult(true);
});

document.getElementById("btn-watch").addEventListener("click", () => {
  showToast("굿초이스. 그냥 편하게 봐.");
});

// ===== toast =====
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}
