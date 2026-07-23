(() => {
  const root = document.querySelector("[data-results]");
  if (!root) return;

  const stage = root.querySelector("[data-results-stage]");
  const previousButton = root.querySelector("[data-result-previous]");
  const nextButton = root.querySelector("[data-result-next]");
  const status = root.querySelector("[data-results-status]");
  const items = [...root.querySelectorAll("[data-result-item]")];

  if (!stage || !previousButton || !nextButton || !status || items.length < 2) return;

  class ResultsCarousel {
    constructor() {
      this.activeIndex = 0;
      this.isAnimating = false;
      this.pendingDirection = 0;
      this.activeAnimations = [];
      this.resizeFrame = 0;
      this.drag = { id: null, startX: 0, startY: 0 };
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.abortController = new AbortController();

      this.onKeyDown = this.onKeyDown.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.onPointerCancel = this.onPointerCancel.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onPageHide = this.onPageHide.bind(this);

      this.init();
    }

    init() {
      root.classList.add("is-enhanced");
      root.classList.toggle("is-reduced-motion", this.motionQuery.matches);
      stage.setAttribute("tabindex", "0");
      stage.setAttribute("aria-label", "Use as setas esquerda e direita para alternar os projetos");
      this.applyVisualPositions(this.activeIndex);
      this.syncAccessibility();
      this.bindEvents();
      this.observeEntrance();
      this.measureStage();
    }

    modulo(value) {
      return ((value % items.length) + items.length) % items.length;
    }

    getPosition(itemIndex, activeIndex = this.activeIndex) {
      const relativeIndex = this.modulo(itemIndex - activeIndex);
      if (relativeIndex === 0) return "active";
      if (relativeIndex === 1) return "next";
      if (relativeIndex === items.length - 1) return "previous";
      return relativeIndex < items.length / 2 ? "hidden-next" : "hidden-previous";
    }

    applyVisualPositions(activeIndex) {
      items.forEach((item, itemIndex) => {
        item.dataset.position = this.getPosition(itemIndex, activeIndex);
      });
    }

    syncAccessibility() {
      items.forEach((item, itemIndex) => {
        if (itemIndex === this.activeIndex) item.removeAttribute("aria-hidden");
        else item.setAttribute("aria-hidden", "true");
      });

      const activeTitle = items[this.activeIndex].querySelector("h3")?.textContent.trim() || "Projeto";
      status.textContent = `${activeTitle}, projeto ${this.activeIndex + 1} de ${items.length}`;
    }

    captureStyles() {
      return items.map((item) => {
        const style = window.getComputedStyle(item);
        return {
          transform: style.transform,
          opacity: style.opacity,
          filter: style.filter,
        };
      });
    }

    navigate(direction) {
      if (this.isAnimating) {
        this.pendingDirection = direction;
        return;
      }

      const firstStyles = this.captureStyles();
      this.isAnimating = true;
      root.classList.add("is-transitioning");
      root.setAttribute("aria-busy", "true");
      this.activeIndex = this.modulo(this.activeIndex + direction);
      this.applyVisualPositions(this.activeIndex);

      if (typeof Element.prototype.animate !== "function") {
        this.finishTransition();
        return;
      }

      window.requestAnimationFrame(() => {
        const lastStyles = this.captureStyles();
        const duration = this.motionQuery.matches ? 160 : 780;
        const easing = "cubic-bezier(0.2, 0.8, 0.2, 1)";

        this.activeAnimations = items.map((item, index) => item.animate([
          firstStyles[index],
          lastStyles[index],
        ], {
          duration,
          easing,
        }));

        if (!this.motionQuery.matches) {
          const activeVisual = items[this.activeIndex].querySelector(".result-visual");
          if (activeVisual) {
            this.activeAnimations.push(activeVisual.animate([
              { transform: `perspective(60rem) rotateY(${direction > 0 ? -150 : 150}deg) scale(0.94)` },
              { transform: "perspective(60rem) rotateY(0deg) scale(1)" },
            ], {
              duration: 860,
              easing,
            }));
          }
        }

        Promise.all(this.activeAnimations.map((animation) => animation.finished.catch(() => undefined)))
          .then(() => this.finishTransition());
      });
    }

    finishTransition() {
      this.activeAnimations.length = 0;
      this.isAnimating = false;
      root.classList.remove("is-transitioning");
      root.removeAttribute("aria-busy");
      this.syncAccessibility();
      this.measureStage();

      if (this.pendingDirection) {
        const queuedDirection = this.pendingDirection;
        this.pendingDirection = 0;
        window.requestAnimationFrame(() => this.navigate(queuedDirection));
      }
    }

    measureStage() {
      window.requestAnimationFrame(() => {
        const activePanel = items[this.activeIndex].querySelector(".result-panel");
        if (!activePanel) return;
        const height = Math.ceil(activePanel.getBoundingClientRect().height + 24);
        if (height > 0) stage.style.setProperty("--results-stage-height", `${height}px`);
      });
    }

    bindEvents() {
      const signal = this.abortController.signal;
      previousButton.addEventListener("click", () => this.navigate(-1), { signal });
      nextButton.addEventListener("click", () => this.navigate(1), { signal });
      stage.addEventListener("keydown", this.onKeyDown, { signal });
      stage.addEventListener("pointerdown", this.onPointerDown, { passive: true, signal });
      stage.addEventListener("pointerup", this.onPointerUp, { passive: true, signal });
      stage.addEventListener("pointercancel", this.onPointerCancel, { passive: true, signal });
      this.motionQuery.addEventListener("change", this.onMotionChange);
      window.addEventListener("resize", this.onResize, { passive: true, signal });
      window.addEventListener("pagehide", this.onPageHide, { signal });
    }

    observeEntrance() {
      if (this.motionQuery.matches || !("IntersectionObserver" in window)) {
        root.classList.add("is-visible");
        return;
      }

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        root.classList.add("is-visible");
        this.intersectionObserver.disconnect();
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -8%",
      });
      this.intersectionObserver.observe(root);
    }

    onKeyDown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      this.navigate(event.key === "ArrowLeft" ? -1 : 1);
    }

    onPointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      this.drag.id = event.pointerId;
      this.drag.startX = event.clientX;
      this.drag.startY = event.clientY;
    }

    onPointerUp(event) {
      if (event.pointerId !== this.drag.id) return;
      const deltaX = event.clientX - this.drag.startX;
      const deltaY = event.clientY - this.drag.startY;
      this.drag.id = null;
      if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        this.navigate(deltaX < 0 ? 1 : -1);
      }
    }

    onPointerCancel(event) {
      if (event.pointerId === this.drag.id) this.drag.id = null;
    }

    onMotionChange(event) {
      root.classList.toggle("is-reduced-motion", event.matches);
      if (event.matches) root.classList.add("is-visible");
    }

    onResize() {
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.resizeFrame = 0;
        this.measureStage();
      });
    }

    onPageHide(event) {
      if (event.persisted) return;
      this.activeAnimations.forEach((animation) => animation.cancel());
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.intersectionObserver?.disconnect();
      this.motionQuery.removeEventListener("change", this.onMotionChange);
      this.abortController.abort();
    }
  }

  new ResultsCarousel();
})();

