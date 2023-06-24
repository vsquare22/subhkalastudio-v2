const toggleBtn = document.querySelector('.header__toggle-btn');
const headerNav = document.querySelector(".header__nav");
const footer = document.querySelector(".footer");
toggleBtn.addEventListener('click', function () {
    headerNav.classList.toggle('active');
    toggleBtn.classList.toggle('active');
})


// Carousel
// Variables
const indicators = document.querySelector('.carousel__indicators');
const slidesContainer = document.querySelector('.carousel__slides');
const slides = document.querySelectorAll('.slides');
const prev = document.querySelector('.carousel__btn--prev');
const next = document.querySelector('.carousel__btn--next');
const expertise = document.querySelector(".expertise");
const main = document.querySelector(".main");



let curSlide = 0;

////////////

// Functions

const createDots = function () {
    slides.forEach((_,i)=> {
        const html = `<span class='dots' data-slide='${i}'></span>`;
        indicators.insertAdjacentHTML('beforeend', html);
    })
}
createDots();


const acitvateDots = function (slide) {
    document.querySelectorAll('.dots').forEach((dot, _) => {
        dot.classList.remove('active');
    });

    document.querySelector(`.dots[data-slide="${slide}"]`).classList.add('active');

}


const goToSlide = function (slide) {
    curSlide = slide;
    acitvateDots(slide);
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    })
}
goToSlide(curSlide);


const nextSlide = function () {
    if (curSlide == slides.length - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
}


const prevSlide = function () {
    if (curSlide == 0) curSlide = slides.length-1;
    else curSlide--;

    goToSlide(curSlide);
}
let interval = setInterval(nextSlide, 2000);
function pause() {
    clearInterval(interval);
}
function play() {
       interval = setInterval(nextSlide, 2000)
}

// Event Listeners


next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
window.addEventListener('keydown', function (e) {
    if (e.key == "ArrowLeft") prevSlide();
    if (e.key == 'ArrowRight') nextSlide();
})
indicators.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots')) {
        const slide  =parseInt(e.target.dataset.slide);
        console.log(slide);
        goToSlide(slide);
        

    }
})
slidesContainer.addEventListener('mouseover', pause);
slidesContainer.addEventListener('mouseout', play);


//  
window.addEventListener('resize',checkMedia)
window.addEventListener('load',checkMedia)

let media;
function checkMedia() {
    
    media = window.matchMedia('(max-width:34.375em)');
    console.log(media);

}
headerNav.addEventListener('click', function (e) {
    if (!e.target.classList.contains('header__item')) return;
    if (media.matches) {
        headerNav.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    }
})
