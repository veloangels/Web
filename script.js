document.addEventListener('DOMContentLoaded', () => {
    // --- Código existente del menú móvil y scroll suave ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Código existente de la animación del canvas ---
    const canvas = document.getElementById('header-animation-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let fallingElements = [];
    let collisionBoxRects = [];

    const numDustParticles = 60;
    const particleColor = 'rgba(255, 215, 0, 0.8)';
    const particleMinRadius = 0.5;
    const particleMaxRadius = 1.5;
    const particleSpeed = 0.2;
    const numFallingElements = 10;
    const baseFallingElementSpeed = 0.6;
    const dollarSignColor = 'rgba(255, 215, 0, 0.8)';
    const dollarMinSize = 15;
    const dollarMaxSize = 25;

    function updateCollisionBoxRects() {
        collisionBoxRects = [];
        const elements = document.querySelectorAll('.text-box-collide');
        elements.forEach(el => {
            collisionBoxRects.push(el.getBoundingClientRect());
        });
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateCollisionBoxRects();
        initParticles();
        initFallingElements();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * (particleMaxRadius - particleMinRadius) + particleMinRadius;
            this.color = particleColor;
            this.speedX = (Math.random() - 0.5) * 2 * particleSpeed;
            this.speedY = (Math.random() - 0.5) * 2 * particleSpeed;
            this.opacity = 0.6 + Math.random() * 0.2;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = this.radius * 2;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }
    }

    class FallingElement {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = (Math.random() * canvas.height * 0.5) - (canvas.height * 0.5) - dollarMaxSize;
            this.size = Math.random() * (dollarMaxSize - dollarMinSize) + dollarMinSize;
            this.speedY = baseFallingElementSpeed + (Math.random() - 0.5) * 0.4;
            this.opacity = 0.6 + Math.random() * 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `bolder ${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = dollarSignColor;
            ctx.shadowColor = dollarSignColor;
            ctx.shadowBlur = this.size * 0.2;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillText('$', 0, 0);
            ctx.restore();
        }
        update() {
            this.rotation += this.rotationSpeed;
            this.y += this.speedY;
            
            if (this.y > canvas.height + this.size) {
                this.y = -this.size - Math.random() * 50;
                this.x = Math.random() * canvas.width;
                this.speedY = baseFallingElementSpeed + (Math.random() - 0.5) * 0.4;
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < numDustParticles; i++) {
            particles.push(new Particle());
        }
    }

    function initFallingElements() {
        fallingElements = [];
        for (let i = 0; i < numFallingElements; i++) {
            fallingElements.push(new FallingElement());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        fallingElements.forEach(fe => { fe.update(); fe.draw(); });
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', updateCollisionBoxRects, { passive: true });
    setTimeout(updateCollisionBoxRects, 200);

    // --- NUEVO: LÓGICA DE TRADUCCIÓN ---
    const languageSwitchBtn = document.getElementById('language-switch-btn');

    // **IMPORTANTE**: DEBES COMPLETAR ESTE OBJETO CON TODAS TUS TRADUCCIONES
    const translations = {
        es: {
            page_title: "VÉLO ANGELS AGENCY - Impulsa tu Éxito",
            nav_home: "Inicio",
            nav_about: "Quiénes Somos",
            nav_services: "Servicios",
            nav_join: "Únete",
            nav_contact: "Contacto",
            hero_title: "Impulsa Tu Éxito en OnlyFans",
            hero_subtitle: "VÉLO ANGELS AGENCY es tu aliado estratégico para potenciar tu marca, optimizar tus ganancias y gestionar tu carrera en la plataforma de contenido para adultos líder.",
            hero_apply_btn: "Aplica Ahora",
            about_title: "Quiénes Somos",
            about_p1: "En VÉLO ANGELS AGENCY, nos dedicamos a transformar el potencial en éxito. Somos una agencia de marketing y gestión de talentos especializada en la industria del contenido para adultos, con un enfoque particular en OnlyFans.",
            about_p2: "Nuestra misión es clara: empoderar a los creadores de contenido natural y a las modelos de élite, ofreciéndoles soporte integral, estrategias de crecimiento personalizadas y gestión profesional para que alcancen la cima de su carrera.",
            about_p3: "Creemos en la autenticidad, la consistencia y el valor real. Sin filtros ni presiones, solo el potencial de tu marca llevado al siguiente nivel.",
            about_img_alt: "Equipo de Vélo Angels Agency - Modelo Profesional",
            services_title: "Nuestros Servicios",
            services_subtitle: "Ofrecemos un paquete de servicios diseñado para cubrir todas tus necesidades y asegurar tu crecimiento.",
            service1_title: "Gestión Integral de OnlyFans",
            service1_desc: "Desde la estrategia de contenido y calendarios de publicación hasta la interacción con fans y la optimización de tu perfil para maximizar tus ganancias.",
            service2_title: "Marketing y Promoción Digital",
            service2_desc: "Creamos y ejecutamos campañas de marketing en redes sociales y otras plataformas para aumentar tu visibilidad y atraer nuevos suscriptores.",
            service3_title: "Desarrollo de Marca Personal",
            service3_desc: "Te ayudamos a construir una marca sólida y auténtica, diferenciándote en el mercado y cultivando una imagen profesional y atractiva.",
            service4_title: "Análisis y Optimización Continua",
            service4_desc: "Monitorizamos tu rendimiento, analizamos las métricas clave y ajustamos las estrategias para asegurar un crecimiento sostenido y maximizar tu ROI.",
            apply_title: "¿Listo para Potenciar tu Carrera?",
            apply_subtitle: "En VÉLO ANGELS, buscamos creadores de contenido con visión y potencial. Únete a nuestro equipo y experimenta el soporte que necesitas para triunfar.",
            benefit1: "Crecimiento Acelerado",
            benefit2: "Gestión Profesional",
            benefit3: "Mayor Monetización",
            benefit4: "Soporte 24/7",
            benefit5: "Confidencialidad Total",
            form_title: "Formulario de Aplicación",
            form_name_label: "Nombre Completo:",
            form_email_label: "Email:",
            form_oflink_label: "Enlace a tu perfil de OnlyFans (o redes sociales relevantes):",
            form_message_label: "Háblanos de ti y de tus objetivos:",
            form_submit_btn: "Enviar Aplicación", // Para el atributo 'value'
            contact_title: "Contáctanos",
            contact_subtitle: "Estamos aquí para responder a tus preguntas y ayudarte a dar el siguiente paso.",
            contact_email: "Email: info@veloangels.agency", // Si el texto completo incluye "Email:"
            contact_instagram: "Instagram: @veloangels.agency",
            contact_whatsapp: "WhatsApp: (Tu número de WhatsApp aquí)",
            contact_form_note: "También puedes enviarnos un mensaje a través del formulario en la sección \"Únete\".",
            footer_copyright: "&copy; 2024 VÉLO ANGELS AGENCY. Todos los derechos reservados.",
            footer_instagram_link: "Instagram",
            language_button_text: "EN" // Texto del botón cuando el idioma actual es ES
        },
        en: {
            page_title: "VÉLO ANGELS AGENCY - Boost Your Success",
            nav_home: "Home",
            nav_about: "About Us",
            nav_services: "Services",
            nav_join: "Join Us",
            nav_contact: "Contact",
            hero_title: "Boost Your Success on OnlyFans",
            hero_subtitle: "VÉLO ANGELS AGENCY is your strategic ally to enhance your brand, optimize your earnings, and manage your career on the leading adult content platform.",
            hero_apply_btn: "Apply Now",
            about_title: "About Us",
            about_p1: "At VÉLO ANGELS AGENCY, we are dedicated to transforming potential into success. We are a marketing and talent management agency specializing in the adult content industry, with a particular focus on OnlyFans.",
            about_p2: "Our mission is clear: to empower natural content creators and elite models by offering comprehensive support, personalized growth strategies, and professional management to help them reach the pinnacle of their careers.",
            about_p3: "We believe in authenticity, consistency, and real value. No filters, no pressure, just your brand's potential taken to the next level.",
            about_img_alt: "Vélo Angels Agency Team - Professional Model",
            services_title: "Our Services",
            services_subtitle: "We offer a suite of services designed to meet all your needs and ensure your growth.",
            service1_title: "Comprehensive OnlyFans Management",
            service1_desc: "From content strategy and posting schedules to fan interaction and profile optimization to maximize your earnings.",
            service2_title: "Digital Marketing and Promotion",
            service2_desc: "We create and execute marketing campaigns on social media and other platforms to increase your visibility and attract new subscribers.",
            service3_title: "Personal Brand Development",
            service3_desc: "We help you build a strong and authentic brand, differentiating yourself in the market and cultivating a professional and attractive image.",
            service4_title: "Continuous Analysis and Optimization",
            service4_desc: "We monitor your performance, analyze key metrics, and adjust strategies to ensure sustained growth and maximize your ROI.",
            apply_title: "Ready to Boost Your Career?",
            apply_subtitle: "At VÉLO ANGELS, we are looking for content creators with vision and potential. Join our team and experience the support you need to succeed.",
            benefit1: "Accelerated Growth",
            benefit2: "Professional Management",
            benefit3: "Increased Monetization",
            benefit4: "24/7 Support",
            benefit5: "Total Confidentiality",
            form_title: "Application Form",
            form_name_label: "Full Name:",
            form_email_label: "Email:",
            form_oflink_label: "Link to your OnlyFans profile (or relevant social media):",
            form_message_label: "Tell us about yourself and your goals:",
            form_submit_btn: "Send Application", // Para el atributo 'value'
            contact_title: "Contact Us",
            contact_subtitle: "We are here to answer your questions and help you take the next step.",
            contact_email: "Email: info@veloangels.agency",
            contact_instagram: "Instagram: @veloangels.agency",
            contact_whatsapp: "WhatsApp: (Your WhatsApp number here)",
            contact_form_note: "You can also send us a message using the form in the \"Join Us\" section.",
            footer_copyright: "&copy; 2024 VÉLO ANGELS AGENCY. All rights reserved.",
            footer_instagram_link: "Instagram",
            language_button_text: "ES" // Texto del botón cuando el idioma actual es EN
        }
    };

    let currentLang = localStorage.getItem('veloAngelsLang') || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('veloAngelsLang', lang);
        document.documentElement.lang = lang; // Actualiza el atributo lang del tag <html>

        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                // Para elementos input[type="submit"] o input[type="button"], cambiar el 'value'
                if ((element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button'))) {
                    element.value = translations[lang][key];
                }
                // Para imágenes, cambiar el 'alt'
                else if (element.tagName === 'IMG' && element.hasAttribute('data-alt-es') && element.hasAttribute('data-alt-en')) {
                    element.alt = translations[lang][key]; // Asume que la clave en 'translations' también es para 'alt'
                }
                // Para otros elementos, cambiar el textContent o innerHTML si necesitas HTML (como &copy;)
                else if (key === 'footer_copyright') { // Ejemplo de uso de innerHTML
                    element.innerHTML = translations[lang][key];
                }
                else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        // Actualizar texto del botón de cambio de idioma
        if (languageSwitchBtn) {
            languageSwitchBtn.textContent = translations[lang].language_button_text || (lang === 'es' ? 'EN' : 'ES');
            languageSwitchBtn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
        }
    }

    if (languageSwitchBtn) {
        languageSwitchBtn.addEventListener('click', () => {
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
    }

    // Establecer el idioma inicial al cargar la página
    setLanguage(currentLang);

    // Validación del formulario
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ofLinkInput = document.getElementById('of-link');
    const messageInput = document.getElementById('message');

    // Función para mostrar errores
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.classList.add('error');
    }

    // Función para limpiar errores
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            formGroup.removeChild(errorDiv);
        }
        input.classList.remove('error');
    }

    // Validaciones
    function validateName(name) {
        return name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateUrl(url) {
        if (!url) return true; // URL es opcional
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    function validateMessage(message) {
        return message.length >= 10;
    }

    // Validación en tiempo real
    nameInput.addEventListener('input', function() {
        if (!validateName(this.value.trim())) {
            showError(this, 'Por favor, ingresa un nombre válido (solo letras y espacios)');
        } else {
            clearError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value.trim())) {
            showError(this, 'Por favor, ingresa un email válido');
        } else {
            clearError(this);
        }
    });

    ofLinkInput.addEventListener('input', function() {
        if (!validateUrl(this.value.trim())) {
            showError(this, 'Por favor, ingresa una URL válida');
        } else {
            clearError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (!validateMessage(this.value.trim())) {
            showError(this, 'Por favor, escribe un mensaje de al menos 10 caracteres');
        } else {
            clearError(this);
        }
    });

    // Validación al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar todos los campos
        if (!validateName(nameInput.value.trim())) {
            showError(nameInput, 'Por favor, ingresa un nombre válido');
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, ingresa un email válido');
            isValid = false;
        }
        
        if (!validateUrl(ofLinkInput.value.trim())) {
            showError(ofLinkInput, 'Por favor, ingresa una URL válida');
            isValid = false;
        }
        
        if (!validateMessage(messageInput.value.trim())) {
            showError(messageInput, 'Por favor, escribe un mensaje de al menos 10 caracteres');
            isValid = false;
        }

        if (isValid) {
            // Mostrar indicador de carga
            const submitButton = form.querySelector('input[type="submit"]');
            const originalText = submitButton.value;
            submitButton.value = 'Enviando...';
            submitButton.disabled = true;

            // Enviar el formulario
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = form.querySelector('input[name="_next"]').value;
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                submitButton.value = originalText;
                submitButton.disabled = false;
                alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
            });
        }
    });
});