// TABS

    function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        const tabs = document.querySelectorAll(tabsSelector),
            tabContent = document.querySelectorAll(tabsContentSelector),
            tabParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabContent.forEach (event => {
        event.classList.add('hide');
        event.classList.remove('show', 'fade');
    });
        tabs.forEach (event => {
        event.classList.remove(activeClass);
    });
    }
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {    // удаляем (.) первый символ в '.tabheader__item', т.к уже classList
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