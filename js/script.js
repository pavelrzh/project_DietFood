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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close');
        
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '23px';
        clearInterval(modalTimerId);
    }
    modalOpenBtn.forEach(btn  => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);


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

new MenuCard (
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    10,
    ".menu .container",
    "menu__item",

).render();

new MenuCard (
    "img/tabs/post.jpg",
    "post",
    "Меню 'Постное'",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    11,
    ".menu .container",
    "menu__item",
).render();

new MenuCard (
    "img/tabs/elite.jpg",
    "elite",
    "Меню 'Премиум'",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    12,
    ".menu .container",
    "menu__item",
).render();


// FORMS POST

const forms = document.querySelectorAll('form');

const message = {
    loading: 'Загрузка',
    success: 'Спасибо, мы скоро свяжемся с вами',
    failure: 'Что-то пошло не так...' 
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);



        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

       request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() =>{
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });

    });

}


});