/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Calculating calories

function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, weight, height, age, ratio;

    if (localStorage.getItem('sex')) {                               //проверяем. есть ли в LS запись - пол
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';                                              // если нет. ставим по умолчанию - женский
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {                             //проверяем. есть ли в LS запись - коэфф-т
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;                                               // если нет, ставим значение по умолчанию.
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal () {
        if (!sex || !weight || !height || !age || !ratio) {                             // ф-я расчета калорий по формуле
            result.textContent = "____";
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
}
calcTotal();

function initLocalActiveClass(selector, activeClass) {                      // инициализирует подгрузку значений и класса акт. из LS при запуске калькулятора
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}
initLocalActiveClass('#gender div', 'calculating__choose-item_active');
initLocalActiveClass('.calculating__choose_big div', 'calculating__choose-item_active');

function getStaticInformation(selector, activeClass) {                   // ф-я получения статичных данных из верстки()
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            elements.forEach(item => {
                item.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
        
            calcTotal();
        });
    });

}                                        
getStaticInformation('#gender div', 'calculating__choose-item_active');                    // вызов ф-ии для статичных данных по id(для пола)
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');   // вызов ф-ии для статичных данных по data-ratio(для активности)


function getDynamicInformation(selector) {                                       // ф-я получения данных из inputa верстки()
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        if (input.value.match(/[^\d.]/g)) {                           //проверка: что-то кроме числа или точки - включается красный бордер
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'weight':
                weight = +input.value;
                break;
            case 'height':
                height = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calcTotal();

    });
}
getDynamicInformation('#weight');
getDynamicInformation('#height');
getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Используем классы для создания карточек меню

function cards() {
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
    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// FORMS POST

function forms() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// MODAL

function modal() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TABS

    function tabs() {
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
            tabs.forEach((item, i) =>  {
            if (event.target == item) {
                hideTabContent();
                showTabContent(i);
                }
            });
        }

    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//TIMER 

function timer() {
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
        let days, hours, minutes, secondes;
        let t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {                                         // проверка на отрицательные значения (превышение дедлайна)
            days = 0;
            hours = 0;
            minutes = 0;
            secondes = 0;
        } else {
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor(t/(1000 * 60 * 60) % 24),
            minutes = Math.floor(t/(1000 * 60) % 60),
            secondes = Math.floor(t/1000 % 60);
        }

        
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








document.addEventListener('DOMContentLoaded', function() {
        
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map