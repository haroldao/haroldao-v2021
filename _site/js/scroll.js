import LocomotiveScroll from 'locomotive-scroll';

export const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    }
});

window.addEventListener('load', () =>{
    lscroll.update();
});

window.addEventListener("resize", ()=> {
    setTimeout(() => {
        lscroll.update();   
    }, 10000);
})