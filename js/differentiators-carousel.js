(() => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const viewport = root.querySelector("[data-carousel-viewport]");
  const track = root.querySelector("[data-carousel-track]");
  const previousButton = root.querySelector("[data-carousel-prev]");
  const nextButton = root.querySelector("[data-carousel-next]");
  const status = root.querySelector("[data-carousel-status]");
  const progress = root.querySelector("[data-carousel-progress]");
  const originalItems = track ? [...track.querySelectorAll("[data-carousel-item]")] : [];

  if (!viewport || !track || !previousButton || !nextButton || !status || !progress || originalItems.length < 2) return;

  class DifferentiatorsCarousel {
    constructor() {
      this.count = originalItems.length;
      this.cloneCount = Math.min(4, this.count);
      this.currentIndex = this.cloneCount;
      this.logicalIndex = 0;
      this.step = 0;
      this.pendingSteps = 0;
      this.isAnimating = false;
      this.transitionFallback = 0;
      this.autoplayTimer = 0;
      this.resizeFrame = 0;
      this.cardFrame = 0;
      this.activeCard = null;
      this.pointerX = 0;
      this.pointerY = 0;
      this.drag = {
        id: null,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastAt: 0,
        offset: 0,
        active: false,
        cancelled: false,
      };
      this.finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.pauseReasons = new Set(["offscreen"]);
      this.abortController = new AbortController();

      this.onPrevious = () => this.moveBy(-1);
      this.onNext = () => this.moveBy(1);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onTransitionEnd = this.onTransitionEnd.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.onPointerCancel = this.onPointerCancel.bind(this);
      this.onCardPointerMove = this.onCardPointerMove.bind(this);
      this.onCardPointerLeave = this.onCardPointerLeave.bind(this);
      this.onPreferenceChange = this.onPreferenceChange.bind(this);
      this.onResize = this.onResize.bind(this);
      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.onPageHide = this.onPageHide.bind(this);
      this.onPageShow = this.onPageShow.bind(this);
      this.onRootPointerEnter = (event) => {
        if (event.pointerType !== "touch") this.setPaused("pointer", true);
      };
      this.onRootPointerLeave = (event) => {
        if (event.pointerType !== "touch") this.setPaused("pointer", false);
      };

      this.init();
    }

    init() {
      this.addClones();
      root.classList.add("is-enhanced", "is-jumping");
      this.measure();
      this.updateStatus();
      this.setPaused("reduced-motion", this.motionQuery.matches);
      const signal = this.abortController.signal;

      previousButton.addEventListener("click", this.onPrevious, { signal });
      nextButton.addEventListener("click", this.onNext, { signal });
      viewport.addEventListener("keydown", this.onKeyDown, { signal });
      viewport.addEventListener("pointerdown", this.onPointerDown, { signal });
      viewport.addEventListener("pointermove", this.onPointerMove, { passive: false, signal });
      viewport.addEventListener("pointerup", this.onPointerUp, { signal });
      viewport.addEventListener("pointercancel", this.onPointerCancel, { signal });
      track.addEventListener("transitionend", this.onTransitionEnd, { signal });
      root.addEventListener("pointermove", this.onCardPointerMove, { passive: true, signal });
      root.addEventListener("pointerleave", this.onCardPointerLeave, { passive: true, signal });
      root.addEventListener("pointerenter", this.onRootPointerEnter, { passive: true, signal });
      root.addEventListener("pointerleave", this.onRootPointerLeave, { passive: true, signal });
      root.addEventListener("focusin", () => this.setPaused("focus", true), { signal });
      root.addEventListener("focusout", (event) => {
        if (!event.relatedTarget || !root.contains(event.relatedTarget)) this.setPaused("focus", false);
      }, { signal });
      root.addEventListener("pointerdown", () => this.setPaused("interaction", true), { passive: true, signal });
      root.addEventListener("pointerup", () => this.setPaused("interaction", false), { passive: true, signal });
      root.addEventListener("pointercancel", () => this.setPaused("interaction", false), { passive: true, signal });
      this.finePointer.addEventListener("change", this.onPreferenceChange);
      this.motionQuery.addEventListener("change", this.onPreferenceChange);
      document.addEventListener("visibilitychange", this.onVisibilityChange, { signal });
      window.addEventListener("pagehide", this.onPageHide, { signal });
      window.addEventListener("pageshow", this.onPageShow, { signal });

      if ("ResizeObserver" in window) {
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(viewport);
      } else {
        window.addEventListener("resize", this.onResize, { passive: true, signal });
      }

      this.observeVisibility();
      window.requestAnimationFrame(() => root.classList.remove("is-jumping"));
    }

    addClones() {
      const createClone = (item) => {
        const clone = item.cloneNode(true);
        clone.removeAttribute("data-carousel-item");
        clone.setAttribute("data-carousel-clone", "");
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
        clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((element) => element.setAttribute("tabindex", "-1"));
        return clone;
      };

      const leadingClones = originalItems.slice(-this.cloneCount).map(createClone);
      const trailingClones = originalItems.slice(0, this.cloneCount).map(createClone);
      track.prepend(...leadingClones);
      track.append(...trailingClones);
    }

    modulo(value) {
      return ((value % this.count) + this.count) % this.count;
    }

    measure() {
      const cardWidth = originalItems[0].getBoundingClientRect().width;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      this.step = cardWidth + gap;
      this.currentIndex = this.cloneCount + this.logicalIndex;
      this.renderPosition();
    }

    renderPosition(offset = 0) {
      const x = -this.currentIndex * this.step + offset;
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    }

    updateStatus() {
      const current = String(this.logicalIndex + 1).padStart(2, "0");
      status.textContent = `${current} / ${this.count}`;
      progress.style.setProperty("--carousel-progress", `${((this.logicalIndex + 1) / this.count) * 100}%`);
    }

    moveBy(direction) {
      if (!this.step) return;
      this.clearAutoplay();

      if (this.isAnimating || this.drag.id !== null) {
        this.pendingSteps = Math.max(-this.count, Math.min(this.count, this.pendingSteps + direction));
        return;
      }

      this.currentIndex += direction;
      this.logicalIndex = this.modulo(this.logicalIndex + direction);
      this.isAnimating = true;
      root.classList.remove("is-jumping");
      this.renderPosition();
      this.updateStatus();
      this.setTransitionFallback();
    }

    setTransitionFallback() {
      window.clearTimeout(this.transitionFallback);
      this.transitionFallback = window.setTimeout(() => this.finishTransition(), this.motionQuery.matches ? 60 : 520);
    }

    onTransitionEnd(event) {
      if (event.target === track && event.propertyName === "transform") this.finishTransition();
    }

    finishTransition() {
      if (!this.isAnimating) return;
      window.clearTimeout(this.transitionFallback);
      this.transitionFallback = 0;

      let jumped = false;
      if (this.currentIndex < this.cloneCount) {
        this.currentIndex += this.count;
        jumped = true;
      } else if (this.currentIndex >= this.cloneCount + this.count) {
        this.currentIndex -= this.count;
        jumped = true;
      }

      if (jumped) {
        root.classList.add("is-jumping");
        this.renderPosition();
        window.requestAnimationFrame(() => {
          root.classList.remove("is-jumping");
          this.completeMove();
        });
      } else {
        this.completeMove();
      }
    }

    completeMove() {
      this.isAnimating = false;
      if (!this.pendingSteps) {
        this.syncAutoplay();
        return;
      }

      const direction = Math.sign(this.pendingSteps);
      this.pendingSteps -= direction;
      window.requestAnimationFrame(() => this.moveBy(direction));
    }

    setPaused(reason, paused) {
      if (paused) this.pauseReasons.add(reason);
      else this.pauseReasons.delete(reason);
      this.syncAutoplay();
    }

    clearAutoplay() {
      if (this.autoplayTimer) window.clearTimeout(this.autoplayTimer);
      this.autoplayTimer = 0;
    }

    syncAutoplay() {
      this.clearAutoplay();
      if (this.pauseReasons.size || this.isAnimating || this.drag.id !== null || this.motionQuery.matches) return;
      this.autoplayTimer = window.setTimeout(() => this.moveBy(1), 10000);
    }

    observeVisibility() {
      if (!("IntersectionObserver" in window)) {
        this.setPaused("offscreen", false);
        return;
      }

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.setPaused("offscreen", !entry.isIntersecting);
      }, { threshold: 0.08 });
      this.intersectionObserver.observe(root);
    }

    onKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.moveBy(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        this.moveBy(1);
      }
    }

    onPointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (this.isAnimating || this.drag.id !== null) return;

      this.drag.id = event.pointerId;
      this.drag.startX = event.clientX;
      this.drag.startY = event.clientY;
      this.drag.lastX = event.clientX;
      this.drag.lastAt = performance.now();
      this.drag.offset = 0;
      this.drag.active = false;
      this.drag.cancelled = false;
    }

    onPointerMove(event) {
      if (event.pointerId !== this.drag.id || this.drag.cancelled) return;

      const deltaX = event.clientX - this.drag.startX;
      const deltaY = event.clientY - this.drag.startY;

      if (!this.drag.active) {
        if (Math.abs(deltaX) < 7 && Math.abs(deltaY) < 7) return;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          this.drag.cancelled = true;
          return;
        }
        this.drag.active = true;
        root.classList.add("is-dragging");
        if (viewport.setPointerCapture) viewport.setPointerCapture(event.pointerId);
      }

      event.preventDefault();
      this.drag.offset = deltaX;
      this.drag.lastX = event.clientX;
      this.drag.lastAt = performance.now();
      this.renderPosition(deltaX);
    }

    onPointerUp(event) {
      if (event.pointerId !== this.drag.id) return;
      this.finishDrag(event, false);
    }

    onPointerCancel(event) {
      if (event.pointerId !== this.drag.id) return;
      this.finishDrag(event, true);
    }

    finishDrag(event, cancelled) {
      const deltaX = event.clientX - this.drag.startX;
      const elapsed = Math.max(16, performance.now() - this.drag.lastAt);
      const velocity = (event.clientX - this.drag.lastX) / elapsed;
      const wasActive = this.drag.active;
      const pointerId = this.drag.id;

      this.drag.id = null;
      this.drag.active = false;
      this.drag.cancelled = false;
      this.drag.offset = 0;
      root.classList.remove("is-dragging");

      if (viewport.hasPointerCapture?.(pointerId)) viewport.releasePointerCapture(pointerId);
      if (!wasActive) return;

      const shouldMove = !cancelled && (Math.abs(deltaX) > Math.min(this.step * 0.18, 64) || Math.abs(velocity) > 0.45);
      if (shouldMove) {
        const direction = deltaX < 0 ? 1 : -1;
        this.currentIndex += direction;
        this.logicalIndex = this.modulo(this.logicalIndex + direction);
        this.updateStatus();
      }

      this.isAnimating = true;
      this.renderPosition();
      this.setTransitionFallback();
    }

    onCardPointerMove(event) {
      if (!this.finePointer.matches || this.motionQuery.matches || !(event.target instanceof Element)) return;

      const card = event.target.closest(".differential-card");
      if (!card || !root.contains(card)) return;
      if (this.activeCard && this.activeCard !== card) this.resetCard(this.activeCard);

      this.activeCard = card;
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      if (!this.cardFrame) this.cardFrame = window.requestAnimationFrame(() => this.updateCardLight());
    }

    updateCardLight() {
      this.cardFrame = 0;
      if (!this.activeCard) return;

      const rect = this.activeCard.getBoundingClientRect();
      const normalizedX = Math.max(-1, Math.min(1, ((this.pointerX - rect.left) / rect.width - 0.5) * 2));
      const normalizedY = Math.max(-1, Math.min(1, ((this.pointerY - rect.top) / rect.height - 0.5) * 2));
      this.activeCard.style.setProperty("--card-light-x", `${((normalizedX + 1) * 50).toFixed(1)}%`);
      this.activeCard.style.setProperty("--card-light-y", `${((normalizedY + 1) * 50).toFixed(1)}%`);
      this.activeCard.style.setProperty("--card-tilt-x", `${(-normalizedY * 2.2).toFixed(2)}deg`);
      this.activeCard.style.setProperty("--card-tilt-y", `${(normalizedX * 2.2).toFixed(2)}deg`);
    }

    onCardPointerLeave() {
      if (this.activeCard) this.resetCard(this.activeCard);
      this.activeCard = null;
    }

    resetCard(card) {
      card.style.removeProperty("--card-light-x");
      card.style.removeProperty("--card-light-y");
      card.style.removeProperty("--card-tilt-x");
      card.style.removeProperty("--card-tilt-y");
    }

    onPreferenceChange() {
      if (!this.finePointer.matches || this.motionQuery.matches) this.onCardPointerLeave();
      this.setPaused("reduced-motion", this.motionQuery.matches);
      if (this.motionQuery.matches && this.isAnimating) this.setTransitionFallback();
    }

    onVisibilityChange() {
      this.setPaused("hidden", document.hidden);
    }

    onPageHide(event) {
      if (event.persisted) this.setPaused("page-cache", true);
      else this.destroy();
    }

    onPageShow(event) {
      if (event.persisted) this.setPaused("page-cache", false);
    }

    onResize() {
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = window.requestAnimationFrame(() => {
        this.resizeFrame = 0;
        root.classList.add("is-jumping");
        this.measure();
        window.requestAnimationFrame(() => root.classList.remove("is-jumping"));
      });
    }

    destroy() {
      this.clearAutoplay();
      window.clearTimeout(this.transitionFallback);
      if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
      if (this.cardFrame) window.cancelAnimationFrame(this.cardFrame);
      this.intersectionObserver?.disconnect();
      this.resizeObserver?.disconnect();
      this.finePointer.removeEventListener("change", this.onPreferenceChange);
      this.motionQuery.removeEventListener("change", this.onPreferenceChange);
      this.abortController.abort();
    }
  }

  new DifferentiatorsCarousel();
})();
