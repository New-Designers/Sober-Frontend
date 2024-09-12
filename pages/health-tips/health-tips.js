document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.tip-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const link = card.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
});
