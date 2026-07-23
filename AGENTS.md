# AGENTS.md

## Project identity

This repository contains an institutional landing page for DevClub, created for a recruitment challenge.

The requested page must present:

* who DevClub is;
* its courses and learning paths;
* its students;
* companies that hired DevClub students;
* tutors and instructors;
* student testimonials;
* the DevClub community and culture.

The recruiter explicitly requested a disruptive page capable of creating an immediate “wow” reaction.

The deadline is July 23.

## Primary objective

Build a visually memorable, technically solid and institutionally clear landing page for DevClub.

The result must balance:

* strong first impression;
* recognizable DevClub identity;
* clear institutional communication;
* usability;
* accessibility;
* responsiveness;
* performance;
* code that the project author can understand and defend in an interview.

Do not sacrifice usability or project completion for visual effects.

## Project author

The project author is learning front-end development and currently works primarily with:

* HTML;
* CSS;
* JavaScript.

The author learns quickly but must be able to understand, modify and explain the implementation.

When making an important technical decision:

* briefly explain what was done;
* explain why the approach was chosen;
* identify important concepts that may appear in an interview;
* avoid unnecessarily advanced abstractions;
* do not explain trivial syntax unless requested.

## Required stack

Use:

* semantic HTML5;
* CSS3;
* Vanilla JavaScript.

Do not introduce without explicit approval:

* React;
* Vue;
* Angular;
* Next.js;
* TypeScript;
* Tailwind CSS;
* Bootstrap;
* Sass;
* jQuery;
* Three.js;
* GSAP;
* particles.js;
* animation frameworks;
* component libraries;
* package managers;
* bundlers;
* backend services;
* databases.

A native browser API should be preferred whenever it reasonably solves the problem.

## Dependency policy

Do not install a dependency automatically.

Before recommending an external dependency:

1. identify the exact problem it solves;
2. explain why HTML, CSS or native JavaScript is insufficient;
3. estimate its effect on the deadline;
4. explain its learning cost;
5. provide a native alternative;
6. wait for explicit approval.

## Suggested repository structure

Keep the repository simple:

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── hero-effects.js
└── assets/
    ├── images/
    ├── icons/
    ├── logos/
    └── fonts/
