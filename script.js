// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                
                // Убираем активный класс со всех ссылок
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Добавляем активный класс к текущей ссылке
                this.classList.add('active');
                
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
        
        // Получаем данные формы
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Простая валидация
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }
        
        // Здесь можно добавить отправку формы на сервер
        alert(`Спасибо, ${name}! Я свяжусь с вами на ${email} в ближайшее время.`);
        this.reset();
    });
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем анимацию появления для всех секций
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
}); 

// Добавляем класс при скролле для навигации
const nav = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Обновляем активную ссылку при скролле
    updateActiveNavLink();
});

// Функция для обновления активной ссылки при скролле
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Анимация для навыков
const skillItems = document.querySelectorAll('.skill-category li');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('skill-animate');
});

// Интерактивность для проектов
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(204, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
});

// Добавляем плавную анимацию для всех элементов
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления заголовков
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach((heading, index) => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heading.style.transition = 'all 0.8s ease';
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Анимация для социальных иконок
    const socialIcons = document.querySelectorAll('.btn-icon, .social-links a');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 1000 + index * 100);
    });
    
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Swipe жесты для мобильного меню
        let startX = 0;
        let startY = 0;
        
        navLinks.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        navLinks.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            let endX = e.touches[0].clientX;
            let endY = e.touches[0].clientY;
            
            let diffX = startX - endX;
            let diffY = startY - endY;
            
            // Если свайп влево больше чем вверх/вниз
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                startX = 0;
                startY = 0;
            }
        });
        
        // Закрытие по свайпу вниз
        navLinks.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            let endX = e.changedTouches[0].clientX;
            let endY = e.changedTouches[0].clientY;
            
            let diffY = startY - endY;
            
            if (diffY > 50) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            startX = 0;
            startY = 0;
        });
    }
});