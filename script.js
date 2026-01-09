// 1. BACKGROUND SLIDER DINÂMICO (Desktop vs Mobile)
document.addEventListener('DOMContentLoaded', () => {
    const bgSlider = document.getElementById('bg-slider');
    const isMobile = window.innerWidth <= 768;
    const totalPhotos = 17;
    const overlay = document.querySelector('.overlay');

    // Injeta as 17 imagens dinamicamente
    for (let i = 1; i <= totalPhotos; i++) {
        const img = document.createElement('img');
        
        // "mobile X.jpeg", se for desktop busca "foto X.jpeg"
        // Note: padrão de espaço "foto 2"
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
        }, 4000);
    }
});

// 2. DADOS DA GALERIA (Fotos e Vídeos)
const galleryData = {
    'espacos': [
        { img: 'assets/panmeireles.mp4', title: `Salão varanda (Capacidade 200 pessoas)', desc: 'Texto: Ideal para Eventos Corporativos e Sociais (Recepção de Casamentos & Aniversários)
Pode Trazer Decoração e Música para o Ambiente (Banda ou DJ)
A partir de 50 Pessoas (Segunda à Quinta) 
A partir de 80 Pessoas (Sexta à Domingo).` },
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
        { img: 'assets/bianchi2025.mp4', title: 'Eventos corporativos', desc: 'No Grand Divina Eventos dispomos de espaços modernos com capacidade para até 200 pessoas,  ideal para eventos corporativos: reuniões, treinamentos, jantar de negócios, palestras e confraternizações de empresa.  Nosso experiente time tem atendimento personalizado o que garante um serviço de alto padrão. Para completar nossa gastronomia é um dos grandes diferenciais com cardápios exclusivos e adaptados a necessidade do seu evento, unindo sabor e qualidade elevando o nível de seu evento e garantindo o destaque que ele merece.' },
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

// 3. FUNÇÕES DA GALERIA

function openGallery(category) {
    if (!galleryData[category]) return;
    currentCategory = category;
    currentIndex = 0;
    
    // Modal
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('show'); }, 10);
    
    // Botão voltar
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
            video.setAttribute('preload', 'auto');
            video.load(); 
            video.play().catch(e => console.log("Erro ao dar play:", e));
            
            imageContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.img;
            imageContainer.appendChild(img);
        }

// Lógica das Logos
    const partnersContainer = document.getElementById('partners-logos');
    
    // Verifica se a categoria é corporativo ou social
    if (currentCategory === 'social' ) {
        // Insere a imagem das logos
        partnersContainer.innerHTML = `<img src="assets/logoparceiro.png" alt="Empresas parceiras" class="partners-img">`;
        partnersContainer.style.display = 'block';
    } else {
        // Esconde nas outras categorias
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

    if (history.state && history.state.modalOpen) {
        history.back();
    }
}

function changeSlide(direction) {
    const items = galleryData[currentCategory];
    currentIndex = (currentIndex + direction + items.length) % items.length;
    updateSlide();
}

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

function preloadGalleryAssets() {
    Object.keys(galleryData).forEach(category => {
        galleryData[category].forEach(item => {
            const path = item.img.toLowerCase();

            if (path.endsWith('.mp4')) {
                // LOGICA PARA VÍDEOS: Força o download dos dados
                const videoPreload = document.createElement('video');
                videoPreload.src = item.img;
                videoPreload.preload = 'auto';
                videoPreload.muted = true;
                videoPreload.load(); 
            } else {
                // LOGICA PARA FOTOS: Cria um objeto de imagem na memória
                const imgPreload = new Image();
                imgPreload.src = item.img;
            }
        });
    });
    console.log("Galeria 100% em cache (Fotos e Vídeos).");
}
















