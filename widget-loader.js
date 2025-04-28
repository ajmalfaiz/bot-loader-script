 (function () {
        const chatbotUrl = "https://galamine-chatbot-frontend-react.vercel.app"; // Change to your deployed URL

        function initChatbot() {
            console.log(window.location.origin)
          // Create container for Shadow DOM
          const container = document.createElement("div");
          container.id = "chatbot-widget-container";
          container.style.position = "fixed";
          container.style.bottom = "0";
          container.style.right = "0";
          container.style.height = "100%";
          container.style.zIndex = "9999";
          document.body.appendChild(container);

          // Attach shadow root
          const shadowRoot = container.attachShadow({ mode: "open" });

          // Create iframe inside shadow root
          const iframe = document.createElement("iframe");
          iframe.src = chatbotUrl;
          iframe.style.height = "100%";
          iframe.style.border = "none";
          iframe.setAttribute("id", "chatbot-widget-frame");

          shadowRoot.appendChild(iframe);

          // Toggle open/close from iframe
          let isOpen = false;
          window.addEventListener("message", (event) => {
            if (event.data?.type === "toggleChat") {
              isOpen = !isOpen;
              iframe.style.width = isOpen ? "350px" : "60px";
              iframe.style.height = isOpen ? "500px" : "60px";
              iframe.style.borderRadius = isOpen ? "12px" : "50%";
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
