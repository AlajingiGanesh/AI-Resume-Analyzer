window.currentMode = "rewrite";


import { postForm } from "./api.js";

window.rewriteResume = async function () {
  setMode("rewrite");
  const file = resumeFile.files[0];
  const jd = jobDesc.value.trim();

  if (!file && !jd) return showToast("Upload resume and paste job description");
  if (!file) return showToast("Please upload resume");
  if (!jd) return showToast("Please paste job description");

  rewriteBtn.disabled = true;
  loaderText.innerText = "Rewriting resume with AI...";
  loader.classList.remove("hidden");

  result.classList.add("hidden");
  rewriteResult.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  formData.append("job_desc", jd);

  const data = await postForm("/rewrite", formData);


  loader.classList.add("hidden");
  rewriteResult.classList.remove("hidden");
  rewriteBtn.disabled = false;

  newSummary.innerText = data.summary;

  newExperience.innerHTML = "";
  data.experience.forEach(e => {
    const li = document.createElement("li");
    li.innerText = e;
    newExperience.appendChild(li);
  });

  newSkills.innerHTML = "";
  data.skills.forEach(s => {
    const li = document.createElement("li");
    li.innerText = s;
    newSkills.appendChild(li);
  });

  finalResume.innerHTML = data.final_resume.replace(/\n/g, "<br>");

  appState.currentRewrite = data;
};
