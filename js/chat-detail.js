document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messagesContainer');
    const typingIndicator = document.getElementById('typingIndicator');


    if (backButton) {
        backButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'chats.html';
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';

            if (this.value.trim() && !typingIndicator.style.display === 'flex') {
                showTypingIndicator();
            }
        });

        messageInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                messageForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    if (messageForm) {
        messageForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const messageText = messageInput.value.trim();
            if (!messageText) return;

            sendButton.disabled = true;
            sendButton.classList.add('chat__send-button--sending');

            addMessage(messageText, true);

            messageInput.value = '';
            messageInput.style.height = 'auto';

            hideTypingIndicator();

            setTimeout(() => {
                sendButton.disabled = false;
                sendButton.classList.remove('chat__send-button--sending');

                setTimeout(() => {
                    simulateResponse();
                }, 2000);
            }, 1000);
        });
    }

    function addMessage(text, isSent = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isSent ? 'message--sent' : 'message--received'}`;

        const currentTime = new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
                    <div class="message__avatar">${isSent ? 'TU' : 'JS'}</div>
                    <div class="message__content">
                        <div class="message__text">${text}</div>
                        <div class="message__time">${currentTime}</div>
                    </div>
                `;

        const messagesList = document.getElementById('messagesList');
        messagesList.insertBefore(messageDiv, typingIndicator);

        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';

        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);

        scrollToBottom();
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    function simulateResponse() {
        const responses = [
            "¡Perfecto! El sábado por la mañana me viene muy bien.",
            "¿Te parece si nos vemos a las 10:00 AM?",
            "¿Tienes alguna pregunta más sobre el vehículo?",
            "Gracias por tu interés. ¿Cuándo te gustaría verlo?",
            "Sin problema, podemos coordinar una cita."
        ];

        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, false);
        }, 2000);
    }

    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.textContent.includes('Ver Detalle')) {
                console.log('Navigating to product detail...');
            } else if (this.textContent.includes('Guardar')) {
                if (this.textContent.includes('Guardar')) {
                    this.textContent = '💚 Guardado';
                    this.classList.remove('btn--secondary');
                    this.classList.add('btn--primary');
                } else {
                    this.textContent = 'Guardar';
                    this.classList.remove('btn--primary');
                    this.classList.add('btn--secondary');
                }
            }
        });
    });

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 35, 0.98)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
        }
    });

    scrollToBottom();

    setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessage("¿Alguna pregunta más sobre el Tesla?", false);
        }, 3000);
    }, 5000);

    if (messageInput) {
        messageInput.focus();
    }

    let isOnline = true;
    const statusIndicator = document.querySelector('.chat__status-indicator');
    const onlineDot = document.querySelector('.chat__online-dot');
    const statusText = document.querySelector('.chat__status');

    setInterval(() => {
        if (Math.random() < 0.1) {
            isOnline = !isOnline;

            if (isOnline) {
                statusIndicator.style.background = 'var(--color-online)';
                onlineDot.style.background = 'var(--color-online)';
                statusText.innerHTML = '<div class="chat__online-dot"></div>En línea • Responde usualmente en 1 hora';
            } else {
                statusIndicator.style.background = 'var(--color-text-muted)';
                onlineDot.style.background = 'var(--color-text-muted)';
                statusText.innerHTML = '<div class="chat__online-dot" style="background: var(--color-text-muted);"></div>Última vez hace 5 min';
            }
        }
    }, 10000);

    const messagesList = document.getElementById('messagesList');
    messagesList.addEventListener('dblclick', function (e) {
        const messageContent = e.target.closest('.message__content');
        if (messageContent && !messageContent.querySelector('.message__reaction')) {
            const reaction = document.createElement('div');
            reaction.className = 'message__reaction';
            reaction.style.cssText = `
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        background: var(--color-error);
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.7rem;
                        animation: bounceIn 0.3s ease;
                    `;
            reaction.textContent = '❤️';
            messageContent.appendChild(reaction);

            setTimeout(() => {
                if (reaction.parentNode) {
                    reaction.remove();
                }
            }, 3000);
        }
    });
});