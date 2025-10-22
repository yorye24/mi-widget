document.addEventListener('DOMContentLoaded', function () {
  // ✅ Año dinámico
  document.querySelectorAll('.current-year').forEach(el => {
    if (el) el.textContent = new Date().getFullYear();
  });

  // ✅ Chatbot: solo si existe
  const chat = document.getElementById('chatbot');
  const openBtn = document.getElementById('open-chat');
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
  if (chatClose) chatClose.addEventListener('click', closeChat);

  // ✅ Base de conocimiento mejorada
  function getBotReply(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Saludos
    if (/(hola|buenos días|buenas tardes|buenas noches|hi|hello)/i.test(msg)) {
      return "¡Hola! 👋 Soy el asistente de Ycay360. ¿En qué puedo ayudarte hoy?\n\nPuedes preguntarme sobre:\n• Diseño de interiores\n• Soporte técnico\n• Servicios de pintura\n• Horarios y precios";
    }

    // Interiores - diseño
    if (/(render|3d|visualización|diseño.*interior|planos)/i.test(msg)) {
      return "Sí, ofrecemos renders 3D realistas antes de ejecutar cualquier proyecto. Incluimos 2 revisiones gratuitas y entregamos en 3-5 días hábiles.";
    }
    
    if (/(mueble|mobiliario|decoración|estilo)/i.test(msg)) {
      return "Te ayudamos a seleccionar mobiliario, colores, texturas y accesorios según tu estilo y presupuesto. ¿Tienes alguna referencia o estilo en mente?";
    }

    // Interiores - precios y proceso
    if (/(cuánto.*cuesta|precio|presupuesto|cotización.*interior)/i.test(msg)) {
      return "Los precios varían según el tamaño y complejidad del espacio. Para una casa de 80m², el diseño completo (incluyendo renders) cuesta desde $350.000 COP. ¿Quieres que te enviemos nuestra guía de precios detallada?";
    }

    if (/(proceso|cómo.*trabaja|pasos)/i.test(msg)) {
      return "Nuestro proceso tiene 4 pasos:\n1. Reunión inicial (presencial o virtual)\n2. Toma de medidas y fotos\n3. Desarrollo de propuesta con renders\n4. Ajustes y entrega final\n\n¿En qué etapa estás?";
    }

    // Soporte TIC - servicios
    if (/(computador|laptop|pc|notebook)/i.test(msg)) {
      return "Reparamos todo tipo de computadores y laptops. Diagnóstico gratuito y garantía de 30 días en repuestos. ¿Qué problema específico presenta tu equipo?";
    }

    if (/(internet|wifi|red|conexión)/i.test(msg)) {
      return "Configuramos redes Wi-Fi domésticas y empresariales. Incluimos optimización de señal, seguridad y configuración de dispositivos. ¿Tienes problemas de cobertura o velocidad?";
    }

    if (/(virus|lento|lentitud|malware)/i.test(msg)) {
      return "Ofrecemos limpieza profunda de virus y optimización del sistema. En la mayoría de casos, devolvemos la velocidad original del equipo. ¿Tu computador está lento desde cuándo?";
    }

    // Soporte TIC - precios
    if (/(cuánto.*cuesta|precio|presupuesto.*soporte)/i.test(msg)) {
      return "Nuestros servicios de soporte tienen estos precios base:\n• Diagnóstico: $20.000 COP\n• Limpieza y optimización: $50.000 COP\n• Reparación hardware: desde $80.000 COP\n• Configuración de red: $60.000 COP\n\n¿Qué servicio necesitas?";
    }

    // Pintura - servicios
    if (/(tipo.*pintura|latex|esmalte|epóxico)/i.test(msg)) {
      return "Usamos pinturas de alta calidad:\n• Latex para interiores\n• Acrílico para exteriores\n• Esmalte para puertas y molduras\n• Epóxico para pisos industriales\n\n¿Qué área quieres pintar?";
    }

    if (/(cuánto.*demora|tiempo|rápido)/i.test(msg)) {
      return "El tiempo depende del área:\n• Apartamento (60m²): 2-3 días\n• Casa (120m²): 4-5 días\n• Oficina: 1-2 días\n\nIncluimos preparación de superficies y limpieza final.";
    }

    // Pintura - precios
    if (/(cuánto.*cuesta|precio|presupuesto.*pintura)/i.test(msg)) {
      return "Nuestros precios por m² son:\n• Pintura interior: $8.000 - $12.000 COP\n• Pintura exterior: $10.000 - $15.000 COP\n• Acabados especiales: desde $18.000 COP\n\n¿Cuál es el área aproximada a pintar?";
    }

    // Horarios y contacto
    if (/(horario|atención|cuándo|abre|cierra)/i.test(msg)) {
      return "Nuestro horario de atención es:\n• Lunes a Viernes: 8:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 2:00 PM\n• Domingos: Cerrado\n\n¿Qué día te gustaría agendar una visita?";
    }

    if (/(dónde|ubicación|dirección)/i.test(msg)) {
      return "Atendemos en Bogotá y municipios aledaños. No tenemos oficina fija, pero podemos visitarte en tu ubicación para evaluar el proyecto. ¿En qué zona estás ubicado?";
    }

    // WhatsApp solo para acciones concretas
    if (/(agendar|visita|presupuesto.*enviar|cotización.*enviar|hablar.*asesor)/i.test(msg)) {
      return {
        text: "¡Perfecto! Para agendar una visita o enviarte un presupuesto detallado, por favor contáctanos por WhatsApp.",
        showWhatsApp: true
      };
    }

    // Respuesta por defecto mejorada
    return {
      text: "Gracias por tu mensaje. 👋\n\nHe intentado responder tu pregunta, pero para darte una información más precisa, ¿podrías reformularla o contactarnos directamente por WhatsApp?",
      showWhatsApp: true
    };
  }

  function botReply(text) {
    const response = getBotReply(text);
    let replyText, showWhatsAppButton = false;

    if (typeof response === 'string') {
      replyText = response;
    } else {
      replyText = response.text;
      showWhatsAppButton = response.showWhatsApp;
    }

    if (chatBody) {
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-msg';
      botMsg.textContent = replyText;
      chatBody.appendChild(botMsg);

      if (showWhatsAppButton) {
        const waButton = document.createElement('a');
        waButton.href = 'https://wa.me/573042096459?text=Hola,%20vi%20el%20chat%20de%20su%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n';
        waButton.target = '_blank';
        waButton.rel = 'noopener';
        waButton.className = 'chat-whatsapp-btn';
        waButton.textContent = '💬 Contactar por WhatsApp';
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

  // Manejo del formulario
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
