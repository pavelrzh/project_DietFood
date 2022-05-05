// Используем классы для создания карточек меню
import {getResource} from '../services/services';



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
export default cards;