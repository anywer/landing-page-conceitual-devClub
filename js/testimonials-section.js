(() => {
  const root = document.querySelector("[data-testimonials]");

  if (!root) return;

  const fallback = root.querySelector("[data-testimonials-fallback]");
  const sourceItems = fallback ? [...fallback.querySelectorAll("[data-testimonial-item]")] : [];
  const ribbonElements = [...root.querySelectorAll("[data-testimonial-ribbon]")];
  const testimonials = sourceItems.map((item) => ({
    name: item.dataset.name?.trim() || "",
    context: item.dataset.context?.trim() || "",
    quote: item.querySelector("blockquote p")?.textContent.trim() || "",
  }));

  const requiredElements = {
    stage: root.querySelector("[data-testimonial-stage]"),
    feature: root.querySelector("[data-testimonial-feature]"),
    content: root.querySelector("[data-testimonial-content]"),
    name: root.querySelector("[data-testimonial-name]"),
    context: root.querySelector("[data-testimonial-context]"),
    quote: root.querySelector("[data-testimonial-quote]"),
    previous: root.querySelector("[data-testimonial-previous]"),
    next: root.querySelector("[data-testimonial-next]"),
  };

  if (
    testimonials.length !== 32
    || ribbonElements.length !== 4
    || testimonials.some(({ name, context, quote }) => !name || !context || !quote)
    || Object.values(requiredElements).some((element) => !element)
  ) return;

  class TestimonialsSection {
    constructor(section, data, elements, ribbons) {
      this.section = section;
      this.data = data;
      this.elements = elements;
      this.ribbons = ribbons;
      this.index = 0;
      this.transitioning = false;
      this.pendingDirection = 0;
      this.autoplayTimer = 0;
      this.transitionTimers = [];
      this.pauseReasons = new Set(["offscreen"]);
      this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.mobileQuery = window.matchMedia("(max-width: 55.99rem)");
      this.abortController = new AbortController();
      this.ribbonSpeeds = [18, 21, 17, 23];

      this.onVisibilityChange = this.onVisibilityChange.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);
      this.onMobileChange = this.onMobileChange.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onPageHide = this.onPageHide.bind(this);
      this.onPageShow = this.onPageShow.bind(this);

      this.init();
    }

    init() {
      this.buildRibbons();
      this.renderCurrent();
      this.elements.stage.removeAttribute("aria-hidden");
      this.section.classList.add("is-enhanced");
      this.updateMotionPreference(this.motionQuery.matches);
      this.bindEvents();
      this.observeVisibility();
    }

    createMiniCard(testimonial) {
      const article = document.createElement("article");
      const identity = document.createElement("div");
      const avatar = document.createElement("span");
      const name = document.createElement("h3");
      const context = document.createElement("p");
      const blockquote = document.createElement("blockquote");
      const quote = document.createElement("p");

      article.className = "testimonial-mini";
      identity.className = "testimonial-mini__identity";
      avatar.className = "testimonial-mini__avatar";
      avatar.setAttribute("aria-hidden", "true");
      context.className = "testimonial-mini__context";
      name.textContent = testimonial.name;
      context.textContent = testimonial.context;
      quote.textContent = testimonial.quote;

      identity.append(avatar, name, context);
      blockquote.append(quote);
      article.append(identity, blockquote);
      return article;
    }

    createRibbonGroup(items, isClone = false) {
      const group = document.createElement("div");
      group.className = "testimonial-ribbon__group";
      if (isClone) group.setAttribute("aria-hidden", "true");
      items.forEach((testimonial) => group.append(this.createMiniCard(testimonial)));
      return group;
    }

    buildRibbons() {
      this.ribbons.forEach((ribbon) => ribbon.replaceChildren());
      this.section.classList.toggle("is-mobile-ribbon", this.mobileQuery.matches);

      if (this.mobileQuery.matches) {
        const track = document.createElement("div");
        track.className = "testimonial-ribbon__track";
        track.style.setProperty("--ribbon-duration", "96s");
        track.append(this.createRibbonGroup(this.data), this.createRibbonGroup(this.data, true));
        this.ribbons[0].append(track);
        return;
      }

      this.ribbons.forEach((ribbon, visualIndex) => {
        const groupIndex = Number.parseInt(ribbon.dataset.testimonialGroup || "0", 10);
        const start = groupIndex * 8;
        const items = this.data.slice(start, start + 8);
        const track = document.createElement("div");
        track.className = "testimonial-ribbon__track";
        track.style.setProperty("--ribbon-duration", `${this.ribbonSpeeds[visualIndex]}s`);
        track.append(this.createRibbonGroup(items), this.createRibbonGroup(items, true));
        ribbon.append(track);
      });
    }

    renderCurrent() {
      const testimonial = this.data[this.index];
      this.elements.name.textContent = testimonial.name;
      this.elements.context.textContent = testimonial.context;
      this.elements.quote.textContent = testimonial.quote;
    }

    navigate(direction) {
      if (this.motionQuery.matches) {
        this.index = (this.index + direction + this.data.length) % this.data.length;
        this.renderCurrent();
        return;
      }

      if (this.transitioning) {
        this.pendingDirection = direction;
        return;
      }

      this.transitioning = true;
      this.clearAutoplay();
      this.elements.content.style.setProperty("--testimonial-exit", direction > 0 ? "-1rem" : "1rem");
      this.elements.content.style.setProperty("--testimonial-enter", direction > 0 ? "1rem" : "-1rem");
      this.elements.content.classList.add("is-leaving");

      const swapTimer = window.setTimeout(() => {
        this.index = (this.index + direction + this.data.length) % this.data.length;
        this.renderCurrent();
        this.elements.content.classList.remove("is-leaving");
        this.elements.content.classList.add("is-entering");

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => this.elements.content.classList.remove("is-entering"));
        });
      }, 220);

      const completeTimer = window.setTimeout(() => {
        this.transitioning = false;
        this.transitionTimers.length = 0;
        if (this.pendingDirection) {
          const queuedDirection = this.pendingDirection;
          this.pendingDirection = 0;
          this.navigate(queuedDirection);
        } else {
          this.syncAutoplay();
        }
      }, 540);

      this.transitionTimers.push(swapTimer, completeTimer);
    }

    setPaused(reason, paused) {
      if (paused) this.pauseReasons.add(reason);
      else this.pauseReasons.delete(reason);
      this.section.classList.toggle(
        "is-motion-paused",
        this.pauseReasons.has("offscreen") || this.pauseReasons.has("hidden") || this.pauseReasons.has("reduced-motion"),
      );
      this.syncAutoplay();
    }

    syncAutoplay() {
      this.clearAutoplay();
      if (this.pauseReasons.size || this.transitioning || this.motionQuery.matches) return;
      this.autoplayTimer = window.setTimeout(() => this.navigate(1), 8000);
    }

    clearAutoplay() {
      if (this.autoplayTimer) window.clearTimeout(this.autoplayTimer);
      this.autoplayTimer = 0;
    }

    updateMotionPreference(reducedMotion) {
      this.section.classList.toggle("is-reduced-motion", reducedMotion);
      this.setPaused("reduced-motion", reducedMotion);
    }

    bindEvents() {
      const signal = this.abortController.signal;

      this.elements.previous.addEventListener("click", () => this.navigate(-1), { signal });
      this.elements.next.addEventListener("click", () => this.navigate(1), { signal });
      this.section.addEventListener("keydown", this.onKeyDown, { signal });
      this.elements.feature.addEventListener("pointerenter", () => this.setPaused("pointer", true), { signal });
      this.elements.feature.addEventListener("pointerleave", () => this.setPaused("pointer", false), { signal });
      this.section.addEventListener("focusin", () => this.setPaused("focus", true), { signal });
      this.section.addEventListener("focusout", (event) => {
        if (!event.relatedTarget || !this.section.contains(event.relatedTarget)) this.setPaused("focus", false);
      }, { signal });
      this.section.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "touch") this.setPaused("touch", true);
      }, { passive: true, signal });
      this.section.addEventListener("pointerup", () => this.setPaused("touch", false), { passive: true, signal });
      this.section.addEventListener("pointercancel", () => this.setPaused("touch", false), { passive: true, signal });
      document.addEventListener("visibilitychange", this.onVisibilityChange, { signal });
      window.addEventListener("pagehide", this.onPageHide, { signal });
      window.addEventListener("pageshow", this.onPageShow, { signal });
      this.motionQuery.addEventListener("change", this.onMotionChange);
      this.mobileQuery.addEventListener("change", this.onMobileChange);
    }

    observeVisibility() {
      if (!("IntersectionObserver" in window)) {
        this.setPaused("offscreen", false);
        return;
      }

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.setPaused("offscreen", !entry.isIntersecting);
      }, { threshold: 0.08 });
      this.intersectionObserver.observe(this.section);
    }

    onKeyDown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      this.navigate(event.key === "ArrowLeft" ? -1 : 1);
    }

    onVisibilityChange() {
      this.setPaused("hidden", document.hidden);
    }

    onMotionChange(event) {
      this.updateMotionPreference(event.matches);
    }

    onMobileChange() {
      this.buildRibbons();
    }

    onPageHide(event) {
      if (event.persisted) this.setPaused("page-cache", true);
      else this.destroy();
    }

    onPageShow(event) {
      if (event.persisted) this.setPaused("page-cache", false);
    }

    destroy() {
      this.clearAutoplay();
      this.transitionTimers.forEach((timer) => window.clearTimeout(timer));
      this.transitionTimers.length = 0;
      this.intersectionObserver?.disconnect();
      this.motionQuery.removeEventListener("change", this.onMotionChange);
      this.mobileQuery.removeEventListener("change", this.onMobileChange);
      this.abortController.abort();
    }
  }

  new TestimonialsSection(root, testimonials, requiredElements, ribbonElements);
})();
