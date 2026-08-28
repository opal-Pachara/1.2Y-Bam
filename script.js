// script.js
const envelopeWrapper = document.getElementById('envelope-wrapper');
const btnLove = document.getElementById('btn-love');
const hintText = document.getElementById('hint-text');
const mainTitle = document.getElementById('main-title');
const subTitle = document.getElementById('sub-title');
const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const screen3 = document.getElementById('screen-3');
const btnHug = document.getElementById('btn-hug');
const hugReply = document.getElementById('hug-reply');

let state = 'LOCKED'; // States: LOCKED, LOVED, OPENING, GIF, LETTER

// Handle envelope click
envelopeWrapper.addEventListener('click', () => {
    if (state === 'LOCKED') {
        // Shake envelope and show hint
        envelopeWrapper.classList.add('shake');
        hintText.innerText = "เดี๋ยวก่อนนน 💕 ต้องบอกรักเค้าก่อนนะ";
        hintText.style.color = "#ff4757"; // Highlight hint color
        
        setTimeout(() => {
            envelopeWrapper.classList.remove('shake');
            hintText.style.color = "#747d8c"; // Reset hint color
        }, 500);
    } else if (state === 'LOVED') {
        openEnvelope();
    }
});

// Handle Love button click
btnLove.addEventListener('click', () => {
    if (state === 'LOCKED') {
        state = 'LOVED';
        btnLove.innerText = "รักแล้ว ❤️";
        btnLove.disabled = true;
        
        mainTitle.innerText = "โอเค...เปิดได้แล้ว 💌";
        subTitle.style.opacity = '0';
        hintText.innerText = "กดที่ซองเพื่อเปิดได้เลยจ้า ✨";
        
        envelopeWrapper.classList.add('unlocked');
        envelopeWrapper.classList.add('bounce');
        
        createHearts(8);
    }
});

function openEnvelope() {
    state = 'OPENING';
    envelopeWrapper.classList.remove('bounce');
    envelopeWrapper.classList.add('open');
    createHearts(15);
    
    // Wait for envelope opening animation, then transition to LETTER
    setTimeout(() => {
        screen1.classList.remove('active');
        screen3.classList.add('active');
        state = 'LETTER';
        createHearts(5); // A little celebrate when letter appears
    }, 1500); // 1.5s for envelope to fully open and pause slightly
}

// Handle Hug button click
btnHug.addEventListener('click', () => {
    hugReply.classList.add('show');
    createHearts(10);
    btnHug.disabled = true;
    btnHug.style.opacity = '0.5';
    btnHug.innerText = "กอดแล้วนะ 🫂";
});

// Floating hearts effect
function createHearts(count = 5) {
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '✨'];
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('particle-heart');
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random horizontal position across viewport width
        heart.style.left = (Math.random() * 90) + 'vw';
        
        // Random animation duration between 3s and 6s
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random initial scale
        const scale = (Math.random() * 0.5 + 0.8);
        heart.style.transform = `scale(${scale})`;
        
        document.body.appendChild(heart);
        
        // Remove element after animation completes
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}

// Initial hearts on load
window.onload = () => {
    setTimeout(() => {
        createHearts(4);
    }, 500);
};
