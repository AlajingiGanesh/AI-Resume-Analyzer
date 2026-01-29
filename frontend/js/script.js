// ================= GLOBAL STATE =================

window.appState = {
  currentMode: null,
  currentReport: null,
  currentRewrite: null,
  currentRoadmap: null,
  currentInterview: null,
  userScore: 0
};

// Kill adoptedStyleSheets error
window.addEventListener("error", e => {
  if (e.message.includes("adoptedStyleSheets")) {
    e.preventDefault();
  }
});

// ================= DOM REFERENCES =================
let chatInput, chatBody, jarvisChat, aiOrb, roboLoader, roboText;

document.addEventListener("DOMContentLoaded", () => {
  chatInput = document.getElementById("chatInput");
  chatBody = document.getElementById("chatBody");
  jarvisChat = document.getElementById("jarvisChat");
  aiOrb = document.getElementById("aiOrb");
  roboLoader = document.getElementById("roboLoader");
  roboText = document.getElementById("roboText");
});

// ================= MODE SYSTEM =================
window.setMode = function (mode) {
  appState.currentMode = mode;
  document.getElementById("modeText").innerText =
    "Current Mode: " + mode;
  hideAllSections();
  hideUpload();
  showUpload();

  // 🔧 FIX: Always hide finish interview button
  if (window.finishBtn) {
    finishBtn.classList.add("hidden");
  }
};


window.hideAllSections = function () {
  result.classList.add("hidden");
  rewriteResult.classList.add("hidden");
  roadmapResult.classList.add("hidden");
  interviewSection.classList.add("hidden");
};

window.hideUpload = function () {
  uploadSection.classList.add("hidden");
};

window.showUpload = function () {
  uploadSection.classList.remove("hidden");
};

// ================= HELPERS =================
window.renderArray = function (element, arr) {
  element.innerHTML = "";
  arr.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    element.appendChild(li);
  });
};

window.animateScore = function (target) {
  let current = 0;
  const scoreEl = document.getElementById("scoreText");
  const progressBar = document.getElementById("progressBar");

  const interval = setInterval(() => {
    if (current >= target) {
      clearInterval(interval);
    } else {
      current++;
      if (scoreEl) scoreEl.innerText = current;
      if (progressBar) progressBar.style.width = current + "%";
    }
  }, 20);
};

// ================= COPY =================
window.copyResume = async function () {
  try {
    const text = finalResume.innerText;
    await navigator.clipboard.writeText(text);
    showToast("Resume copied to clipboard ✅");
  } catch {
    showToast("Copy failed ❌");
  }
};

// ================= HISTORY =================
window.saveToHistory = function (report) {
  let history = JSON.parse(localStorage.getItem("resumeHistory")) || [];
  history.unshift(report);
  history = history.slice(0, 5);
  localStorage.setItem("resumeHistory", JSON.stringify(history));
};

window.loadHistory = function () {
  const history = JSON.parse(localStorage.getItem("resumeHistory")) || [];
  historyList.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.innerText = `${item.date} - Score: ${item.score}`;
    li.onclick = () => loadFromHistory(index);
    historyList.appendChild(li);
  });
};

window.loadFromHistory = function (index) {
  const history = JSON.parse(localStorage.getItem("resumeHistory")) || [];
  const data = history[index];

  setMode("analyze");
  result.classList.remove("hidden");

  animateScore(data.score);
  progressBar.style.width = data.score + "%";
  matchText.innerText = `Match Percentage: ${data.score}%`;

  renderArray(skillGaps, data.skill_gaps);
  renderArray(atsTips, data.ats_tips);
  renderArray(suggestions, data.suggestions);

  showToast("Loaded previous report 📂");
};

loadHistory();

// ================= PDF (FINAL REAL FIX) =================
window.copyList = function (fromEl, toEl) {
  toEl.innerHTML = "";
  fromEl.querySelectorAll("li").forEach(li => {
    const n = document.createElement("li");
    n.innerText = li.innerText;
    toEl.appendChild(n);
  });
};

window.downloadPDF = function () {
  document.body.classList.add("pdf-mode");

  const mode = appState.currentMode;

  if (mode === "analyze") {
    pdfScore.innerText = `Score: ${scoreText.innerText}`;
    pdfMatch.innerText = matchText.innerText;

    copyList(skillGaps, pdfSkillGaps);
    copyList(atsTips, pdfAtsTips);
    copyList(suggestions, pdfSuggestions);

    pdfFinalResume.innerText = "";
  }

  if (mode === "rewrite") {
    pdfScore.innerText = "Rewrite Resume";
    pdfMatch.innerText = "";

    pdfSkillGaps.innerHTML = "";
    pdfAtsTips.innerHTML = "";
    pdfSuggestions.innerHTML = "";

    pdfFinalResume.innerText = finalResume.innerText;
  }

  if (mode === "roadmap") {
    pdfScore.innerText = "Skill Roadmap";
    pdfMatch.innerText = "";

    copyList(shortTermList, pdfSkillGaps);
    copyList(mediumTermList, pdfAtsTips);
    copyList(longTermList, pdfSuggestions);

    pdfFinalResume.innerText = "";
  }

  if (mode === "interview") {
    pdfScore.innerText = "Mock Interview Result";
    pdfMatch.innerText =
      `Score: ${(userScore / totalMarks * 100).toFixed(1)}%`;

    pdfSkillGaps.innerHTML = "";
    pdfAtsTips.innerHTML = "";
    pdfSuggestions.innerHTML = "";

    pdfFinalResume.innerText = answerSheet.innerText;
  }

  pdfExport.classList.remove("hidden");

  const opt = {
    margin: 0.5,
    filename: "AI_Resume_Report.pdf",
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowHeight: pdfExport.scrollHeight
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf().set(opt).from(pdfExport).save().then(() => {
    pdfExport.classList.add("hidden");
    document.body.classList.remove("pdf-mode");
  });
};



window.updateModeUI = function () {
  modeIndicator.innerText = `Current Mode: ${appState.currentMode || "None"}`;
};
