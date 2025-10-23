// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-chat');
  const chatbot = document.getElementById('chatbot');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');

  // DETECTAR PÁGINA
  const pagina = document.body.dataset.page || 'inicio';

  // RESPUESTAS POR PÁGINA
  const respuestas = {
    inicio: {
      saludo: "¡Hola! Bienvenido a Ycay360. Ofrecemos:\n• Diseño de interiores\n• Soporte técnico\n• Pintura profesional\n\n¿Cuál te interesa?",
      default: "Perfecto. Un experto te ayudará por WhatsApp en minutos.\n\n¿Listo para chatear?",
      despedida: "¡Genial! Te redirigimos a WhatsApp..."
    },
    interiores: {
      saludo: "¡Hola! Estás en **Diseño de Interiores**.\n\nTe ofrecemos:\n• Asesoría personalizada\n• Renders 3D realistas\n• Ejecución completa del proyecto\n\n¿Quieres que un diseñador te contacte?",
      default: "Entendido. Un especialista en diseño te escribirá por WhatsApp.\n\n¿Te parece bien?",
      despedida: "¡Perfecto! Abriendo WhatsApp..."
    },
    soporte: {
      saludo: "¡Hola! Estás en **Soporte TIC**.\n\nServicios:\n• Mantenimiento de PC\n• Redes WiFi\n• Soporte remoto o presencial\n• Recuperación de datos\n\n¿En qué necesitas ayuda?",
      default: "Claro. Un técnico te contactará por WhatsApp para resolverlo.\n\n¿Listo?",
      despedida: "¡Excelente! Te conectamos ahora..."
    },
    pintura: {
      saludo: "¡Hola! Estás en **Pintura Profesional**.\n\nIncluye:\n• Preparación de superficies\n• Pinturas premium\n• Acabados perfectos\n• Garantía de 1 año\n\n¿Quieres una cotización personalizada?",
      default: "Perfecto. Un pintor experto te escribirá por WhatsApp.\n\n¿Seguimos?",
      despedida: "¡Listo! Te redirigimos..."
    }
  };

  const r = respuestas[pagina];
  let conversacion = [];

  // ABRIR CHAT
  openBtn.addEventListener('click', () => {
    chatbot.classList.add('open');
    if (body.children.length === 0) {
      mostrarMensaje(r.saludo, 'bot');
    }
  });

  // CERRAR
  closeBtn.addEventListener('click', () => {
    chatbot.classList.remove('open');
  });

  // ENVIAR MENSAJE
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    const userMsg = input.value.trim();
    mostrarMensaje(userMsg, 'user');
    input.value = '';

    setTimeout(() => {
      let respuesta = r.default;

      const msg = userMsg.toLowerCase();
      if (msg.includes('hola') || msg.includes('buenas') || msg.includes('saludos')) {
        respuesta = r.saludo;
      } else if (msg.includes('sí') || msg.includes('si') || msg.includes('claro') || msg.includes('ok') || msg.includes('dale')) {
        respuesta = r.despedida;
        mostrarBotonWhatsApp(pagina);
        return;
      }

      mostrarMensaje(respuesta, 'bot');
    }, 800);
  });

  // MOSTRAR MENSAJE
  function mostrarMensaje(texto, tipo) {
    const msg = document.createElement('div');
    msg.classList.add(tipo === 'bot' ? 'bot-msg' : 'user-msg');
    msg.innerHTML = texto.replace(/\n/g, '<br>');
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // BOTÓN WHATSAPP
  function mostrarBotonWhatsApp(pagina) {
    const textos = {
      inicio: "Hola, vengo del chat de la página principal",
      interiores: "Hola, quiero cotizar diseño de interiores",
      soporte: "Hola, necesito soporte técnico",
      pintura: "Hola, quiero cotizar pintura"
    };

    setTimeout(() => {
      const btn = document.createElement('div');
      btn.innerHTML = `
        <a href="https://wa.me/573042096459?text=${encodeURIComponent(textos[pagina])}" 
           target="_blank" 
           class="btn-whatsapp-chat">
          Continuar en WhatsApp
        </a>
      `;
      body.appendChild(btn);
      body.scrollTop = body.scrollHeight;

      setTimeout(() => {
        chatbot.classList.remove('open');
      }, 2000);
    }, 1000);
  }
});
