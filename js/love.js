const blk_pitn = {
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = {
        block1: [5, 3],
        block2: [5, 1],
        block3: [3, 4],
        block4: [3, 2],
        block5: [3, -1],
        block6: [2, 5],
        block7: [2, 1],
        block8: [1, -1],
        block9: [1, -3],
        block10: [1, 2],
        block11: [0, 3],
        block12: [0, 0], 
        block13: [-1, -4],
        block14: [0, -2],
        block15: [-2, 4],
        block16: [-2, 2],
        block17: [-2, 0],
        block18: [-3, -2],
        block19: [-4, 0],
        block20: [-3, 5],
        block21: [-5, 3],
        block22: [-4, 1],
        block23: [-6, 1]   
    };

// Music playlist configuration
const playlist = [
    { src: 'MP3/Inolvidable.mp3', title: 'Song 1' },
    { src: 'MP3/Besame.mp3', title: 'Song 2' },
    { src: 'MP3/Juanes.mp3', title: 'Song 3' }
];

let currentSong = 0;
const audio = document.getElementById('audios');

// Messages functionality
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');

// Load existing messages from localStorage
let messages = JSON.parse(localStorage.getItem('loveMessages')) || [];

// Display existing messages
messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = message;
    messagesList.appendChild(messageElement);
});

// Auto scroll to bottom
messagesList.scrollTop = messagesList.scrollHeight;

// Function to add new message
function addMessage(text) {
    if (text.trim() === '') return;
    
    messages.push(text);
    localStorage.setItem('loveMessages', JSON.stringify(messages));
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = text;
    messagesList.appendChild(messageElement);
    
    // Scroll to the new message
    messagesList.scrollTop = messagesList.scrollHeight;
    
    // Clear input
    messageInput.value = '';
}

// Event listeners
sendButton.addEventListener('click', () => addMessage(messageInput.value));

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addMessage(messageInput.value);
    }
});

// Create music controls
const musicControls = document.createElement('div');
musicControls.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    gap: 10px;
    z-index: 1000;
`;

const prevButton = document.createElement('button');
prevButton.innerHTML = '⏮';
const playButton = document.createElement('button');
playButton.innerHTML = '⏯';
const nextButton = document.createElement('button');
nextButton.innerHTML = '⏭';

[prevButton, playButton, nextButton].forEach(button => {
    button.style.cssText = `
        padding: 10px;
        font-size: 20px;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
        transition: transform 0.3s ease;
    `;
});

prevButton.onclick = () => {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    audio.src = playlist[currentSong].src;
    audio.play();
};

playButton.onclick = () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '⏸';
    } else {
        audio.pause();
        playButton.innerHTML = '⏯';
    }
};

nextButton.onclick = () => {
    currentSong = (currentSong + 1) % playlist.length;
    audio.src = playlist[currentSong].src;
    audio.play();
};

musicControls.appendChild(prevButton);
musicControls.appendChild(playButton);
musicControls.appendChild(nextButton);
document.body.appendChild(musicControls);

// Create modal for heart clicks
const modal = document.createElement('div');
modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--modal-bg);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
`;

// Añadir botones de navegación al modal
const prevImageBtn = document.createElement('button');
prevImageBtn.innerHTML = '❮';
const nextImageBtn = document.createElement('button');
nextImageBtn.innerHTML = '❯';

[prevImageBtn, nextImageBtn].forEach(btn => {
    btn.style.cssText = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: var(--button-bg);
        color: var(--heart-color);
        border: none;
        padding: 20px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        z-index: 2001;
        border-radius: 50%;
    `;
    btn.onmouseover = () => btn.style.opacity = '1';
    btn.onmouseout = () => btn.style.opacity = '0.7';
});

prevImageBtn.style.left = '20px';
nextImageBtn.style.right = '20px';

modal.appendChild(prevImageBtn);
modal.appendChild(nextImageBtn);

const modalImg = document.createElement('img');
modalImg.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    box-shadow: 0 0 30px var(--shadow-color);
    transform: scale(0.9);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    object-fit: contain;
`;

modal.appendChild(modalImg);
document.body.appendChild(modal);

let currentImageIndex = 0;

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

prevImageBtn.onclick = (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + 24) % 24;
    modalImg.src = heartImages[currentImageIndex];
};

nextImageBtn.onclick = (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % 24;
    modalImg.src = heartImages[currentImageIndex];
};

// Añadir control de teclado
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImageBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextImageBtn.click();
        } else if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});

// Heart images mapping
const heartImages = {};

// Asignar imágenes a cada corazón
for (let i = 0; i < 34; i++) {
    // Usar las imágenes .jpg en orden, empezando desde 1.jpg
    heartImages[i] = `images/${i + 1}.jpg`;
}

// Función para precargar imágenes
function preloadImages() {
    for (let i = 1; i <= 34; i++) {
        const img = new Image();
        img.src = `images/${i}.jpg`;
    }
}

// Precargar imágenes cuando se carga la página
preloadImages();

// Add click event to hearts
document.addEventListener('click', (e) => {
    const heartDiv = e.target.closest('.block div');
    if (heartDiv) {
        // Encontrar el índice del corazón basado en su posición
        const block = heartDiv.closest('.block');
        const allBlocks = document.querySelectorAll('.block');
        currentImageIndex = Array.from(allBlocks).indexOf(block);
        
        // Mostrar la imagen correspondiente
        modalImg.src = heartImages[currentImageIndex];
        modal.style.display = 'flex';
        modalImg.style.transform = 'scale(1)';
    }
});

let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null,
    index = 0, 
    clone_block;

block.style.top = "50%";
block.style.left = "50%";
block.style.margin = "-20px 0 0 -20px";

const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2)),
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

function Next() {
    if (++index >= 24) {
        clearInterval(timer);

        Rise();
        return;
    }

    block.style.visibility = "visible"; 

    block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
    block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }

    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 24) {
        blocks[blocks.length - 1].children[2].style.display = "none";
        block.style.display = "none";   
    }
}

// Theme switcher functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// Add theme toggle button
const themeButton = document.createElement('button');
themeButton.innerHTML = '🌓';
themeButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px;
    font-size: 20px;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.3s ease;
`;
themeButton.onclick = toggleTheme;
themeButton.onmouseover = () => themeButton.style.transform = 'scale(1.1)';
themeButton.onmouseout = () => themeButton.style.transform = 'scale(1)';
document.body.appendChild(themeButton);

function Rise() {
    console.log("开始升空");
    let timer2 = null,
        distance = 0;
    const target = 120, 
        speed = 1;

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));


    timer2 = setInterval(() => {
        distance += speed;
        // console.log(distance);
        if (distance >= target) {
            clearInterval(timer2);

            console.log("升空完毕");

        }

        love.style.top = (love_top - distance) + "px";

    }, 22);

}

window.onload = function () {
    setTimeout(() => {

        timer = setInterval(() => {
            Next();
        }, 300);


    }, 12000);
};
