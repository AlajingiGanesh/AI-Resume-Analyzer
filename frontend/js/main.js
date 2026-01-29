// Make DOM globals accessible to all modules
window.resumeFile = document.getElementById("resumeFile");
window.jobDesc = document.getElementById("jobDesc");
window.analyzeBtn = document.getElementById("analyzeBtn");
window.rewriteBtn = document.getElementById("rewriteBtn");
window.roadmapBtn = document.getElementById("roadmapBtn");
window.loader = document.getElementById("loader");
window.loaderText = document.getElementById("loaderText");
window.result = document.getElementById("result");
window.rewriteResult = document.getElementById("rewriteResult");
window.roadmapResult = document.getElementById("roadmapResult");
window.progressBar = document.getElementById("progressBar");
window.matchText = document.getElementById("matchText");
window.skillGaps = document.getElementById("skillGaps");
window.atsTips = document.getElementById("atsTips");
window.suggestions = document.getElementById("suggestions");

// Load modules
import "./script.js";
import "./toast.js";
import "./state.js";
import "./analyze.js";
import "./rewrite.js";
import "./roadmap.js";
import "./interview.js";
import "./chat.js";
import "./pdf.js";
import "./history.js";
