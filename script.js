// ===== ДАННЫЕ ПРОЕКТОВ =====
const projects = [
    {
        id: 1,
        title: "Развлечения",
        description: "Сайт показывающий интересы",
        tags: ["html", "css", "js", "animation"],
        image: "images/Screenshot_11.png",
        category: "other",
        demo: "https://zaya1437.github.io/love/",
        repo: "https://github.com/zaya1437/love",
        real: true
    },
    {
        id: 2,
        title: "Визитка",
        description: "Визитная карточка",
        tags: ["html", "css", "js", "animation"],
        image: "images/image.png",
        category: "landing",
        demo: "https://zaya1437.github.io/testo/",
        repo: "https://github.com/zaya1437/testo",
        real: true
    },
    {
        id: 3,
        title: "Ждет заказа",
        description: "Скоро узнаем",
        tags: ["html", "css", "js", "portfolio", "responsive"],
        image: "https://img.freepik.com/premium-photo/it-developer-with-stressful-overworked-creating-online-software-code-gusher_31965-645301.jpg?semt=ais_hybrid&w=740",
        category: "portfolio",
        demo: "#",
        repo: "#",
        real: false
    },

];

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentFilter = 'all';
let currentTheme = localStorage.getItem('theme') || 'dark';

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();
    renderProjects();
    setupEventListeners();
    initAnimations();
    initScrollEffects();
    initFormValidation();
});

// ===== ТЕМА =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        updateThemeButton('light');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        updateThemeButton('dark');
    }
}

function toggleTheme() {
    if (currentTheme === 'dark') {
        currentTheme = 'light';
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        updateThemeButton('dark');
    } else {
        currentTheme = 'dark';
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        updateThemeButton('light');
    }
    
    localStorage.setItem('theme', currentTheme);
    updateParticles();
}

function updateThemeButton(targetTheme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    const themeText = document.querySelector('.theme-text');
    
    if (targetTheme === 'light') {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Темная тема';
    } else {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Светлая тема';
    }
}

// ===== ЧАСТИЦЫ ФОНА =====
function createParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

function updateParticles() {
    const particles = document.querySelectorAll('.particle');
    const isDark = document.body.classList.contains('dark-theme');
    const color = isDark ? '#60a5fa' : '#3b82f6';
    
    particles.forEach(particle => {
        particle.style.background = color;
    });
}

// ===== ПОРТФОЛИО =====
function renderProjects() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredProjects = currentFilter === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentFilter);
    
    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-code" style="font-size: 3rem; color: var(--text-tertiary); margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 10px;">Пока нет проектов в этой категории</h3>
                <p style="color: var(--text-tertiary); max-width: 400px; margin: 0 auto;">
                    Работаю над новыми проектами. Скоро здесь появятся новые работы!
                </p>
            </div>
        `;
        return;
    }
    
    filteredProjects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
    
    // Анимация появления
    animateElements('.portfolio-item');
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'portfolio-item';
    card.dataset.id = project.id;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <span class="project-badge">${project.category.toUpperCase()}</span>
            ${project.real ? '<span class="project-real-badge">Реальный проект</span>' : ''}
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-actions">
                <button class="btn btn-outline view-details" data-id="${project.id}">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
                <a href="${project.demo}" 
                   class="btn btn-primary" 
                   ${project.demo === '#' ? 'onclick="return false;"' : 'target="_blank"'}
                   ${project.demo === '#' ? 'style="opacity: 0.7; cursor: default;"' : ''}>
                    <i class="fas fa-external-link-alt"></i> Демо
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// ===== МОДАЛЬНОЕ ОКНО =====
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>${project.title}</h3>
            <p class="modal-subtitle">${project.description}</p>
        </div>
        
        <div class="modal-body">
            <div class="modal-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            
            <div class="modal-section">
                <h4><i class="fas fa-bullseye"></i> Цель проекта</h4>
                <p>Создание ${project.category === 'landing' ? 'продающего лендинга' : 
                              project.category === 'portfolio' ? 'портфолио' : 
                              'веб-приложения'} с современным дизайном.</p>
            </div>
            
            <div class="modal-section">
                <h4><i class="fas fa-code"></i> Технологии</h4>
                <div class="modal-tech">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4><i class="fas fa-link"></i> Ссылки</h4>
                <div class="modal-links">
                    <a href="${project.demo}" 
                       class="btn btn-primary" 
                       ${project.demo === '#' ? 'onclick="return false;"' : 'target="_blank"'}
                       ${project.demo === '#' ? 'style="opacity: 0.7; cursor: default;"' : ''}>
                        <i class="fas fa-external-link-alt"></i> Демо сайта
                    </a>
                    <a href="${project.repo}" 
                       class="btn btn-outline" 
                       ${project.repo === '#' ? 'onclick="return false;"' : 'target="_blank"'}
                       ${project.repo === '#' ? 'style="opacity: 0.7; cursor: default;"' : ''}>
                        <i class="fab fa-github"></i> Исходный код
                    </a>
                </div>
            </div>
            
            ${project.real ? `
                <div class="modal-section">
                    <div class="modal-note">
                        <i class="fas fa-star"></i>
                        <p>Это реальный проект, созданный для демонстрации навыков</p>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== ФОРМА =====
