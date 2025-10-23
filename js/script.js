// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-chat');
  const chatbot = document.getElementById('chatbot');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');

  // Abrir chat
  openBtn.addEventListener('click', () => {
    chatbot.classList.remove('closed');
    chatbot.classList.add('open');
  });

  // Cerrar chat
  closeBtn.addEventListener('click', () => {
    chatbot.classList.add('closed');
    chatbot.classList.remove('open');
  });

  // Enviar mensaje
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      const userMsg = document.createElement('div');
      userMsg.classList.add('user-msg');
      userMsg.textContent = input.value;
      body.appendChild(userMsg);
      body.scrollTop = body.scrollHeight;
      input.value = '';

      // Respuesta automática del bot
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.classList.add('bot-msg');
        botMsg.textContent = 'Gracias por tu mensaje. Te contactaremos por WhatsApp en breve.';
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
      }, 800);
    }
  });
});
