window.setMode = function (mode) {
  appState.currentMode = mode;
  document.getElementById("modeText").innerText =
    "Current Mode: " + mode;

  hideAllSections();
  hideUpload();
  showUpload();

  // FIX: always hide finish button when changing mode
  if (window.finishBtn) {
    finishBtn.classList.add("hidden");
  }
};
