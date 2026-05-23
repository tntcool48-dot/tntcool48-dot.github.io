'use strict';

/**
 * REBAJ CORE - HORIZON ARCHITECTURE
 * Central Configuration Module
 * 
 * Defines all design tokens, registries, manifests, and system constants 
 * for the Rebaj Core web OS. Everything is frozen for immutability.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
export const DESIGN_TOKENS = Object.freeze({
    colors: {
        bg: 'hsl(240, 17%, 3%)',
        surface: 'hsl(240, 17%, 7%)',
        accentCyan: 'hsl(184, 100%, 50%)',
        accentCyanDim: 'hsla(184, 100%, 50%, 0.15)',
        accentCyanGlow: 'hsla(184, 100%, 50%, 0.4)',
        accentViolet: 'hsl(275, 65%, 58%)',
        accentVioletDim: 'hsla(275, 65%, 58%, 0.15)',
        accentEmerald: 'hsl(157, 100%, 50%)',
        accentEmeraldDim: 'hsla(157, 100%, 50%, 0.15)',
        accentRose: 'hsl(340, 100%, 50%)',
        accentRoseDim: 'hsla(340, 100%, 50%, 0.15)'
    },
    text: {
        primary: '#ffffff',
        secondary: '#8a8f98',
        tertiary: '#555962',
        inverse: '#050507'
    },
    glassmorphism: {
        light: 'rgba(255, 255, 255, 0.03)',
        medium: 'rgba(20, 20, 25, 0.4)',
        heavy: 'rgba(10, 10, 14, 0.75)',
        hover: 'rgba(30, 30, 40, 0.6)'
    },
    glassBorders: {
        light: 'rgba(255, 255, 255, 0.05)',
        medium: 'rgba(255, 255, 255, 0.1)',
        hover: 'rgba(255, 255, 255, 0.2)'
    },
    blurs: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    shadows: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
        md: '0 4px 16px rgba(0, 0, 0, 0.5)',
        lg: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        glowCyan: '0 0 20px hsla(184, 100%, 50%, 0.4)'
    },
    fonts: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        display: "'Space Grotesk', 'Inter', sans-serif",
        mono: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    },
    fluidScale: {
        xs: 'clamp(0.75rem, 0.7vw + 0.5rem, 0.85rem)',
        sm: 'clamp(0.875rem, 0.8vw + 0.5rem, 0.95rem)',
        base: 'clamp(1rem, 1vw + 0.5rem, 1.125rem)',
        lg: 'clamp(1.125rem, 1.2vw + 0.5rem, 1.25rem)',
        xl: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)',
        '2xl': 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
        '3xl': 'clamp(2rem, 3vw + 0.5rem, 2.5rem)',
        '4xl': 'clamp(2.5rem, 4vw + 0.5rem, 3.5rem)',
        '5xl': 'clamp(3rem, 6vw + 0.5rem, 5rem)',
        mega: 'clamp(3.5rem, 8vw + 0.5rem, 7rem)'
    },
    spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px'
    },
    layout: {
        maxWidth: '1440px',
        paddingX: 'clamp(1.5rem, 5vw, 4rem)'
    },
    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    durations: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        ultraSlow: '800ms'
    },
    zLayers: {
        negative: -1,
        canvas: 0,
        base: 10,
        elevated: 20,
        dropdown: 100,
        sticky: 200,
        header: 1000,
        modal: 2000
    },
    os: {
        taskbarHeight: '48px',
        windowChromeHeight: '36px',
        terminalHeight: '400px',
        desktopGridSize: '80px'
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. APP REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
export const APP_REGISTRY = Object.freeze([
    {
        id: 'page-home',
        label: 'System Overview',
        shortLabel: 'Overview',
        icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        category: 'core',
        component: 'rebaj-page-home',
        route: '/',
        description: 'Rebaj Core system overview and flagship capabilities.',
        accentColor: 'cyan',
        isDefault: true
    },
    {
        id: 'page-ecosystem',
        label: 'Software Ecosystem',
        shortLabel: 'Ecosystem',
        icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        category: 'core',
        component: 'rebaj-page-ecosystem',
        route: '/ecosystem',
        description: 'Standalone utilities engineered for absolute privacy.',
        accentColor: 'violet'
    },
    {
        id: 'page-gamelab',
        label: 'Game Architecture Lab',
        shortLabel: 'Game Lab',
        icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
        category: 'game',
        component: 'rebaj-page-gamelab',
        route: '/gamelab',
        description: 'Translating undergraduate coursework into functional engine architecture.',
        accentColor: 'cyan'
    },
    {
        id: 'page-ai',
        label: 'Local Inference Lab',
        shortLabel: 'Local AI',
        icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
        category: 'lab',
        component: 'rebaj-page-ai',
        route: '/ai',
        description: 'Evaluating multi-parameter quantization on consumer hardware.',
        accentColor: 'emerald'
    },
    {
        id: 'page-manifest',
        label: 'Distribution Manifest',
        shortLabel: 'Manifest',
        icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
        category: 'core',
        component: 'rebaj-page-manifest',
        route: '/manifest',
        description: 'Live rendering of the central distribution JSON.',
        accentColor: 'cyan'
    },
    {
        id: 'page-about',
        label: 'Developer Profile',
        shortLabel: 'Developer',
        icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        category: 'core',
        component: 'rebaj-page-about',
        route: '/about',
        description: 'Yazan Jaber (Rebaj) — System Operator',
        accentColor: 'rose'
    },
    {
        id: 'page-os-shell',
        label: 'OS Shell UI',
        shortLabel: 'Desktop',
        icon: 'M4 4h16v16H4z',
        category: 'system',
        component: 'rebaj-page-os-shell',
        route: '/desktop',
        description: 'Interactive graphical desktop environment.',
        accentColor: 'cyan'
    },
    {
        id: 'page-terminal',
        label: 'Terminal Emulator',
        shortLabel: 'Terminal',
        icon: 'M4 17l6-6-6-6M12 19h8',
        category: 'system',
        component: 'rebaj-page-terminal',
        route: '/cli',
        description: 'System command line interface.',
        accentColor: 'emerald'
    },
    {
        id: 'page-inference-hub',
        label: 'Inference Hub Telemetry',
        shortLabel: 'Telemetry',
        icon: 'M18 20V10M12 20V4M6 20v-6',
        category: 'lab',
        component: 'rebaj-page-inference-hub',
        route: '/telemetry',
        description: 'Real-time hardware performance metrics and model utilization.',
        accentColor: 'emerald'
    },
    {
        id: 'page-lore',
        label: 'Lore Engine',
        shortLabel: 'Lore',
        icon: 'M3 3h18v18H3z',
        category: 'lore',
        component: 'rebaj-page-lore',
        route: '/lore',
        description: 'Interactive graph mapping the history of the Rebaj Core project.',
        accentColor: 'violet'
    },
    {
        id: 'page-network-map',
        label: 'P2P Network Topology',
        shortLabel: 'Network Map',
        icon: 'M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        category: 'lab',
        component: 'rebaj-page-network-map',
        route: '/network',
        description: 'Real-time visualization of local network traffic routes.',
        accentColor: 'cyan'
    },
    {
        id: 'page-guardian-bot',
        label: 'Guardian Bot Detail',
        shortLabel: 'Guardian',
        icon: 'M12 2l9 4v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V6l9-4z',
        category: 'utility',
        component: 'rebaj-page-guardian-bot',
        route: '/app/guardian-bot',
        description: 'Details for Guardian Bot utility.',
        accentColor: 'cyan'
    },
    {
        id: 'page-entropy-engine',
        label: 'Entropy Engine Detail',
        shortLabel: 'Entropy',
        icon: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
        category: 'utility',
        component: 'rebaj-page-entropy-engine',
        route: '/app/entropy-engine',
        description: 'Details for Entropy Engine utility.',
        accentColor: 'violet'
    },
    {
        id: 'page-dubdetect',
        label: 'DubDetect Detail',
        shortLabel: 'DubDetect',
        icon: 'M12 1v22M17 5v14M7 5v14',
        category: 'utility',
        component: 'rebaj-page-dubdetect',
        route: '/app/dubdetect',
        description: 'Details for DubDetect utility.',
        accentColor: 'violet'
    },
    {
        id: 'page-converter-pro',
        label: 'Universal Converter Detail',
        shortLabel: 'Converter',
        icon: 'M8 7h12M16 3l4 4-4 4M16 17H4M8 21l-4-4 4-4',
        category: 'utility',
        component: 'rebaj-page-converter-pro',
        route: '/app/converter-pro',
        description: 'Details for Universal Converter Pro.',
        accentColor: 'emerald'
    },
    {
        id: 'page-diag-tool',
        label: 'Diagnostic Tool Detail',
        shortLabel: 'DiagTool',
        icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
        category: 'utility',
        component: 'rebaj-page-diag-tool',
        route: '/app/diag-tool',
        description: 'Details for Computer Diagnostic Tool.',
        accentColor: 'violet'
    },
    {
        id: 'page-calibration',
        label: 'Calibration Protocol Detail',
        shortLabel: 'Calibration',
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        category: 'utility',
        component: 'rebaj-page-calibration',
        route: '/app/calibration',
        description: 'Details for Calibration Protocol utility.',
        accentColor: 'cyan'
    },
    {
        id: 'page-media-os',
        label: 'Universal Media OS Concept',
        shortLabel: 'Media OS',
        icon: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        category: 'utility',
        component: 'rebaj-page-media-os',
        route: '/app/media-os',
        description: 'Details for the Universal Media OS concept.',
        accentColor: 'cyan'
    },
    {
        id: 'page-oud-lab',
        label: 'Aural Engineering Lab',
        shortLabel: 'Oud Lab',
        icon: 'M9 18V5l12-2v13M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
        category: 'lore',
        component: 'rebaj-page-oud-lab',
        route: '/oud',
        description: 'Exploring the intersection of musical training and game feel.',
        accentColor: 'rose'
    },
    {
        id: 'page-hardware-bench',
        label: 'Hardware Benchmarking',
        shortLabel: 'Benchmarking',
        icon: 'M2 12h4l2-3 4 6 2-3h4',
        category: 'lab',
        component: 'rebaj-page-hardware-bench',
        route: '/benchmarks',
        description: 'Detailed stress test results for the workstation.',
        accentColor: 'emerald'
    },
    {
        id: 'page-privacy-manifesto',
        label: 'Privacy Manifesto',
        shortLabel: 'Manifesto',
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        category: 'lore',
        component: 'rebaj-page-privacy-manifesto',
        route: '/manifesto',
        description: 'Core philosophies driving the Rebaj Core development.',
        accentColor: 'violet'
    },
    {
        id: 'page-changelog',
        label: 'System Changelog',
        shortLabel: 'Changelog',
        icon: 'M4 6h16M4 12h16M4 18h7',
        category: 'system',
        component: 'rebaj-page-changelog',
        route: '/changelog',
        description: 'Update history and versioning for Rebaj Core.',
        accentColor: 'cyan'
    }
]);

// ─────────────────────────────────────────────────────────────────────────────
// 3. SOFTWARE MANIFEST
// ─────────────────────────────────────────────────────────────────────────────
export const SOFTWARE_MANIFEST = Object.freeze([
    {
        id: 'app-guardian-bot',
        name: 'Guardian Bot',
        category: 'Gaming Engine Utility',
        version: 'v1.4.0',
        buildState: 'Stable',
        description: 'Gaming Engine Utility for bot routing.',
        longDescription: 'Live executables handling supplementary logic, bot routing, and network calibration.',
        techStack: ['C#', '.NET 8', 'WPF'],
        features: ['Automated Routing', 'Calibration Hooks', 'Offline mode'],
        downloadUrl: 'https://github.com/tntcool48-dot/Guardian-Bot/releases/download/v1.4/guardian_pro.exe',
        repoUrl: 'https://github.com/tntcool48-dot/Guardian-Bot',
        changelogUrl: '',
        fileSize: '4.2 MB',
        releaseDate: '2025-10-14',
        platform: 'Windows',
        icon: 'M12 2l9 4v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V6l9-4z'
    },
    {
        id: 'app-entropy-engine',
        name: 'The Entropy Engine',
        category: 'Logic / Workflow',
        version: 'v1.0.0',
        buildState: 'Stable',
        description: 'Strict algorithmic state manager and execution core.',
        longDescription: 'Engineered to manage complex algorithmic states without cross-contamination. Handles strict logical operations.',
        techStack: ['C#', '.NET 8'],
        features: ['Algorithmic isolation', 'State Management', 'Offline operation'],
        downloadUrl: 'https://github.com/tntcool48-dot/EntropyEngine/releases/download/v1.0/EntropyEngine.zip',
        repoUrl: 'https://github.com/tntcool48-dot/EntropyEngine',
        changelogUrl: 'https://raw.githubusercontent.com/tntcool48-dot/EntropyEngine/main/description.txt',
        fileSize: '2.1 MB',
        releaseDate: '2025-11-20',
        platform: 'Windows',
        icon: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'
    },
    {
        id: 'app-dubdetect',
        name: 'DubDetect',
        category: 'Audio Processing',
        version: 'v1.0.0',
        buildState: 'Stable',
        description: 'Advanced offline audio detection and structural processing workflow.',
        longDescription: 'Built specifically for complex media pipelines, ensuring zero payload transmission to external servers.',
        techStack: ['Python', 'WPF', 'C#'],
        features: ['Zero payload transmission', 'Structural processing', 'Offline mode'],
        downloadUrl: 'https://github.com/tntcool48-dot/DubDetect/releases/download/v1.0/DubDetect.exe',
        repoUrl: 'https://github.com/tntcool48-dot/DubDetect',
        changelogUrl: '',
        fileSize: '18.5 MB',
        releaseDate: '2026-01-05',
        platform: 'Windows',
        icon: 'M12 1v22M17 5v14M7 5v14'
    },
    {
        id: 'app-converter-pro',
        name: 'Universal Converter Pro',
        category: 'Data Transformation',
        version: 'v1.1.0',
        buildState: 'Stable',
        description: 'High-speed offline data transformation matrix.',
        longDescription: 'Provides a seamless, localized conversion solution, maintaining data integrity without internet access.',
        techStack: ['C#', 'WPF'],
        features: ['Format conversion', 'Data Integrity check', '100% Offline'],
        downloadUrl: 'https://github.com/tntcool48-dot/Universal-Converter-Pro/releases/download/v1.1/Universal.Converter.Pro.zip',
        repoUrl: 'https://github.com/tntcool48-dot/Universal-Converter-Pro',
        changelogUrl: 'https://raw.githubusercontent.com/tntcool48-dot/Universal-Converter-Pro/refs/heads/main/changelog.txt',
        fileSize: '8.4 MB',
        releaseDate: '2025-08-30',
        platform: 'Windows',
        icon: 'M8 7h12M16 3l4 4-4 4M16 17H4M8 21l-4-4 4-4'
    },
    {
        id: 'app-calibration',
        name: 'Calibration Protocol',
        category: 'Gaming Utility',
        version: 'v1.0.0',
        buildState: 'Stable',
        description: 'Calibration core utility for gameplay logic.',
        longDescription: 'Standalone executable for real-time adjustments and calibration of gameplay layers.',
        techStack: ['C#'],
        features: ['Logic tuning', 'Real-time adjustments'],
        downloadUrl: 'https://github.com/tntcool48-dot/calibration/releases/download/v1.0/calibration.v1.0.zip',
        repoUrl: 'https://github.com/tntcool48-dot/calibration',
        changelogUrl: '',
        fileSize: '1.2 MB',
        releaseDate: '2025-05-15',
        platform: 'Windows',
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    },
    {
        id: 'app-diag-tool',
        name: 'Computer Diagnostic Tool',
        category: 'System Health',
        version: 'v1.0.0',
        buildState: 'Stable',
        description: 'A highly optimized system health monitor.',
        longDescription: 'Designed to track real-time CPU/GPU utilization and background application resource hooks without bloating the OS registry.',
        techStack: ['C#', 'WPF'],
        features: ['Hardware monitoring', 'Resource hooks tracking', 'Registry safe'],
        downloadUrl: 'https://github.com/tntcool48-dot/Computer-Diagnostic-Tool/releases/download/v1.0.0/DiagTool.exe',
        repoUrl: 'https://github.com/tntcool48-dot/Computer-Diagnostic-Tool',
        changelogUrl: '',
        fileSize: '3.6 MB',
        releaseDate: '2026-02-12',
        platform: 'Windows',
        icon: 'M22 12h-4l-3 9L9 3l-3 9H2'
    }
]);

// ─────────────────────────────────────────────────────────────────────────────
// 4. HARDWARE MANIFEST
// ─────────────────────────────────────────────────────────────────────────────
export const HARDWARE_MANIFEST = Object.freeze({
    cpu: {
        model: 'AMD Ryzen 7 9700X',
        codename: 'Granite Ridge',
        cores: 8,
        threads: 16,
        baseClock: '3.8 GHz',
        boostClock: '5.5 GHz',
        cache: '40MB L2+L3',
        tdp: '65W',
        architecture: 'Zen 5',
        socket: 'AM5'
    },
    gpu: {
        model: 'AMD Radeon RX 7900 XT',
        chipset: 'Navi 31',
        vram: '20 GB',
        vramType: 'GDDR6',
        busWidth: '320-bit',
        baseClock: '2000 MHz',
        boostClock: '2400 MHz',
        computeUnits: 84,
        architecture: 'RDNA 3'
    },
    memory: {
        total: '32 GB',
        type: 'DDR5',
        speed: '6000 MHz',
        channels: 'Dual Channel',
        timings: 'CL30'
    },
    storage: {
        primary: {
            type: 'NVMe SSD',
            capacity: '2 TB',
            interface: 'PCIe 4.0 x4',
            readSpeed: '7300 MB/s',
            writeSpeed: '6800 MB/s'
        }
    },
    network: {
        type: 'Fiber Optic Backbone',
        speed: '600 Mbps',
        provider: 'Local Network',
        protocol: 'P2P / Direct Routing',
        latency: '< 5ms'
    },
    os: {
        name: 'Rebaj OS (Simulated)',
        version: 'v2.0.0',
        build: '2026.05'
    },
    display: {
        resolution: '2560 x 1440',
        refreshRate: '165 Hz',
        panel: 'IPS',
        hdr: 'HDR400 Supported'
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. SYSTEM CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
export const SYSTEM_CONSTANTS = Object.freeze({
    physics: {
        particleColor: 'rgba(0, 240, 255, 0.6)',
        lineColor: 'rgba(0, 240, 255, 0.15)',
        particleRadius: 1.5,
        particleSpeed: 0.3,
        connectionDistance: 120,
        repelDistance: 150,
        baseDensity: 15000,
        maxParticles: 250
    },
    animation: {
        pageFadeInDuration: 800,
        pageFadeOutDuration: 400,
        bootSequenceDuration: 3000,
        installerStepDelay: 600
    },
    performance: {
        targetFPS: 60,
        fpsWarningThreshold: 45,
        maxDOMUpdatesPerFrame: 10,
        intersectionObserverThreshold: 0.1
    },
    terminal: {
        maxHistoryLength: 100,
        maxOutputLines: 500,
        promptPrefix: 'rebaj@core:~$',
        bootMessages: [
            '[OK] Kernel loaded successfully.',
            '[OK] Hardware vectors scanned... Ryzen 7 9700X Nominal.',
            '[OK] VRAM allocation matrix initialized (20.0 GB).',
            '[OK] Mounting primary storage volumes...',
            '[OK] Fiber optic backbone detected (600Mbps).',
            '[OK] Establishing P2P secure nodes.',
            '[INFO] Entropy Engine running on subsystem thread.',
            '[INFO] Neural canvas hooked to WebGL renderer.',
            '[OK] Loading UI components and bento modules...',
            '[OK] System ready.'
        ]
    },
    osShell: {
        desktopGridColumns: 12,
        desktopGridRows: 8,
        taskbarPosition: 'bottom',
        windowSnapThreshold: 20,
        minWindowWidth: 320,
        minWindowHeight: 240
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. CLI COMMANDS
// ─────────────────────────────────────────────────────────────────────────────
export const CLI_COMMANDS = Object.freeze({
    help: { name: 'help', description: 'List available commands', usage: 'help [command]', category: 'system', handler: 'handleHelp' },
    clear: { name: 'clear', description: 'Clear terminal output', usage: 'clear', category: 'system', handler: 'handleClear' },
    ls: { name: 'ls', description: 'List directory contents', usage: 'ls', category: 'navigation', handler: 'handleLs' },
    cd: { name: 'cd', description: 'Change directory (view)', usage: 'cd <dir>', category: 'navigation', handler: 'handleCd' },
    pwd: { name: 'pwd', description: 'Print working directory', usage: 'pwd', category: 'navigation', handler: 'handlePwd' },
    cat: { name: 'cat', description: 'Print file contents', usage: 'cat <file>', category: 'utility', handler: 'handleCat' },
    whoami: { name: 'whoami', description: 'Print user identity', usage: 'whoami', category: 'system', handler: 'handleWhoami' },
    neofetch: { name: 'neofetch', description: 'Display system information', usage: 'neofetch', category: 'easter-egg', handler: 'handleNeofetch' },
    date: { name: 'date', description: 'Print current system date', usage: 'date', category: 'system', handler: 'handleDate' },
    uptime: { name: 'uptime', description: 'Show system uptime', usage: 'uptime', category: 'system', handler: 'handleUptime' },
    theme: { name: 'theme', description: 'Switch system accent color', usage: 'theme <cyan|violet|emerald|rose>', category: 'utility', handler: 'handleTheme' },
    matrix: { name: 'matrix', description: 'Initialize digital rain', usage: 'matrix', category: 'easter-egg', handler: 'handleMatrix' },
    hack: { name: 'hack', description: 'Simulate breach sequence', usage: 'hack', category: 'easter-egg', handler: 'handleHack' },
    play: { name: 'play', description: 'Initialize audio sequence', usage: 'play <oud>', category: 'easter-egg', handler: 'handlePlay' },
    echo: { name: 'echo', description: 'Print arguments to standard output', usage: 'echo [text]', category: 'utility', handler: 'handleEcho' },
    history: { name: 'history', description: 'Show command history', usage: 'history', category: 'system', handler: 'handleHistory' },
    exit: { name: 'exit', description: 'Close terminal session', usage: 'exit', category: 'system', handler: 'handleExit' },
    about: { name: 'about', description: 'Show developer profile', usage: 'about', category: 'navigation', handler: 'handleAbout' },
    version: { name: 'version', description: 'Show OS version', usage: 'version', category: 'system', handler: 'handleVersion' },
    manifest: { name: 'manifest', description: 'Print software manifest', usage: 'manifest', category: 'system', handler: 'handleManifest' },
    hardware: { name: 'hardware', description: 'Show hardware specifications', usage: 'hardware', category: 'system', handler: 'handleHardware' },
    gpu: { name: 'gpu', description: 'Show GPU details', usage: 'gpu', category: 'system', handler: 'handleGpu' },
    cpu: { name: 'cpu', description: 'Show CPU details', usage: 'cpu', category: 'system', handler: 'handleCpu' },
    ram: { name: 'ram', description: 'Show memory details', usage: 'ram', category: 'system', handler: 'handleRam' },
    disk: { name: 'disk', description: 'Show storage details', usage: 'disk', category: 'system', handler: 'handleDisk' },
    network: { name: 'network', description: 'Show network status', usage: 'network', category: 'system', handler: 'handleNetwork' },
    ping: { name: 'ping', description: 'Send ICMP echo request', usage: 'ping <host>', category: 'utility', handler: 'handlePing' },
    benchmark: { name: 'benchmark', description: 'Run system performance test', usage: 'benchmark', category: 'utility', handler: 'handleBenchmark' },
    open: { name: 'open', description: 'Open a graphical app/view', usage: 'open <app>', category: 'navigation', handler: 'handleOpen' },
    close: { name: 'close', description: 'Close an open window', usage: 'close <app>', category: 'navigation', handler: 'handleClose' },
    minimize: { name: 'minimize', description: 'Minimize an open window', usage: 'minimize <app>', category: 'navigation', handler: 'handleMinimize' },
    lore: { name: 'lore', description: 'Launch lore engine', usage: 'lore', category: 'navigation', handler: 'handleLore' },
    changelog: { name: 'changelog', description: 'View system updates', usage: 'changelog', category: 'system', handler: 'handleChangelog' },
    credits: { name: 'credits', description: 'View system credits', usage: 'credits', category: 'system', handler: 'handleCredits' }
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. TELEMETRY PRESETS
// ─────────────────────────────────────────────────────────────────────────────
export const TELEMETRY_PRESETS = Object.freeze({
    cpuUsage: { min: 2, max: 15, updateInterval: 1000, jitter: 3 },
    gpuUsage: { min: 1, max: 8, updateInterval: 1000, jitter: 2 },
    vramUsage: { min: 3200, max: 4800, total: 20480, updateInterval: 2000 },
    ramUsage: { min: 8000, max: 12000, total: 32768, updateInterval: 2000 },
    networkThroughput: { min: 0, max: 50, unit: 'Mbps', updateInterval: 500 },
    temperatures: { cpuMin: 35, cpuMax: 50, gpuMin: 40, gpuMax: 55 },
    inferenceMetrics: {
        models: [
            { name: 'DeepSeek-R1 14B', parameterCount: '14B', quantization: 'Q5_K_M', tokensPerSecond: 35.2, contextWindow: '8K', vramRequired: '11 GB' },
            { name: 'Qwen2.5-Coder 32B', parameterCount: '32B', quantization: 'Q4_K_M', tokensPerSecond: 24.5, contextWindow: '32K', vramRequired: '19.5 GB' },
            { name: 'GLM-4 9B', parameterCount: '9B', quantization: 'Q8_0', tokensPerSecond: 42.1, contextWindow: '128K', vramRequired: '9.8 GB' },
            { name: 'Llama3.1 8B', parameterCount: '8B', quantization: 'Q6_K', tokensPerSecond: 55.4, contextWindow: '128K', vramRequired: '7.2 GB' },
            { name: 'Mistral 7B', parameterCount: '7B', quantization: 'Q5_K_S', tokensPerSecond: 60.1, contextWindow: '8K', vramRequired: '5.5 GB' },
            { name: 'Phi-3 Mini', parameterCount: '3.8B', quantization: 'Q4_K_M', tokensPerSecond: 85.3, contextWindow: '4K', vramRequired: '2.8 GB' },
            { name: 'CodeGemma 7B', parameterCount: '7B', quantization: 'Q5_K_M', tokensPerSecond: 58.7, contextWindow: '8K', vramRequired: '5.8 GB' }
        ]
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. LORE GRAPH DATA
// ─────────────────────────────────────────────────────────────────────────────
export const LORE_GRAPH_DATA = Object.freeze({
    nodes: [
        { id: 'n1', label: 'Yarmouk University', type: 'education', year: 2024, description: 'Enrolled in Digital Reality major.', category: 'academic' },
        { id: 'n2', label: 'Digital Reality Major', type: 'education', year: 2024, description: 'Focus on VR/AR and Game Development.', category: 'academic' },
        { id: 'n3', label: 'Guardian Bot', type: 'project', year: 2025, description: 'Automated routing logic for game engines.', category: 'software' },
        { id: 'n4', label: 'Entropy Engine', type: 'project', year: 2025, description: 'Algorithmic state manager.', category: 'software' },
        { id: 'n5', label: 'DubDetect', type: 'project', year: 2026, description: 'Offline audio detection workflow.', category: 'software' },
        { id: 'n6', label: 'Universal Converter Pro', type: 'project', year: 2025, description: 'Offline data transformation tool.', category: 'software' },
        { id: 'n7', label: 'Calibration Protocol', type: 'project', year: 2025, description: 'Game logic calibration.', category: 'software' },
        { id: 'n8', label: 'Diagnostic Tool', type: 'project', year: 2026, description: 'System health monitor.', category: 'software' },
        { id: 'n9', label: 'Ryzen 7 9700X', type: 'milestone', year: 2025, description: 'Upgraded processing core for heavy local compute.', category: 'hardware' },
        { id: 'n10', label: 'RX 7900 XT', type: 'milestone', year: 2025, description: '20GB VRAM enabling heavy local AI inference.', category: 'hardware' },
        { id: 'n11', label: 'Oud Player', type: 'music', year: 2022, description: 'Trained musical ear for audio programming.', category: 'personal' },
        { id: 'n12', label: 'Local AI Inference', type: 'skill', year: 2025, description: 'Running LLMs natively to preserve privacy.', category: 'personal' },
        { id: 'n13', label: 'Fiber Optic', type: 'milestone', year: 2025, description: '600Mbps local backbone installed.', category: 'hardware' },
        { id: 'n14', label: 'P2P Networking', type: 'skill', year: 2025, description: 'Bypassing CGNAT for direct connections.', category: 'software' },
        { id: 'n15', label: 'Rebaj Core v1', type: 'project', year: 2025, description: 'Initial portfolio website.', category: 'software' },
        { id: 'n16', label: 'Rebaj Core v2', type: 'project', year: 2026, description: 'OS-level web architecture overhaul.', category: 'software' },
        { id: 'n17', label: 'Unity Engine', type: 'skill', year: 2024, description: '2D/3D physics and rendering logic.', category: 'software' },
        { id: 'n18', label: 'C# / WPF', type: 'skill', year: 2024, description: 'Native Windows desktop application development.', category: 'software' },
        { id: 'n19', label: 'Python', type: 'skill', year: 2025, description: 'Adopted for machine learning inference scripts.', category: 'software' },
        { id: 'n20', label: 'Privacy Philosophy', type: 'milestone', year: 2024, description: 'Decision to reject cloud-dependent architectures.', category: 'personal' },
        { id: 'n21', label: 'Geometry Dash', type: 'music', year: 2022, description: 'High-level reflex training.', category: 'personal' },
        { id: 'n22', label: 'CS2', type: 'music', year: 2023, description: 'Competitive reflex environment.', category: 'personal' },
        { id: 'n23', label: 'Universal Media OS', type: 'project', year: 2025, description: 'WPF media aggregation tool.', category: 'software' },
        { id: 'n24', label: 'Web Components', type: 'skill', year: 2026, description: 'Native browser component architecture.', category: 'software' },
        { id: 'n25', label: 'Neural Canvas', type: 'project', year: 2026, description: 'WebGL interactive background.', category: 'software' }
    ],
    edges: [
        { source: 'n1', target: 'n2', label: 'Majors in', strength: 1.0 },
        { source: 'n2', target: 'n17', label: 'Uses', strength: 0.8 },
        { source: 'n17', target: 'n3', label: 'Built', strength: 0.9 },
        { source: 'n17', target: 'n7', label: 'Built', strength: 0.8 },
        { source: 'n18', target: 'n4', label: 'Built', strength: 0.9 },
        { source: 'n18', target: 'n6', label: 'Built', strength: 0.8 },
        { source: 'n18', target: 'n8', label: 'Built', strength: 0.8 },
        { source: 'n18', target: 'n23', label: 'Built', strength: 0.7 },
        { source: 'n19', target: 'n5', label: 'Built', strength: 0.8 },
        { source: 'n9', target: 'n8', label: 'Monitored by', strength: 0.6 },
        { source: 'n10', target: 'n12', label: 'Enables', strength: 1.0 },
        { source: 'n10', target: 'n8', label: 'Monitored by', strength: 0.6 },
        { source: 'n11', target: 'n5', label: 'Inspired', strength: 0.7 },
        { source: 'n21', target: 'n11', label: 'Shared Focus', strength: 0.5 },
        { source: 'n22', target: 'n21', label: 'Reflex Training', strength: 0.5 },
        { source: 'n13', target: 'n14', label: 'Backbone', strength: 0.9 },
        { source: 'n20', target: 'n12', label: 'Drives', strength: 0.9 },
        { source: 'n20', target: 'n18', label: 'Requires Offline', strength: 0.8 },
        { source: 'n15', target: 'n16', label: 'Evolved into', strength: 1.0 },
        { source: 'n24', target: 'n16', label: 'Powers', strength: 0.9 },
        { source: 'n25', target: 'n16', label: 'Visuals', strength: 0.7 },
        { source: 'n1', target: 'n16', label: 'Term Project', strength: 0.8 },
        { source: 'n12', target: 'n19', label: 'Implemented via', strength: 0.8 },
        { source: 'n14', target: 'n3', label: 'Enhances', strength: 0.7 },
        { source: 'n20', target: 'n16', label: 'Architectural Base', strength: 1.0 }
    ]
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. OS DESKTOP APPS
// ─────────────────────────────────────────────────────────────────────────────
export const OS_DESKTOP_APPS = Object.freeze([
    { id: 'app-home', label: 'Overview', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', route: '/', category: 'core', position: { row: 1, col: 1 } },
    { id: 'app-terminal', label: 'Terminal', icon: 'M4 17l6-6-6-6M12 19h8', route: '/cli', category: 'system', position: { row: 1, col: 2 } },
    { id: 'app-ecosystem', label: 'Ecosystem', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', route: '/ecosystem', category: 'core', position: { row: 2, col: 1 } },
    { id: 'app-gamelab', label: 'Game Lab', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', route: '/gamelab', category: 'game', position: { row: 2, col: 2 } },
    { id: 'app-ai', label: 'Local AI', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', route: '/ai', category: 'lab', position: { row: 3, col: 1 } },
    { id: 'app-manifest', label: 'Manifest', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', route: '/manifest', category: 'core', position: { row: 3, col: 2 } },
    { id: 'app-about', label: 'Developer', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', route: '/about', category: 'core', position: { row: 4, col: 1 } },
    { id: 'app-lore', label: 'Lore Engine', icon: 'M3 3h18v18H3z', route: '/lore', category: 'lore', position: { row: 4, col: 2 } },
    { id: 'app-telemetry', label: 'Telemetry', icon: 'M18 20V10M12 20V4M6 20v-6', route: '/telemetry', category: 'lab', position: { row: 5, col: 1 } }
]);
