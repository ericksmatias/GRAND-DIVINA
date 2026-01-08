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
    
    // 1. Primeiro atualizamos o conteúdo (ainda invisível)
    updateSlideContent(); 

    // 2. Preparamos o display
    modal.style.display = 'flex';
    
    // 3. Mostramos com o fade suave
    setTimeout(() => { 
        modal.classList.add('show'); 
    }, 50);
    
    // Adiciona o histórico para o botão voltar do celular
    history.pushState({ modalOpen: true }, '');
}

function changeSlide(direction) {
    // Selecionamos o conteúdo que deve deslizar
    const slideContainer = document.querySelector('.gallery-slide');
    
    // 1. Remove classes de animação anteriores para não bugar
    slideContainer.classList.remove('slide-next', 'slide-prev');
    
    // Força o navegador a "resetar" (hack de reflow)
    void slideContainer.offsetWidth;

    // 2. Adiciona a classe de movimento (faz a foto sair da tela)
    const effectClass = direction === 1 ? 'slide-next' : 'slide-prev';
    slideContainer.classList.add(effectClass);

    // 3. Espera o deslize de saída e troca o conteúdo
    setTimeout(() => {
        const items = galleryData[currentCategory];
        currentIndex = (currentIndex + direction + items.length) % items.length;
        
        updateSlideContent(); // Atualiza as mídias e textos

        // 4. Remove a classe de efeito para o novo conteúdo aparecer centralizado
        slideContainer.classList.remove(effectClass);
    }, 400); // Esse tempo deve ser menor ou igual ao transition do seu CSS
}

function updateSlideContent() {
    const item = galleryData[currentCategory][currentIndex];
    const imageContainer = document.querySelector('.slide-image');

    // Reset de animação para o texto não ficar "preso" em cima
    modalTitle.style.opacity = '0';
    modalTitle.style.transform = 'translateY(10px)';

    if (imageContainer) {
        imageContainer.innerHTML = ''; // Limpa o "Imagem do Evento" que aparece bugado
        
        if (item.img.toLowerCase().endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = item.img;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            // O segredo: só mostra o texto quando o vídeo começar a carregar
            video.onloadeddata = () => {
                modalTitle.style.opacity = '1';
                modalTitle.style.transform = 'translateY(0)';
            };
            imageContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.img;
            img.onload = () => {
                modalTitle.style.opacity = '1';
                modalTitle.style.transform = 'translateY(0)';
            };
            imageContainer.appendChild(img);
        }
    }

    // Atualiza os dados
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    
    // ... restante do código do botão WhatsApp ...
}
    
    const text = `Olá, gostei do ${item.title} que vi no site!`;
    modalCta.href = `https://wa.me/5585996377401?text=${encodeURIComponent(text)}`;
    modalCta.innerHTML = (currentCategory === 'espacos') ? 'Fale Conosco' : 'Faça seu Evento';

    // Anima o texto novo voltando
    setTimeout(() => {
        modalTitle.style.opacity = '1';
        modalTitle.style.transform = 'translateY(0)';
    }, 50);
}

// --- NOVO: CAPTURAR O BOTÃO VOLTAR DO CELULAR ---
window.onpopstate = function(event) {
    // Se o usuário apertar voltar e o modal estiver visível, apenas fechamos o modal
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    }
}

function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('show');
    
    // Espera a animação de fade do modal sumir para esconder o display
    setTimeout(() => { 
        modal.style.display = 'none'; 
    }, 400);

    // Se abrimos um estado no histórico, voltamos (mas sem travar o fechamento)
    if (history.state && history.state.modalOpen) {
        history.back();
    }
}

// Corrigindo o clique fora para o novo layout
window.onclick = function(event) {
    const modal = document.getElementById('gallery-modal');
    // Se o clique foi no modal (fundo glass) e não no conteúdo interno, fecha.
    if (event.target === modal) {
        closeGallery();
    }
};




