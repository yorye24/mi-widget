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
    if
