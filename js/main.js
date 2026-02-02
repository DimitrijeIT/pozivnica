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

    // RSVP date: April 15, 2026 at 16:00 (Serbia time, UTC+2)
    const rsvpDate = new Date('2026-04-15T16:00:00+02:00');

    /**
     * Initialize the application
     */
    function init() {
        // Set up event listeners
        setupEventListeners();

        // Start countdown timer
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Check for direct invitation link
        if (window.location.hash === '#invitation') {
            setTimeout(skipToInvitation, 100);
        }
    }

    /**
     * Update countdown timer
     */
    function updateCountdown() {
        const now = new Date();
        const diff = rsvpDate - now;

        if (diff <= 0) {
            // Wedding day has arrived
            document.getElementById('countdown-days').textContent = '0';
            document.getElementById('countdown-hours').textContent = '0';
            document.getElementById('countdown-minutes').textContent = '0';
            document.getElementById('countdown-seconds').textContent = '0';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    }

    // =====================
    // RSVP Form
    // =====================
    // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyMQzI1RBnxSR1jCS9l7VoRNhwNRbkTlisiVT8fNH8lWu2qClyq-pTLNtyqMvUJ2NHX/exec';

    const rsvpForm = document.getElementById('rsvp-form');
    const formStatus = document.getElementById('form-status');
    const guestsGroup = document.getElementById('guests-group');
    const submitBtn = document.getElementById('rsvp-submit');

    if (rsvpForm) {
        // Toggle guests field based on attendance
        rsvpForm.addEventListener('change', function(e) {
            if (e.target.name === 'attending') {
                if (e.target.value === 'Не') {
                    guestsGroup.classList.add('hidden-field');
                } else {
                    guestsGroup.classList.remove('hidden-field');
                }
            }
        });

        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Validate
            var name = rsvpForm.querySelector('[name="name"]').value.trim();
            var attending = rsvpForm.querySelector('[name="attending"]:checked');

            if (!name) {
                showFormError('Молимо унесите Ваше име.');
                rsvpForm.querySelector('[name="name"]').classList.add('error');
                return;
            }
            rsvpForm.querySelector('[name="name"]').classList.remove('error');

            if (!attending) {
                showFormError('Молимо означите да ли долазите.');
                return;
            }

            var guests = attending.value === 'Да' ? rsvpForm.querySelector('[name="guests"]').value : '0';
            var message = rsvpForm.querySelector('[name="message"]').value.trim();

            // Disable button
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Шаљем...';

            var data = {
                name: name,
                attending: attending.value,
                guests: guests,
                message: message
            };

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function() {
                formStatus.textContent = 'Хвала Вам! Ваша потврда је примљена.';
                formStatus.className = 'form-status success';
                rsvpForm.reset();
                guestsGroup.classList.remove('hidden-field');
            })
            .catch(function() {
                showFormError('Дошло је до грешке. Покушајте поново или нас контактирајте на Viber.');
            })
            .finally(function() {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg> Пошаљи потврду';
            });
        });
    }

    function showFormError(msg) {
        formStatus.textContent = msg;
        formStatus.className = 'form-status error';
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg> Пошаљи потврду';
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