```

The dedicated `hero-effects.js` file is allowed because the hero interaction may be complex enough to justify separation.

Do not create additional files or folders unless they improve clarity.

## Source-of-truth policy

Do not invent institutional information.

Never fabricate:

* numbers of students;
* employment rates;
* salaries;
* companies that hired students;
* student testimonials;
* tutor names;
* course information;
* awards;
* certifications;
* partner companies;
* statistical claims.

When verified content is unavailable:

* use clearly labeled placeholders;
* create a centralized content checklist;
* identify what must be replaced before delivery.

Do not present placeholders as real information.

### Explicit conceptual-content exception

Fictional people, projects, stories, testimonials and company names may be created only when the user explicitly authorizes them for the recruitment challenge.

Conceptual content must:

* be visibly identified as conceptual or fictional;
* never be presented as official DevClub data;
* never imply a real partnership, hiring relationship or verified result;
* be documented in the README;
* remain clearly distinguishable from verified institutional information.

This exception does not allow fabricated metrics, partnerships, employment rates or institutional claims to be presented as facts.

## Brand and communication direction

The DevClub voice may be:

* energetic;
* informal;
* motivating;
* community-oriented;
* confident;
* accessible to beginners.

It must not become:

* childish;
* confusing;
* exaggerated;
* full of unsupported promises;
* generic technology marketing copy.

Small informal naming choices are allowed when coherent with the brand.

The instructors section may explore the title:

“Os Feras Dev”

Treat this as a working creative direction, not an immutable requirement.

## Visual references

The recruiter referenced Adapta and Asimov Academy as examples of visually interesting experiences.

Use these only as references for:

* strong first impression;
* visual movement;
* interactive feedback;
* modern composition;
* immersive hero sections.

Do not copy their layout, code, writing, imagery or visual identity.

The final experience must feel like DevClub.

## Scope priorities

Maintain three priority levels.

### Essential

* complete institutional structure;
* clear hero message;
* responsive navigation;
* DevClub introduction;
* learning paths or courses;
* student results or stories;
* hiring companies;
* instructors;
* testimonials;
* primary call to action;
* footer;
* mobile and desktop support;
* accessibility fundamentals;
* acceptable performance.

### Differential

* interactive particle hero;
* pointer-controlled white spotlight;
* click-triggered fluorescent light wave;
* polished section transitions;
* animated testimonial film strips;
* purposeful microinteractions;
* strong typography and visual rhythm.

### Experimental

* fully modeled or highly complex 3D notebook;
* physically accurate 3D lighting;
* WebGL scenes;
* heavy shaders;
* effects that require additional frameworks;
* interactions that significantly threaten performance or deadline.

Essential work must be complete before experimental work.

## Hero creative specification

The hero is the main visual differentiator.

### General composition

The hero should contain:

* a dark or shadowed visual environment;
* a central DevClub symbol or logo;
* a particle field concentrated toward the center;
* a white pointer-controlled spotlight;
* a click-triggered fluorescent color wave;
* clear textual content and a primary call to action;
* graceful behavior when JavaScript is unavailable.

The visual effect must not compromise the readability of the heading, supporting text or call to action.

### Particle distribution

The particle field must not be uniformly random.

Particle density should:

* be low near the outer edges;
* gradually increase toward the center;
* create a visible but controlled central concentration;
* preserve enough negative space around the main text;
* visually guide attention toward the DevClub symbol.

Interpret the requested “50%” as a visual-density ceiling, not as literal coverage of half the pixels.

The center must remain readable and visually balanced.

### Particle layering

The DevClub symbol must appear visually above the main concentration of particles.

Organize the particle system into at least two conceptual layers:

1. background particles behind the DevClub symbol;
2. a very small foreground particle layer above the symbol.

The foreground layer must represent no more than approximately 5% of the active particle population.

Foreground particles must not obscure the logo.

### Spotlight behavior

The page should initially feel dark and partially concealed.

The pointer controls a white spotlight that:

* follows the pointer smoothly;
* reveals and illuminates nearby particles;
* increases particle brightness near the pointer;
* reveals illuminated portions of the DevClub symbol;
* has a soft radial falloff;
* does not use purple or blue as its default color;
* remains white during ordinary pointer movement.

Avoid direct, abrupt tracking.

Use interpolation so the spotlight follows with slight visual inertia.

### Click wave

When the user clicks or taps inside the interactive hero:

* create a circular wave originating from the interaction point;
* expand the wave across the hero;
* apply a fluorescent gradient moving through purple and blue;
* temporarily illuminate particles touched by the wave;
* preserve the white pointer spotlight as a separate effect;
* avoid permanently changing the color palette after the wave ends.

The color wave should feel like energy propagating through the scene rather than a flat expanding circle.

### Logo reaction

When the color wave reaches the DevClub symbol:

* the symbol must glow more intensely than the particles;
* the symbol must hold its glow slightly longer;
* the symbol may receive a subtle scale, bloom or pulse reaction;
* the reaction must remain elegant and controlled;
* the logo must return smoothly to its resting state.

The logo reaction should be triggered based on wave distance reaching the logo center or logo bounds.

### Mobile behavior

On touch devices:

* a tap should trigger the color wave;
* the spotlight may follow the latest touch position temporarily;
* the effect must not block page scrolling;
* particle count must be reduced;
* blur and shadow complexity may be reduced;
* the hero must remain usable on lower-powered devices.

Do not assume hover exists on mobile.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

* reduce or stop continuous particle motion;
* remove spotlight inertia if necessary;
* simplify the click wave;
* avoid strong scale pulses;
* preserve visual identity without requiring animation.

## Recommended hero implementation

Prefer a progressive enhancement architecture.

Suggested visual layers:

```text
hero section
├── background and ambient gradients
├── background canvas particle layer
├── DevClub visual/logo layer
├── small foreground particle canvas or layer
├── lighting and wave overlay
└── text and CTA content
```

The exact implementation may use:

* one optimized canvas with logical particle depth;
* or two canvases when the layering benefit justifies it.

Choose the simplest implementation that reliably creates the requested effect.

Prefer:

* Canvas 2D;
* `requestAnimationFrame`;
* pointer events;
* radial gradients;
* precomputed particle properties;
* object reuse where useful;
* responsive particle counts;
* device pixel ratio limits;
* paused animation when the hero is not visible.

Do not use DOM elements for hundreds of particles.

## Particle performance requirements

The particle system must:

* adapt particle count to viewport area;
* use fewer particles on mobile;
* cap device pixel ratio when appropriate;
* avoid allocating large numbers of objects every frame;
* avoid rebuilding gradients unnecessarily;
* stop or reduce work when the page is hidden;
* pause or reduce animation when the hero is outside the viewport;
* maintain acceptable pointer response;
* avoid console errors.

Start with conservative particle counts and increase only after testing.

## Hero implementation sequence

Do not implement every effect simultaneously.

Use this order:

1. static hero composition;
2. static logo and text hierarchy;
3. base particle distribution;
4. responsive particle scaling;
5. white pointer spotlight;
6. click wave;
7. particle color reaction;
8. logo glow reaction;
9. mobile behavior;
10. reduced-motion fallback;
11. performance profiling;
12. visual polish.

Preserve a working version at each stage.

## Testimonial section concept

The testimonial section should explore an optical film-strip composition.

Preferred structure:

* a central content area;
* lateral vertical testimonial strips;
* four vertical columns when desktop space permits;
* two outer columns moving downward;
* two inner columns moving upward;
* cards staggered rather than perfectly aligned;
* subtle visual tension inspired by the coffee-wall illusion;
* readable testimonial cards;
* restrained movement.

The optical effect must not:

* make testimonials hard to read;
* cause motion sickness;
* create layout instability;
* cause horizontal overflow;
* dominate the entire page.

On smaller screens:

* reduce the number of columns;
* simplify movement;
* or convert the strips into a horizontal or static testimonial presentation.

Use scroll-based transforms efficiently.

Avoid listening to scroll events without throttling or an animation-frame strategy.

## Content sections

The page should consider this initial architecture:

1. Header and navigation
2. Disruptive hero
3. DevClub introduction
4. Learning journeys and courses
5. How the learning experience works
6. Student transformation or results
7. Companies that hired students
8. Instructors — potentially “Os Feras Dev”
9. Testimonial film-strip experience
10. Community or belonging section
11. Final call to action
12. Footer

The exact order may change after content analysis, but changes must be justified.

## HTML rules

* Use semantic HTML5.
* Set `lang="pt-BR"`.
* Include charset and viewport metadata.
* Use one `h1`.
* Maintain a logical heading hierarchy.
* Use `header`, `nav`, `main`, `section`, `article` and `footer` where appropriate.
* Use links for navigation.
* Use buttons for in-page actions.
* Do not use inline `onclick`.
* Add useful alternative text to informative images.
* Use empty alternative text for purely decorative images.
* Associate form controls with labels.
* Preserve understandable content before CSS and JavaScript load.

## CSS rules

* Use custom properties in `:root`.
* Build a coherent spacing and typography scale.
* Prefer mobile-first styles.
* Use Grid and Flexbox intentionally.
* Avoid `!important`.
* Avoid fixed content heights that may crop text.
* Avoid absolute positioning as the main page-layout method.
* Absolute positioning is acceptable for controlled hero visual layers.
* Prevent horizontal overflow.
* Provide visible keyboard focus.
* Include hover states only as enhancements.
* Respect `prefers-reduced-motion`.
* Avoid random values scattered throughout the stylesheet.
* Keep selectors understandable.

## JavaScript rules

* Use Vanilla JavaScript.
* Use `addEventListener`.
* Prefer pointer events for cross-input support.
* Validate elements before manipulating them.
* Avoid unnecessary global variables.
* Encapsulate the hero system.
* Separate particle state, input state and rendering responsibilities.
* Use `requestAnimationFrame` for visual animation.
* Do not perform expensive layout reads inside every animation frame.
* Use CSS classes or custom properties for simple UI states.
* Use JavaScript only where CSS or HTML is insufficient.
* Add comments only for non-obvious calculations or architecture.

## Editing rules

Before editing:

* inspect the relevant files;
* understand existing structure;
* identify reusable styles and components;
* preserve working behavior.

While editing:

* make focused changes;
* avoid unnecessary rewrites;
* do not delete valid work without explanation;
* do not silently replace the design direction;
* do not add fake content;
* do not add unapproved dependencies.

After editing:

* identify modified files;
* summarize the implementation;
* explain key technical decisions;
* explain how to test;
* report limitations honestly;
* recommend the next highest-value task.

## Execution behavior

The agent may implement substantial coherent work in one run.

Do not artificially stop after every tiny change.

However, use checkpoints before:

* choosing the final visual direction;
* introducing a dependency;
* replacing working architecture;
* implementing a high-risk experimental feature;
* making claims about final performance;
* declaring the project complete.

For large work, use this pattern:

1. inspect;
2. plan;
3. implement a coherent milestone;
4. test;
5. report;
6. continue to the next milestone when safe.

## Mandatory Front-end Quality Gate

After any front-end change, apply the `senior-frontend-quality-gate` Skill before concluding. Use every project-specific requirement in this `AGENTS.md` as an additional acceptance criterion, test the complete integration, correct blockers and important issues, and repeat affected tests. Do not declare success without evidence.

## Required validation

Before declaring a milestone complete:

* inspect the browser console;
* check for JavaScript errors;
* test representative desktop width;
* test representative tablet width;
* test representative mobile width;
* test for horizontal overflow;
* test navigation;
* test buttons and links;
* test keyboard focus;
* verify heading hierarchy;
* verify reduced-motion behavior;
* verify touch behavior where applicable;
* check that the hero does not block scrolling;
* check that animation pauses or reduces when appropriate;
* report anything that could not be verified.

## Hero acceptance criteria

The hero milestone is accepted only when:

* the DevClub symbol is visually central;
* particle density clearly increases toward the center;
* edge density remains lower;
* the main particle population appears behind the logo;
* foreground particles remain sparse;
* the foreground layer does not obscure the logo;
* the white spotlight follows the pointer smoothly;
* the spotlight illuminates particles and logo;
* clicking or tapping creates a purple-to-blue fluorescent wave;
* the wave expands from the interaction point;
* the logo reacts when the wave reaches it;
* the logo glow is stronger and lasts longer than particle glow;
* text remains readable;
* mobile interaction remains usable;
* reduced-motion mode has a safe fallback;
* performance remains acceptable;
* no relevant console errors exist.

## Project completion criteria

The project is complete only when:

* all essential institutional sections are present;
* the hero creates a strong first impression;
* real content has replaced all critical placeholders;
* navigation works;
* the page is responsive;
* the page has no relevant console errors;
* the page has no accidental horizontal overflow;
* keyboard interaction is usable;
* motion preferences are respected;
* important images are optimized;
* the primary CTA is clear;
* the README is complete;
* deployment instructions are documented;
* the project author can explain the main implementation decisions.
