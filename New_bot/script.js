function downloadCoverLetter() {
  window.print();
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openChatBtn");
  const wrapper = document.getElementById("chatWrapper");
  const frame = document.getElementById("chatFrame");
  const chatbot = document.getElementById("chatbot");

  if (!btn || !wrapper || !frame || !chatbot) {
    console.error("Chatbot elements not found");
    return;
  }

  btn.addEventListener("click", () => {

    // load iframe only once
    if (!frame.src) {
      frame.src = "http://172.203.138.104:5000";
    }

    // show chatbot
    wrapper.classList.remove("hidden");

    // scroll AFTER it becomes visible
    setTimeout(() => {
      window.scrollTo({
        top: chatbot.offsetTop - 20,
        behavior: "smooth"
      });
    }, 150);
  });
});
