// Плавная прокрутка для навигационных ссылок
// Теперь только если секция существует

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить отправку формы на сервер
        alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
}); 