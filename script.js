ntainer) imgContainer.classList.add('fade-out');
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



















