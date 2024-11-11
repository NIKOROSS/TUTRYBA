import emailjs from '@emailjs/browser';

emailjs.init("Gi6LpNMvHwhn5Rl70"); // Ваш публичный ключ

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        emailjs.send("service_529r781", "template_contact", {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(function(response) {
            alert('Сообщение успешно отправлено!');
            contactForm.reset();
        }, function(error) {
            alert('Ошибка при отправке сообщения: ' + JSON.stringify(error));
        });
    });

    // Шторка Toggle
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.style.width = sidebar.style.width === '0px' || sidebar.style.width === '' ? '250px' : '0px';
    });
});
