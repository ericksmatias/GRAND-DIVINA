// 1. BACKGROUND SLIDER DINÂMICO (Desktop vs Mobile)
document.addEventListener('DOMContentLoaded', () => {
    preloadGalleryAssets();
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
// FECHAR AO CLICAR FORA (Movido para fora do loop das imagens)
window.onclick = function(event) {
    const modal = document.getElementById('gallery-modal');
    if (event.target === modal) {
        closeGallery();
    }
};

// 2. DADOS DA GALERIA (Fotos e Vídeos)
const galleryData = {
    'espacos': [
        { img: 'assets/panmeireles.mp4', 
         title: 'Salão varanda Meireles', 
         cap: 'Capacidade para até 200 pessoas', 
         desc: `Corporativos (Treinamentos e Confraternizações)
         Sociais (Recepção de Casamento & Aniversário)

Estrutura para receber decoração e música
A partir de 50 Pessoas (Segunda à Quinta)
A partir de 80 Pessoas (Sexta à Domingo) ` },
        { img: 'assets/rooftop 1.jpeg', 
         title: 'Rooftop meireles', cap: 'Capacidade para até 75 pessoas', 
         desc: `Estrutura para receber decoração e música
         
         A partir de 40 pessoas (Segunda a Quinta)
         A partir de 50 pessoas (Sexta a Domingo)` },

       { img: 'assets/rooftop 2.jpeg', 
         title: 'Rooftop meireles', cap: 'Capacidade para até 75 pessoas', 
         desc: `Estrutura para receber decoração e música
         
         A partir de 40 pessoas (Segunda a Quinta)
         A partir de 50 pessoas (Sexta a Domingo)` },

        { img: 'assets/rooftop 3.jpeg', 
         title: 'Rooftop meireles', cap: 'Capacidade para até 75 pessoas', 
         desc: `Estrutura para receber decoração e música
         
         A partir de 40 pessoas (Segunda à Quinta)
         A partir de 50 pessoas (Sexta à Domingo)` },

        { img: 'assets/divina 1.jpeg', 
         title: 'Rooftop meireles', cap: 'Capacidade para até 75 pessoas', 
         desc: `Estrutura para receber decoração e música
         
         A partir de 50 pessoas (Todos os dias)` }
    ],
    'corporativo': [
        { img: 'assets/corp1.jpg', title: 'Casamento 1', desc: 'Descrição.' },
        { img: 'assets/corp2.jpg', title: 'Casamento 2', desc: 'Descrição.' }
    ],
    'social': [
        { img: 'assets/bianchi2025.mp4', title: 'Eventos corporativos', desc: 'No 𝐆𝐫𝐚𝐧𝐝 𝐃𝐢𝐯𝐢𝐧𝐚 𝐄𝐯𝐞𝐧𝐭𝐨𝐬 dispomos de espaços modernos com capacidade para até 200 pessoas,  ideal para eventos corporativos: reuniões, treinamentos, jantar de negócios, palestras e confraternizações de empresa.  Nosso experiente time tem atendimento personalizado o que garante um serviço de alto padrão. Para completar nossa gastronomia é um dos grandes diferenciais com cardápios exclusivos e adaptados a necessidade do seu evento, unindo sabor e qualidade elevando o nível de seu evento e garantindo o destaque que ele merece.' },
        { img: 'assets/social2.jpg', title: 'Evento 2 (testando)', desc: 'Social descrição.' }
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
    const imageContainer = document.querySelector('.slide-image');
    const item = galleryData[currentCategory][currentIndex];
    const modalCap = document.getElementById('modal-cap');
    const partnersContainer = document.getElementById('partners-logos');

    if (!imageContainer) return;

    // 1. LIMPEZA IMEDIATA (Mata a imagem antiga antes de qualquer coisa)
    imageContainer.innerHTML = '';

    // 2. RENDERIZAÇÃO DA MÍDIA
    if (item.img.toLowerCase().endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = item.img;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('preload', 'auto');
        imageContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.img;
        imageContainer.appendChild(img);
    }

    // 3. CAPACIDADE
    if (modalCap) {
        modalCap.textContent = item.cap || '';
        modalCap.style.display = (currentCategory === 'espacos' && item.cap) ? 'block' : 'none';
    }

    // 4. LOGOS DOS PARCEIROS (Sua lógica original mantida)
    if (partnersContainer) {
        if (currentCategory === 'social') {
            const listaLogos = ['logo 1.png', 'logo 2.png', 'logo 3.png', 'logo 4.png', 'logo 5.png', 'logo 6.png', 'logo 7.png', 'logo 8.png', 'logo 10.png'];
            let logoHTML = '<span class="partners-title">Nossos clientes</span>';
            logoHTML += '<div class="logo-track">';
            [...listaLogos, ...listaLogos].forEach(nomeArquivo => {
                logoHTML += `<img src="assets/${nomeArquivo}" alt="Parceiro" class="partners-img">`;
            });
            logoHTML += '</div>';
            partnersContainer.innerHTML = logoHTML;
            partnersContainer.style.display = 'block';
        } else {
            partnersContainer.innerHTML = '';
            partnersContainer.style.display = 'none';
        }
    }

    // 5. TEXTOS E BOTÃO
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    
    const text = `Olá, gostei do ${item.title} que vi no site!`;
    modalCta.href = `https://wa.me/5585996377401?text=${encodeURIComponent(text)}`;
    modalCta.innerHTML = (currentCategory === 'espacos') ? 'Fale Conosco' : 'Faça seu Evento';
}

function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('show');
    
    // Aguarda a animação de fade-out do modal terminar para esconder
    setTimeout(() => { 
        modal.style.display = 'none'; 
        // Limpa a mídia ao fechar para não continuar tocando áudio/vídeo em background
        document.querySelector('.slide-image').innerHTML = '';
    }, 800);

    if (history.state && history.state.modalOpen) {
        history.back();
    }
}


function changeSlide(direction) {
    const imgContainer = document.querySelector('.slide-image');
    const modalContent = document.querySelector('.modal-content');
    
    // Inicia o fade out
    if (imgContainer) imgContainer.classList.add('fade-out');
    if (modalContent) modalContent.classList.add('fade-out');

    // Espera a imagem sumir totalmente (400ms)
    setTimeout(() => {
        const items = galleryData[currentCategory];
        currentIndex = (currentIndex + direction + items.length) % items.length;
        
        updateSlide(); // Troca a imagem enquanto está invisível

        // Espera um milésimo para o navegador entender a nova imagem e tira o fade
        setTimeout(() => {
            if (imgContainer) imgContainer.classList.remove('fade-out');
            if (modalContent) modalContent.classList.remove('fade-out');
        }, 50); 
        
    }, 800); 
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
                // Cria um link no HEAD para priorizar o download do vídeo
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'video';
                link.href = item.img;
                link.type = 'video/mp4';
                document.head.appendChild(link);
            } else {
                const imgPreload = new Image();
                imgPreload.src = item.img;
            }
        });
    });
    console.log("Sistema de Cache: Vídeos priorizados e Imagens carregadas.");
}


// Ativar setas do teclado e tecla ESC
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('gallery-modal');
    
    // Verifica se o modal existe e se está visível (com a classe 'show')
    if (modal && modal.classList.contains('show')) {
        if (e.key === "ArrowLeft") {
            changeSlide(-1); // Seta Esquerda volta
        } else if (e.key === "ArrowRight") {
            changeSlide(1);  // Seta Direita avança
        } else if (e.key === "Escape") {
            closeGallery();  // Tecla Esc fecha o modal
        }
    }
});
