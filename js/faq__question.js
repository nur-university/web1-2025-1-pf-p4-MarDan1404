document.addEventListener('DOMContentLoaded', function () {

            document.querySelectorAll('.faq__question').forEach(question => {
                question.addEventListener('click', function () {
                    const answer = question.nextElementSibling;
                    const icon = question.querySelector('span');

                    if (answer.style.display === 'block') {
                        answer.style.display = 'none';
                        icon.textContent = '+';
                    } else {
                        document.querySelectorAll('.faq__answer').forEach(a => a.style.display = 'none');
                        document.querySelectorAll('.faq__question span').forEach(i => i.textContent = '+');

                        answer.style.display = 'block';
                        icon.textContent = '−';
                    }
                });
            });
        });