let chatElemChatLoading = true;
const CHAT_ELEMENT = "chatbot-shanaya";
const destinationUrl = "http://localhost:3002";
const chatbotUrl = "https://chatbot.galamine.com";

function chatElemChatCreateScript(attributes, content) {
  const infChatScript = document.createElement("script");
  for (const [key, value] of Object.entries(attributes)) {
    infChatScript.setAttribute(key, value);
  }
  infChatScript.textContent = content;
  return infChatScript;
}

function chatElemChatCreateLink(attributes) {
  const infChatLink = document.createElement("link");
  for (const [key, value] of Object.entries(attributes)) {
    infChatLink.setAttribute(key, value);
  }
  return infChatLink;
}

const chatElemChatLoad = async () => {
  if (!chatElemChatLoading) {
    return;
  }

  chatElemChatLoading = false;

  try {
    const chatElemChatResponse = await fetch(chatbotUrl);
    if (chatElemChatResponse.ok) {
      let chatElemChatTempElem = document.createElement("html");
      chatElemChatTempElem.innerHTML = await chatElemChatResponse.text();

      // Create root element and set its style based on chat position
      let chatElemChatRootElement = document.createElement("div");
      chatElemChatRootElement.id = CHAT_ELEMENT;

      // Attach shadow DOM

      let chatElemChatShadow = chatElemChatRootElement.attachShadow({
        mode: "open",
      });

      const chatElemChatStyles = chatElemChatTempElem.querySelectorAll("style");

      chatElemChatStyles.forEach((element) => {
        chatElemChatShadow.appendChild(element);
      });

      // Extract and append stylesheets

      let chatElemChatStyleCount = 0;

      chatElemChatTempElem.querySelectorAll("link").forEach((element) => {
        let chatElemChatStyle = chatElemChatCreateLink({
          href: element.href.replace(destinationUrl, chatbotUrl),
          rel: element.rel,
          as: element.as,
        });

        chatElemChatShadow.appendChild(chatElemChatStyle);
        chatElemChatStyleCount++;

        chatElemChatTempElem.querySelectorAll("script").forEach((element) => {
          let chatElemChatScript = chatElemChatCreateScript({
            type: element.type,
            src: element.src.replace(destinationUrl, chatbotUrl),
          });
          chatElemChatShadow.appendChild(chatElemChatScript);
        });

        const tailwindScript = chatElemChatCreateScript(
          {
            src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
            type: "text/javascript",
          },
          ""
        );
        chatElemChatShadow.appendChild(tailwindScript);
      });
      document.body.appendChild(chatElemChatRootElement);
    }
  } catch (error) {
    console.error("Error loading chat:", error);
  }
};

window.shadowMode = true;

window.onload = function () {
  chatElemChatLoad();
};
