// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    }
});

// Avoid Loco wrong container height
window.addEventListener('load', function(){
    scroll.update();
    console.log("object")
});