document.addEventListener('DOMContentLoaded', function () {
    const viewToggleButtons = document.querySelectorAll('.view-toggle__btn');
    const adsGrid = document.getElementById('adsGrid');

    viewToggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            viewToggleButtons.forEach(btn => btn.classList.remove('view-toggle__btn--active'));
            this.classList.add('view-toggle__btn--active');

            const view = this.getAttribute('data-view');
            if (view === 'list') {
                adsGrid.classList.add('ads-grid--list');
            } else {
                adsGrid.classList.remove('ads-grid--list');
            }
        });
    });

    const searchInput = document.querySelector('.search-bar__input');
    const searchButton = document.querySelector('.search-bar__button');
    const adsCount = document.querySelector('.ads-listing__count');

    function performSearch() {
        const query = searchInput.value.trim();
        const adCards = document.querySelectorAll('.ad-card');
        let visibleCount = 0;

        adCards.forEach(card => {
            const title = card.querySelector('.ad-card__title').textContent.toLowerCase();
            const seller = card.querySelector('.ad-card__seller').textContent.toLowerCase();

            if (query === '' || title.includes(query.toLowerCase()) || seller.includes(query.toLowerCase())) {
                card.style.display = 'block';
                visibleCount++;

                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, Math.random() * 200);
            } else {
                card.style.display = 'none';
            }
        });

        adsCount.textContent = `Mostrando ${visibleCount} anuncios`;

        if (query) {
            adsCount.textContent += ` para "${query}"`;
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
