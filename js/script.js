(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  if (!header || !toggle || !menu) return;

  const label = toggle.querySelector(".sr-only");

  const setMenu = (isOpen, returnFocus = false) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    menu.classList.toggle("is-open", isOpen);
    header.classList.toggle("is-menu-open", isOpen);
    if (label) label.textContent = isOpen ? "Fechar menu" : "Abrir menu";
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  const desktop = window.matchMedia("(min-width: 56rem)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  let scrollFrame = 0;
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    scrollFrame = 0;
  };

  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeader);
  }, { passive: true });
})();

(() => {
  const cursor = document.querySelector("[data-custom-cursor]");
  if (!cursor) return;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let enabled = finePointer.matches;
  let visible = false;
  let currentX = -48;
  let currentY = -48;
  let targetX = -48;
  let targetY = -48;
  let cursorFrame = 0;

  const renderCursor = () => {
    cursorFrame = 0;
    const easing = reducedMotion.matches ? 1 : 0.38;
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;
    cursor.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.2) {
      cursorFrame = window.requestAnimationFrame(renderCursor);
    }
  };

  const scheduleCursor = () => {
    if (!cursorFrame && enabled) cursorFrame = window.requestAnimationFrame(renderCursor);
  };

  const setEnabled = (isEnabled) => {
    enabled = isEnabled;
    document.body.classList.toggle("has-custom-cursor", enabled);
    if (!enabled) {
      cursor.classList.remove("is-visible", "is-pressed");
      visible = false;
    }
  };

  window.addEventListener("pointermove", (event) => {
    if (!enabled || event.pointerType === "touch") return;
    targetX = event.clientX - 3;
    targetY = event.clientY - 3;
    if (!visible) {
      currentX = targetX;
      currentY = targetY;
      visible = true;
      cursor.classList.add("is-visible");
    }
    scheduleCursor();
  }, { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (!enabled || event.pointerType === "touch") return;
    targetX = event.clientX - 3;
    targetY = event.clientY - 3;
    cursor.classList.add("is-pressed");
    scheduleCursor();
  }, { passive: true });

  window.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"), { passive: true });
  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) {
      cursor.classList.remove("is-visible", "is-pressed");
      visible = false;
    }
  });
  window.addEventListener("blur", () => {
    cursor.classList.remove("is-visible", "is-pressed");
    visible = false;
  });
  finePointer.addEventListener("change", (event) => setEnabled(event.matches));
  setEnabled(enabled);
})();

