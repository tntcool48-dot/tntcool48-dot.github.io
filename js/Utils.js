'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// ██████╗ ███████╗██████╗  █████╗      ██╗     ██╗████████╗██╗██╗     ███████╗
// ██╔══██╗██╔════╝██╔══██╗██╔══██╗     ██║     ██║╚══██╔══╝██║██║     ██╔════╝
// ██████╔╝█████╗  ██████╔╝███████║     ██║     ██║   ██║   ██║██║     ███████╗
// ██╔══██╗██╔══╝  ██╔══██╗██╔══██║██   ██║     ██║   ██║   ██║██║     ╚════██║
// ██║  ██║███████╗██████╔╝██║  ██║╚█████╔╝     ███████╗██║   ██║███████╗███████║
// ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚════╝      ╚══════╝╚═╝   ╚═╝╚══════╝╚══════╝
// ═══════════════════════════════════════════════════════════════════════════════
//  Rebaj Core — Utility Library v1.0.0
//  Author: Yazan Jaber | github.com/tntcool48-dot
//  Dense, functional, zero-dependency utility belt for the Rebaj web OS.
// ═══════════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────────
//  §1  DOM UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * querySelector shorthand — selects the first matching element.
 * @param {string} selector - CSS selector string.
 * @param {Element|Document} [context=document] - Scope to query within.
 * @returns {Element|null} The first matching element or null.
 * @example
 * const header = $('header.main');
 * const nested = $('.item', containerEl);
 */
export const $ = (selector, context = document) => context.querySelector(selector);

/**
 * querySelectorAll shorthand — returns results as a real Array.
 * @param {string} selector - CSS selector string.
 * @param {Element|Document} [context=document] - Scope to query within.
 * @returns {Element[]} Array of matching elements.
 * @example
 * const buttons = $$('button.action');
 * buttons.forEach(btn => btn.disabled = true);
 */
export const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/**
 * DOM element factory with attribute spreading and child appending.
 * Handles `class`, `style` (object or string), `dataset`, event listeners
 * prefixed with `on`, and arbitrary attributes.
 * @param {string} tag - HTML tag name.
 * @param {Object} [attributes={}] - Key/value pairs for attributes, properties, and events.
 * @param {Array<Node|string>} [children=[]] - Child nodes or text strings to append.
 * @returns {HTMLElement} Newly created element.
 * @example
 * const card = createElement('div', {
 *   class: 'card glass',
 *   style: { backdropFilter: 'blur(12px)' },
 *   dataset: { panelId: '7' },
 *   onClick: () => console.log('clicked')
 * }, [
 *   createElement('h2', {}, ['Title']),
 *   'Some text node'
 * ]);
 */
export function createElement(tag, attributes = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'class' || key === 'className') {
            el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(el.style, value);
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.assign(el.dataset, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            el.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'innerHTML') {
            el.innerHTML = value;
        } else {
            el.setAttribute(key, value);
        }
    }
    for (const child of children) {
        el.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return el;
}

/**
 * Build a DocumentFragment from an arbitrary list of child nodes or strings.
 * @param {...(Node|string)} children - Nodes or text content to add.
 * @returns {DocumentFragment} Fragment containing all children.
 * @example
 * const frag = createFragment(
 *   createElement('p', {}, ['First']),
 *   'raw text',
 *   createElement('p', {}, ['Second'])
 * );
 * document.body.append(frag);
 */
export function createFragment(...children) {
    const frag = document.createDocumentFragment();
    for (const child of children) {
        frag.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return frag;
}

/**
 * Batch-set multiple attributes on a DOM element.
 * @param {Element} element - Target element.
 * @param {Object<string, string>} attributes - Key/value attribute pairs.
 * @returns {Element} The mutated element (for chaining).
 * @example
 * setAttributes(myDiv, { role: 'dialog', 'aria-modal': 'true', tabindex: '-1' });
 */
export function setAttributes(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
        value === null || value === undefined
            ? element.removeAttribute(key)
            : element.setAttribute(key, value);
    }
    return element;
}

/**
 * Remove all child nodes from an element using the fastest available method.
 * @param {Element} element - Target element to clear.
 * @returns {Element} The emptied element.
 * @example
 * removeChildren(document.getElementById('log-output'));
 */
export function removeChildren(element) {
    element.replaceChildren();
    return element;
}

/**
 * Insert a node directly after a reference node — the missing DOM method.
 * @param {Node} newNode - Node to insert.
 * @param {Node} referenceNode - Existing node to insert after.
 * @returns {Node} The inserted node.
 * @example
 * const note = createElement('span', { class: 'note' }, ['*']);
 * insertAfter(note, labelElement);
 */
export function insertAfter(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Wrap an existing DOM element with a new wrapper element.
 * @param {Element} element - The element to wrap.
 * @param {Element} wrapper - The wrapping element.
 * @returns {Element} The wrapper element now containing the original.
 * @example
 * const link = $('a.logo');
 * wrapElement(link, createElement('div', { class: 'logo-wrapper' }));
 */
export function wrapElement(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
}

/**
 * Clone the content of a `<template>` element by its ID.
 * @param {string} templateId - The `id` attribute of the template.
 * @returns {DocumentFragment} Deep-cloned template content.
 * @example
 * const row = cloneTemplate('row-template');
 * $('tbody').append(row);
 */
export function cloneTemplate(templateId) {
    const tpl = document.getElementById(templateId);
    if (!tpl || !(tpl instanceof HTMLTemplateElement)) {
        throw new TypeError(`Template "#${templateId}" not found or is not a <template>.`);
    }
    return tpl.content.cloneNode(true);
}

/**
 * Wait for an element matching `selector` to appear in the DOM.
 * Resolves immediately if the element already exists, otherwise observes
 * mutations until the element appears or the timeout elapses.
 * @param {string} selector - CSS selector to watch for.
 * @param {number} [timeout=5000] - Maximum wait time in milliseconds.
 * @returns {Promise<Element>} The matched element.
 * @example
 * const modal = await waitForElement('.modal[data-active]');
 * modal.focus();
 */
export function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(selector);
        if (existing) return resolve(existing);

        const observer = new MutationObserver((_, obs) => {
            const el = document.querySelector(selector);
            if (el) {
                obs.disconnect();
                clearTimeout(timer);
                resolve(el);
            }
        });

        const timer = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`waitForElement("${selector}") timed out after ${timeout}ms.`));
        }, timeout);

        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  §2  EVENT SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

