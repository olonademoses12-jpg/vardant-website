const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();

        if (!name) {
            contactFeedback.textContent = 'Please enter your name.';
            return;
        }

        contactFeedback.textContent =
            `Thank you, ${name}! Your message has been received on this page.`;

        contactForm.reset();
    });
}