(() => {
  const button = document.querySelector("[data-orbit-button]");
  const runners = button ? [...button.querySelectorAll("[data-orbit-line]")] : [];
  const collisionFlash = button?.querySelector("[data-orbit-flash]");
  if (!button || runners.length !== 2 || !CSS.supports("background: conic-gradient(red, blue)")) return;

  const palette = ["#39d353", "#9667ff", "#42a5ff", "#f3f1ec"];
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const positions = [0, 50];
  const directions = [1, -1];
  const speed = 0.005;
  const collisionDistance = 31.5;
  let colorStep = 0;
  let collisionLocked = false;
  let orbitFrame = 0;
  let lastFrameAt = 0;
  let isVisible = true;
  let isHovered = false;
  let isFocused = false;

  const applyColors = () => {
    runners[0].style.setProperty("--orbit-color", palette[colorStep % palette.length]);
    runners[1].style.setProperty("--orbit-color", palette[(colorStep + 2) % palette.length]);
  };

  const applyPositions = () => {
    runners.forEach((runner, index) => {
      runner.style.setProperty("--orbit-angle", `${(positions[index] * 3.6).toFixed(3)}deg`);
    });
  };

  const showCollisionFlash = () => {
    if (!collisionFlash || motionQuery.matches || typeof collisionFlash.animate !== "function") return;

    collisionFlash.getAnimations().forEach((animation) => animation.cancel());
    collisionFlash.animate([
      { opacity: 0, transform: "translate(-50%, -50%) scaleX(0.12)" },
      { opacity: 0.46, offset: 0.2 },
      { opacity: 0.16, offset: 0.52, transform: "translate(-50%, -50%) scaleX(0.72)" },
      { opacity: 0, transform: "translate(-50%, -50%) scaleX(1.08)" }
    ], {
      duration: 820,
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
    });
  };

  const isPaused = () => isHovered || isFocused || motionQuery.matches || !isVisible || document.hidden;

  const stopOrbit = () => {
    if (orbitFrame) window.cancelAnimationFrame(orbitFrame);
    orbitFrame = 0;
    lastFrameAt = 0;
  };

  const runOrbit = (now) => {
    orbitFrame = 0;
    if (isPaused()) return;

    const elapsed = lastFrameAt ? Math.min(now - lastFrameAt, 50) : 16.67;
    lastFrameAt = now;

    positions.forEach((position, index) => {
      positions[index] = (position + directions[index] * speed * elapsed + 100) % 100;
    });

    const rawDistance = Math.abs(positions[0] - positions[1]);
    const circularDistance = Math.min(rawDistance, 100 - rawDistance);
    if (circularDistance <= collisionDistance && !collisionLocked) {
      directions[0] *= -1;
      directions[1] *= -1;
      colorStep = (colorStep + 1) % palette.length;
      collisionLocked = true;
      button.style.setProperty("--orbit-flash-color", palette[colorStep % palette.length]);
      applyColors();
      showCollisionFlash();
    } else if (circularDistance >= collisionDistance + 6) {
      collisionLocked = false;
    }

    applyPositions();
    orbitFrame = window.requestAnimationFrame(runOrbit);
  };

  const scheduleOrbit = () => {
    if (!orbitFrame && !isPaused()) orbitFrame = window.requestAnimationFrame(runOrbit);
  };

  const updatePauseState = () => {
    if (isPaused()) stopOrbit();
    else scheduleOrbit();
  };

  button.addEventListener("pointerenter", () => {
    isHovered = true;
    updatePauseState();
  });
  button.addEventListener("pointerleave", () => {
    isHovered = false;
    updatePauseState();
  });
  button.addEventListener("focusin", () => {
    isFocused = true;
    updatePauseState();
  });
  button.addEventListener("focusout", () => {
    isFocused = false;
    updatePauseState();
  });
  document.addEventListener("visibilitychange", updatePauseState);
  motionQuery.addEventListener("change", updatePauseState);

  if ("IntersectionObserver" in window) {
    const orbitObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updatePauseState();
    }, { threshold: 0.01 });
    orbitObserver.observe(button);
  }

  button.classList.add("is-orbit-ready");
  applyColors();
  applyPositions();
  scheduleOrbit();
})();

(() => {
  const sections = [...document.querySelectorAll("[data-entry-reveal]")];
  if (!sections.length) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  sections.forEach((section) => section.classList.add("is-entry-ready"));

  const revealSection = (section) => section.classList.add("is-entry-visible");

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    sections.forEach(revealSection);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealSection(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8%",
  });

  sections.forEach((section) => observer.observe(section));
})();

(() => {
  const section = document.querySelector("[data-learning-path]");
  const steps = Array.from(section?.querySelectorAll("[data-learning-step]") ?? []);
  const triggers = Array.from(section?.querySelectorAll("[data-technology-trigger]") ?? []);

  if (!section || !steps.length || !triggers.length) return;

  section.classList.add("is-interactive");
  triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));

  const closeTechnologies = (exception) => {
    triggers.forEach((trigger) => {
      if (trigger !== exception) trigger.setAttribute("aria-expanded", "false");
    });
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const willExpand = trigger.getAttribute("aria-expanded") !== "true";
      closeTechnologies(trigger);
      trigger.setAttribute("aria-expanded", String(willExpand));
    });
  });

  section.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeTechnologies();
  });

  if (!("IntersectionObserver" in window)) {
    steps.forEach((step) => step.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.28,
    rootMargin: "0px 0px -6%",
  });

  steps.forEach((step) => observer.observe(step));
})();
