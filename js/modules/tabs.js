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
export default tabs;