
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();

    contactFeedback.textContent =
        `Thank you, ${name}! Your message has been received on this page.`;

    contactForm.reset();
});
