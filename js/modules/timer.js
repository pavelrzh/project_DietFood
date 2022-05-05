//TIMER 

function timer(id, deadLine) {
    // const deadLine = new Date(); // присваиваем переменной текущую дату
    // deadLine.setDate(deadLine.getDate() + 3); // устанавливаем дату на плюс 3 дня. Сбрасывается каждый раз при обновлении страницы


    /* Проверка текущей даты на превышение дедлайна (вcтавить в let t=checkZero(Date.parse.....)*/

    // function checkZero(num) {
    //     if (num < 0) {
    //         num = 0;
    //     } return num;
    // }


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

setClock(id, deadLine);
}
export default timer;