/** @type {symbol} Private handlers map key. */
const _handlers = Symbol('EventBus.handlers');

/**
 * Lightweight publish / subscribe event bus with priority ordering
 * and single-emission support.
 *
 * Uses `Symbol` for truly private internal state.
 *
 * @example
 * const bus = new EventBus();
 * bus.on('theme:change', scheme => console.log(scheme), { priority: 10 });
 * bus.emit('theme:change', 'dark');
 */
export class EventBus {
    /** Initialise the handler registry. */
    constructor() {
        /** @type {Map<string, Array<{handler: Function, once: boolean, priority: number}>>} */
        this[_handlers] = new Map();
    }

    /**
     * Subscribe to an event.
     * @param {string} event - Event name.
     * @param {Function} handler - Callback to invoke on emission.
     * @param {{ once?: boolean, priority?: number }} [options={}] - Subscription options.
     * @returns {this} For chaining.
     * @example
     * bus.on('file:saved', path => toast(`Saved ${path}`));
     * bus.on('error', err => log(err), { once: true, priority: 100 });
     */
    on(event, handler, { once = false, priority = 0 } = {}) {
        if (!this[_handlers].has(event)) this[_handlers].set(event, []);
        this[_handlers].get(event).push({ handler, once, priority });
        return this;
    }

    /**
     * Unsubscribe from an event. If no handler is specified, removes all
     * listeners for that event.
     * @param {string} event - Event name.
     * @param {Function} [handler] - Specific handler to remove.
     * @returns {this} For chaining.
     * @example
     * bus.off('file:saved', mySaveHandler);
     * bus.off('error'); // removes all error listeners
     */
    off(event, handler) {
        if (!handler) {
            this[_handlers].delete(event);
        } else {
            const list = this[_handlers].get(event);
            if (list) {
                const filtered = list.filter(entry => entry.handler !== handler);
                filtered.length ? this[_handlers].set(event, filtered) : this[_handlers].delete(event);
            }
        }
        return this;
    }

    /**
     * Emit an event, invoking all subscribers in descending priority order.
     * Handlers marked `once` are removed after invocation.
     * @param {string} event - Event name.
     * @param {...*} data - Payload forwarded to each handler.
     * @returns {this} For chaining.
     * @example
     * bus.emit('panel:resize', { width: 800, height: 600 });
     */
    emit(event, ...data) {
        const list = this[_handlers].get(event);
        if (!list || list.length === 0) return this;
        const sorted = [...list].sort((a, b) => b.priority - a.priority);
        const onceIndices = [];
        sorted.forEach((entry, i) => {
            entry.handler(...data);
            if (entry.once) onceIndices.push(entry);
        });
        if (onceIndices.length) {
            this[_handlers].set(event, list.filter(e => !onceIndices.includes(e)));
        }
        return this;
    }

    /**
     * Subscribe for a single emission only.
     * @param {string} event - Event name.
     * @param {Function} handler - Callback.
     * @returns {this} For chaining.
     * @example
     * bus.once('init', () => console.log('System initialised'));
     */
    once(event, handler) {
        return this.on(event, handler, { once: true });
    }

    /**
     * Check whether an event has at least one subscriber.
     * @param {string} event - Event name.
     * @returns {boolean} True if subscribers exist.
     * @example
     * if (bus.has('error')) bus.emit('error', new Error('fail'));
     */
    has(event) {
        return (this[_handlers].get(event)?.length ?? 0) > 0;
    }

    /**
     * Remove every subscription across all events.
     * @returns {this} For chaining.
     * @example
     * bus.clear(); // full teardown
     */
    clear() {
        this[_handlers].clear();
        return this;
    }

    /**
     * Count registered listeners. If `event` is provided counts only that
     * event, otherwise returns the total across all events.
     * @param {string} [event] - Optional event name.
     * @returns {number} Listener count.
     * @example
     * console.log(`Total listeners: ${bus.listenerCount()}`);
     * console.log(`Error listeners: ${bus.listenerCount('error')}`);
     */
    listenerCount(event) {
        if (event !== undefined) return this[_handlers].get(event)?.length ?? 0;
        let total = 0;
        for (const list of this[_handlers].values()) total += list.length;
        return total;
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  §3  TIMING & RATE LIMITING
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Debounce a function call. Supports leading/trailing edge execution.
 * The returned wrapper exposes a `.cancel()` method and a `.flush()` method.
 * @param {Function} fn - Function to debounce.
 * @param {number} wait - Delay in milliseconds.
 * @param {{ leading?: boolean, trailing?: boolean }} [options={}] - Edge options.
 * @returns {Function & { cancel: Function, flush: Function }} Debounced function.
 * @example
 * const save = debounce(syncToServer, 300, { leading: false, trailing: true });
 * inputEl.addEventListener('input', save);
 * // save.cancel(); to abort pending call
 */
export function debounce(fn, wait, { leading = false, trailing = true } = {}) {
    let timerId = null;
    let lastArgs = null;
    let lastThis = null;
    let lastCallTime = 0;
    let result;

    function invoke() {
        const args = lastArgs;
        const ctx = lastThis;
        lastArgs = lastThis = null;
        result = fn.apply(ctx, args);
        return result;
    }

    function debounced(...args) {
        lastArgs = args;
        lastThis = this;
        const now = Date.now();
        const isInvoking = leading && !timerId;

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            if (trailing && lastArgs) invoke();
        }, wait);

        if (isInvoking) invoke();
        lastCallTime = now;
        return result;
    }

