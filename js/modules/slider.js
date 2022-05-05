// SLIDER V.2

function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
    prevArrow = document.querySelector('.offer__slider-prev'),
    nextArrow = document.querySelector('.offer__slider-next'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesInner = document.querySelector('.offer__slide-inner'),
    sliderOffer = document.querySelector('.offer__slider');

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {                                           // ноль перед total если слайдов меньше 10
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;
}    

addZeroCurrentSlide();                                              // ноль перед цифрой current если слайдов меньше 10


slidesInner.style.width = 100 * slides.length + '%';
slidesInner.style.display = 'flex';
slidesWrapper.style.overflow = 'hidden';
slidesInner.style.transition = '.5s all';

slides.forEach(item => {
    item.style.width = width;
});


sliderOffer.style.position = 'relative';                                   // создаем обертку пагинации

const indicators = document.createElement('ol'),
    dots = [];

indicators.classList.add('pagination-indicators');

sliderOffer.append(indicators);

for (let i = 0; i < slides.length; i++) {                                   // создаем пагинацию (точки)
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    indicators.append(dot);
    if (i == 0) {                                                          // первый дот - активный 
        dot.classList.add('active-dot');
    }
    dots.push(dot);
}


nextArrow.addEventListener('click', () => {
    if (offset == deleteNoDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNoDigits(width);
    }

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    addZeroCurrentSlide();                                          // ноль перед цифрой current если слайдов меньше 10 

    dotActive();                                                    // активный дот при перелистывании стрелкой
});

prevArrow.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNoDigits(width) * (slides.length - 1);

    } else {
        offset -= deleteNoDigits(width);
    }

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    addZeroCurrentSlide();                                           // ноль перед цифрой current если слайдов меньше 10

    dotActive();                                                     // активный дот при перелистывании стрелкой
});

dots.forEach(item  => {                                              // реализация клика по точкам     
    item.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;

        offset = deleteNoDigits(width) * (slideTo - 1);
        slidesInner.style.transform = `translateX(-${offset}px)`;


    addZeroCurrentSlide();                                           // ноль перед цифрой current если слайдов меньше 10

    dotActive();                                                     // активный дот при клике на дот
    });
});

function dotActive() {                                                // ф-я добавления класса активности доту
    dots.forEach(item => item.classList.remove('active-dot'));
    dots[slideIndex - 1].classList.add('active-dot');
}
function addZeroCurrentSlide() {                                  // ф-я добавление нуля перед цифрой в счетчик current, если 
    if (slideIndex < 10) {                                         // слайдов меньше 10
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }
}

function deleteNoDigits(str) {                                  // ф-я удаления НЕ цифр из строки(напр."500px" => 500)
        return Math.round(+str.replace(/[^\d.]/g, ''));
    }
}
export default slider;