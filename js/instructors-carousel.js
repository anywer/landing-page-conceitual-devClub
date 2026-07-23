(() => {
  const root = document.querySelector("[data-instructors]");
  if (!root) return;

  const stage = root.querySelector("[data-instructors-stage]");
  const previousButton = root.querySelector("[data-instructor-previous]");
  const nextButton = root.querySelector("[data-instructor-next]");
  const status = root.querySelector("[data-instructors-status]");
  const items = [...root.querySelectorAll("[data-instructor-item]")];

  if (!stage || !previousButton || !nextButton || !status || items.length !== 5) return;

  class InstructorsCarousel {
    constructor() {
      this.activeIndex = 0;
      this.isAnimating = false;
      this.pendingDirection = 0;
      this.activeAnimations = [];
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.abortController = new AbortController();

      this.onClick = this.onClick.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);
      this.onPageHide = this.onPageHide.bind(this);

      this.init();
    }

    init() {
      root.classList.add("is-enhanced");
      root.classList.toggle("is-reduced-motion", this.motionQuery.matches);
      this.applyVisualPositions(this.activeIndex);
      this.syncAccessibility();
      this.bindEvents();
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

    syncAccessibility(moveFocus = false) {
      items.forEach((item, itemIndex) => {
        const panel = item.querySelector("[data-instructor-trigger]");
        const details = item.querySelector(".instructor-details");
        const isActive = itemIndex === this.activeIndex;
        if (!panel || !details) return;

        if (isActive) {
          item.removeAttribute("aria-hidden");
          panel.setAttribute("role", "button");
          panel.setAttribute("tabindex", "0");
          panel.setAttribute("aria-expanded", panel.getAttribute("aria-expanded") || "false");
          panel.setAttribute("aria-describedby", details.id);
          if (moveFocus) panel.focus({ preventScroll: true });
        } else {
          item.setAttribute("aria-hidden", "true");
          panel.removeAttribute("role");
          panel.removeAttribute("tabindex");
          panel.removeAttribute("aria-expanded");
          panel.removeAttribute("aria-describedby");
        }
      });

      const activeName = items[this.activeIndex].querySelector(".instructor-summary h3")?.textContent.trim() || "Instrutor";
      status.textContent = `${activeName}, ${this.activeIndex + 1} de ${items.length}`;
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

    closeDetails() {
      const activePanel = items[this.activeIndex].querySelector("[data-instructor-trigger]");
      activePanel?.setAttribute("aria-expanded", "false");
    }

    toggleDetails() {
      if (this.isAnimating) return;
      const panel = items[this.activeIndex].querySelector("[data-instructor-trigger]");
      if (!panel) return;
      panel.setAttribute("aria-expanded", String(panel.getAttribute("aria-expanded") !== "true"));
    }

    navigate(direction) {
      if (this.isAnimating) {
        this.pendingDirection = direction;
        return;
      }

      const oldPanel = items[this.activeIndex].querySelector("[data-instructor-trigger]");
      const shouldMoveFocus = document.activeElement === oldPanel;
      const firstStyles = this.captureStyles();

      this.closeDetails();
      this.isAnimating = true;
      root.classList.add("is-transitioning");
      root.setAttribute("aria-busy", "true");
      this.activeIndex = this.modulo(this.activeIndex + direction);
      this.applyVisualPositions(this.activeIndex);

      if (typeof Element.prototype.animate !== "function") {
        this.finishTransition(shouldMoveFocus);
        return;
      }

      window.requestAnimationFrame(() => {
        const lastStyles = this.captureStyles();
        const duration = this.motionQuery.matches ? 240 : 820;
        const easing = "cubic-bezier(0.2, 0.8, 0.2, 1)";

        this.activeAnimations = items.map((item, index) => item.animate([
          firstStyles[index],
          lastStyles[index],
        ], {
          duration,
          easing,
        }));

        if (!this.motionQuery.matches) {
          const activeHologram = items[this.activeIndex].querySelector(".instructor-hologram");
          if (activeHologram) {
            this.activeAnimations.push(activeHologram.animate([
              { transform: "rotateY(0deg) scale(0.98)" },
              { transform: `rotateY(${direction > 0 ? -360 : 360}deg) scale(1)` },
            ], {
              duration,
              easing,
            }));
          }
        }

        Promise.all(this.activeAnimations.map((animation) => animation.finished.catch(() => undefined)))
          .then(() => this.finishTransition(shouldMoveFocus));
      });
    }

    finishTransition(moveFocus) {
      this.activeAnimations.length = 0;
      this.isAnimating = false;
      root.classList.remove("is-transitioning");
      root.removeAttribute("aria-busy");
      this.syncAccessibility(moveFocus);

      if (this.pendingDirection) {
        const queuedDirection = this.pendingDirection;
        this.pendingDirection = 0;
        window.requestAnimationFrame(() => this.navigate(queuedDirection));
      }
    }

    bindEvents() {
      const signal = this.abortController.signal;
      previousButton.addEventListener("click", () => this.navigate(-1), { signal });
      nextButton.addEventListener("click", () => this.navigate(1), { signal });
      root.addEventListener("click", this.onClick, { signal });
      root.addEventListener("keydown", this.onKeyDown, { signal });
      this.motionQuery.addEventListener("change", this.onMotionChange);
      window.addEventListener("pagehide", this.onPageHide, { signal });
    }

    onClick(event) {
      if (!(event.target instanceof Element)) return;
      const panel = event.target.closest("[data-instructor-trigger]");
      if (!panel || !root.contains(panel)) return;

      const item = panel.closest("[data-instructor-item]");
      if (item?.dataset.position === "previous") this.navigate(-1);
      else if (item?.dataset.position === "next") this.navigate(1);
      else if (item?.dataset.position === "active") this.toggleDetails();
    }

    onKeyDown(event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        this.navigate(event.key === "ArrowLeft" ? -1 : 1);
        return;
      }

      if (event.key === "Escape") {
        this.closeDetails();
        return;
      }

      const panel = event.target instanceof Element
        ? event.target.closest("[data-instructor-trigger]")
        : null;
      if (panel && panel.closest("[data-instructor-item]")?.dataset.position === "active" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        this.toggleDetails();
      }
    }

    onMotionChange(event) {
      root.classList.toggle("is-reduced-motion", event.matches);
    }

    onPageHide(event) {
      if (event.persisted) return;
      this.activeAnimations.forEach((animation) => animation.cancel());
      this.motionQuery.removeEventListener("change", this.onMotionChange);
      this.abortController.abort();
    }
  }

  new InstructorsCarousel();
})();