    /** Cancel any pending invocation. */
    debounced.cancel = () => {
        clearTimeout(timerId);
        timerId = lastArgs = lastThis = null;
    };

    /** Immediately invoke any pending debounced call. */
    debounced.flush = () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
            if (lastArgs) invoke();
        }
    };

    return debounced;
}

/**
 * Throttle function execution using requestAnimationFrame for smooth visuals.
 * @param {Function} fn - Function to throttle.
 * @param {number} limit - Minimum interval in milliseconds between calls.
 * @returns {Function} Throttled function.
 * @example
 * window.addEventListener('scroll', throttle(onScroll, 16));
 */
export function throttle(fn, limit) {
    let lastRun = 0;
    let rafId = null;
    return function throttled(...args) {
        const now = performance.now();
        const remaining = limit - (now - lastRun);
        if (remaining <= 0) {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            lastRun = now;
            fn.apply(this, args);
        } else if (!rafId) {
            rafId = requestAnimationFrame(() => {
                lastRun = performance.now();
                rafId = null;
                fn.apply(this, args);
            });
        }
    };
}

/**
 * Defer execution to the next microtask via `queueMicrotask`.
 * @param {Function} fn - Function to defer.
 * @returns {void}
 * @example
 * defer(() => console.log('runs after current task'));
 */
export const defer = (fn) => queueMicrotask(fn);

/**
 * Promise-based delay.
 * @param {number} ms - Milliseconds to sleep.
 * @returns {Promise<void>} Resolves after `ms` milliseconds.
 * @example
 * await sleep(1000);
 * console.log('one second later');
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry an async function with exponential backoff.
 * @param {Function} fn - Async function to attempt.
 * @param {number} maxAttempts - Maximum number of attempts.
 * @param {number} [delay=200] - Initial delay in ms (doubles each retry).
 * @returns {Promise<*>} Result of a successful invocation.
 * @throws {Error} The last error if all attempts fail.
 * @example
 * const data = await retry(() => fetch('/api/status').then(r => r.json()), 3, 500);
 */
export async function retry(fn, maxAttempts, delay = 200) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(attempt);
        } catch (err) {
            lastError = err;
            if (attempt < maxAttempts) await sleep(delay * Math.pow(2, attempt - 1));
        }
    }
    throw lastError;
}

/**
 * Returns a Promise that resolves on the next animation frame.
 * @returns {Promise<DOMHighResTimeStamp>} Timestamp from rAF.
 * @example
 * const ts = await nextFrame();
 * console.log(`Frame at ${ts}`);
 */
export const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

/**
 * Create a controllable interval ticker with start, stop, and pause.
 * @param {Function} callback - Function called each tick with elapsed time.
 * @param {number} interval - Interval in milliseconds.
 * @returns {{ start: Function, stop: Function, pause: Function, resume: Function, isRunning: Function }} Ticker controls.
 * @example
 * const ticker = createTicker(elapsed => updateClock(elapsed), 1000);
 * ticker.start();
 * // later...
 * ticker.pause();
 * ticker.resume();
 * ticker.stop();
 */
export function createTicker(callback, interval) {
    let id = null;
    let startTime = 0;
    let pausedAt = 0;
    let paused = false;

    const start = () => {
        if (id !== null) return;
        startTime = performance.now();
        paused = false;
        id = setInterval(() => {
            if (!paused) callback(performance.now() - startTime);
        }, interval);
    };

    const stop = () => {
        clearInterval(id);
        id = null;
        startTime = 0;
        pausedAt = 0;
        paused = false;
    };

    const pause = () => {
        paused = true;
        pausedAt = performance.now();
    };

    const resume = () => {
        if (!paused) return;
        startTime += performance.now() - pausedAt;
        paused = false;
    };

    const isRunning = () => id !== null && !paused;

    return { start, stop, pause, resume, isRunning };
}


// ─────────────────────────────────────────────────────────────────────────────
//  §4  ANIMATION UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Linear interpolation between two values.
 * @param {number} start - Start value.
 * @param {number} end - End value.
 * @param {number} t - Interpolation factor (0–1, not clamped).
 * @returns {number} Interpolated value.
 * @example
 * lerp(0, 100, 0.5); // 50
 */
export const lerp = (start, end, t) => start + (end - start) * t;

/**
 * Linear interpolation clamped so `t` stays within [0, 1].
 * @param {number} start - Start value.
 * @param {number} end - End value.
 * @param {number} t - Interpolation factor (clamped to 0–1).
 * @returns {number} Interpolated value within [start, end].
 * @example
 * clampedLerp(0, 100, 1.5); // 100
 */
export const clampedLerp = (start, end, t) => lerp(start, end, Math.max(0, Math.min(1, t)));

/**
 * Inverse linear interpolation — find the `t` that produces `value`.
 * @param {number} start - Start of range.
 * @param {number} end - End of range.
 * @param {number} value - Value to locate within the range.
 * @returns {number} The interpolation factor.
 * @example
 * inverseLerp(0, 100, 25); // 0.25
 */
export const inverseLerp = (start, end, value) => (end - start) !== 0 ? (value - start) / (end - start) : 0;

/**
 * Remap a value from one range to another.
 * @param {number} value - Input value.
 * @param {number} inMin - Input range minimum.
 * @param {number} inMax - Input range maximum.
 * @param {number} outMin - Output range minimum.
 * @param {number} outMax - Output range maximum.
 * @returns {number} Remapped value.
 * @example
 * remap(5, 0, 10, 0, 100); // 50
 */
export const remap = (value, inMin, inMax, outMin, outMax) =>
    lerp(outMin, outMax, inverseLerp(inMin, inMax, value));

/**
 * Cubic ease-in-out curve.
 * @param {number} t - Progress (0–1).
 * @returns {number} Eased value.
 * @example
 * easeInOutCubic(0.5); // 0.5
 */
