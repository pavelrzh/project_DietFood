//TIMER 

function timer(id, deadLine) {

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
                days.innerHTML = "00";
                hours.innerHTML = "00";
                minutes.innerHTML = "00";
                secondes.innerHTML = "00";

                clearInterval(timeInterval);
            }
        }
    }

setClock(id, deadLine);
}
export default timer;