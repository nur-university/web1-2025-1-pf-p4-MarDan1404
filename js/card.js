document.addEventListener('DOMContentLoaded', function () {


            document.querySelectorAll('.category-card').forEach(card => {
                card.addEventListener('mouseenter', function () {
                    card.style.transform = 'translateY(-4px) scale(1.02)';
                });

                card.addEventListener('mouseleave', function () {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        });