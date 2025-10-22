document.addEventListener('DOMContentLoaded', function () {
  // ✅ Año dinámico en todos los elementos con clase .current-year
  document.querySelectorAll('.current-year').forEach(el => {
    if (el) el.textContent = new Date().getFullYear();
  });

  // ✅ Chatbot: solo si existe en la página
  const chat = document.getElementById('chatbot');
  const openBtn = document.getElementById('open-chat');
  
  // Salir si no hay chatbot en esta página
  if (!chat || !openBtn) return;

  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatForm = document.getElementById('chat-form');
  const chatClose = document.getElementById('chat-close');

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
  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  // ✅ Lógica de respuestas del bot con enlace a WhatsApp
  function botReply(text) {
    const lowerText = (text || '').toLowerCase().trim();
    let reply = "";
    let showWhatsAppButton = false;

    if (lowerText.includes('hora') || lowerText.includes('horario')) {
      reply = "Nuestro horario de atención es Lunes a Viernes, 8:00 - 18:00. ¿Qué día te acomoda?";
    } else if (lowerText.includes('precio') || lowerText.includes('cotiz') || lowerText.includes('presupuesto')) {
      reply = "Para darte un presupuesto necesitamos la dirección y una breve descripción del servicio. ¿Quieres enviarla por WhatsApp?";
      showWhatsAppButton = true;
    } else if (lowerText.includes('visita') || lowerText.includes('agenda') || lowerText.includes('cita') || lowerText.includes('programar')) {
      reply = "Podemos programar una visita. ¿Qué días y horarios te vienen bien?";
      showWhatsAppButton = true;
    } else if (lowerText.includes('hola') || lowerText.includes('buen') || lowerText.includes('saludo')) {
      reply = "¡Hola! ¿En qué servicio estás interesado? (Interiores / Soporte TIC / Pintura)";
    } else if (lowerText.includes('interior') || lowerText.includes('diseño')) {
      reply = "Ofrecemos asesoría en diseño de interiores con renders y propuestas personalizadas. ¿Quieres una cotización?";
      showWhatsAppButton = true;
    } else if (lowerText.includes('soporte') || lowerText.includes('tecnolog') || lowerText.includes('computador') || lowerText.includes('red')) {
      reply = "Brindamos soporte TIC presencial y remoto para hogares y empresas. ¿Qué problema estás presentando?";
      showWhatsAppButton = true;
    } else if (lowerText.includes('pintura') || lowerText.includes('color') || lowerText.includes('pared')) {
      reply = "Hacemos pintura profesional con acabados impecables. ¿Es para casa, oficina o local comercial?";
      showWhatsAppButton = true;
    } else {
      // Respuesta genérica → siempre ofrece WhatsApp
      reply = "Gracias por tu mensaje. 👋\n\nUn asesor real se comunicará contigo muy pronto.\n\n¿Quieres contactarnos ahora por WhatsApp para una respuesta inmediata?";
      showWhatsAppButton = true;
    }

    if (chatBody) {
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-msg';
      botMsg.textContent = reply;
      chatBody.appendChild(botMsg);

      // Añadir botón de WhatsApp si corresponde
      if (showWhatsAppButton) {
        const waButton = document.createElement('a');
        waButton.href = 'https://wa.me/573042096459?text=Hola,%20vi%20el%20chat%20de%20su%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n';
        waButton.target = '_blank';
        waButton.rel = 'noopener';
        waButton.className = 'chat-whatsapp-btn';
        waButton.textContent = '💬 Continuar en WhatsApp';
        waButton.style.cssText = `
          display: inline-block;
          margin-top: 8px;
          padding: 6px 12px;
          background: linear-gradient(90deg, #FF6A00, #6C2BD9);
          color: white;
          text-decoration: none;
          font-size: 12px;
          border-radius: 6px;
          font-weight: 600;
          width: auto;
          text-align: center;
        `;
        chatBody.appendChild(waButton);
      }

      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Validar que existan los elementos del formulario
  if (chatForm && chatInput && chatBody) {
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
