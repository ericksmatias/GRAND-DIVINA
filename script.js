// 1. BACKGROUND SLIDER (Imagens de Fundo)
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.background-slider img');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }
});

// 2. DADOS DA GALERIA (Fotos e Vídeos)
const galleryData = {
    'espacos': [
        { img: 'assets/panmeireles.mp4', title: 'Espaço climatizado', desc: 'Conheça nosso espaço climatizado na unidade Meireles, perfeito para eventos sociais e corporativos.' },
        { img: 'assets/e1.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e2.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e3.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e4.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e5.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e6.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' },
        { img: 'assets/e7.jpg', title: 'Jardim de Inverno', desc: 'Perfeito para cerimônias intimistas.' }
    ],
    'corporativo': [
        { img: 'assets/corp1.jpg', title: 'Auditório Premium', desc: 'Tecnologia de ponta para sua empresa.' },
        { img: 'assets/corp2.jpg', title: 'Sala de Reunião', desc: 'Privacidade e conforto.' }
    ],
    'social': [
        { img: 'assets/social1.jpg', title: 'Casamentos', desc: 'O cenário dos sonhos para o seu sim.' },
        { img: 'assets/social2.jpg', title: '15 Anos', desc: 'Uma festa inesquecível.' }
    ]
};

let currentCategory = '';
let currentIndex = 0;

// Elementos do DOM
const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalCta = document.getElementById('modal-cta');

// ... (mantenha a parte 1 e 2 do seu código original igual)

// 3. FUNÇÕES DA GALERIA

function openGallery(category) {
    if (!galleryData[category]) return;
    currentCategory = category;
    currentIndex = 0;
    
    // Mostra o modal
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('show'); }, 10);
    
    // TRUQUE DO BOTÃO VOLTAR: Adiciona um estado no histórico do navegador
    history.pushState({ modalOpen: true }, '');

    updateSlide(); 
}

function updateSlide() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('fade-out');

    setTimeout(() => {
        const item = galleryData[currentCategory][currentIndex];
        const imageContainer = document.querySelector('.slide-image');
        
        if (!imageContainer) return;

        imageContainer.innerHTML = '';
        if (item.img.toLowerCase().endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = item.img;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            imageContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.img;
            imageContainer.appendChild(img);
        }

        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;
        
        const text = `Olá, gostei do ${item.title} que vi no site!`;
        modalCta.href = `https://wa.me/5585996377401?text=${encodeURIComponent(text)}`;
        modalCta.innerHTML = (currentCategory === 'espacos') ? 'Fale Conosco' : 'Faça seu Evento';

        modalContent.classList.remove('fade-out');
    }, 400); 
}

function closeGallery() {
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);

    // Se o modal foi fechado manualmente (no X ou fora), removemos o estado do histórico
    if (history.state && history.state.modalOpen) {
        history.back();
    }
}

function changeSlide(direction) {
    const items = galleryData[currentCategory];
    currentIndex = (currentIndex + direction + items.length) % items.length;
    updateSlide();
}

// Fechar ao clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        closeGallery();
    }
}

// --- NOVO: CAPTURAR O BOTÃO VOLTAR DO CELULAR ---
window.onpopstate = function(event) {
    // Se o usuário apertar voltar e o modal estiver visível, apenas fechamos o modal
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    }
};


