/**
 * Wedding Invitation - Јелена & Димитрије
 * Minimal Design
 */

(function() {
    'use strict';

    // DOM Elements
    const envelope = document.getElementById('envelope');
    const envelopeSection = document.getElementById('envelope-section');
    const invitationSection = document.getElementById('invitation-section');

    // State
    let isOpened = false;

    /**
     * Initialize the application
     */
    function init() {
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