export const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Elastic ease-out — spring overshoot effect.
 * @param {number} t - Progress (0–1).
 * @returns {number} Eased value with elastic overshoot.
 * @example
 * easeOutElastic(0.7); // ~1.022 (overshoots)
 */
export function easeOutElastic(t) {
    if (t === 0 || t === 1) return t;
    const c4 = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

/**
 * Bounce ease-out — decaying bounce effect.
 * @param {number} t - Progress (0–1).
 * @returns {number} Eased value.
 * @example
 * easeOutBounce(0.5); // 0.765625
 */
export function easeOutBounce(t) {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1)        return n1 * t * t;
    if (t < 2 / d1)        return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1)      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return                         n1 * (t -= 2.625 / d1) * t + 0.984375;
}

/**
 * Single-step spring physics simulation.
 * @param {number} current - Current position.
 * @param {number} target - Target position.
 * @param {number} velocity - Current velocity.
 * @param {number} stiffness - Spring stiffness constant (k).
 * @param {number} damping - Damping coefficient (c).
 * @param {number} mass - Mass (m).
 * @returns {{ position: number, velocity: number }} Updated state.
 * @example
 * let state = { position: 0, velocity: 0 };
 * state = springPhysics(state.position, 100, state.velocity, 170, 26, 1);
 * console.log(state.position); // approaches 100
 */
export function springPhysics(current, target, velocity, stiffness, damping, mass) {
    const springForce = -stiffness * (current - target);
    const dampingForce = -damping * velocity;
    const acceleration = (springForce + dampingForce) / mass;
    const dt = 1 / 60; // assume 60fps timestep
    const newVelocity = velocity + acceleration * dt;
    const newPosition = current + newVelocity * dt;
    return { position: newPosition, velocity: newVelocity };
}

/**
 * Tween a numeric value over time, calling `callback` on each frame.
 * Returns a cancel function to abort the animation.
 * @param {number} from - Start value.
 * @param {number} to - End value.
 * @param {number} duration - Duration in milliseconds.
 * @param {Function} easing - Easing function `(t: number) => number`.
 * @param {Function} callback - Called each frame with current value and progress.
 * @returns {Function} Cancel function.
 * @example
 * const cancel = animateValue(0, 360, 600, easeInOutCubic, (val) => {
 *   el.style.transform = `rotate(${val}deg)`;
 * });
 * // cancel() to stop
 */
export function animateValue(from, to, duration, easing, callback) {
    let rafId;
    const startTime = performance.now();

    const tick = (now) => {
        const elapsed = now - startTime;
        const rawT = Math.min(elapsed / duration, 1);
        const easedT = easing(rawT);
        callback(lerp(from, to, easedT), rawT);
        if (rawT < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
}

/**
 * Smooth-damp a value toward a target (Unity-style `Mathf.SmoothDamp`).
 * @param {number} current - Current value.
 * @param {number} target - Target value.
 * @param {number} velocity - Current velocity (mutated via return).
 * @param {number} smoothTime - Approximate time to reach target (seconds).
 * @param {number} maxSpeed - Maximum allowed speed.
 * @param {number} deltaTime - Time since last call (seconds).
 * @returns {{ value: number, velocity: number }} New value and velocity.
 * @example
 * let v = 0, pos = 0;
 * const result = smoothDamp(pos, 100, v, 0.3, Infinity, 0.016);
 * pos = result.value;
 * v = result.velocity;
 */
export function smoothDamp(current, target, velocity, smoothTime, maxSpeed, deltaTime) {
    const omega = 2 / Math.max(0.0001, smoothTime);
    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    let delta = current - target;
    const maxDelta = maxSpeed * smoothTime;
    delta = Math.max(-maxDelta, Math.min(maxDelta, delta));
    const adjustedTarget = current - delta;
    const temp = (velocity + omega * delta) * deltaTime;
    let newVelocity = (velocity - omega * temp) * exp;
    let newValue = adjustedTarget + (delta + temp) * exp;
    // prevent overshooting
    if ((target - current > 0) === (newValue > target)) {
        newValue = target;
        newVelocity = (newValue - target) / deltaTime;
    }
    return { value: newValue, velocity: newVelocity };
}


// ─────────────────────────────────────────────────────────────────────────────
//  §5  ACCESSIBILITY UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if the user has requested reduced motion at the OS level.
 * @returns {boolean} True if reduced motion is preferred.
 * @example
 * if (prefersReducedMotion()) duration = 0;
 */
export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Check if the user prefers high contrast.
 * @returns {boolean} True if high contrast is preferred.
 * @example
 * if (prefersHighContrast()) document.body.classList.add('hc');
 */
export const prefersHighContrast = () =>
    window.matchMedia('(prefers-contrast: more)').matches;

/**
 * Check if the user prefers dark mode.
 * @returns {boolean} True if dark colour scheme is preferred.
 * @example
 * const theme = prefersDarkMode() ? 'dark' : 'light';
 */
export const prefersDarkMode = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * Selector for focusable elements.
 * @type {string}
 */
const FOCUSABLE = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])', '[contenteditable]'
].join(', ');

/**
 * Get all focusable elements within a container.
 * @param {Element} container - The container element.
 * @returns {Element[]} Array of focusable elements.
 * @example
 * const focusable = getFocusableElements(dialogEl);
 */
export const getFocusableElements = (container) => [...container.querySelectorAll(FOCUSABLE)];

/**
 * Create a keyboard focus trap inside a container.
 * Tab and Shift+Tab cycle through focusable elements without leaving.
 * Returns a release function to remove the trap.
 * @param {Element} container - Container to trap focus within.
 * @returns {Function} Release function to remove the focus trap.
 * @example
 * const release = trapFocus(modalEl);
 * // when modal closes:
 * release();
 */
export function trapFocus(container) {
    const handler = (e) => {
        if (e.key !== 'Tab') return;
        const focusable = getFocusableElements(container);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };
    container.addEventListener('keydown', handler);
    return () => container.removeEventListener('keydown', handler);
}

