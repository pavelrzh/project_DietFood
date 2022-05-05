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

export default calc;