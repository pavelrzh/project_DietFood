// MODAL

/* Компенсация скрола */
function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}


function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const scroll = calcScroll();

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalOpenBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
        
    modalOpenBtn.forEach(btn  => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};
