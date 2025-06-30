document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMenuButton = document.getElementById('close-menu-button');

    function openMenu() {
        mobileNavPanel.classList.remove('-translate-x-full');
        mobileNavOverlay.classList.remove('hidden');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        mobileNavPanel.classList.add('-translate-x-full');
        mobileNavOverlay.classList.add('hidden');
        document.body.classList.remove('menu-open');
    }
    
    mobileMenuButton.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    mobileNavOverlay.addEventListener('click', closeMenu);
    
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            closeMenu();
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    function setupCarousel(containerId, items, isService) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const track = container.querySelector('.carousel-track');
        const prevBtn = container.querySelector('.carousel-button.prev');
        const nextBtn = container.querySelector('.carousel-button.next');
        if (!track || !prevBtn || !nextBtn) return;

        track.innerHTML = '';
        items.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (isService) {
                slide.innerHTML = `
                    <div class="bg-light-200 rounded-lg overflow-hidden group h-full flex flex-col p-6 text-center shadow-md">
                        <div class="w-20 h-20 bg-light-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-300">
                            <svg class="w-10 h-10 text-accent" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-accent">${item.name}</h3>
                        <ul class="service-details text-sm flex-grow text-left">
                            <li><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg><span>Preço: ${item.price}</span></li>
                            <li><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.286 2.143L13 21l-2.286-6.857L5 12l5.286-2.143L13 3z"></path></svg><span>NEO CLUB: ${item.club ? 'Incluso no plano' : 'Consulte desconto'}</span></li>
                            <li><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Tempo aprox: ${item.time}</span></li>
                        </ul>
                    </div>`;
            } else {
                 slide.innerHTML = `<img src="${item}" alt="Foto da galeria" class="w-full h-64 md:h-80 object-cover rounded-lg">`;
            }
            track.appendChild(slide);
        });

        let currentIndex = 0;
        const totalSlides = items.length;
        
        function updateCarousel() {
            const slides = track.querySelectorAll('.carousel-slide');
            if (slides.length === 0) return;
            
            let itemsPerView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
            
            const maxIndex = totalSlides - itemsPerView;
            if (currentIndex > maxIndex) currentIndex = 0;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });
        
        window.addEventListener('resize', updateCarousel);
        updateCarousel(); // Initial call
    }

    const services = [
        { name: 'Corte', price: 'R$ 50,00', club: true, time: '45 min' },
        { name: 'Barba', price: 'R$ 50,00', club: true, time: '30 min' },
        { name: 'Corte Infantil', price: 'R$ 55,00', club: false, time: '40 min' },
        { name: 'Pai e Filho', price: 'R$ 95,00', club: false, time: '1h 20min' },
        { name: 'Sobrancelha Navalhada', price: 'R$ 25,00', club: false, time: '15 min' },
        { name: 'Sobrancelha Cera', price: 'R$ 35,00', club: false, time: '20 min' },
        { name: 'Raspar (Máquina)', price: 'R$ 45,00', club: true, time: '25 min' },
        { name: 'Raspar Cabeça (Navalha)', price: 'R$ 55,00', club: true, time: '35 min' },
        { name: 'Pezinho (Cabelo)', price: 'R$ 40,00', club: false, time: '20 min' },
        { name: 'Pezinho (Barba)', price: 'R$ 40,00', club: false, time: '20 min' },
        { name: 'Penteado', price: 'R$ 35,00', club: false, time: '20 min' },
        { name: 'Limpeza Orelha', price: 'R$ 30,00', club: false, time: '15 min' },
        { name: 'Limpeza Nasal', price: 'R$ 30,00', club: false, time: '15 min' },
        { name: 'Limpeza (Combo)', price: 'R$ 50,00', club: false, time: '25 min' },
        { name: 'Hidratação Cabelo', price: 'A partir de R$ 40,00', club: false, time: '30 min' },
        { name: 'Hidratação Barba', price: 'A partir de R$ 40,00', club: false, time: '25 min' },
        { name: 'Alisamento Selagem + Corte', price: 'A partir de R$ 130,00', club: false, time: '1h 45min' },
        { name: 'Alisamento Selagem', price: 'A partir de R$ 110,00', club: false, time: '1h 30min' },
        { name: 'Alisamento Botox + Corte', price: 'A partir de R$ 120,00', club: false, time: '1h 40min' },
        { name: 'Alisamento Botox', price: 'A partir de R$ 100,00', club: false, time: '1h 30min' },
    ];
    setupCarousel('services-carousel', services, true);

    const galleryImages = [
        './foto01.png',
        './foto02.png',
        './foto04.png',
        './foto03.png',
        './foto05.png',
        './foto06.png'
    ];
    setupCarousel('gallery-carousel', galleryImages, false);

    document.getElementById('current-year').textContent = new Date().getFullYear();
});