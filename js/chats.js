document.addEventListener('DOMContentLoaded', function () {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    const buyingTab = document.getElementById('buyingTab');
    const sellingTab = document.getElementById('sellingTab');
    const searchInput = document.getElementById('searchInput');
    const conversationList = document.getElementById('conversationList');
    const conversationItems = document.querySelectorAll('.conversation-item');
    const notificationBadge = document.getElementById('notificationBadge');
    const buyingBadge = document.getElementById('buyingBadge');
    const sellingBadge = document.getElementById('sellingBadge');

    let activeTab = 'buying';


    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle('user-dropdown--active');
        });

        document.addEventListener('click', function (e) {
            if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('user-dropdown--active');
            }
        });

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                    logoutBtn.innerHTML = '<span>⏳</span> Cerrando sesión...';

                    setTimeout(() => {
                        showToast('Sesión cerrada exitosamente', 'success');
                        setTimeout(() => {
                            window.location.href = '#login';
                        }, 1000);
                    }, 1500);
                }
            });
        }
    }

    function switchTab(tabType) {
        activeTab = tabType;
        conversationItems.forEach(item => {
            if (item.dataset.type === tabType) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        buyingTab.classList.toggle('message-tabs__tab--active', tabType === 'buying');
        sellingTab.classList.toggle('message-tabs__tab--active', tabType === 'selling');
        buyingBadge.style.display = tabType === 'buying' ? 'inline-block' : 'none';
        sellingBadge.style.display = tabType === 'selling' ? 'inline-block' : 'none';
    }
    buyingTab.addEventListener('click', () => switchTab('buying'));
    sellingTab.addEventListener('click', () => switchTab('selling'));
    switchTab('buying');

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        conversationItems.forEach(item => {
            const name = item.querySelector('.conversation__name').textContent.toLowerCase();
            const product = item.querySelector('.conversation__product').textContent.toLowerCase();
            if (name.includes(query) || product.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    // Show all conversations on empty search
    searchInput.addEventListener('focus', function () {
        if (this.value === '') {
            conversationItems.forEach(item => {
                item.style.display = item.dataset.type === activeTab ? 'flex' : 'none';
            });
        }
    });
    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastIcon = document.getElementById('toastIcon');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;
        toast.className = 'toast toast--show';

        if (type === 'error') {
            toast.classList.add('toast--error');
            toastIcon.textContent = '❌';
        } else {
            toast.classList.remove('toast--error');
            toastIcon.textContent = '✅';
        }

        setTimeout(() => {
            toast.classList.remove('toast--show');
        }, 3000);
    }
    setTimeout(() => {
        notificationBadge.textContent = '5';
        showToast('Tienes nuevas notificaciones', 'success');
    }, 2000);
});
