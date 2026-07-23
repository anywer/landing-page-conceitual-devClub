(() => {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  class HeroEffects {
    constructor(hero) {
      this.initialized = false;
      this.hero = hero;
      this.backCanvas = hero.querySelector("[data-particles-back]");
      this.frontCanvas = hero.querySelector("[data-particles-front]");
      this.symbol = hero.querySelector("[data-hero-symbol]");
      this.cube = hero.querySelector("[data-hero-cube]");
      this.backContext = this.backCanvas?.getContext("2d");
      this.frontContext = this.frontCanvas?.getContext("2d");

      if (!this.backContext || !this.frontContext || !this.symbol || !this.cube) return;

      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.reducedMotion = this.motionQuery.matches;
      this.backParticles = [];
      this.frontParticles = [];
      this.waves = [];
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.symbolBounds = { x: 0, y: 0, width: 1, height: 1, radius: 1 };
      this.width = 0;
      this.height = 0;
      this.raf = 0;
      this.lastPointerFrameAt = 0;
      this.isVisible = true;
      this.logoGlowUntil = 0;
      this.intro = {
        startedAt: performance.now(),
        contentVisible: false,
        particlesVisible: false,
        cubeVisible: false,
        ready: false,
      };
      this.cubeMotion = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        rotateX: -14,
        rotateY: 26,
        targetRotateX: -14,
        yawOffset: 0,
        targetYawOffset: 0,
        baseRotationSpeed: 0.014,
        rotationSpeed: 0.014,
        lastFrameAt: 0,
        nextTargetAt: 0,
        followsPointer: false,
      };

      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerLeave = this.onPointerLeave.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);
      this.frame = this.frame.bind(this);
      this.resize = this.resize.bind(this);

      this.init();
      this.initialized = true;
    }

    init() {
      this.hero.classList.add("hero--loading");
      this.resize();
      this.hero.addEventListener("pointermove", this.onPointerMove, { passive: true });
      this.hero.addEventListener("pointerdown", this.onPointerDown, { passive: true });
      this.hero.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      this.motionQuery.addEventListener("change", this.onMotionChange);

      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.hero);

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) this.schedule();
        else this.stop();
      }, { threshold: 0.01 });
      this.intersectionObserver.observe(this.hero);
      this.schedule();
    }

    resize() {
      const heroRect = this.hero.getBoundingClientRect();
      const symbolRect = this.symbol.getBoundingClientRect();
      const cubeSize = this.cube.offsetWidth;
      this.width = Math.max(1, heroRect.width);
      this.height = Math.max(1, heroRect.height);

      const mobile = this.width < 720;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75);

      [this.backCanvas, this.frontCanvas].forEach((canvas) => {
        canvas.width = Math.round(this.width * dpr);
        canvas.height = Math.round(this.height * dpr);
        canvas.style.width = `${this.width}px`;
        canvas.style.height = `${this.height}px`;
      });
      this.backContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.frontContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      const symbolCenterX = symbolRect.left - heroRect.left + symbolRect.width / 2;
      const symbolCenterY = symbolRect.top - heroRect.top + symbolRect.height / 2;
      this.symbolBounds = {
        x: symbolCenterX - cubeSize / 2,
        y: symbolCenterY - cubeSize / 2,
        width: cubeSize,
        height: cubeSize,
        radius: cubeSize * 0.52,
      };

      const centerX = this.symbolBounds.x + this.symbolBounds.width / 2;
      const centerY = this.symbolBounds.y + this.symbolBounds.height / 2;
      this.pointer.x = this.pointer.targetX = centerX;
      this.pointer.y = this.pointer.targetY = centerY;

      this.waveGradient = this.backContext.createLinearGradient(0, 0, this.width, this.height);
      this.waveGradient.addColorStop(0, "#9667ff");
      this.waveGradient.addColorStop(0.55, "#725cff");
      this.waveGradient.addColorStop(1, "#42a5ff");
      this.createParticles(centerX, centerY, mobile);
      const now = performance.now();
      this.render(now);
      this.schedule();
    }

    createParticles(centerX, centerY, mobile) {
      const areaCount = Math.floor((this.width * this.height) / (mobile ? 4200 : 6200));
      const baseTotal = mobile ? clamp(areaCount, 80, 112) : clamp(areaCount, 140, 230);
      const total = Math.round(baseTotal * (mobile ? 4.4 : 5.6));
      const primaryCount = Math.floor(total * 0.6);
      const intermediateCount = Math.floor(total * 0.27);
      const edgeCount = total - primaryCount - intermediateCount;
      const frontCount = Math.max(2, Math.round(total * (mobile ? 0.02 : 0.03)));
      const primaryBackCount = primaryCount - frontCount;

      this.backParticles.length = 0;
      this.frontParticles.length = 0;

      for (let index = 0; index < primaryBackCount; index += 1) {
        this.backParticles.push(this.createParticle(centerX, centerY, false, "primary"));
      }
      for (let index = 0; index < intermediateCount; index += 1) {
        this.backParticles.push(this.createParticle(centerX, centerY, false, "intermediate"));
      }
      for (let index = 0; index < edgeCount; index += 1) {
        this.backParticles.push(this.createParticle(centerX, centerY, false, "edge"));
      }
      for (let index = 0; index < frontCount; index += 1) {
        this.frontParticles.push(this.createParticle(centerX, centerY, true, "primary"));
      }
    }

    createParticle(centerX, centerY, isFront, zone) {
      const position = this.sampleParticlePosition(centerX, centerY, zone);
      const visual = zone === "primary"
        ? { alphaBase: 0.045, alphaRange: 0.17, radiusBase: 0.38, radiusRange: 1.45 }
        : zone === "intermediate"
          ? { alphaBase: 0.032, alphaRange: 0.105, radiusBase: 0.32, radiusRange: 0.96 }
          : { alphaBase: 0.022, alphaRange: 0.06, radiusBase: 0.26, radiusRange: 0.62 };
      const frontScale = isFront ? 0.68 : 1;

      return {
        x: position.x,
        y: position.y,
        radius: (visual.radiusBase + Math.random() * visual.radiusRange) * frontScale,
        depth: (isFront ? 0.82 : 0.36) + Math.random() * (isFront ? 0.18 : 0.54),
        alpha: (isFront ? 0.024 : visual.alphaBase) + Math.random() * (isFront ? 0.055 : visual.alphaRange),
        centerWeight: position.centerWeight,
        phase: Math.random() * Math.PI * 2,
        drift: 0.25 + Math.random() * 0.75,
        sparkle: !isFront && zone !== "edge" && Math.random() < 0.045 + position.centerWeight * 0.075,
        twinkle: 0.06 + Math.random() * 0.12,
        blue: Math.random() > 0.48,
        revealOffset: Math.random() * 140,
      };
    }

    sampleParticlePosition(centerX, centerY, zone) {
      const mobile = this.width < 720;

      if (zone === "edge") {
        let x = 0;
        let y = 0;
        let distance = 0;

        for (let attempt = 0; attempt < 10; attempt += 1) {
          x = 4 + Math.random() * Math.max(1, this.width - 8);
          y = 4 + Math.random() * Math.max(1, this.height - 8);
          const normalizedX = (x - centerX) / Math.max(1, this.width * 0.52);
          const normalizedY = (y - centerY) / Math.max(1, this.height * 0.58);
          distance = Math.hypot(normalizedX, normalizedY);
          if (distance >= 0.72) break;
        }

        return {
          x,
          y,
          centerWeight: 0.05 + clamp(1 - distance, 0, 1) * 0.14,
        };
      }

      const angle = Math.random() * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
      let radius;
      let spreadX;
      let spreadY;
      let centerWeight;

      if (zone === "primary") {
        const centralReliefParticle = Math.random() < 0.07;
        const organicRing = (Math.random() + Math.random()) * 0.5;
        radius = centralReliefParticle ? 0.04 + Math.random() * 0.18 : 0.22 + organicRing * 0.82;
        spreadX = Math.max(this.symbolBounds.width * (mobile ? 1.35 : 1.75), this.width * (mobile ? 0.46 : 0.32));
        spreadY = Math.max(this.symbolBounds.height * (mobile ? 1.25 : 1.55), this.height * (mobile ? 0.34 : 0.4));
        const ringStrength = 1 - clamp(Math.abs(radius - 0.62) / 0.62, 0, 1);
        centerWeight = centralReliefParticle ? 0.2 : 0.56 + ringStrength * 0.34;
      } else {
        radius = 0.46 + Math.pow(Math.random(), 0.86) * 0.54;
        spreadX = this.width * (mobile ? 0.56 : 0.48);
        spreadY = this.height * (mobile ? 0.48 : 0.56);
        centerWeight = 0.22 + (1 - radius) * 0.34;
      }

      const organicScale = 0.88 + Math.random() * 0.24;
      return {
        x: clamp(centerX + Math.cos(angle) * spreadX * radius * organicScale, 4, this.width - 4),
        y: clamp(centerY + Math.sin(angle) * spreadY * radius * organicScale, 4, this.height - 4),
        centerWeight: clamp(centerWeight, 0, 1),
      };
    }

    updateIntro(now) {
      const elapsed = now - this.intro.startedAt;
      const reducedReadyAt = 220;

      if (!this.intro.contentVisible && (this.reducedMotion || elapsed >= 100)) {
        this.intro.contentVisible = true;
        this.hero.classList.add("hero--content-visible");
      }
      if (!this.intro.particlesVisible && (this.reducedMotion || elapsed >= 680)) {
        this.intro.particlesVisible = true;
        this.hero.classList.add("hero--particles-visible");
      }
      if (!this.intro.cubeVisible && (this.reducedMotion || elapsed >= 900)) {
        this.intro.cubeVisible = true;
        this.hero.classList.add("hero--cube-entering");
      }

      let speedMultiplier = 1;
      if (!this.reducedMotion && elapsed >= 900 && elapsed < 1600) {
        speedMultiplier = 3.6;
      } else if (!this.reducedMotion && elapsed >= 1600 && elapsed < 1950) {
        const deceleration = clamp((elapsed - 1600) / 350, 0, 1);
        speedMultiplier = 1 + 2.6 * Math.pow(1 - deceleration, 3);
      }
      this.cubeMotion.rotationSpeed = this.cubeMotion.baseRotationSpeed * speedMultiplier;

      const readyAt = this.reducedMotion ? reducedReadyAt : 2100;
      if (!this.intro.ready && elapsed >= readyAt) {
        this.intro.ready = true;
        this.hero.classList.remove("hero--loading", "hero--cube-entering");
        this.hero.classList.add("hero--ready");
      }
    }

    localPoint(event) {
      const rect = this.hero.getBoundingClientRect();
      return {
        x: clamp(event.clientX - rect.left, 0, rect.width),
        y: clamp(event.clientY - rect.top, 0, rect.height),
      };
    }

    onPointerMove(event) {
      if (event.pointerType === "touch") return;
      const point = this.localPoint(event);
      this.pointer.targetX = point.x;
      this.pointer.targetY = point.y;
      this.schedule();
    }

    onPointerDown(event) {
      if (event.target instanceof Element && event.target.closest("a, button")) return;
      const point = this.localPoint(event);
      this.pointer.targetX = point.x;
      this.pointer.targetY = point.y;
      if (event.pointerType === "touch") {
        this.cubeMotion.followsPointer = false;
        this.pointer.x = point.x;
        this.pointer.y = point.y;
      } else {
        this.cubeMotion.followsPointer = true;
      }
      this.addWave(point.x, point.y);
      this.schedule();
    }

    onPointerLeave(event) {
      if (event.pointerType === "touch") return;
      this.cubeMotion.followsPointer = false;
      this.cubeMotion.targetX = 0;
      this.cubeMotion.targetY = 0;
      this.cubeMotion.targetYawOffset = 0;
      this.pointer.targetX = this.symbolBounds.x + this.symbolBounds.width / 2;
      this.pointer.targetY = this.symbolBounds.y + this.symbolBounds.height / 2;
    }

    addWave(x, y) {
      if (this.waves.length >= 3) this.waves.shift();
      const farthestX = Math.max(x, this.width - x);
      const farthestY = Math.max(y, this.height - y);
      this.waves.push({
        x,
        y,
        start: performance.now(),
        duration: this.reducedMotion ? 620 : 1650,
        maxRadius: Math.hypot(farthestX, farthestY) + 30,
        progress: 0,
        radius: 0,
        hitLogo: false,
      });
    }

    onVisibilityChange() {
      if (document.hidden) this.stop();
      else this.schedule();
    }

    onMotionChange(event) {
      this.reducedMotion = event.matches;
      this.waves.length = 0;
      this.cubeMotion.followsPointer = false;
      this.cubeMotion.nextTargetAt = 0;
      const now = performance.now();
      this.updateIntro(now);
      this.updateCube(now, this.reducedMotion);
      this.render(now);
      this.schedule();
    }

    schedule() {
      if (!this.raf && this.isVisible && !document.hidden) {
        this.raf = window.requestAnimationFrame(this.frame);
      }
    }

    stop() {
      if (this.raf) window.cancelAnimationFrame(this.raf);
      this.raf = 0;
    }

    frame(now) {
      this.raf = 0;
      const elapsed = this.lastPointerFrameAt ? clamp(now - this.lastPointerFrameAt, 0, 50) : 16.67;
      this.lastPointerFrameAt = now;
      const easing = this.reducedMotion ? 1 : 1 - Math.exp(-elapsed / 18);
      this.pointer.x += (this.pointer.targetX - this.pointer.x) * easing;
      this.pointer.y += (this.pointer.targetY - this.pointer.y) * easing;
      this.updateIntro(now);
      this.updateCube(now);
      this.render(now);

      const pointerMoving = Math.abs(this.pointer.targetX - this.pointer.x) + Math.abs(this.pointer.targetY - this.pointer.y) > 0.5;
      if (!this.reducedMotion || !this.intro.ready || this.waves.length || pointerMoving || now < this.logoGlowUntil) {
        this.schedule();
      }
    }

    updateCube(now, immediate = false) {
      const motion = this.cubeMotion;
      const elapsed = motion.lastFrameAt ? clamp(now - motion.lastFrameAt, 0, 50) : 16.67;
      motion.lastFrameAt = now;

      if (this.reducedMotion) {
        motion.targetX = 0;
        motion.targetY = 0;
        motion.targetRotateX = -14;
        motion.targetYawOffset = 0;
        motion.rotateY = 26;
      } else {
        motion.rotateY += elapsed * motion.rotationSpeed;
      }

      if (!this.reducedMotion && motion.followsPointer) {
        const centerX = this.symbolBounds.x + this.symbolBounds.width / 2;
        const centerY = this.symbolBounds.y + this.symbolBounds.height / 2;
        const normalizedX = clamp((this.pointer.targetX - centerX) / (this.width * 0.5), -1, 1);
        const normalizedY = clamp((this.pointer.targetY - centerY) / (this.height * 0.5), -1, 1);
        motion.targetX = normalizedX * Math.min(this.width * 0.16, 120);
        motion.targetY = normalizedY * Math.min(this.height * 0.1, 72);
        motion.targetRotateX = -normalizedY * 30;
        motion.targetYawOffset = normalizedX * 28;
      } else if (!this.reducedMotion && now >= motion.nextTargetAt) {
        motion.targetX = (Math.random() - 0.5) * Math.min(this.width * 0.12, 88);
        motion.targetY = (Math.random() - 0.5) * Math.min(this.height * 0.07, 52);
        motion.targetRotateX = -28 + Math.random() * 56;
        motion.targetYawOffset = 0;
        motion.nextTargetAt = now + 2200 + Math.random() * 2600;
      }

      const easing = immediate || this.reducedMotion ? 1 : motion.followsPointer ? 0.065 : 0.014;
      motion.x += (motion.targetX - motion.x) * easing;
      motion.y += (motion.targetY - motion.y) * easing;
      motion.rotateX += (motion.targetRotateX - motion.rotateX) * easing;
      motion.yawOffset += (motion.targetYawOffset - motion.yawOffset) * easing;
      if (Math.abs(motion.rotateY) > 7200) {
        const completedTurns = Math.trunc(motion.rotateY / 360) * 360;
        motion.rotateY -= completedTurns;
      }

      this.cube.style.setProperty("--cube-x", `${motion.x.toFixed(2)}px`);
      this.cube.style.setProperty("--cube-y", `${motion.y.toFixed(2)}px`);
      this.cube.style.setProperty("--cube-rotate-x", `${motion.rotateX.toFixed(2)}deg`);
      this.cube.style.setProperty("--cube-rotate-y", `${(motion.rotateY + motion.yawOffset).toFixed(2)}deg`);
    }

    render(now) {
      for (let index = this.waves.length - 1; index >= 0; index -= 1) {
        if (now - this.waves[index].start >= this.waves[index].duration) this.waves.splice(index, 1);
      }
      for (const wave of this.waves) {
        wave.progress = clamp((now - wave.start) / wave.duration, 0, 1);
        wave.radius = wave.maxRadius * (1 - Math.pow(1 - wave.progress, 2.05));
      }

      this.backContext.clearRect(0, 0, this.width, this.height);
      this.frontContext.clearRect(0, 0, this.width, this.height);
      this.drawWaves();
      this.drawParticles(this.backContext, this.backParticles, now, false);
      this.drawParticles(this.frontContext, this.frontParticles, now, true);
      this.updateLight(now);
    }

    drawWaves() {
      const context = this.backContext;
      context.save();
      context.strokeStyle = this.waveGradient;
      context.globalCompositeOperation = "screen";

      for (const wave of this.waves) {
        const fade = Math.sin(wave.progress * Math.PI);
        context.globalAlpha = fade * (this.reducedMotion ? 0.2 : 0.32);
        context.lineWidth = this.reducedMotion ? 20 : 68;
        context.beginPath();
        context.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();
    }

    drawParticles(context, particles, now, isFront) {
      const driftTime = now * 0.00035;
      const spotlightRadius = Math.min(this.width * 0.38, this.width < 720 ? 180 : 420);

      for (const particle of particles) {
        const rawReveal = this.reducedMotion
          ? 1
          : clamp((now - this.intro.startedAt - 680 - particle.revealOffset) / 320, 0, 1);
        const reveal = rawReveal * rawReveal * (3 - 2 * rawReveal);
        if (reveal <= 0.001) continue;

        const driftX = this.reducedMotion ? 0 : Math.sin(driftTime * particle.drift + particle.phase) * 3.2 * particle.depth;
        const driftY = this.reducedMotion ? 0 : Math.cos(driftTime * 0.8 * particle.drift + particle.phase) * 2.4 * particle.depth;
        const x = particle.x + driftX;
        const y = particle.y + driftY;
        const spotlightDistance = Math.hypot(x - this.pointer.x, y - this.pointer.y);
        const spotlight = Math.pow(clamp(1 - spotlightDistance / spotlightRadius, 0, 1), 1.7);
        const twinkle = this.reducedMotion ? 1 : 0.9 + Math.sin(driftTime * (0.8 + particle.drift) + particle.phase) * particle.twinkle;
        let waveEnergy = 0;

        for (const wave of this.waves) {
          const distanceToOrigin = Math.hypot(x - wave.x, y - wave.y);
          const band = this.reducedMotion ? 34 : 82;
          const distanceToFront = Math.abs(distanceToOrigin - wave.radius);
          const rawFrontEnergy = clamp(1 - distanceToFront / band, 0, 1);
          const frontEnergy = rawFrontEnergy * rawFrontEnergy * (3 - 2 * rawFrontEnergy);
          const afterglow = distanceToOrigin < wave.radius
            ? clamp(1 - (wave.radius - distanceToOrigin) / (band * 2.6), 0, 1) * 0.22
            : 0;
          waveEnergy = Math.max(waveEnergy, frontEnergy, afterglow);
        }

        const alpha = clamp((particle.alpha * twinkle + spotlight * 0.75 * particle.depth + waveEnergy * 0.72) * reveal, 0, 1);
        context.fillStyle = waveEnergy > 0.08 ? (particle.blue ? "#42a5ff" : "#9667ff") : "#f5f4ef";

        if (particle.sparkle) {
          context.globalAlpha = alpha * (0.04 + particle.centerWeight * 0.08);
          context.beginPath();
          context.arc(x, y, particle.radius * (2.8 + particle.centerWeight * 2), 0, Math.PI * 2);
          context.fill();
        }

        context.globalAlpha = alpha * (isFront ? 0.78 : 1);
        context.beginPath();
        context.arc(x, y, particle.radius + waveEnergy * 1.1, 0, Math.PI * 2);
        context.fill();

        if (spotlight + waveEnergy > 0.75) {
          context.globalAlpha = alpha * 0.12;
          context.beginPath();
          context.arc(x, y, particle.radius * 3.4, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    }

    updateLight(now) {
      this.hero.style.setProperty("--spot-x", `${this.pointer.x}px`);
      this.hero.style.setProperty("--spot-y", `${this.pointer.y}px`);

      const activeSymbolX = this.symbolBounds.x + this.cubeMotion.x;
      const activeSymbolY = this.symbolBounds.y + this.cubeMotion.y;
      const localX = ((this.pointer.x - activeSymbolX) / this.symbolBounds.width) * 100;
      const localY = ((this.pointer.y - activeSymbolY) / this.symbolBounds.height) * 100;
      this.hero.style.setProperty("--symbol-light-x", `${localX}%`);
      this.hero.style.setProperty("--symbol-light-y", `${localY}%`);

      const symbolCenterX = activeSymbolX + this.symbolBounds.width / 2;
      const symbolCenterY = activeSymbolY + this.symbolBounds.height / 2;

      for (const wave of this.waves) {
        if (wave.hitLogo) continue;
        const distance = Math.hypot(symbolCenterX - wave.x, symbolCenterY - wave.y);
        if (wave.radius >= Math.max(0, distance - this.symbolBounds.radius)) {
          wave.hitLogo = true;
          this.logoGlowUntil = now + (this.reducedMotion ? 420 : 920);
        }
      }

      this.symbol.classList.toggle("is-wave-hit", now < this.logoGlowUntil);
    }
  }

  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  const revealStaticHero = () => {
    hero.classList.remove("hero--loading", "hero--cube-entering");
    hero.classList.add("hero--content-visible", "hero--particles-visible", "hero--ready");
  };

  if ("IntersectionObserver" in window && "ResizeObserver" in window) {
    const effects = new HeroEffects(hero);
    if (!effects.initialized) revealStaticHero();
  } else {
    revealStaticHero();
  }
})();
