// Music player controls
function setupMusicPlayer() {
    const audio = document.getElementById('valentineAudio');
    const playPauseBtn = document.getElementById('musicPlayPause');
    const volumeSlider = document.getElementById('musicVolume');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });

    // Set initial volume
    audio.volume = volumeSlider.value;
}
// valentinesmain.js
// Floating hearts effect
function createFloatingHearts() {
    const container = document.getElementById('heartContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🌹'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 12000);
    }, 800);
}

// Envelope opening animation
// Envelope opening animation removed. Page loads directly into main content.

// Reveal hidden message

// Setup Yes/No Valentine buttons
function setupValentineOptions() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const optionsDiv = document.getElementById('valentineOptions');

    yesButton.addEventListener('click', () => {
        hiddenMessage.classList.add('revealed');
        optionsDiv.style.display = 'none';
        createHeartExplosion();
    });

    // Move the No button to a random position within the card on click
    noButton.addEventListener('click', () => {
        const card = noButton.closest('.card');
        const cardRect = card.getBoundingClientRect();
        const btnRect = noButton.getBoundingClientRect();
        // Card padding and button size
        const padding = 20;
        const maxLeft = cardRect.width - btnRect.width - padding;
        const maxTop = cardRect.height - btnRect.height - padding;
        // Random position
        const left = Math.random() * maxLeft;
        const top = Math.random() * maxTop;
        noButton.style.position = 'absolute';
        noButton.style.left = left + 'px';
        noButton.style.top = top + 'px';
    });
}

function createHeartExplosion() {
    const container = document.getElementById('heartContainer');
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💕';
            heart.style.left = '50%';
            heart.style.fontSize = '30px';
            heart.style.animationDuration = '3s';
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 200 + 100;
            heart.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
            heart.style.animation = 'explode 2s ease-out forwards';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 30);
    }
}

// Add interactive hover effects to cards
function setupCardHover() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add explosion and fadeOut keyframes dynamically
function addDynamicKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.9); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all effects on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    setupMusicPlayer();
    setupValentineOptions();
    setupCardHover();
    addDynamicKeyframes();
});