function initFormValidation() {
    const contactInput = document.getElementById('contact');
    const budgetSlider = document.getElementById('budget');
    const budgetDisplay = document.getElementById('budget-display');
    
    if (contactInput) {
        contactInput.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.includes('@')) {
                this.type = 'email';
            } else if (/^[\d\s\-\+\(\)]+$/.test(value)) {
                this.type = 'tel';
            } else {
                this.type = 'text';
            }
        });
    }
    
    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            budgetDisplay.textContent = `${value.toLocaleString('ru-RU')} ₽`;
        });
        
        // Установить начальное значение
        const initialValue = parseInt(budgetSlider.value);
        budgetDisplay.textContent = `${initialValue.toLocaleString('ru-RU')} ₽`;
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('#name');
    const contact = form.querySelector('#contact');
    const projectType = form.querySelector('#project-type');
    const message = form.querySelector('#message');
    const submitBtn = form.querySelector('.btn-submit');
    const loader = submitBtn.querySelector('.btn-loader');
    const successMessage = form.querySelector('#success-message');
    
    // Валидация
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    
    if (!name.value.trim()) {
        showError('name-error', 'Введите ваше имя');
        isValid = false;
    }
    
    if (!contact.value.trim()) {
        showError('contact-error', 'Введите email или телефон');
        isValid = false;
    } else {
        const contactValue = contact.value.trim();
        const isEmail = contactValue.includes('@');
        const isPhone = /^[\d\s\-\+\(\)]{10,}$/.test(contactValue.replace(/[\s\-\+\(\)]/g, ''));
        
        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
            showError('contact-error', 'Введите корректный email');
            isValid = false;
        } else if (isPhone && contactValue.replace(/[\s\-\+\(\)]/g, '').length < 10) {
            showError('contact-error', 'Введите корректный телефон (минимум 10 цифр)');
            isValid = false;
        } else if (!isEmail && !isPhone) {
            showError('contact-error', 'Введите email или телефон');
            isValid = false;
        }
    }
    
    if (!projectType.value) {
        showError('type-error', 'Выберите тип проекта');
        isValid = false;
    }
    
    if (!message.value.trim() || message.value.trim().length < 10) {
        showError('message-error', 'Опишите проект подробнее (минимум 10 символов)');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Отправка формы
    try {
        submitBtn.disabled = true;
        loader.style.display = 'block';
        submitBtn.querySelector('span').textContent = 'Отправка...';
        
        // Симуляция отправки
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Успешная отправка
        successMessage.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--success); margin-bottom: 10px;"></i>
                <h4 style="margin-bottom: 8px; color: var(--text-primary);">Заявка отправлена!</h4>
                <p style="color: var(--text-secondary);">Спасибо, ${name.value}! Я свяжусь с вами в течение 1 часа.</p>
            </div>
        `;
        successMessage.style.display = 'block';
        
        // Сброс формы
        form.reset();
        const budgetSlider = document.getElementById('budget');
        const budgetDisplay = document.getElementById('budget-display');
        if (budgetSlider && budgetDisplay) {
            const initialValue = parseInt(budgetSlider.value);
            budgetDisplay.textContent = `${initialValue.toLocaleString('ru-RU')} ₽`;
        }
        
        // Прокрутка к сообщению
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Логирование
        console.log('Новая заявка:', {
            name: name.value,
            contact: contact.value,
            projectType: projectType.value,
            message: message.value,
            timestamp: new Date().toISOString()
        });
        
        // Скрыть сообщение через 5 секунд
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
        submitBtn.disabled = false;
        loader.style.display = 'none';
        submitBtn.querySelector('span').textContent = 'Отправить заявку';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

// ===== АНИМАЦИИ =====
function initAnimations() {
    // Анимация счетчиков
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
    });
    
    // Анимация навыков
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const level = bar.dataset.level;
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 500);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

function animateElements(selector) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ===== СКРОЛЛ ЭФФЕКТЫ =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Эффект навигации
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Подсветка активного раздела
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function setupEventListeners() {
    // Переключатель темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Фильтры портфолио
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Обновляем активную кнопку
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Обновляем фильтр и рендерим проекты
            currentFilter = btn.dataset.filter;
            renderProjects();
        });
    });
    
    // Открытие модального окна
    document.addEventListener('click', (e) => {
        if (e.target.closest('.view-details')) {
            const projectId = parseInt(e.target.closest('.view-details').dataset.id);
            openProjectModal(projectId);
        }
    });
    
    // Закрытие модального окна
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Escape для закрытия модального окна
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// ===== ЗАПУСК АНИМАЦИЙ ПРИ ЗАГРУЗКЕ =====
window.addEventListener('load', () => {
    setTimeout(() => {
        animateElements('.about-card');
        animateElements('.skill-category');
    }, 500);
});
// ===== НАСТРОЙКИ TELEGRAM =====
const TELEGRAM_BOT_TOKEN = '8573978609:AAEreVNtWGSHtu9beU67HJ7fx7atddb0zjI';
const TELEGRAM_CHAT_ID = '8573978609';

// ===== ФУНКЦИЯ ОТПРАВКИ В TELEGRAM =====
async function sendToTelegram(formData) {
    try {
        // Формируем сообщение
        const message = `
📧 *Новая заявка с сайта*

👤 *Имя:* ${formData.name}
📞 *Контакты:* ${formData.contact}
🎯 *Тип проекта:* ${formData.projectType}
💰 *Бюджет:* ${formData.budget} ₽
📝 *Сообщение:*
${formData.message}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}
        `;
        
        // Отправляем запрос к API Telegram
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        return data.ok;
        
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

// ===== ОБНОВЛЕННАЯ ФУНКЦИЯ ОТПРАВКИ ФОРМЫ =====
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('#name');
    const contact = form.querySelector('#contact');
    const projectType = form.querySelector('#project-type');
    const message = form.querySelector('#message');
    const budgetSlider = document.getElementById('budget');
    const submitBtn = form.querySelector('.btn-submit');
    const loader = submitBtn.querySelector('.btn-loader');
    const successMessage = form.querySelector('#success-message');
    
    // Валидация
    if (!validateForm(name, contact, projectType, message)) {
        return;
    }
    
    try {
        // Показать загрузку
        submitBtn.disabled = true;
        loader.style.display = 'block';
        submitBtn.querySelector('span').textContent = 'Отправка...';
        
        // Собираем данные
        const formData = {
            name: name.value.trim(),
            contact: contact.value.trim(),
            projectType: projectType.options[projectType.selectedIndex].text,
            budget: parseInt(budgetSlider.value).toLocaleString('ru-RU'),
            message: message.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Отправляем в Telegram
        const telegramSent = await sendToTelegram(formData);
        
        if (telegramSent) {
            // Успешная отправка
            showSuccessMessage(formData.name, successMessage);
            
            // Сброс формы
            form.reset();
            updateBudgetDisplay();
            
            // Логирование
            console.log('Заявка отправлена в Telegram:', formData);
            
        } else {
            throw new Error('Не удалось отправить заявку');
        }
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        showErrorMessage('Произошла ошибка при отправке. Попробуйте связаться со мной напрямую в Telegram: @Zaya1437');
    } finally {
        submitBtn.disabled = false;
        loader.style.display = 'none';
        submitBtn.querySelector('span').textContent = 'Отправить заявку';
    }
}

// ===== ВАЛИДАЦИЯ ФОРМЫ =====
function validateForm(name, contact, projectType, message) {
    let isValid = true;
    
    // Сброс ошибок
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    
    // Проверка имени
    if (!name.value.trim()) {
        showError('name-error', 'Введите ваше имя');
        isValid = false;
    }
    
    // Проверка контакта
    const contactValue = contact.value.trim();
    if (!contactValue) {
        showError('contact-error', 'Введите email или телефон');
        isValid = false;
    } else {
        const isEmail = contactValue.includes('@');
        const isPhone = /^[\d\s\-\+\(\)]{10,}$/.test(contactValue.replace(/[\s\-\+\(\)]/g, ''));
        
        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
            showError('contact-error', 'Введите корректный email');
            isValid = false;
        } else if (isPhone && contactValue.replace(/[\s\-\+\(\)]/g, '').length < 10) {
            showError('contact-error', 'Введите корректный телефон (минимум 10 цифр)');
            isValid = false;
        } else if (!isEmail && !isPhone) {
            showError('contact-error', 'Введите email или телефон');
            isValid = false;
        }
    }
    
    // Проверка типа проекта
    if (!projectType.value) {
        showError('type-error', 'Выберите тип проекта');
        isValid = false;
    }
    
    // Проверка сообщения
    if (!message.value.trim() || message.value.trim().length < 10) {
        showError('message-error', 'Опишите проект подробнее (минимум 10 символов)');
        isValid = false;
    }
    
    return isValid;
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function showSuccessMessage(userName, element) {
    element.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--success); margin-bottom: 10px;"></i>
            <h4 style="margin-bottom: 8px; color: var(--text-primary);">Заявка отправлена!</h4>
            <p style="color: var(--text-secondary); margin-bottom: 15px;">Спасибо, ${userName}! Я свяжусь с вами в течение 1 часа.</p>
            <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 10px;">
                    <i class="fab fa-telegram"></i> 
                    Вы также можете написать мне напрямую в Telegram:
                </p>
                <a href="https://t.me/Zaya1437" target="_blank" style="
                    display: inline-block;
                    background: var(--primary);
                    color: white;
                    padding: 8px 20px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 600;
                ">
                    <i class="fab fa-telegram"></i> Написать в Telegram
                </a>
            </div>
        </div>
    `;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 10000);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: var(--danger);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: center;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    const form = document.getElementById('contact-form');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);

}

