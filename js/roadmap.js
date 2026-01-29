window.currentMode = "roadmap";


import { postForm } from "./api.js";

window.getRoadmap = async function () {
  setMode("roadmap");
  const file = resumeFile.files[0];
  const jd = jobDesc.value.trim();

  if (!file && !jd) return showToast("Upload resume and paste job description");
  if (!file) return showToast("Please upload resume");
  if (!jd) return showToast("Please paste job description");

  roadmapBtn.disabled = true;
  loader.classList.remove("hidden");
  roadmapResult.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  const data = await postForm(`/roadmap?job_desc=${encodeURIComponent(jd)}`, formData);

  loader.classList.add("hidden");
  roadmapResult.classList.remove("hidden");
  roadmapBtn.disabled = false;

  renderArray(shortTerm, data.short_term);
  renderArray(mediumTerm, data.medium_term);
  renderArray(longTerm, data.long_term);

  appState.currentRoadmap = data;
};