/**
 * Release a focus trap obtained from `trapFocus`.
 * Alias provided for semantic clarity in API consumers.
 * @param {Function} trap - The release function returned by `trapFocus`.
 * @returns {void}
 * @example
 * const trap = trapFocus(dialog);
 * releaseFocus(trap);
 */
export const releaseFocus = (trap) => trap();

/**
 * Announce a message to screen readers via an ARIA live region.
 * Creates a temporary live region, injects the message, then cleans up.
 * @param {string} message - Text to announce.
 * @param {'polite'|'assertive'} [priority='polite'] - ARIA live priority.
 * @returns {void}
 * @example
 * announceToScreenReader('File saved successfully');
 * announceToScreenReader('Error: connection lost', 'assertive');
 */
export function announceToScreenReader(message, priority = 'polite') {
    const region = document.createElement('div');
    Object.assign(region.style, {
        position: 'absolute', width: '1px', height: '1px',
        overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap'
    });
    region.setAttribute('aria-live', priority);
    region.setAttribute('role', 'status');
    document.body.appendChild(region);
    // Small delay ensures screen readers pick up the content change.
    requestAnimationFrame(() => {
        region.textContent = message;
        setTimeout(() => region.remove(), 3000);
    });
}

/**
 * Cycle focus through an ordered list of elements.
 * @param {Element[]} elements - Array of focusable elements.
 * @param {number} currentIndex - Currently focused index.
 * @param {1|-1} direction - 1 for forward, -1 for backward.
 * @returns {number} The new focused index.
 * @example
 * idx = rotateFocus(tabs, idx, 1); // move to next tab
 */
export function rotateFocus(elements, currentIndex, direction) {
    const nextIndex = (currentIndex + direction + elements.length) % elements.length;
    elements[nextIndex].focus();
    return nextIndex;
}

/**
 * Validate that no duplicate `id` attributes exist in a subtree.
 * Logs warnings for any duplicates found.
 * @param {Element} [root=document.documentElement] - Root of subtree to check.
 * @returns {string[]} Array of duplicate IDs (empty if none).
 * @example
 * const dupes = ensureUniqueIds(document.body);
 * if (dupes.length) console.warn('Duplicate IDs:', dupes);
 */
export function ensureUniqueIds(root = document.documentElement) {
    const allIds = [...root.querySelectorAll('[id]')].map(el => el.id);
    const seen = new Set();
    const duplicates = new Set();
    for (const id of allIds) {
        if (seen.has(id)) duplicates.add(id);
        else seen.add(id);
    }
    if (duplicates.size) console.warn('[Rebaj Utils] Duplicate IDs detected:', [...duplicates]);
    return [...duplicates];
}


// ─────────────────────────────────────────────────────────────────────────────
//  §6  STRING & FORMATTING UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a byte count as a human-readable string (KB, MB, GB, etc.).
 * @param {number} bytes - Number of bytes.
 * @param {number} [decimals=2] - Decimal places.
 * @returns {string} Formatted string (e.g., "1.44 MB").
 * @example
 * formatBytes(1536); // "1.50 KB"
 * formatBytes(1073741824, 1); // "1.0 GB"
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
}

/**
 * Format milliseconds as a human-readable duration string.
 * @param {number} ms - Duration in milliseconds.
 * @returns {string} Formatted duration (e.g., "2h 15m 3s").
 * @example
 * formatDuration(8103000); // "2h 15m 3s"
 * formatDuration(450);      // "450ms"
 */
export function formatDuration(ms) {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 60000) % 60;
    const h = Math.floor(ms / 3600000) % 24;
    const d = Math.floor(ms / 86400000);
    const parts = [];
    if (d) parts.push(`${d}d`);
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    if (s) parts.push(`${s}s`);
    return parts.join(' ') || '0s';
}

/**
 * Format a timestamp as a relative time string ("3 minutes ago", "in 2 hours").
 * @param {number|Date} timestamp - Unix timestamp (ms) or Date object.
 * @returns {string} Relative time string.
 * @example
 * formatRelativeTime(Date.now() - 180000); // "3 minutes ago"
 * formatRelativeTime(Date.now() + 7200000); // "in 2 hours"
 */
export function formatRelativeTime(timestamp) {
    const ms = (timestamp instanceof Date ? timestamp.getTime() : timestamp) - Date.now();
    const absMs = Math.abs(ms);
    const ranges = [
        [60000,       'second', 1000],
        [3600000,     'minute', 60000],
        [86400000,    'hour',   3600000],
        [2592000000,  'day',    86400000],
        [31536000000, 'month',  2592000000],
        [Infinity,    'year',   31536000000]
    ];
    for (const [threshold, unit, divisor] of ranges) {
        if (absMs < threshold) {
            const value = Math.round(absMs / divisor);
            const plural = value !== 1 ? 's' : '';
            return ms < 0 ? `${value} ${unit}${plural} ago` : `in ${value} ${unit}${plural}`;
        }
    }
    return 'just now';
}

/**
 * Truncate a string to `maxLength`, appending a suffix if truncated.
 * @param {string} str - Input string.
 * @param {number} maxLength - Maximum character length.
 * @param {string} [suffix='…'] - Suffix appended when truncated.
 * @returns {string} Truncated string.
 * @example
 * truncate('Rebaj Core Operating System', 15); // "Rebaj Core Ope…"
 */
export const truncate = (str, maxLength, suffix = '…') =>
    str.length <= maxLength ? str : str.slice(0, maxLength - suffix.length) + suffix;

/**
 * Convert a string to a URL-safe slug.
 * @param {string} str - Input string.
 * @returns {string} Slugified string.
 * @example
 * slugify('Hello World! #2024'); // "hello-world-2024"
 */
export const slugify = (str) =>
    str.toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');

