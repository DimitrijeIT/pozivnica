/**
 * Wedding Invitation - Јелена & Димитрије
 * Minimal Design with Font Selection
 */

(function() {
    'use strict';

    // DOM Elements
    const envelope = document.getElementById('envelope');
    const envelopeSection = document.getElementById('envelope-section');
    const invitationSection = document.getElementById('invitation-section');
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeToggle = document.getElementById('theme-toggle');
    const fontBtns = document.querySelectorAll('.font-btn');

    // State
    let isOpened = false;
    let isPanelOpen = false;

    // Default font
    const DEFAULT_FONT = 'cormorant-infant';

    /**
     * Initialize the application
     */
    function init() {
        // Load saved font or use default
        const savedFont = localStorage.getItem('wedding-font') || DEFAULT_FONT;
        setFont(savedFont);

        // Set up event listeners
        setupEventListeners();

        // Check for direct invitation link
        if (window.location.hash === '#invitation') {
            setTimeout(skipToInvitation, 100);
        }
    }

    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Envelope click handler
        if (envelope) {
            envelope.addEventListener('click', handleEnvelopeClick);
            envelope.addEventListener('touchend', handleEnvelopeClick);

            // Keyboard accessibility
            envelope.setAttribute('tabindex', '0');
            envelope.setAttribute('role', 'button');
            envelope.setAttribute('aria-label', 'Отворите позивницу');

            envelope.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleEnvelopeClick();
                }
            });
        }

        // Panel toggle button
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePanel();
            });
        }

        // Font switcher buttons
        fontBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const font = btn.getAttribute('data-font');
                setFont(font);
                localStorage.setItem('wedding-font', font);
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (isPanelOpen && themeSwitcher && !themeSwitcher.contains(e.target)) {
                closePanel();
            }
        });

        // Close panel on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPanelOpen) {
                closePanel();
            }
        });
    }

    /**
     * Toggle panel visibility
     */
    function togglePanel() {
        if (isPanelOpen) {
            closePanel();
        } else {
            openPanel();
        }
    }

    /**
     * Open panel
     */
    function openPanel() {
        isPanelOpen = true;
        themeSwitcher.classList.add('open');
        themeToggle.setAttribute('aria-expanded', 'true');
    }

    /**
     * Close panel
     */
    function closePanel() {
        isPanelOpen = false;
        themeSwitcher.classList.remove('open');
        themeToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Handle envelope click/tap
     */
    function handleEnvelopeClick(e) {
        if (e) e.preventDefault();
        if (isOpened) return;
        isOpened = true;

        // Add open class to trigger CSS animations
        envelope.classList.add('open');

        // After envelope flap opens, start the smooth transition
        setTimeout(() => {
            showInvitation();
        }, 1200);
    }

    /**
     * Show the invitation section
     */
    function showInvitation() {
        // Hide envelope section
        envelopeSection.classList.add('hidden');

        // Show invitation section
        invitationSection.classList.add('visible');

        // Scroll to top after envelope collapse transition completes (1.2s)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1300);
    }

    /**
     * Set the font for names
     * @param {string} font - Font name
     */
    function setFont(font) {
        // Set font attribute on body
        document.body.setAttribute('data-font', font);

        // Update active button state
        fontBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-font') === font;
            btn.classList.toggle('active', isActive);
        });
    }

    /**
     * Reset to envelope view (for testing/debugging)
     */
    function reset() {
        isOpened = false;
        envelope.classList.remove('open');
        envelopeSection.classList.remove('hidden');
        invitationSection.classList.remove('visible');
    }

    /**
     * Skip envelope animation and go directly to invitation
     */
    function skipToInvitation() {
        isOpened = true;
        envelopeSection.classList.add('hidden');
        invitationSection.classList.add('visible');
    }

    // Expose functions for debugging
    window.resetInvitation = reset;
    window.skipToInvitation = skipToInvitation;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
