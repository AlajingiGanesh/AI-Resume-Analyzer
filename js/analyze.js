setMode("analyze");

window.currentMode = "analyze";

import { postForm } from "./api.js";

/* -------- ANALYZE -------- */

window.analyzeResume = async function () {
  const file = resumeFile.files[0];
  const jd = jobDesc.value.trim();

  if (!file && !jd) return showToast("Upload resume and paste job description");
  if (!file) return showToast("Please upload resume");
  if (!jd) return showToast("Please paste job description");

  analyzeBtn.disabled = true;
  loaderText.innerText = "Analyzing with AI...";
  loader.classList.remove("hidden");

  result.classList.add("hidden");
  rewriteResult.classList.add("hidden");
  roadmapResult.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  const data = await postForm(`/analyze?job_desc=${encodeURIComponent(jd)}`, formData);

  loader.classList.add("hidden");
  result.classList.remove("hidden");
  analyzeBtn.disabled = false;

 const score = Number(data.score);
const match = Number(data.match_percent);

animateScore(score);
progressBar.style.width = match + "%";
console.log("ANALYZE DATA:", data, typeof data.score);

  matchText.innerText = `Match Percentage: ${data.match_percent}%`;

  renderArray(skillGaps, data.skill_gaps);
  renderArray(atsTips, data.ats_tips);
  renderArray(suggestions, data.suggestions);

  appState.currentReport = data;

  saveToHistory({
    score: data.score,
    skill_gaps: data.skill_gaps,
    ats_tips: data.ats_tips,
    suggestions: data.suggestions,
    date: new Date().toLocaleString()
  });

  loadHistory();
};
