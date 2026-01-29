import { postJSON } from "./api.js";

/* ========== JARVIS CHAT ========== */

window.sendMessage = async function () {
  const text = chatInput.value.trim();
  if (!text) return;

  addUserMsg(text);
  chatInput.value = "";

  addBotMsg("Thinking... 🤖");

  try {
    const data = await postJSON("/chat", { message: text });
    updateLastBotMsg(data.reply);
  } catch {
    updateLastBotMsg("Server not responding 😢");
  }
};

function addUserMsg(text) {
  const div = document.createElement("div");
  div.className = "user-msg";
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMsg(text) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function updateLastBotMsg(text) {
  const bots = document.querySelectorAll(".bot-msg");
  bots[bots.length - 1].innerText = text;
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* Enter key send */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

/* Voice input */
window.startVoice = function () {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice not supported in this browser");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = e => {
    chatInput.value = e.results[0][0].transcript;
    sendMessage();
  };
};

/* Theme toggle */
let dark = true;
window.toggleTheme = function () {
  dark = !dark;
  jarvisChat.classList.toggle("light-theme");
};

/* AI ORB CONTROLS */

window.activateAI = function () {
  roboLoader.classList.remove("hidden");

  setTimeout(() => {
    roboLoader.classList.add("hidden");
    jarvisChat.classList.remove("hidden");
    aiOrb.classList.add("hidden");
  }, 1200);
};

window.openChat = function () {
  aiOrb.classList.add("hidden");
  roboLoader.classList.remove("hidden");
  roboText.innerText = "JARVIS initializing...";

  setTimeout(() => {
    roboLoader.classList.add("hidden");
    jarvisChat.classList.remove("hidden");
  }, 1200);
};

window.closeChat = function () {
  jarvisChat.classList.add("hidden");
  roboLoader.classList.remove("hidden");
  roboText.innerText = "JARVIS shutting down...";

  setTimeout(() => {
    roboLoader.classList.add("hidden");
    aiOrb.classList.remove("hidden");
  }, 1000);
};
