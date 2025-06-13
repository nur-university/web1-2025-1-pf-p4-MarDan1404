document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.image-gallery__thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            thumbnails.forEach(thumb => thumb.classList.remove('image-gallery__thumbnail--active'));
            this.classList.add('image-gallery__thumbnail--active');
            const imageTexts = [
                'Imagen Principal del Tesla Model 3',
                'Vista Lateral del Tesla Model 3',
                'Interior del Tesla Model 3',
                'Panel de Control del Tesla Model 3',
                'Maletero del Tesla Model 3'
            ];

            mainImage.textContent = imageTexts[index] || 'Imagen del Tesla Model 3';
        });
    });

    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageModal = document.getElementById('messageModal');
    const closeModal = document.getElementById('closeModal');
    const messageForm = document.getElementById('messageForm');
    const messageText = document.getElementById('messageText');

    sendMessageBtn.addEventListener('click', function () {
        const isLoggedIn = false;

        if (!isLoggedIn) {
            showToast('Debes iniciar sesión para enviar mensajes', false);
            setTimeout(() => {
                window.location.href = '#login';
            }, 1500);
            return;
        }
        messageModal.classList.add('modal--active');
        messageText.focus();
        document.body.style.overflow = 'hidden';
    });

    function closeMessageModal() {
        messageModal.classList.remove('modal--active');
        document.body.style.overflow = '';
        messageText.value = '';
    }

    closeModal.addEventListener('click', closeMessageModal);

    messageModal.addEventListener('click', function (e) {
        if (e.target === messageModal) {
            closeMessageModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && messageModal.classList.contains('modal--active')) {
            closeMessageModal();
        }
    });

    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const message = messageText.value.trim();

        if (message.length < 10) {
            showToast('El mensaje debe tener al menos 10 caracteres', false);
            return;
        }

        const submitButton = e.target.querySelector('.btn');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<span style="animation: spin 1s linear infinite;">⏳</span> Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            showToast('Mensaje enviado correctamente', true);
            closeMessageModal();

            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });

    const saveAdBtn = document.getElementById('saveAdBtn');
    let isSaved = false;

    saveAdBtn.addEventListener('click', function () {
        const isLoggedIn = false;

        if (!isLoggedIn) {
            showToast('Debes iniciar sesión para guardar anuncios', false);
            setTimeout(() => {
                window.location.href = '#login';
            }, 1500);
            return;
        }

        isSaved = !isSaved;

        if (isSaved) {
            this.innerHTML = '<span>💚</span> Guardado';
            this.classList.remove('btn--secondary');
            this.classList.add('btn--success');
            showToast('Anuncio guardado en favoritos', true);
        } else {
            this.innerHTML = '<span>❤️</span> Guardar Anuncio';
            this.classList.remove('btn--success');
            this.classList.add('btn--secondary');
            showToast('Anuncio removido de favoritos', true);
        }
    });

    document.querySelectorAll('.similar-ad').forEach(ad => {
        ad.addEventListener('click', function () {
            showToast('Navegando al anuncio...', true);
        });
    });

    function showToast(message, isSuccess = true) {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;
        toast.style.background = isSuccess ? 'var(--color-success)' : 'var(--color-error)';
        toast.querySelector('span').textContent = isSuccess ? '✅' : '❌';

        toast.style.transform = 'translateX(0)';

        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
        }, 3000);
    }

    document.querySelectorAll('.breadcrumb__link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Navegando...', true);
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

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.ad-info, .seller-info, .similar-ad').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});