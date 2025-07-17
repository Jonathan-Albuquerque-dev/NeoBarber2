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
                                    <img src="${item.icon}" alt="Foto da galeria" class="rounded-full">
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
                { name: 'Corte', price: 'R$ 60,00', club: true, time: '30 min',icon:'assets/img/corte.png' },
                { name: 'Barba', price: 'R$ 60,00', club: true, time: '30 min',icon:'assets/img/barba.png' },
                { name: 'Corte Infantil', price: 'R$ 55,00', club: false, time: '40 min',icon:'assets/img/corte infantil.png' },
                { name: 'Pai e Filho', price: 'R$ 100,00', club: false, time: '1h 20min',icon:'assets/img/corte pai e filho.png' },
                { name: 'Sobrancelha Navalhada', price: 'R$ 25,00', club: false, time: '15 min',icon:'assets/img/sobrancelha navalha.png' },
                { name: 'Sobrancelha Cera', price: 'R$ 35,00', club: false, time: '20 min',icon:'assets/img/sobrancelha cera.png' },
                { name: 'Raspar (Máquina)', price: 'R$ 45,00', club: true, time: '25 min',icon:'assets/img/raspar cabeca máquina.png' },
                { name: 'Raspar Cabeça (Navalha)', price: 'R$ 55,00', club: true, time: '35 min',icon:'assets/img/raspar cabeca navalha.png' },
                { name: 'Pezinho (Cabelo)', price: 'R$ 40,00', club: false, time: '20 min',icon:'assets/img/pezinho cabelo.png' },
                { name: 'Pezinho (Barba)', price: 'R$ 40,00', club: false, time: '20 min',icon:'assets/img/pezinho barba.png' },
                { name: 'Penteado', price: 'R$ 35,00', club: false, time: '20 min',icon:'assets/img/penteado.png' },
                { name: 'Limpeza Orelha', price: 'R$ 30,00', club: false, time: '15 min',icon:'assets/img/limpeza orelha.png' },
                { name: 'Limpeza Nasal', price: 'R$ 30,00', club: false, time: '15 min',icon:'assets/img/limpeza nariz.png' },
                { name: 'Limpeza (Combo)', price: 'R$ 50,00', club: false, time: '25 min',icon:'assets/img/limpeza nariz + orelha.png' },
                { name: 'Hidratação Cabelo', price: 'A partir de R$ 40,00', club: false, time: '30 min',icon:'assets/img/hidra cabelo.png' },
                { name: 'Hidratação Barba', price: 'A partir de R$ 40,00', club: false, time: '25 min',icon:'assets/img/hidra barba.png' },
                { name: 'Alisamento Selagem + Corte', price: 'A partir de R$ 130,00', club: false, time: '1h 45min',icon:'assets/img/alisamento selagem + corte.png' },
                { name: 'Alisamento Selagem', price: 'A partir de R$ 110,00', club: false, time: '1h 30min',icon:'assets/img/17.png' },
                { name: 'Alisamento Botox + Corte', price: 'A partir de R$ 130,00', club: false, time: '1h 40min',icon:'assets/img/20.png' },
                { name: 'Alisamento Botox', price: 'A partir de R$ 100,00', club: false, time: '1h 30min',icon:'assets/img/19.png' },
            ];
            setupCarousel('services-carousel', services, true);

            const galleryImages = [
                'assets/img/foto01.png',
                'assets/img/foto02.png',
                'assets/img/foto03.png',
                'assets/img/foto04.png',
                'assets/img/foto05.png',
                'assets/img/foto06.png',
                'assets/img/foto07.png',
                'assets/img/foto08.png',
                'assets/img/foto09.png',
                'assets/img/foto010.png',
                'assets/img/foto011.png',
                'assets/img/foto012.png',
            ];
            setupCarousel('gallery-carousel', galleryImages, false);

            document.getElementById('current-year').textContent = new Date().getFullYear();
        });