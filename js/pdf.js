window.downloadPDF = function () {
  const printable = document.querySelector(".print-area:not(.hidden)");

  if (!printable) {
    showToast("Nothing to download. Run Analyze / Roadmap / Interview first.");
    return;
  }

  window.print();
};
