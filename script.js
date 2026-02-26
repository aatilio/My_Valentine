// Crear corazones flotantes de fondo
function createFloatingHearts() {
    const heartsBackground = document.getElementById('heartsBackground');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const heartCount = window.innerWidth < 768 ? 15 : 20; // Menos corazones en móvil

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsBackground.appendChild(heart);
    }
}

// Variables para el botón "No"
let noClickCount = 0;
const noBtn = document.getElementById('noBtn');
let noBtnOriginalState = null;

// Función cuando hace clic en "No"
function handleNo() {
    noClickCount++;

    const messages = [
        "¿Estás segura? 🥺",
        "Piénsalo bien... 💔",
        "¡Dale otra oportunidad! 😢",
        "¡No puedes decir que no! 😭",
        "¡Por favor! 🙏",
        "¡Vamos, di que sí! 💕"
    ];

    if (noClickCount <= messages.length) {
        showModal(messages[noClickCount - 1]);
    }

    // Hacer que el botón "No" se escape
    noBtn.classList.add('running');

    // Calcular posición segura para el botón
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;

    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);

    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    // Hacer el botón "Sí" más grande
    const yesBtn = document.getElementById('yesBtn');
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = Math.min(currentSize + 2, 32); // Máximo 32px
    yesBtn.style.fontSize = newSize + 'px';

    const currentPadding = parseInt(window.getComputedStyle(yesBtn).paddingTop);
    yesBtn.style.padding = Math.min(currentPadding + 2, 25) + 'px ' +
        Math.min(parseInt(window.getComputedStyle(yesBtn).paddingLeft) + 3, 50) + 'px';
}

// Mostrar mensaje toast (para móviles)
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-size: 1rem;
        z-index: 9999;
        animation: fadeInOut 2s ease-in-out;
        max-width: 90%;
        text-align: center;
    `;

    // Añadir animación de toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            20% { opacity: 1; transform: translate(-50%, 0); }
            80% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Mostrar modal (para desktop/tablet)
function showModal(message) {
    const modal = document.getElementById('messageModal');
    const modalText = document.getElementById('modalText');

    modalText.textContent = message;
    modal.classList.add('show');

    // Ocultar después de 2.5 segundos
    setTimeout(() => {
        modal.classList.remove('show');
    }, 2500);
}

// Función cuando hace clic en "Sí"
function handleYes() {
    const celebrationScreen = document.getElementById('celebrationScreen');
    celebrationScreen.classList.add('active');

    // Evitar scroll en el body
    document.body.style.overflow = 'hidden';

    // Crear fuegos artificiales
    createFireworks();

    // Crear corazones de celebración
    createCelebrationHearts();

    // Vibración si está disponible (móviles)
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
    }
}

// Crear fuegos artificiales
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ffc0cb', '#fff', '#ffd700'];
    const isMobile = window.innerWidth < 768;
    const fireworkInterval = isMobile ? 800 : 500; // Menos frecuentes en móvil

    const fireworkTimer = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;

        const particles = isMobile ? 20 : 30; // Menos partículas en móvil

        for (let i = 0; i < particles; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.PI * 2 * i) / particles;
            const velocity = Math.random() * 80 + 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            firework.style.setProperty('--tx', tx + 'px');
            firework.style.setProperty('--ty', ty + 'px');

            fireworksContainer.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }, fireworkInterval);

    // Limpiar después de 10 segundos
    setTimeout(() => clearInterval(fireworkTimer), 10000);
}

// Crear corazones de celebración
function createCelebrationHearts() {
    const celebrationHearts = document.querySelector('.celebration-hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💟'];
    const isMobile = window.innerWidth < 768;
    const heartInterval = isMobile ? 300 : 200; // Menos frecuentes en móvil

    const heartTimer = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * (isMobile ? 25 : 30) + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        celebrationHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, heartInterval);

    // Limpiar después de 15 segundos
    setTimeout(() => clearInterval(heartTimer), 15000);
}

// Prevenir que el botón "No" se pueda hacer clic fácilmente en móviles
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleNo();
}, { passive: false });

// Prevenir zoom en doble tap en botones (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Inicializar corazones flotantes al cargar la página
window.addEventListener('load', () => {
    createFloatingHearts();

    // Añadir efecto de confeti al pasar el mouse sobre el botón "Sí"
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.addEventListener('mouseenter', () => {
        if (!yesBtn.style.transform || yesBtn.style.transform === 'none') {
            yesBtn.style.transform = 'translateY(-3px) scale(1.05)';
        }
    });

    yesBtn.addEventListener('mouseleave', () => {
        if (!yesBtn.style.fontSize || parseFloat(yesBtn.style.fontSize) < 25) {
            yesBtn.style.transform = 'translateY(0) scale(1)';
        }
    });

    // Guardar estado original del botón "No"
    noBtnOriginalState = {
        position: noBtn.style.position,
        left: noBtn.style.left,
        top: noBtn.style.top
    };
});

// Easter egg: si presiona Escape, vuelve a la pregunta
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const celebrationScreen = document.getElementById('celebrationScreen');
        if (celebrationScreen.classList.contains('active')) {
            celebrationScreen.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Resetear botones
            noClickCount = 0;
            noBtn.classList.remove('running');
            noBtn.style.position = 'relative';
            noBtn.style.left = 'auto';
            noBtn.style.top = 'auto';

            const yesBtn = document.getElementById('yesBtn');
            yesBtn.style.fontSize = '';
            yesBtn.style.padding = '';
            yesBtn.style.transform = '';
        }
    }
});

// Manejar cambio de orientación en móviles
window.addEventListener('orientationchange', () => {
    // Resetear botón "No" si está flotando
    if (noBtn.classList.contains('running')) {
        setTimeout(() => {
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            const maxX = window.innerWidth - btnWidth - 20;
            const maxY = window.innerHeight - btnHeight - 20;

            const x = Math.max(10, Math.random() * maxX);
            const y = Math.max(10, Math.random() * maxY);

            noBtn.style.left = x + 'px';
            noBtn.style.top = y + 'px';
        }, 200);
    }
});

// Ajustar corazones al cambiar tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recrear corazones con la cantidad apropiada para el nuevo tamaño
        const heartsBackground = document.getElementById('heartsBackground');
        heartsBackground.innerHTML = '';
        createFloatingHearts();
    }, 250);
});
