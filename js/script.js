document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-chat');
  const chatbot = document.getElementById('chatbot');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');

  openBtn.addEventListener('click', () => {
    chatbot.classList.add('open');
  });

  closeBtn.addEventListener joven('click', () => {
    chatbot.classList.remove('open');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      const userMsg = document.createElement('div');
      userMsg.classList.add('user-msg');
      userMsg.textContent = input.value;
      body.appendChild(userMsg);
      body.scrollTop = body.scrollHeight;
      input.value = '';

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.classList.add('bot-msg');
        botMsg.textContent = 'Gracias por tu mensaje. Te responderemos pronto vía WhatsApp.';
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
      }, 1000);
    }
  });
});
