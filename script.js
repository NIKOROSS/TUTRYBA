import emailjs from '@emailjs/browser';

emailjs.init("Gi6LpNMvHwhn5Rl70"); // Ваш публичный ключ

document.addEventListener('DOMContentLoaded', () => {
    // --- Слайдер ---
    let slideIndex = 0;

    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    const showSlides = () => {
        slideIndex++;
        if (slideIndex >= totalSlides) {
            slideIndex = 0; // Возвращаемся к первому слайду
        }
        const offset = -(slideIndex * 100) + '%'; // Сдвигаем на 100% за каждый слайд
        slides.style.transform = `translateX(${offset})`; // Применяем сдвиг
    };

    setInterval(showSlides, 3000); // Прокрутка каждые 3 секунды

    // --- Корзина и EmailJS ---
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const orderDetailsInput = document.getElementById('order-details');
    const totalAmountInput = document.getElementById('total-amount');
    const fromNameInput = document.getElementById('from-name');
    let total = 0;

    const updateTotal = (amount) => {
        total += amount;
        totalElement.textContent = total;
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const name = product.getAttribute('data-name');
            const price = parseInt(product.getAttribute('data-price'));

            const li = document.createElement('li');
            li.textContent = `${name} - ${price} руб.`;
            cartItems.appendChild(li);

            updateTotal(price);
        });
    });

    document.getElementById('order-form').addEventListener('submit', (event) => {
        event.preventDefault();

        let orderDetails = `Товары:\n`;
        cartItems.querySelectorAll('li').forEach(item => {
            orderDetails += item.textContent + '\n';
        });

        orderDetailsInput.value = orderDetails;
        totalAmountInput.value = total;

        emailjs.send("service_529r781", "template_v194cll", {
            order_details: orderDetails,
            total_amount: total,
            from_name: fromNameInput.value,
            to_name: "Your Store Team"
        })
        .then(function(response) {
            alert('Заказ успешно отправлен!');
            cartItems.innerHTML = '';
            totalElement.textContent = '0';
            total = 0;
        }, function(error) {
            alert('Ошибка при отправке заказа: ' + JSON.stringify(error));
        });
    });

    // --- Управление шторкой ---
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });
});
