// 1. BACKGROUND SLIDER DINÂMICO (Desktop vs Mobile)
document.addEventListener('DOMContentLoaded', () => {
    const bgSlider = document.getElementById('bg-slider');
    const isMobile = window.innerWidth <= 768;
    const totalPhotos = 17;
    const overlay = document.querySelector('.overlay');

    // Injeta as 17 imagens dinamicamente
    for (let i = 1; i <= totalPhotos; i++) {
        const img = document.createElement('img');
        
        // Se for mobile, busca "mobile X.jpeg", se for desktop busca "foto X.jpeg"
        // Note: usei o padrão de espaço "foto 2" que você confirmou antes
        const fileName = isMobile ? `mobile ${i}.jpeg` : (i === 1 ? `foto1.jpeg` : `foto ${i}.jpeg`);
        
        img.src = `assets/${fileName}`;
        if (i === 1) img.classList.add('active');
        img.alt = `Background ${i}`;
        
        // Insere a imagem antes do overlay
        bgSlider.insertBefore(img, overlay);
    }

    // Lógica de rotação das fotos
    const slides = bgSlider.querySelectorAll('img');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Aumentei para 4s para ficar mais elegante
    }
});

// 2. DADOS DA GALERIA (Fotos e Vídeos)
const galleryData = {
    'espacos': [
        { img: 'assets/panmeireles.mp4', title: 'Espaço climatizado', desc: 'Conheça nosso espaço climatizado na unidade Meireles, perfeito para eventos sociais e corporativos.' },
        { img: 'assets/e1.jpg', title: 'Lugar 1', desc: 'desc.' },
        { img: 'assets/e2.jpg', title: 'Lugar 2', desc: 'desc.' },
        { img: 'assets/e3.jpg', title: 'Lugar 3', desc: 'desc.' },
        { img: 'assets/e4.jpg', title: 'Lugar 4', desc: 'desc.' },
        { img: 'assets/e5.jpg', title: 'Lugar 5', desc: 'desc.' },
        { img: 'assets/e6.jpg', title: 'Lugar 6', desc: 'desc.' },
        { img: 'assets/e7.jpg', title: 'Lugar 7', desc: 'desc.' }
    ],
    'corporativo': [
        { img: 'assets/corp1.jpg', title: 'Casamento 1', desc: 'Descrição.' },
        { img: 'assets/corp2.jpg', title: 'Casamento 2', desc: 'Descrição.' }
    ],
    'social': [
        { img: 'assets/bianchi2025.mp4', title: 'Bianchi Urbanismo', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { img: 'assets/social2.jpg', title: 'Evento tal kkk (testando)', desc: 'Social descrição.' }
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

// Lógica das Logos de Parceiros
    const partnersContainer = document.getElementById('partners-logos');
    
    // Verifica se a categoria é corporativo ou social
    if (currentCategory === 'social' ) {
        // Insere a imagem das logos (substitua pelo nome correto do seu arquivo)
        partnersContainer.innerHTML = `<img src="assets/logoparceiro.png" alt="Empresas parceiras" class="partners-img">`;
        partnersContainer.style.display = 'block';
    } else {
        // Esconde nas outras categorias (como 'espacos')
        partnersContainer.innerHTML = '';
        partnersContainer.style.display = 'none';
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

// PRÉ-CARREGAMENTO (Evita o fundo preto/atraso)
function preloadGalleryAssets() {
    // Percorre todas as categorias (espacos, social, corporativo)
    Object.keys(galleryData).forEach(category => {
        galleryData[category].forEach(item => {
            if (item.img.toLowerCase().endsWith('.mp4')) {
                // Pré-carrega Vídeo
                const video = document.createElement('link');
                video.rel = 'preload';
                video.as = 'video';
                video.href = item.img;
                document.head.appendChild(video);
            } else {
                // Pré-carrega Imagem
                const img = new Image();
                img.src = item.img;
            }
        });
    });
    console.log("Assets da galeria carregados em segundo plano.");
}

// Chama a função após o site carregar o básico
window.addEventListener('load', preloadGalleryAssets);