/**
 * Convert camelCase to kebab-case.
 * @param {string} str - camelCase string.
 * @returns {string} kebab-case string.
 * @example
 * camelToKebab('backgroundColor'); // "background-color"
 */
export const camelToKebab = (str) =>
    str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Convert kebab-case to camelCase.
 * @param {string} str - kebab-case string.
 * @returns {string} camelCase string.
 * @example
 * kebabToCamel('background-color'); // "backgroundColor"
 */
export const kebabToCamel = (str) =>
    str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

/**
 * Escape HTML special characters to prevent injection.
 * @param {string} str - Raw string.
 * @returns {string} HTML-safe string.
 * @example
 * escapeHtml('<script>alert("xss")</script>'); // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
export function escapeHtml(str) {
    const escapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, ch => escapes[ch]);
}

/**
 * Lightweight template interpolation using `{{key}}` syntax.
 * Supports dot-notation for nested keys.
 * @param {string} str - Template string.
 * @param {Object} data - Data object for interpolation.
 * @returns {string} Interpolated string.
 * @example
 * template('Hello, {{user.name}}!', { user: { name: 'Yazan' } }); // "Hello, Yazan!"
 */
export function template(str, data) {
    return str.replace(/\{\{(.+?)\}\}/g, (_, path) => {
        const value = path.trim().split('.').reduce((obj, key) => obj?.[key], data);
        return value !== undefined && value !== null ? String(value) : '';
    });
}

/**
 * Compute a simple hash of a string using the djb2 algorithm.
 * Returns a hexadecimal string.
 * @param {string} str - Input string.
 * @returns {string} Hex hash string.
 * @example
 * hashString('rebaj-core'); // e.g., "1a2b3c4d"
 */
export function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
}


// ─────────────────────────────────────────────────────────────────────────────
//  §7  DATA UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deep clone an object using `structuredClone` with fallback to JSON round-trip.
 * @param {*} obj - Value to clone.
 * @returns {*} Deep clone.
 * @example
 * const copy = deepClone({ a: { b: [1, 2, 3] } });
 */
export function deepClone(obj) {
    try {
        return structuredClone(obj);
    } catch {
        return JSON.parse(JSON.stringify(obj));
    }
}

/**
 * Deep merge multiple source objects into a target.
 * Arrays are replaced, plain objects are recursively merged.
 * @param {Object} target - Target object (mutated).
 * @param {...Object} sources - Source objects.
 * @returns {Object} The merged target.
 * @example
 * deepMerge({ a: { x: 1 } }, { a: { y: 2 }, b: 3 });
 * // { a: { x: 1, y: 2 }, b: 3 }
 */
export function deepMerge(target, ...sources) {
    for (const source of sources) {
        if (!source) continue;
        for (const key of Object.keys(source)) {
            const src = source[key];
            const tgt = target[key];
            if (src && typeof src === 'object' && !Array.isArray(src) &&
                tgt && typeof tgt === 'object' && !Array.isArray(tgt)) {
                deepMerge(tgt, src);
            } else {
                target[key] = deepClone(src);
            }
        }
    }
    return target;
}

/**
 * Recursively freeze an object and all nested objects.
 * @param {Object} obj - Object to freeze.
 * @returns {Object} The frozen object.
 * @example
 * const config = deepFreeze({ theme: { primary: '#0ff' } });
 * config.theme.primary = 'red'; // silently fails in strict mode, throws
 */
export function deepFreeze(obj) {
    Object.freeze(obj);
    for (const value of Object.values(obj)) {
        if (value && typeof value === 'object' && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    }
    return obj;
}

/**
 * Pick specific keys from an object.
 * @param {Object} obj - Source object.
 * @param {string[]} keys - Keys to pick.
 * @returns {Object} New object with only the picked keys.
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
 */
export const pick = (obj, keys) =>
    keys.reduce((acc, k) => { if (k in obj) acc[k] = obj[k]; return acc; }, {});

/**
 * Omit specific keys from an object.
 * @param {Object} obj - Source object.
 * @param {string[]} keys - Keys to omit.
 * @returns {Object} New object without the omitted keys.
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
 */
export const omit = (obj, keys) => {
    const set = new Set(keys);
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !set.has(k)));
};

/**
 * Group array elements by a key function.
 * @param {Array} array - Input array.
 * @param {Function} keyFn - Function returning the group key for each item.
 * @returns {Object<string, Array>} Grouped result.
 * @example
 * groupBy([1, 2, 3, 4], n => n % 2 === 0 ? 'even' : 'odd');
 * // { odd: [1, 3], even: [2, 4] }
 */
export function groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
        const key = keyFn(item);
        (groups[key] ??= []).push(item);
        return groups;
    }, {});
}

/**
 * Split an array into chunks of a given size.
 * @param {Array} array - Input array.
 * @param {number} size - Chunk size.
 * @returns {Array<Array>} Array of chunks.
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * Deduplicate an array, optionally by a key function.
 * @param {Array} array - Input array.
 * @param {Function} [keyFn] - Optional function returning unique key per item.
 * @returns {Array} Array with duplicates removed.
 * @example
 * unique([1, 2, 2, 3]); // [1, 2, 3]
 * unique([{id:1},{id:2},{id:1}], o => o.id); // [{id:1},{id:2}]
 */
export function unique(array, keyFn) {
    if (!keyFn) return [...new Set(array)];
    const seen = new Set();
    return array.filter(item => {
        const key = keyFn(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * Sort an array by a key function.
 * Returns a new array (does not mutate).
 * @param {Array} array - Input array.
 * @param {Function} keyFn - Function returning the sortable value.
 * @param {'asc'|'desc'} [direction='asc'] - Sort direction.
 * @returns {Array} Sorted copy.
 * @example
 * sortBy([{ name: 'B' }, { name: 'A' }], o => o.name); // [{ name: 'A' }, { name: 'B' }]
 */
export function sortBy(array, keyFn, direction = 'asc') {
    const dir = direction === 'desc' ? -1 : 1;
    return [...array].sort((a, b) => {
        const ka = keyFn(a), kb = keyFn(b);
        return ka < kb ? -dir : ka > kb ? dir : 0;
    });
}

/**
 * Flatten a nested object into dot-notation keys.
 * @param {Object} obj - Nested object.
 * @param {string} [prefix=''] - Key prefix (used for recursion).
 * @returns {Object<string, *>} Flattened object.
 * @example
 * flattenObject({ a: { b: { c: 1 } }, d: 2 });
 * // { 'a.b.c': 1, 'd': 2 }
 */
export function flattenObject(obj, prefix = '') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, path));
        } else {
            result[path] = value;
        }
    }
    return result;
}


