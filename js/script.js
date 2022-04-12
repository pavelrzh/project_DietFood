document.addEventListener('DOMContentLoaded', function() {
    
    // TABS

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach (event => {
            event.classList.add('hide');
            event.classList.remove('show', 'fade');
        });
        tabs.forEach (event => {
            event.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //TIMER 

    // const deadLine = new Date(); // присваиваем переменной текущую дату
    // deadLine.setDate(deadLine.getDate() + 3); // устанавливаем дату на плюс 3 дня. Сбрасывается каждый раз при обновлении страницы


    /* Проверка текущей даты на превышение дедлайна (вcтавить в let t=checkZero(Date.parse.....)*/

    // function checkZero(num) {
    //     if (num < 0) {
    //         num = 0;
    //     } return num;
    // }

    const deadLine = '2022-12-31';

    function getTimeRemain(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor(t/(1000 * 60 * 60) % 24),
            minutes = Math.floor(t/(1000 * 60) % 60),
            secondes = Math.floor(t/(1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'secondes': secondes
        };

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            secondes = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

        function updateClock() {
            const t = getTimeRemain(endtime);
                days.innerHTML = t.days;
                hours.innerHTML = t.hours;
                minutes.innerHTML = t.minutes;
                secondes.innerHTML = t.secondes;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

setClock('.timer', deadLine);


// MODAL

const modalOpenBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        
        
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '23px';
        clearInterval(modalTimerId);
    }
    modalOpenBtn.forEach(btn  => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 60000);


    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
    


// Используем классы для создания карточек меню

class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.transfer = 85;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.changeToRUB();
        this.classes = classes;
    }
    changeToRUB() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        
        if (this.classes.length === 0 ) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>

        `;
        this.parent.append(element);
    }
}

const getResource = async (url) => {                     // отвечает за (GET) получение данных (MenuCard) с сервера
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status} `);
    }
    return await res.json();
};        

getResource('http://localhost:3000/menu')                               // получаем с сервера массив, который содержит
    .then(data => {                                                     // объекты (карточки меню), перебираем массив, деструктуризируем,
        data.forEach(({img, altimg, title, descr, price}) => {          // передаем в конструктор, который рендерит на сайт      
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


// new MenuCard (                                               // оставил, для понимания как вручную создавал карточки
//     "img/tabs/vegy.jpg",
//     "vegy",
//     "Меню 'Фитнес'",
//     "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
//     10,
//     ".menu .container",
//     "menu__item",
// ).render();

// new MenuCard (
//     "img/tabs/post.jpg",
//     "post",
//     "Меню 'Постное'",
//     "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
//     11,
//     ".menu .container",
//     "menu__item",
// ).render();

// new MenuCard (
//     "img/tabs/elite.jpg",
//     "elite",
//     "Меню 'Премиум'",
//     "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
//     12,
//     ".menu .container",
//     "menu__item",
// ).render();




// FORMS POST

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так...' 
};

forms.forEach(item => {
    bindPostData(item);
});


const postData = async (url, data) => {                     // отвечает за постинг данных на сервер
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
            },
        body: data,
    });
    return await res.json();
};                                       

function bindPostData(form) {                           // отвечает за привязку постинга
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally (()=> {
            form.reset();
        });

    });

}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    
    prevModalDialog.classList.add('hide');
    
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

// SLIDER v.1

// const slides = document.querySelectorAll('.offer__slide'),
//     prevArrow = document.querySelector('.offer__slider-prev'),
//     nextArrow = document.querySelector('.offer__slider-next'),
//     current = document.querySelector('#current'),
//     total = document.querySelector('#total');
    
// let slideIndex = 1;
// showSlide(slideIndex);                                            // инициализируем слайдер

// if (slides.length < 10){
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }


// function showSlide(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;
//     }


//     slides.forEach(item => item.classList.add('hide'));
//     slides[slideIndex - 1].classList.remove('hide');

//     if (slideIndex < 10){
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// }

// function countSlide(n) {
//     showSlide(slideIndex += n);
// }


// nextArrow.addEventListener('click', () => {
//     countSlide(1);
// });
// prevArrow.addEventListener('click', () => {
//     countSlide(-1);
// });


// SLIDER V.2

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


});