// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-chat');
  const chatbot = document.getElementById('chatbot');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');

  // Respuestas automáticas
  const respuestas = {
    saludo: "¡Hola! Soy el asistente de Ycay360. ¿En qué puedo ayudarte hoy?",
    servicios: "Ofrecemos:\n• Diseño de interiores\n• Soporte técnico (TIC)\n• Pintura profesional\n\n¿Cuál te interesa?",
    interiores: "Perfecto. Te ayudo con diseño de espacios, renders 3D y ejecución.\n\n¿Quieres que un experto te asesore por WhatsApp?",
    soporte: "Genial. Mantenimiento de PC, redes WiFi, soporte remoto o presencial.\n\n¿Te contactamos por WhatsApp para ayudarte?",
    pintura: "Excelente. Pintura de alta calidad para casas y oficinas.\n\n¿Te gustaría una cotización personalizada por WhatsApp?",
    default: "Entiendo. Para darte la mejor atención, un especialista te contactará por WhatsApp en minutos.\n\n¿Listo para chatear con un experto?",
    despedida: "¡Perfecto! Te estamos redirigiendo a WhatsApp..."
  };

  let conversacion = ['saludo'];

  // Abrir chatbot
  openBtn.addEventListener('click', () => {
    chatbot.classList.add('open');
    mostrarMensaje(respuestas.saludo, 'bot');
  });

  // Cerrar
  closeBtn.addEventListener('click', () => {
    chatbot.classList.remove('open');
  });

  // Enviar mensaje
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    const userMsg = input.value.toLowerCase().trim();
    mostrarMensaje(userMsg, 'user');
    input.value = '';

    // Lógica de respuesta
    setTimeout(() => {
      let respuesta = respuestas.default;

      if (userMsg.includes('hola') || userMsg.includes('buenas') || userMsg.includes('saludos')) {
        respuesta = respuestas.saludo;
      } else if (userMsg.includes('interior') || userMsg.includes('diseño')) {
        respuesta = respuestas.interiores;
        conversacion.push('interiores');
      } else if (userMsg.includes('soporte') || userMsg.includes('técnico') || userMsg.includes('computador')) {
        respuesta = respuestas.soporte;
        conversacion.push('soporte');
      } else if (userMsg.includes('pintura') || userMsg.includes('pintar')) {
        respuesta = respuestas.pintura;
        conversacion.push('pintura');
      } else if (userMsg.includes('sí') || userMsg.includes('si') || userMsg.includes('claro') || userMsg.includes('ok')) {
        respuesta = respuestas.despedida;
        mostrarBotonWhatsApp();
        return;
      }

      mostrarMensaje(respuesta, 'bot');
    }, 800);
  });

  // Mostrar mensaje
  function mostrarMensaje(texto, tipo) {
    const msg = document.createElement('div');
    msg.classList.add(tipo === 'bot' ? 'bot-msg' : 'user-msg');
    msg.innerHTML = texto.replace(/\n/g, '<br>');
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // Botón WhatsApp
  function mostrarBotonWhatsApp() {
    setTimeout(() => {
      const btn = document.createElement('div');
      btn.innerHTML = `
        <a href="https://wa.me/573042096459?text=Hola,%20vengo%20del%20chat%20de%20la%20p%C3%A1gina" 
           target="_blank" 
           class="btn-whatsapp-chat">
          Chatear con un experto
        </a>
      `;
      body.appendChild(btn);
      body.scrollTop = body.scrollHeight;

      // Cerrar chat tras 2 segundos
      setTimeout(() => {
        chatbot.classList.remove('open');
      }, 2000);
    }, 1000);
  }
});
