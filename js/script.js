document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar elementos
  const openBtn = document.getElementById('open-chat');
  const chatbot = document.getElementById('chatbot');
  const closeBtn = document.getElementById('chat-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const body = document.getElementById('chat-body');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.header-inner');

  // Verificar que los elementos necesarios existan
  if (!openBtn || !chatbot || !closeBtn || !form || !input || !body) {
    console.error(`Error: Elementos del chatbot no encontrados en la página ${document.body.dataset.page || 'desconocida'}.`, {
      openBtn: !!openBtn,
      chatbot: !!chatbot,
      closeBtn: !!closeBtn,
      form: !!form,
      input: !!input,
      body: !!body
    });
    return;
  }

  // Establecer el año actual
  const currentYear = document.querySelector('.current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
    console.log('Año actual establecido:', currentYear.textContent);
  }

  // DETECTAR PÁGINA
  const pagina = document.body.dataset.page || 'inicio';
  console.log(`Página detectada: ${pagina}`);

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

  // CARGAR CONVERSACIÓN DESDE SESSIONSTORAGE
  let conversacion = [];
  try {
    conversacion = JSON.parse(sessionStorage.getItem('chatbot_conversation')) || [];
    conversacion.forEach(msg => mostrarMensaje(msg.text, msg.type));
    console.log(`Conversación cargada desde sessionStorage: ${conversacion.length} mensajes`);
  } catch (error) {
    console.error('Error al cargar conversación desde sessionStorage:', error);
    sessionStorage.removeItem('chatbot_conversation');
  }

  // ASEGURAR QUE EL CHATBOT ESTÉ CERRADO INICIALMENTE
  chatbot.classList.remove('open');
  chatbot.classList.add('closed');
  openBtn.style.display = 'flex';
  console.log(`Chatbot inicializado como cerrado en ${pagina}, botón open-chat visible`);

  // ABRIR CHATBOT AUTOMÁTICAMENTE DESPUÉS DE 2 SEGUNDOS
  setTimeout(() => {
    try {
      chatbot.classList.remove('closed');
      chatbot.classList.add('open');
      openBtn.style.display = 'none';
      if (body.children.length === 0) {
        mostrarMensaje(r.saludo, 'bot');
      }
      console.log(`Chatbot abierto automáticamente en ${pagina}`);
    } catch (error) {
      console.error(`Error al abrir el chatbot automáticamente en ${pagina}:`, error);
    }
  }, 2000);

  // CERRAR CHATBOT
  closeBtn.addEventListener('click', () => {
    try {
      chatbot.classList.remove('open');
      chatbot.classList.add('closed');
      openBtn.style.display = 'flex';
      console.log(`Chatbot cerrado manualmente en ${pagina}, botón open-chat restaurado`);
    } catch (error) {
      console.error(`Error al cerrar el chatbot en ${pagina}:`, error);
    }
  });

  // ABRIR CHAT
  openBtn.addEventListener('click', () => {
    try {
      chatbot.classList.remove('closed');
      chatbot.classList.add('open');
      openBtn.style.display = 'none';
      if (body.children.length === 0) {
        mostrarMensaje(r.saludo, 'bot');
      }
      console.log(`Chatbot abierto manualmente en ${pagina}`);
    } catch (error) {
      console.error(`Error al abrir el chatbot en ${pagina}:`, error);
    }
  });

  // ENVIAR MENSAJE
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      console.log('Entrada vacía, mensaje no enviado');
      return;
    }

    try {
      const userMsg = input.value.trim();
      mostrarMensaje(userMsg, 'user');
      input.value = '';
      console.log(`Mensaje de usuario enviado en ${pagina}: ${userMsg}`);

      setTimeout(() => {
        let respuesta = r.default;

        const msg = userMsg.toLowerCase();
        if (msg.includes('hola') || msg.includes('buenas') || msg.includes('saludos')) {
          respuesta = r.saludo;
        } else if (msg.includes('sí') || msg.includes('si') || msg.includes('claro') || msg.includes('ok') || msg.includes('dale')) {
          respuesta = r.despedida;
          mostrarBotonWhatsApp(pagina);
          return;
        } else if (msg.includes('m²') || msg.includes('metros')) {
          respuesta = "¡Gracias por compartir! Por favor, confirma los m² de tu espacio y te prepararemos una cotización personalizada.";
        }

        mostrarMensaje(respuesta, 'bot');
      }, 800);
    } catch (error) {
      console.error(`Error al procesar el mensaje del usuario en ${pagina}:`, error);
    }
  });

  // NAVEGACIÓN MÓVIL
  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      if (e.target === toggle.querySelector('.header-inner::after') || toggle.contains(e.target)) {
        nav.classList.toggle('active');
        console.log(`Navegación móvil toggled en ${pagina}`);
      }
    });
  }

  // MOSTRAR MENSAJE
  function mostrarMensaje(texto, tipo) {
    try {
      const msg = document.createElement('div');
      msg.classList.add(tipo === 'bot' ? 'bot-msg' : 'user-msg');
      msg.innerHTML = texto.replace(/\n/g, '<br>');
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
      conversacion.push({ text: texto, type: tipo });
      sessionStorage.setItem('chatbot_conversation', JSON.stringify(conversacion));
      console.log(`Mensaje ${tipo} añadido en ${pagina}: ${texto}`);
    } catch (error) {
      console.error(`Error al mostrar mensaje en ${pagina}:`, error);
    }
  }

  // BOTÓN WHATSAPP
  function mostrarBotonWhatsApp(pagina) {
    const textos = {
      inicio: "Hola, vengo del chat de la página principal",
      interiores: "Hola, quiero cotizar diseño de interiores",
      soporte: "Hola, necesito soporte técnico",
      pintura: "Hola, quiero cotizar pintura"
    };

    try {
      sessionStorage.removeItem('chatbot_conversation');
      console.log(`Conversación limpiada en sessionStorage para ${pagina}`);
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
        console.log(`Botón de WhatsApp mostrado en ${pagina}`);

        setTimeout(() => {
          chatbot.classList.remove('open');
          chatbot.classList.add('closed');
          openBtn.style.display = 'flex';
          console.log(`Chatbot cerrado tras redirigir a WhatsApp en ${pagina}, botón open-chat restaurado`);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error(`Error al mostrar el botón de WhatsApp en ${pagina}:`, error);
    }
  }
});
