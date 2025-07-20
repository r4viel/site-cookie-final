document.getElementById('toggleButton').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

let slideIndex = 0;

function iniciarCarrossel() {
   
    const container = document.querySelector('.carrossel-container');
    if (!container) {
        return;
    }

    mostrarSlide(slideIndex);
}

function mudarSlide(n) {
    mostrarSlide(slideIndex += n);
}

function mostrarSlide(n) {
    let slides = document.querySelectorAll(".carrossel-slide img");
    let slideContainer = document.querySelector(".carrossel-slide");

    if (slides.length === 0) {
        return;
    }
   
    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = (Math.ceil(slides.length / 2) - 1) * 2;
    }

    let offset = -slideIndex * 50;
    slideContainer.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', iniciarCarrossel);