// ─────────────────────────────────────────────────────────────────────────────
//  §8  PERFORMANCE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** @type {symbol} Private frames array key. */
const _frames = Symbol('FPSMonitor.frames');
/** @type {symbol} Private sample size key. */
const _sampleSize = Symbol('FPSMonitor.sampleSize');
/** @type {symbol} Private last timestamp key. */
const _lastTime = Symbol('FPSMonitor.lastTime');

/**
 * Real-time FPS monitor with rolling-window statistics.
 *
 * @example
 * const fps = new FPSMonitor(120);
 * function loop() {
 *   fps.tick();
 *   hud.textContent = `${fps.getFPS()} FPS`;
 *   requestAnimationFrame(loop);
 * }
 * requestAnimationFrame(loop);
 */
export class FPSMonitor {
    /**
     * @param {number} [sampleSize=60] - Number of frames to keep for statistics.
     */
    constructor(sampleSize = 60) {
        /** @type {number[]} Frame duration samples. */
        this[_frames] = [];
        /** @type {number} Maximum sample window. */
        this[_sampleSize] = sampleSize;
        /** @type {number} Timestamp of last tick. */
        this[_lastTime] = 0;
    }

    /**
     * Record a frame tick — call once per animation frame.
     * @returns {void}
     * @example
     * fps.tick(); // inside rAF loop
     */
    tick() {
        const now = performance.now();
        if (this[_lastTime]) {
            this[_frames].push(now - this[_lastTime]);
            if (this[_frames].length > this[_sampleSize]) this[_frames].shift();
        }
        this[_lastTime] = now;
    }

    /**
     * Get current instantaneous FPS based on last frame.
     * @returns {number} Frames per second.
     * @example
     * console.log(fps.getFPS()); // e.g., 60
     */
    getFPS() {
        const frames = this[_frames];
        return frames.length ? Math.round(1000 / frames[frames.length - 1]) : 0;
    }

    /**
     * Get rolling average FPS across the sample window.
     * @returns {number} Average FPS.
     * @example
     * overlay.text(`Avg: ${fps.getAverageFPS()} FPS`);
     */
    getAverageFPS() {
        const frames = this[_frames];
        if (frames.length === 0) return 0;
        const avg = frames.reduce((sum, dt) => sum + dt, 0) / frames.length;
        return Math.round(1000 / avg);
    }

    /**
     * Get the minimum FPS recorded in the current sample window.
     * @returns {number} Minimum FPS.
     * @example
     * if (fps.getMinFPS() < 30) console.warn('Frame drops detected');
     */
    getMinFPS() {
        const frames = this[_frames];
        if (frames.length === 0) return 0;
        return Math.round(1000 / Math.max(...frames));
    }

    /**
     * Check if FPS is above a performance threshold.
     * @param {number} [threshold=55] - Minimum acceptable FPS.
     * @returns {boolean} True if average FPS is at or above the threshold.
     * @example
     * if (!fps.isPerformant(55)) reduceParticleCount();
     */
    isPerformant(threshold = 55) {
        return this.getAverageFPS() >= threshold;
    }

    /**
     * Clear all recorded samples.
     * @returns {void}
     * @example
     * fps.reset();
     */
    reset() {
        this[_frames].length = 0;
        this[_lastTime] = 0;
    }
}

/**
 * Measure the execution time of a synchronous or async function.
 * Logs timing to the console and returns the result.
 * @param {string} label - Label for the performance log entry.
 * @param {Function} fn - Function to measure (may be async).
 * @returns {Promise<*>|*} The return value of `fn`.
 * @example
 * const result = await measure('data-parse', () => parseCSV(raw));
 */
export async function measure(label, fn) {
    const start = performance.now();
    try {
        const result = await fn();
        const elapsed = performance.now() - start;
        console.log(`[⏱ ${label}] ${elapsed.toFixed(2)}ms`);
        return result;
    } catch (err) {
        const elapsed = performance.now() - start;
        console.error(`[⏱ ${label}] FAILED after ${elapsed.toFixed(2)}ms`, err);
        throw err;
    }
}

/**
 * Memoize a function. Uses a `WeakMap` for object-type first arguments
 * and a `Map` for primitive arguments to avoid memory leaks.
 * @param {Function} fn - Function to memoize.
 * @param {Function} [keyFn] - Optional function to derive cache key.
 * @returns {Function & { cache: Map, clear: Function }} Memoized function with cache access.
 * @example
 * const expensiveCalc = memoize((obj) => heavyComputation(obj));
 * expensiveCalc(data); // computed
 * expensiveCalc(data); // cached
 */
export function memoize(fn, keyFn) {
    const primitiveCache = new Map();
    const objectCache = new WeakMap();

    function memoized(...args) {
        const key = keyFn ? keyFn(...args) : args[0];
        const isObj = key !== null && (typeof key === 'object' || typeof key === 'function');
        const cache = isObj ? objectCache : primitiveCache;
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    }

    /** The primitive cache (object cache is WeakMap, not directly iterable). */
    memoized.cache = primitiveCache;

    /** Clear the primitive cache. WeakMap entries are GC'd automatically. */
    memoized.clear = () => primitiveCache.clear();

    return memoized;
}

