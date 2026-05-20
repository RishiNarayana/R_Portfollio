(function() {
    "use strict";

    console.log("Cloud effect script loaded");

    const CONFIG = {
        particleCount: 30,
        baseSize: 150,
        sizeVariation: 200,
        baseOpacity: 0.3, // Increased for visibility
        easing: 0.05,
        scrollIntensity: 0.8,
        driftSpeed: 0.3,
        color: '139, 92, 246' // Vibrant Violet (matches primary indigo)
    };

    const mouse = { x: -1000, y: -1000 };
    const scroll = { current: 0, last: 0, delta: 0 };
    let canvas, ctx, width, height, particles = [], container;

    class Particle {
        constructor() { this.init(); }
        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = CONFIG.baseSize + Math.random() * CONFIG.sizeVariation;
            this.vx = (Math.random() - 0.5) * CONFIG.driftSpeed;
            this.vy = (Math.random() - 0.5) * CONFIG.driftSpeed;
            this.opacity = Math.random() * CONFIG.baseOpacity;
        }
        update() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 600) {
                this.x += dx * CONFIG.easing * 0.1;
                this.y += dy * CONFIG.easing * 0.1;
            }
            
            this.x += this.vx;
            this.y += this.vy - (scroll.delta * CONFIG.scrollIntensity);
            
            if (this.x < -this.size) this.x = width + this.size;
            if (this.x > width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = height + this.size;
            if (this.y > height + this.size) this.y = -this.size;
            
            this.draw();
        }
        draw() {
            ctx.beginPath();
            const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            g.addColorStop(0, `rgba(${CONFIG.color}, ${this.opacity})`);
            g.addColorStop(1, `rgba(${CONFIG.color}, 0)`);
            ctx.fillStyle = g;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function onResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        console.log("Canvas resized:", width, "x", height);
    }

    function init() {
        console.log("Initializing cloud effect...");
        container = document.createElement('div');
        container.id = 'cloud-effect-container';
        canvas = document.createElement('canvas');
        container.appendChild(canvas);
        document.body.appendChild(container);
        
        ctx = canvas.getContext('2d');
        onResize();

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', e => { 
            mouse.x = e.clientX; 
            mouse.y = e.clientY; 
        });
        window.addEventListener('scroll', () => {
            scroll.current = window.scrollY;
            scroll.delta = scroll.current - scroll.last;
            scroll.last = scroll.current;
        }, { passive: true });
        
        window.addEventListener('keydown', e => { 
            if(e.key === 'Escape') {
                container.style.display = container.style.display === 'none' ? 'block' : 'none';
                console.log("Effect toggled:", container.style.display);
            }
        });

        for (let i = 0; i < CONFIG.particleCount; i++) particles.push(new Particle());
        
        console.log("Cloud effect initialized with", CONFIG.particleCount, "particles");
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update());
        scroll.delta *= 0.9;
        requestAnimationFrame(animate);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
