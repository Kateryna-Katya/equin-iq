// Переключение стилей хедера при скролле
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
      header.style.padding = '15px 0';
      header.style.background = 'rgba(15, 17, 21, 0.95)';
  } else {
      header.style.padding = '20px 0';
      header.style.background = 'rgba(15, 17, 21, 0.8)';
  }
});

// Плавная навигация
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});
// 1. Анимация появления элементов при скролле (Intersection Observer)
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('active');
      }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// 2. Легкий параллакс для сфер на главном экране
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const sphere1 = document.querySelector('.sphere--1');
  const sphere2 = document.querySelector('.sphere--2');

  if(sphere1) sphere1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
  if(sphere2) sphere2.style.transform = `translate(${x * -60}px, ${y * -60}px)`;
});
// Добавьте этот код в конец script.js
window.addEventListener('scroll', () => {
  const visual = document.querySelector('.benefits__visual');
  if (visual) {
      const speed = 0.05;
      const rect = visual.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yOffset = (window.innerHeight - rect.top) * speed;
          document.querySelector('.b-card--1').style.transform = `translateY(${yOffset}px)`;
          document.querySelector('.b-card--2').style.transform = `translateY(${-yOffset}px)`;
      }
  }
});
// Эффект следования свечения за мышью
document.querySelectorAll('.innovation-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.querySelector('.innovation-card__glow').style.setProperty('--x', `${x}px`);
      card.querySelector('.innovation-card__glow').style.setProperty('--y', `${y}px`);
  });
});
// Генерация математической капчи
const captchaQuest = document.getElementById('captcha-question');
let captchaResult = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    if(captchaQuest) captchaQuest.textContent = `${a} + ${b} = ?`;
}

generateCaptcha();

// Обработка формы
const contactForm = document.getElementById('ajax-form');
const formMessage = document.getElementById('form-message');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    const userAnswer = parseInt(document.getElementById('captcha-answer').value);

    if (userAnswer !== captchaResult) {
        formMessage.textContent = "Ошибка капчи. Попробуйте снова.";
        formMessage.className = "form__message error";
        generateCaptcha();
        return;
    }

    // Имитация AJAX
    const submitBtn = this.querySelector('button');
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    setTimeout(() => {
        formMessage.textContent = "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.";
        formMessage.className = "form__message success";
        contactForm.reset();
        generateCaptcha();
        submitBtn.textContent = "Запросить доступ";
        submitBtn.disabled = false;

        // Скрыть сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});
// --- Логика Cookie Popup ---
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

window.addEventListener('load', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }
});

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.remove('active');
});

// --- Мобильное меню ---
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function toggleMenu() {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});