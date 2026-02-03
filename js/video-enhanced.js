/**
 * Enhanced Video Controls
 * Autoplay muted in hero, modal with audio on click
 */
document.addEventListener('DOMContentLoaded', () => {
    const heroVideoWrapper = document.getElementById('heroVideoWrapper');
    const heroVideo = document.getElementById('heroVideo');
    const expandBtn = document.getElementById('expandVideo');
    const videoModal = document.getElementById('videoModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.getElementById('modalClose');

    if (!heroVideoWrapper || !videoModal) return;

    // Click to expand and play with audio
    const openModal = () => {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (modalVideo) {
            modalVideo.currentTime = 0;
            modalVideo.muted = false;
            modalVideo.play().catch(err => console.log('Playback prevented:', err));
        }

        // Pause hero video
        if (heroVideo) {
            heroVideo.pause();
        }
    };

    const closeModal = () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';

        if (modalVideo) {
            modalVideo.pause();
        }

        // Resume hero video
        if (heroVideo) {
            heroVideo.play().catch(() => { });
        }
    };

    // Event listeners
    heroVideoWrapper?.addEventListener('click', openModal);
    expandBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
    });

    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Ensure hero video plays on load
    if (heroVideo) {
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented, show play button
                console.log('Autoplay prevented - user interaction required');
            });
        }
    }
});
