
document.addEventListener('DOMContentLoaded', function () {
  // ✅ Año dinámico en todos los elementos con clase .current-year
  document.querySelectorAll('.current-year').forEach(el => {
    if (el) el.textContent = new Date().getFullYear();
  });

  // ✅ Chatbot: solo si existe en la página
  const chat = document.getElementById('chatbot');
  const openBtn = document.getElementById('open-chat');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatForm = document.getElementById('chat-form');
  const chatClose = document.getElementById('chat-close');

  if (!chat || !openBtn) return; // salir si no hay chatbot

  function openChat() {
    chat.classList.remove('closed');
    chat.setAttribute('aria-hidden', 'false');
    openBtn.style.display = 'none';
  }

  function closeChat() {
    chat.classList.add('closed');
    chat.setAttribute('aria-hidden', 'true');
    openBtn.style.display = 'block';
  }

  openBtn.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);

  // ✅ Lógica de respuestas del bot
  function botReply(text) {
    const lowerText = (text || '').toLowerCase();
    let reply = "Gracias por tu mensaje. En breve un asesor real se comunicará contigo.";

    if (lowerText.includes('hora') || lowerText.includes('horario')) {
      reply = "Nuestro horario de atención es Lunes a Viernes, 8:00 - 18:00. ¿Qué día te acomoda?";
    } else if (lowerText.includes('precio') || lowerText.includes('cotiz') || lowerText.includes('presupuesto')) {
      reply = "Para darte un presupuesto necesitamos la dirección y una breve descripción del servicio. ¿Quieres enviarla por WhatsApp?";
    } else if (lowerText.includes('visita') || lowerText.includes('agenda') || lowerText.includes('cita') || lowerText.includes('programar')) {
      reply = "Podemos programar una visita. ¿Qué días y horarios te vienen bien?";
    } else if (lowerText.includes('hola') || lowerText.includes('buen') || lowerText.includes('saludo')) {
      reply = "¡Hola! ¿En qué servicio estás interesado? (Interiores / Soporte TIC / Pintura)";
    } else if (lowerText.includes('interior') || lowerText.includes('diseño')) {
      reply = "Ofrecemos asesoría en diseño de interiores con renders y propuestas personalizadas. ¿Quieres una cotización?";
    } else if (lowerText.includes('soporte') || lowerText.includes('tecnolog') || lowerText.includes('computador') || lowerText.includes('red')) {
      reply = "Brindamos soporte TIC presencial y remoto para hogares y empresas. ¿Qué problema estás presentando?";
    } else if (lowerText.includes('pintura') || lowerText.includes('color') || lowerText.includes('pared')) {
      reply = "Hacemos pintura profesional con acabados impecables. ¿Es para casa, oficina o local comercial?";
    }

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