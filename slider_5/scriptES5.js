'use strict';

var wrapper = document.querySelector('.wrapper');
var carousel = document.querySelector('.carousel');
var firstCardWidth = carousel.querySelector('.card').offsetWidth;
var arrowBtns = document.querySelectorAll('.wrapper i');
var carouselChildrens = [].concat(Array.from(carousel.children));

var isDragging = false,
    isAutoPlay = false,
    startX,
    startScrollLeft,
    timeoutId;

var cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(function (card) {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(function (card) {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

carousel.classList.add('no-transition');
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove('no-transition');

arrowBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
    });
});

var dragStart = function dragStart(e) {
    isDragging = true;
   // carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;

    console.log("arrastrando "+startX)
};

var dragging = function dragging(e) {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

var dragStop = function dragStop() {
    isDragging = false;
    //carousel.classList.remove('dragging');

    console.log("soltar")
    //To check up
};

var infiniteScroll = function infiniteScroll() {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - 1 * carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(':hover')) autoPlay();
};

var autoPlay = function autoPlay() {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(function () {
        return carousel.scrollLeft += firstCardWidth;
    }, 500);
};
autoPlay();

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', function () {
    return clearTimeout(timeoutId);
});

