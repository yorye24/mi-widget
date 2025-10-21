// Script simple para chatbot y año dinámico
document.addEventListener('DOMContentLoaded', function(){
  // poner año en footers
  var y = new Date().getFullYear();
  var els = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3'), document.getElementById('year4')];
  els.forEach(function(el){ if(el) el.textContent = y; });

  // Chat open/close
  var openBtn = document.getElementById('open-chat');
  var chat = document.querySelectorAll('#chatbot')[0] || document.querySelector('.chatbot');
  var chatClose = document.getElementById('chat-close');
  var chatForm = document.getElementById('chat-form');
  var chatBody = document.getElementById('chat-body');
  var chatInput = document.getElementById('chat-input');

  function openChat(){
    if(chat) chat.classList.remove('closed');
    if(openBtn) openBtn.style.display = 'none';
  }
  function closeChat(){
    if(chat) chat.classList.add('closed');
    if(openBtn) openBtn.style.display = 'block';
  }

  if(openBtn) openBtn.addEventListener('click', openChat);
  if(chatClose) chatClose.addEventListener('click', closeChat);

  // Simple bot logic
  function botReply(text){
    text = (text || '').toLowerCase();
    var reply = "Gracias por tu mensaje. En breve un asesor real se comunicará contigo.";
    if(text.includes('hora') || text.includes('horario')) reply = "Nuestro horario de atención es Lunes a Viernes, 8:00 - 18:00. ¿Qué día te acomoda?";
    else if(text.includes('precio') || text.includes('cotiz')) reply = "Para darte un presupuesto necesitamos la dirección y una breve descripción del servicio. ¿Quieres enviarla por WhatsApp?";
    else if(text.includes('visita') || text.includes('agenda') || text.includes('cita')) reply = "Podemos programar una visita. ¿Qué días y horarios te vienen bien?";
    else if(text.includes('hola') || text.includes('buen') || text.includes('buenos')) reply = "¡Hola! ¿En qué servicio estás interesado? (Interiores / Soporte / Pintura)";
    // append reply
    var botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = reply;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if(chatForm){
    chatForm.addEventListener('submit', function(e){
      e.preventDefault();
      var val = chatInput.value.trim();
      if(!val) return;
      var userMsg = document.createElement('div');
      userMsg.className = 'user-msg';
      userMsg.textContent = val;
      chatBody.appendChild(userMsg);
      chatInput.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;
      setTimeout(function(){ botReply(val); }, 800);
    });
  }
});