/**
 * Lazy initialisation wrapper — the factory runs only on first access.
 * @param {Function} factory - Factory function producing the value.
 * @returns {{ get value(): * }} Object with a lazily-initialised `value` getter.
 * @example
 * const heavyData = lazy(() => computeExpensiveTable());
 * // ... later, only computed here:
 * console.log(heavyData.value);
 */
export function lazy(factory) {
    let cached;
    let initialised = false;
    return {
        get value() {
            if (!initialised) { cached = factory(); initialised = true; }
            return cached;
        }
    };
}

/**
 * Batch DOM read and write operations into a single animation frame
 * to prevent layout thrashing.
 * @param {{ read?: Function, write?: Function }[]} operations - Array of
 *   read/write operation objects. Reads run first, then writes.
 * @returns {Promise<void>} Resolves when the batch is committed.
 * @example
 * await batchDOM([
 *   { read: () => (height = el.offsetHeight) },
 *   { write: () => (el.style.height = `${height * 2}px`) }
 * ]);
 */
export function batchDOM(operations) {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            // Phase 1: reads
            for (const op of operations) op.read?.();
            // Phase 2: writes
            for (const op of operations) op.write?.();
            resolve();
        });
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  §9  TYPE GUARDS & VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if value is a string.
 * @param {*} val - Value to check.
 * @returns {boolean} True if `val` is a string.
 * @example
 * isString('hello'); // true
 * isString(123);     // false
 */
export const isString = (val) => typeof val === 'string';

/**
 * Check if value is a finite number (excludes NaN and Infinity).
 * @param {*} val - Value to check.
 * @returns {boolean} True if `val` is a finite number.
 * @example
 * isNumber(42);      // true
 * isNumber(NaN);     // false
 * isNumber(Infinity); // false
 */
export const isNumber = (val) => typeof val === 'number' && Number.isFinite(val);

/**
 * Check if value is a function.
 * @param {*} val - Value to check.
 * @returns {boolean} True if `val` is callable.
 * @example
 * isFunction(() => {}); // true
 * isFunction(null);     // false
 */
export const isFunction = (val) => typeof val === 'function';

/**
 * Check if value is a plain object (not null, not an array, not a Date, etc.).
 * @param {*} val - Value to check.
 * @returns {boolean} True if `val` is a plain object.
 * @example
 * isObject({});          // true
 * isObject([]);          // false
 * isObject(null);        // false
 * isObject(new Date());  // false
 */
export const isObject = (val) =>
    val !== null && typeof val === 'object' && !Array.isArray(val) &&
    Object.getPrototypeOf(val) === Object.prototype;

/**
 * Check if value is a DOM Element.
 * @param {*} val - Value to check.
 * @returns {boolean} True if `val` is an Element instance.
 * @example
 * isElement(document.body);        // true
 * isElement('<div>not this</div>'); // false
 */
export const isElement = (val) => val instanceof Element;

/**
 * Check if a DOM element is currently visible within the viewport.
 * @param {Element} element - Element to check.
 * @returns {boolean} True if any part of the element is in the viewport.
 * @example
 * if (isVisible(card)) card.classList.add('animate-in');
 */
export function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Check if a value is "empty" — empty string, empty array, or plain object
 * with no own enumerable keys, or nullish.
 * @param {*} val - Value to check.
 * @returns {boolean} True if the value is considered empty.
 * @example
 * isEmpty('');    // true
 * isEmpty([]);    // true
 * isEmpty({});    // true
 * isEmpty(null);  // true
 * isEmpty(0);     // false
 */
export function isEmpty(val) {
    if (val == null) return true;
    if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
    if (typeof val === 'object') return Object.keys(val).length === 0;
    return false;
}

/**
 * Assert that a value is defined (not `null` or `undefined`).
 * Throws a `TypeError` if the assertion fails.
 * @param {*} val - Value to assert.
 * @param {string} [name='value'] - Name used in the error message.
 * @returns {*} The value, if defined (for inline chaining).
 * @throws {TypeError} If `val` is null or undefined.
 * @example
 * const user = assertDefined(getUser(), 'user');
 * // throws TypeError: "Expected 'user' to be defined, got null."
 */
export function assertDefined(val, name = 'value') {
    if (val === null || val === undefined) {
        throw new TypeError(`Expected '${name}' to be defined, got ${val}.`);
    }
    return val;
}


// ─────────────────────────────────────────────────────────────────────────────
//  §10  ID & CRYPTO UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a UUID-like identifier using `crypto.getRandomValues`.
 * Produces a v4-format string: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.
 * @param {string} [prefix=''] - Optional prefix prepended with a dash.
 * @returns {string} Generated ID.
 * @example
 * generateId();          // "a3f8b1c2-d4e5-4f6a-b7c8-d9e0f1a2b3c4"
 * generateId('panel');   // "panel-a3f8b1c2-d4e5-4f6a-b7c8-d9e0f1a2b3c4"
 */
export function generateId(prefix = '') {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    return prefix ? `${prefix}-${uuid}` : uuid;
}

/**
 * Generate a short alphanumeric ID.
 * @param {number} [length=8] - Length of the ID.
 * @returns {string} Random alphanumeric string.
 * @example
 * generateShortId();   // "k7Xm2pQr"
 * generateShortId(12); // "a1B2c3D4e5F6"
 */
export function generateShortId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => chars[b % chars.length]).join('');
}

/**
 * Create an auto-incrementing sequential ID generator using a closure.
 * Each call returns the next integer in sequence, optionally prefixed.
 * @param {string} [prefix='id'] - Prefix for the generated ID.
 * @returns {Function} Generator function returning the next sequential ID.
 * @example
 * const nextPanelId = sequentialId('panel');
 * nextPanelId(); // "panel-1"
 * nextPanelId(); // "panel-2"
 * nextPanelId(); // "panel-3"
 */
export function sequentialId(prefix = 'id') {
    let counter = 0;
    return () => `${prefix}-${++counter}`;
}
