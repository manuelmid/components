var wrapper = document.querySelector(".custom-slider-wrapper");
var carousel = document.querySelector(".carousel");
var firstCardWidth = carousel.querySelector(".card").offsetWidth;
var arrowBtns = Array.from(document.querySelectorAll(".custom-slider-wrapper i"));
var carouselChildrens = Array.from(carousel.children);

var isDragging = false, isAutoPlay = false, startX, startScrollLeft, timeoutId;
var scrollDuration = 0; // Duration of the scroll animation in milliseconds

// Get the number of cards that can fit in the carousel at once
var cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(function (card) {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(function (card) {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
 arrowBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var distance = (btn.id == "left" ? -firstCardWidth : firstCardWidth);
        carousel.scrollTo({
            left: carousel.scrollLeft + distance,
            behavior: "smooth"
        });
    });
}); 
 

var dragStart = function (e) {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;

    console.log(startX)
}
 
var dragging = function (e) {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

var dragStop = function () {
    isDragging = false;
    carousel.classList.remove("dragging");

    // Drop action has been softened 
    var centerPosition = Math.round(carousel.scrollLeft / firstCardWidth) * firstCardWidth;
    carousel.scrollTo({
        left: centerPosition,
        behavior: "smooth"
    });
    console.log(centerPosition + carousel.classList);
}

var infiniteScroll = function () {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
