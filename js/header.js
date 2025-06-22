document.addEventListener('DOMContentLoaded', function () {
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    mobileMenu.classList.toggle('mobile-menu--active');

                    if (mobileMenu.classList.contains('mobile-menu--active')) {
                        mobileMenuButton.textContent = '✕';
                    } else {
                        mobileMenuButton.textContent = '☰';
                    }
                });

                document.querySelectorAll('.mobile-menu__nav-link, .mobile-menu__auth-link').forEach(link => {
                    link.addEventListener('click', function () {
                        mobileMenu.classList.remove('mobile-menu--active');
                        mobileMenuButton.textContent = '☰';
                    });
                });

                document.addEventListener('click', function (e) {
                    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                        mobileMenu.classList.remove('mobile-menu--active');
                        mobileMenuButton.textContent = '☰';
                    }
                });

                window.addEventListener('resize', function () {
                    if (window.innerWidth >= 768) {
                        mobileMenu.classList.remove('mobile-menu--active');
                        mobileMenuButton.textContent = '☰';
                    }
                });
            }
        }
);



window.addEventListener('scroll', function () {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 15, 35, 0.98)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
            }
        });