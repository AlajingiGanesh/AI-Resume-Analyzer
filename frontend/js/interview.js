window.currentMode = "interview";

import { postForm } from "./api.js";

// Global interview state
window.currentIndex = 0;
window.interviewData = [];
window.userScore = 0;

/* ================= MOCK INTERVIEW SYSTEM ================= */

window.startInterview = async function () {
  setMode("interview");
  const file = resumeFile.files[0];
  const jd = jobDesc.value.trim();

  if (!file || !jd) return showToast("Upload resume and JD first");

  interviewBtn.disabled = true;
  loaderText.innerText = "Generating interview...";
  loader.classList.remove("hidden");

  const formData = new FormData();
  formData.append("file", file);

  formData.append("job_desc", jd);

  const data = await postForm("/interview", formData);


  loader.classList.add("hidden");
  interviewBtn.disabled = false;
  interviewSection.classList.remove("hidden");

  // Reset
  interviewData = [];
  currentIndex = 0;
  userScore = 0;
  answerSheet.innerHTML = "";
  finalResult.classList.add("hidden");
  finishBtn.classList.add("hidden");

  // Safety check
  if (!data || !data.mcq) {
    showToast("Interview generation failed ❌");
    return;
  }

  // Flatten questions
  interviewData = [
    ...data.mcq.map(q => ({
      type: "MCQ",
      question: q.q,
      options: q.options,
      answer: q.answer
    })),

    ...data.logical.map(q => ({
      type: "Logical",
      question: q.q,
      answer: q.answer
    })),

    ...data.behavioral.map(q => ({
      type: "Behavioral",
      question: q.q,
      answer: q.answer
    })),

    ...data.technical.map(q => ({
      type: "Technical",
      question: q.q,
      answer: q.answer
    }))
  ];

  showQuestion();
};

/* ================= SHOW QUESTION ================= */

function showQuestion() {
  const q = interviewData[currentIndex];

  questionType.innerText = `Question Type: ${q.type}`;
  questionText.innerText = q.question;
  userAnswer.value = "";
  optionsBox.innerHTML = "";

  if (q.type === "MCQ") {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => (userAnswer.value = opt);
      optionsBox.appendChild(btn);
    });
  }
}

/* ================= NEXT QUESTION (SCORING) ================= */

window.nextQuestion = function () {
  const q = interviewData[currentIndex];
  const answer = userAnswer.value.trim();

  // ---- similarity function ----
  function textMatch(user, model) {
    user = user.toLowerCase();
    model = model.toLowerCase();
    let hits = 0;
    model.split(" ").forEach(word => {
      if (user.includes(word)) hits++;
    });
    return hits / model.split(" ").length;
  }

  // ---- scoring ----
  if (q.type === "MCQ") {
    const selectedIndex = q.options.indexOf(answer);
    const selectedLetter = ["A","B","C","D"][selectedIndex];

    if (selectedLetter === q.answer) {
      userScore += 2;
      q.isCorrect = true;
    } else {
      q.isCorrect = false;
    }

    q.selected = selectedLetter; // store user choice
  }


  if (q.type === "Logical") {
    if (textMatch(answer, q.answer) > 0.3) {
      userScore += 3;
      q.isCorrect = true;
    } else {
      q.isCorrect = false;
    }
  }

  if (q.type === "Behavioral") {
    if (textMatch(answer, q.answer) > 0.25) {
      userScore += 2;
      q.isCorrect = true;
    } else {
      q.isCorrect = false;
    }
  }

  if (q.type === "Technical") {
    if (textMatch(answer, q.answer) > 0.3) {
      userScore += 3;
      q.isCorrect = true;
    } else {
      q.isCorrect = false;
    }
  }

  q.userAnswer = answer || "Not answered";
  currentIndex++;

  if (currentIndex >= interviewData.length) {
    finishInterview();
  } else {
    showQuestion();
  }
};

/* ================= FINISH ================= */

function finishInterview() {
  finalResult.classList.remove("hidden");
  finishBtn.classList.remove("hidden");
  answerSheet.innerHTML = "";

  interviewData.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question-card";

    // Green / Red full box
    div.style.border = q.isCorrect
      ? "2px solid #22c55e"
      : "2px solid #ef4444";

    div.style.background = q.isCorrect
      ? "rgba(34,197,94,0.1)"
      : "rgba(239,68,68,0.1)";

    // Format answers nicely
    let userAns = q.type === "MCQ"
      ? `${q.selected} - ${q.userAnswer}`
      : q.userAnswer;

    let correctAns = q.type === "MCQ"
      ? `${q.answer} - ${q.options[["A","B","C","D"].indexOf(q.answer)]}`
      : q.answer;

    div.innerHTML = `
      <div class="question-text">
        Q${i + 1}. ${q.question}
      </div>
      <div class="answer-text">
        Your Answer: ${userAns}
      </div>
      <div class="answer-text">
        Correct Answer: ${correctAns}
      </div>
    `;

    answerSheet.appendChild(div);
  });
}


/* ================= FINAL RESULT ================= */

window.onFinishInterviewClick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const totalMarks = 20;
  const percent = (userScore / totalMarks) * 100;
  const isPass = percent >= 60;

  setTimeout(() => {
    showMotivationPopup(isPass, percent);
  }, 300);
};

/* ================= POPUP ================= */

function showMotivationPopup(isPass, percent) {
  const motivationModal = document.getElementById("motivationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  motivationModal.classList.remove("hidden");

  if (isPass) {
    modalTitle.innerText = "Hello Future Engineer 👨‍💻🚀";
    modalText.innerText =
      `Score: ${percent.toFixed(1)}%\n\nYou are ready for real interviews.`;
  } else {
    modalTitle.innerText = "Hello Future Leader 💪";
    modalText.innerText =
      `Score: ${percent.toFixed(1)}%\n\nFailing is part of success. Try again.`;
  }
}

window.closeModal = function () {
  document.getElementById("motivationModal").classList.add("hidden");
};
