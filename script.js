document.addEventListener('DOMContentLoaded', function () {
  // ✅ Año dinámico (usando clase, no IDs)
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ✅ Solo ejecutar si hay un chatbot en la página
  const chat = document.querySelector('.chatbot');
  const openBtn = document.getElementById('open-chat');
  if (!chat && !openBtn) return; // salir si no hay chat

  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatForm = document.getElementById('chat-form');
  const chatClose = document.getElementById('chat-close');

  function openChat() {
    chat.classList.remove('closed');
    if (openBtn) openBtn.style.display = 'none';
  }

  function closeChat() {
    chat.classList.add('closed');
    if (openBtn) openBtn.style.display = 'block';
  }

  if (openBtn) openBtn.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);

  // ✅ Respuestas del bot
  function botReply(text) {
    const replies = {
      hora: "Nuestro horario de atención es Lunes a Viernes, 8:00 - 18:00. ¿Qué día te acomoda?",
      precio: "Para darte un presupuesto necesitamos la dirección y una breve descripción del servicio. ¿Quieres enviarla por WhatsApp?",
      visita: "Podemos programar una visita. ¿Qué días y horarios te vienen bien?",
      hola: "¡Hola! ¿En qué servicio estás interesado? (Interiores / Soporte / Pintura)"
    };

    let reply = "Gracias por tu mensaje. En breve un asesor real se comunicará contigo.";
    const lowerText = (text || '').toLowerCase();

    if (lowerText.includes('hora') || lowerText.includes('horario')) reply = replies.hora;
    else if (lowerText.includes('precio') || lowerText.includes('cotiz')) reply = replies.precio;
    else if (lowerText.includes('visita') || lowerText.includes('agenda') || lowerText.includes('cita')) reply = replies.visita;
    else if (lowerText.includes('hola') || lowerText.includes('buen')) reply = replies.hola;

    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = reply;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'user-msg';
      userMsg.textContent = val;
      chatBody.appendChild(userMsg);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => botReply(val), 800);
    });
  }
});
