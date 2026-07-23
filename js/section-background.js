(() => {
  const sections = document.querySelectorAll("[data-section-background-host]");

  if (!sections.length) return;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  class SectionTrailField {
    constructor(section, canvas, context) {
      this.section = section;
      this.canvas = canvas;
      this.context = context;
      this.width = 0;
      this.height = 0;
      this.particles = [];
      this.frameId = 0;
      this.resizeFrame = 0;
      this.lastFrameAt = 0;
      this.isVisible = true;
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.reducedMotion = this.motionQuery.matches;

      this.frame = this.frame.bind(this);
      this.resize = this.resize.bind(this);
      this.scheduleResize = this.scheduleResize.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);

      this.init();
    }

    init() {
      this.resize();
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      this.motionQuery.addEventListener("change", this.onMotionChange);

      if ("ResizeObserver" in window) {
        this.resizeObserver = new ResizeObserver(this.scheduleResize);
        this.resizeObserver.observe(this.section);
      } else {
        window.addEventListener("resize", this.scheduleResize, { passive: true });
      }

      if ("IntersectionObserver" in window) {
        this.intersectionObserver = new IntersectionObserver(([entry]) => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) this.schedule();
          else this.stop();
        }, { threshold: 0.01 });
        this.intersectionObserver.observe(this.section);
      }

      this.schedule();
    }

    scheduleResize() {
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.resizeFrame = 0;
        this.resize();
      });
    }

    resize() {
      const rect = this.section.getBoundingClientRect();
      this.width = Math.max(1, rect.width);
      this.height = Math.max(1, rect.height);

      const mobile = this.width < 640;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5);
      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = mobile ? 6 : clamp(Math.round(this.width / 72), 12, 22);
      this.particles.length = 0;
      for (let index = 0; index < total; index += 1) {
        this.particles.push(this.createParticle(index, true));
      }

      if (this.reducedMotion) this.prepareStaticField();
      this.render();
      this.lastFrameAt = 0;
      this.schedule();
    }

    createParticle(index, initial) {
      const particle = {
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
        length: 0,
        size: 0,
        alpha: 0,
        age: 0,
        maxAge: 1,
        delay: 0,
        active: false,
      };
      this.resetParticle(particle, initial, index);
      return particle;
    }

    resetParticle(particle, initial = false, index = 0) {
      const angle = 0.07 + Math.random() * 0.2;
      const depth = 0.58 + Math.random() * 0.72;
      const speed = (48 + Math.random() * 72) * depth;

      particle.length = (40 + Math.random() * 100) * depth;
      particle.size = 1 + Math.random() * 2;
      particle.alpha = 0.24 + Math.random() * 0.42;
      particle.velocityX = Math.cos(angle) * speed;
      particle.velocityY = Math.sin(angle) * speed;
      particle.age = 0;
      particle.active = initial;
      particle.delay = initial ? index * 0.11 + Math.random() * 0.8 : 0.65 + Math.random() * 2.9;

      if (initial) {
        particle.x = -particle.length + Math.random() * (this.width + particle.length * 0.7);
        particle.y = -this.height * 0.08 + Math.random() * this.height * 1.06;
        particle.maxAge = Math.max(1.4, (this.width + particle.length - particle.x) / particle.velocityX);
        particle.age = Math.random() * Math.min(particle.maxAge * 0.42, 2.4);
      }
    }

    activateParticle(particle) {
      particle.active = true;
      particle.age = 0;
      particle.x = -particle.length - Math.random() * this.width * 0.16;
      particle.y = -this.height * 0.06 + Math.random() * this.height * 0.94;
      particle.maxAge = Math.max(1.8, (this.width + particle.length - particle.x) / particle.velocityX);
    }

    prepareStaticField() {
      const visibleCount = Math.min(this.width < 640 ? 3 : 5, this.particles.length);
      this.particles.forEach((particle, index) => {
        particle.active = index < visibleCount;
        if (!particle.active) return;
        particle.x = this.width * (0.08 + (index + 1) / (visibleCount + 2));
        particle.y = this.height * (0.12 + ((index * 0.23) % 0.72));
        particle.age = 1;
        particle.maxAge = 5;
      });
    }

    update(elapsed) {
      for (const particle of this.particles) {
        if (!particle.active) {
          particle.delay -= elapsed;
          if (particle.delay <= 0) this.activateParticle(particle);
          continue;
        }

        particle.age += elapsed;
        particle.x += particle.velocityX * elapsed;
        particle.y += particle.velocityY * elapsed;

        if (particle.age >= particle.maxAge || particle.x - particle.length > this.width || particle.y > this.height + particle.length) {
          this.resetParticle(particle);
        }
      }
    }

    render() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.save();
      this.context.globalCompositeOperation = "screen";

      for (const particle of this.particles) {
        if (!particle.active) continue;

        const fadeIn = clamp(particle.age / 0.55, 0, 1);
        const fadeOut = clamp((particle.maxAge - particle.age) / 0.85, 0, 1);
        const opacity = particle.alpha * Math.min(fadeIn, fadeOut);
        if (opacity <= 0.002) continue;

        const magnitude = Math.hypot(particle.velocityX, particle.velocityY) || 1;
        const directionX = particle.velocityX / magnitude;
        const directionY = particle.velocityY / magnitude;
        const tailX = particle.x - directionX * particle.length;
        const tailY = particle.y - directionY * particle.length;
        const trail = this.context.createLinearGradient(tailX, tailY, particle.x, particle.y);
        trail.addColorStop(0, "rgba(57, 211, 83, 0)");
        trail.addColorStop(0.72, `rgba(57, 211, 83, ${(opacity * 0.18).toFixed(3)})`);
        trail.addColorStop(1, `rgba(57, 211, 83, ${opacity.toFixed(3)})`);

        this.context.strokeStyle = trail;
        this.context.lineWidth = Math.max(0.55, particle.size * 0.58);
        this.context.beginPath();
        this.context.moveTo(tailX, tailY);
        this.context.lineTo(particle.x, particle.y);
        this.context.stroke();

        this.context.fillStyle = `rgba(118, 245, 139, ${Math.min(1, opacity * 1.35).toFixed(3)})`;
        this.context.beginPath();
        this.context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.context.fill();
      }

      this.context.restore();
    }

    frame(now) {
      this.frameId = 0;
      if (!this.isVisible || document.hidden || this.reducedMotion) return;

      const elapsed = this.lastFrameAt ? Math.min((now - this.lastFrameAt) / 1000, 0.05) : 1 / 60;
      this.lastFrameAt = now;
      this.update(elapsed);
      this.render();
      this.schedule();
    }

    schedule() {
      if (!this.frameId && this.isVisible && !document.hidden && !this.reducedMotion) {
        this.frameId = window.requestAnimationFrame(this.frame);
      }
    }

    stop() {
      if (this.frameId) window.cancelAnimationFrame(this.frameId);
      this.frameId = 0;
      this.lastFrameAt = 0;
    }

    onVisibilityChange() {
      if (document.hidden) this.stop();
      else this.schedule();
    }

    onMotionChange(event) {
      this.reducedMotion = event.matches;
      this.stop();
      if (this.reducedMotion) {
        this.prepareStaticField();
        this.render();
      } else {
        this.particles.forEach((particle, index) => this.resetParticle(particle, true, index));
        this.render();
        this.schedule();
      }
    }
  }

  sections.forEach((section) => {
    const canvas = section.querySelector("[data-section-background]");
    const context = canvas?.getContext("2d");
    if (canvas && context) new SectionTrailField(section, canvas, context);
  });
})();
