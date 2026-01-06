 // --- 1. Particle Animation (Optimized) ---
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray;

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = '#6366f1'; ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY; this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Azaltılmış parçacık sayısı (Daha iyi performans ve daha temiz görünüm)
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 0.5;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 25000);
                        ctx.strokeStyle = 'rgba(99, 102, 241,' + (opacityValue * 0.5) + ')'; // Daha silik çizgiler
                        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
            connectParticles();
        }

        window.addEventListener('resize', function() { setCanvasSize(); initParticles(); });
        initParticles(); animateParticles();

        // --- 2. Typewriter Effect ---
        const textElement = document.getElementById('typewriter-text');
        const texts = ["Full Stack Developer", "UI/UX Designer", "Freelancer"];
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';

        (function type() {
            if (count === texts.length) { count = 0; }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            textElement.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++; index = 0; setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        })();

        // --- 3. Mobile Menu & Scroll Reveal ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if(isMenuOpen) {
                mobileMenu.classList.add('open');
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenu.classList.remove('open');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Intersection Observer with Stagger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { 
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); 
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));