(function () {
  const chatbotUrl = "https://chatbot.abc.com/"; // Use your deployed chatbot URL

  function initChatbot() {
    // Create container
    const container = document.createElement("div");
    container.id = "chatbot-widget-container";
    container.style.position = "fixed";
    container.style.zIndex = "9999";
    container.style.inset = "0"; // Fullscreen coverage if needed by widget
    container.style.pointerEvents = "none"; // Allow iframe to control clicks if needed
    document.body.appendChild(container);

    // Attach shadow root
    const shadowRoot = container.attachShadow({ mode: "open" });

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = chatbotUrl;
    iframe.setAttribute("id", "chatbot-widget-frame");

    // Let iframe handle all its own styles and design
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.background = "transparent"; // Optional
    iframe.style.pointerEvents = "auto"; // Re-enable interaction

    shadowRoot.appendChild(iframe);

    // Let iframe control its own visibility via postMessage
    window.addEventListener("message", (event) => {
      if (event.data?.type === "toggleChat") {
        iframe.style.display = event.data.open ? "block" : "none";
      }
    });

    iframe.addEventListener("load", () => {
      iframe.contentWindow.postMessage({ type: "init" }, "*");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
