'use strict';

/**
 * REBAJ CORE - APPLICATION BOOTSTRAPPER (app.js)
 * 
 * Orchestrates the boot sequence, initializes the router,
 * kicks off the physics engine, and binds global state.
 */

import { SYSTEM_CONSTANTS } from './config.js';
import { systemState } from './StateManager.js';
import { Router } from './Router.js';
import { PhysicsEngine } from './PhysicsEngine.js';
import { WindowManager } from './WindowManager.js';
import { sleep, nextFrame } from './Utils.js';

import './Components.js';

class RebajApp {
    constructor() {
        this.router = new Router('#app-router');
        this.physics = new PhysicsEngine('#neural-canvas');
        
        // Setup Window Manager for OS Shell desktop view
        // It binds to the main viewport but listens for window spawn events
        this.windowManager = new WindowManager('.main-viewport');
        
        this.bootOverlay = document.getElementById('boot-overlay');
        this.bootLog = document.getElementById('boot-log');
        this.bootProgressBar = document.getElementById('boot-progress-bar');
        
        this.init();
    }

    async init() {
        await nextFrame();
        await this.runBootSequence();

        this.router.init();
        this.bindGlobalEvents();
        systemState.finishBoot();
        this.physics.start();
    }

    async runBootSequence() {
        const messages = SYSTEM_CONSTANTS.terminal.bootMessages;
        const totalDuration = SYSTEM_CONSTANTS.animation.bootSequenceDuration;
        const messageDelay = totalDuration / messages.length;

        for (let i = 0; i < messages.length; i++) {
            this.appendBootLog(messages[i]);
            const progress = Math.min(((i + 1) / messages.length) * 100, 100);
            if (this.bootProgressBar) this.bootProgressBar.style.width = `${progress}%`;
            await sleep(messageDelay);
        }

        await sleep(400);

        if (this.bootOverlay) {
            this.bootOverlay.classList.add('is-hidden');
            setTimeout(() => this.bootOverlay.remove(), 1000);
        }
    }

    appendBootLog(msg) {
        if (!this.bootLog) return;
        const line = document.createElement('div');
        line.className = 'boot-log-line';
        line.textContent = msg;
        this.bootLog.appendChild(line);
        while (this.bootLog.children.length > 4) {
            this.bootLog.removeChild(this.bootLog.firstChild);
        }
    }

    bindGlobalEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === '\`' || e.key === '~')) {
                e.preventDefault();
                systemState.toggleCli();
            }
        });

        window.addEventListener('error', (e) => {
            console.error('[KERNEL PANIC]', e.error);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RebajApp());
} else {
    new RebajApp();
}
