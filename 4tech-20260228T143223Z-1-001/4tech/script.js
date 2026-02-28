// Aguarda o carregamento completo do DOM para executar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU LATERAL (SIDEBAR) ---
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('mySidebar');
    const mainContent = document.getElementById('main');

    if (menuIcon && sidebar && mainContent) {
        let menuTimeout;

        const openMenu = () => {
            clearTimeout(menuTimeout);
            sidebar.style.left = '0';
            // Se quiser que o conteúdo principal seja empurrado para o lado, descomente a linha abaixo
            // mainContent.style.marginLeft = '250px';
        };

        const closeMenu = () => {
            sidebar.style.left = '-250px';
            // mainContent.style.marginLeft = '0';
        };

        // Abre o menu ao passar o mouse sobre o ícone
        menuIcon.addEventListener('mouseenter', openMenu);

        // Fecha o menu quando o mouse sai da área do menu
        sidebar.addEventListener('mouseleave', () => {
            menuTimeout = setTimeout(closeMenu, 300); // Um pequeno delay para melhor usabilidade
        });

        // Mantém o menu aberto enquanto o mouse estiver sobre ele
        sidebar.addEventListener('mouseenter', () => {
            clearTimeout(menuTimeout);
        });

        // Fecha o menu ao clicar em um link (para navegação em âncoras)
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE CONTATO ---
    const form = document.querySelector(".contact-form");
    const successMessage = document.getElementById("success-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { Accept: "application/json" },
            })
            .then((response) => {
                if (response.ok) {
                    successMessage.style.display = "block";
                    form.reset();
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 4000); // Esconde a mensagem após 4 segundos
                } else {
                    alert("Erro ao enviar a mensagem. Tente novamente.");
                }
            })
            .catch(() => alert("Ocorreu um erro. Verifique sua conexão e tente novamente."));
        });
    }

    // --- INICIALIZAÇÃO DO SWIPER (CARROSSEL) ---
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 10,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
});