(() => {
  const root = document.querySelector("[data-company-ticker]");
  const viewport = root?.querySelector("[data-company-viewport]");
  const motionTrack = root?.querySelector("[data-company-motion-track]");
  const source = root?.querySelector("[data-company-source][data-company-track]");
  const items = source ? [...source.children].filter((item) => item.matches("[data-company-item]")) : [];
  const hasRequiredSupport =
    "IntersectionObserver" in window
    && "AbortController" in window
    && typeof window.matchMedia === "function"
    && typeof window.setTimeout === "function"
    && window.CSS?.supports("transform", "translate3d(0, 0, 0)");

  if (!root || !viewport || !motionTrack || !source || !motionTrack.contains(source) || items.length !== 6 || !hasRequiredSupport) return;

  class CompanyTicker {
    constructor() {
      this.desktopQuery = window.matchMedia("(min-width: 56rem)");
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.abortController = new AbortController();
      this.isInView = false;
      this.mode = "static";
      this.mobileIndex = 0;
      this.isTransitioning = false;
      this.waitTimer = 0;
      this.transitionFallback = 0;
      this.resizeFrame = 0;
      this.releaseFrame = 0;
      this.lastViewportWidth = 0;
      this.clone = null;

      this.onBreakpointChange = this.onBreakpointChange.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.onTransitionEnd = this.onTransitionEnd.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onPageHide = this.onPageHide.bind(this);

      this.init();
    }

    init() {
      const signal = this.abortController.signal;

      source.addEventListener("transitionend", this.onTransitionEnd, { signal });
      document.addEventListener("visibilitychange", this.onVisibilityChange, { signal });
      window.addEventListener("pagehide", this.onPageHide, { signal });
      this.desktopQuery.addEventListener("change", this.onBreakpointChange);
      this.motionQuery.addEventListener("change", this.onMotionChange);

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isInView = entry.isIntersecting;
        this.updatePauseState();
      }, { threshold: 0.01 });
      this.intersectionObserver.observe(root);

      if ("ResizeObserver" in window) {
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(viewport);
      } else {
        window.addEventListener("resize", this.onResize, { passive: true, signal });
      }

      root.classList.add("is-enhanced", "is-paused");
      this.setupMode();
    }

    setupMode() {
      this.teardownMode();
      root.classList.toggle("is-reduced-motion", this.motionQuery.matches);

      if (this.motionQuery.matches) {
        this.mode = "static";
        root.classList.add("is-reduced-motion");
        this.updatePauseState();
        return;
      }

      if (this.desktopQuery.matches) this.setupDesktop();
      else this.setupMobile();

      this.updatePauseState();
    }

    setupDesktop() {
      this.mode = "desktop";
      root.classList.add("is-desktop");
      this.clone = this.prepareClone(source.cloneNode(true));
      this.clone.removeAttribute("data-company-source");
      this.clone.removeAttribute("data-company-track");
      motionTrack.append(this.clone);
      this.measureDesktopDuration();
    }

    setupMobile() {
      this.mode = "mobile";
      this.mobileIndex = 0;
      root.classList.add("is-mobile", "is-reel-jumping");
      this.clone = this.prepareClone(items[0].cloneNode(true));
      source.append(this.clone);
      this.measureMobileStep();
      this.setMobileTransform();
      this.releaseJumpState();
    }

    prepareClone(clone) {
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("data-company-clone", "");
      clone.removeAttribute("id");
      clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
      return clone;
    }

    teardownMode() {
      this.clearTimers();
      this.isTransitioning = false;
      this.mobileIndex = 0;
      this.clone?.remove();
      this.clone = null;
      source.style.removeProperty("transform");
      root.style.removeProperty("--company-reel-step");
      root.style.removeProperty("--company-ticker-duration");
      root.classList.remove("is-desktop", "is-mobile", "is-reel-jumping");
      this.mode = "static";
    }

    measureDesktopDuration() {
      if (this.mode !== "desktop") return;
      const sequenceWidth = source.getBoundingClientRect().width;
      if (sequenceWidth <= 0) return;
      const duration = Math.min(34, Math.max(26, sequenceWidth / 62));
      root.style.setProperty("--company-ticker-duration", `${duration.toFixed(2)}s`);
    }

    measureMobileStep() {
      if (this.mode !== "mobile") return;
      root.style.removeProperty("--company-reel-step");
      const itemHeight = Math.ceil(items[0].getBoundingClientRect().height);
      if (itemHeight > 0) root.style.setProperty("--company-reel-step", `${itemHeight}px`);
      this.setMobileTransform();
    }

    setMobileTransform() {
      if (this.mode !== "mobile") return;
      const step = parseFloat(window.getComputedStyle(root).getPropertyValue("--company-reel-step")) || items[0].getBoundingClientRect().height;
      source.style.transform = `translate3d(0, ${(-this.mobileIndex * step).toFixed(2)}px, 0)`;
    }

    isPaused() {
      return this.motionQuery.matches
        || !this.isInView
        || document.hidden;
    }

    updatePauseState() {
      const paused = this.isPaused();
      root.classList.toggle("is-paused", paused);

      if (this.mode !== "mobile") return;
      if (paused) {
        window.clearTimeout(this.waitTimer);
        this.waitTimer = 0;
        if (this.isTransitioning) this.finishMobileTransition(true);
      } else if (!this.isTransitioning) {
        this.scheduleMobileStep();
      }
    }

    scheduleMobileStep() {
      window.clearTimeout(this.waitTimer);
      this.waitTimer = 0;
      if (this.mode !== "mobile" || this.isPaused() || this.isTransitioning) return;

      this.waitTimer = window.setTimeout(() => {
        this.waitTimer = 0;
        this.advanceMobile();
      }, 2200);
    }

    advanceMobile() {
      if (this.mode !== "mobile" || this.isPaused() || this.isTransitioning) return;
      this.isTransitioning = true;
      this.mobileIndex += 1;
      root.classList.remove("is-reel-jumping");
      this.setMobileTransform();
      window.clearTimeout(this.transitionFallback);
      this.transitionFallback = window.setTimeout(() => this.finishMobileTransition(), 760);
    }

    finishMobileTransition(skipAnimation = false) {
      if (!this.isTransitioning) return;
      window.clearTimeout(this.transitionFallback);
      this.transitionFallback = 0;

      if (skipAnimation) root.classList.add("is-reel-jumping");
      this.isTransitioning = false;

      if (this.mobileIndex >= items.length) {
        root.classList.add("is-reel-jumping");
        this.mobileIndex = 0;
        this.setMobileTransform();
      }

      if (root.classList.contains("is-reel-jumping")) this.releaseJumpState();
      if (!this.isPaused()) this.scheduleMobileStep();
    }

    releaseJumpState() {
      if (this.releaseFrame) window.cancelAnimationFrame(this.releaseFrame);
      this.releaseFrame = window.requestAnimationFrame(() => {
        this.releaseFrame = 0;
        root.classList.remove("is-reel-jumping");
      });
    }

    clearTimers() {
      window.clearTimeout(this.waitTimer);
      window.clearTimeout(this.transitionFallback);
      this.waitTimer = 0;
      this.transitionFallback = 0;
      if (this.releaseFrame) window.cancelAnimationFrame(this.releaseFrame);
      this.releaseFrame = 0;
    }

    onTransitionEnd(event) {
      if (event.target === source && event.propertyName === "transform") {
        this.finishMobileTransition();
      }
    }

    onVisibilityChange() {
      this.updatePauseState();
    }

    onBreakpointChange() {
      this.setupMode();
    }

    onMotionChange() {
      this.setupMode();
    }

    onResize() {
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.resizeFrame = 0;
        const viewportWidth = viewport.getBoundingClientRect().width;
        if (Math.abs(viewportWidth - this.lastViewportWidth) < 0.5) return;
        this.lastViewportWidth = viewportWidth;
        if (this.mode === "desktop") this.measureDesktopDuration();
        if (this.mode === "mobile") {
          root.classList.add("is-reel-jumping");
          this.measureMobileStep();
          this.releaseJumpState();
        }
      });
    }

    onPageHide(event) {
      if (event.persisted) return;
      this.clearTimers();
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.intersectionObserver.disconnect();
      this.resizeObserver?.disconnect();
      this.desktopQuery.removeEventListener("change", this.onBreakpointChange);
      this.motionQuery.removeEventListener("change", this.onMotionChange);
      this.abortController.abort();
    }
  }

  new CompanyTicker();
})();
