const splitting = Splitting();

const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    }
});

window.addEventListener('load', () =>{
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 2000);
    console.log("%cThis site was designed and developed by Harold AO in April of 2021. It utilizes Eleventy, Liquid, vanilla javascript, Locomotive Scroll and Splitting.", "color:yellow");

    const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num; // Clamps a value between an upper and lower bound
    const map = (x, a, b, c, d) => clamp((x - a) * (d - c) / (b - a) + c, Math.min(c,d), Math.max(c,d)); // Map number x from range [a, b] to [c, d]
    
    lscroll.update();

    // @see https://github.com/moment/luxon
    setInterval(() => {
        const time = document.querySelector(".locale__time output");
        const timezone = time.getAttribute("data-timezone");
        const nowTime = luxon.DateTime.now().setZone(timezone);
        time.innerHTML = nowTime.toFormat("HH:mm:ss");
    }, 1000);

    let scroll = {cache: 0, current: 0};

    // Locomotive Scroll event
    lscroll.on('scroll', obj => {
        // console.log("scrolled");
        scroll.current = obj.scroll.y;
        const distance = scroll.current - scroll.cache;
        scroll.cache = scroll.current;
        // translation value will be mapped in the interval of [-50,50] for a scroll distance of [150,-150]
        const translateY = map(distance, 150, -150, -50, 50);
        // for every word from the splitting object...
        for (const [i,word] of splitting.entries()) {
            // total number of characters for this word
            const charsTotal = word.chars.length;
            // for every char from each word...
            for (const [j,char] of word.chars.entries()) {
                // we want the middle chars to have a higher translationY value so it gives the illusion the word is bending
                const factor = j < Math.ceil(charsTotal/2) ? j : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - j) - 1;
                char.style.transform = `translate3d(0,${factor*translateY}px,0)`;
            }
        }
    });
});

window.addEventListener("resize", ()=> {
    setTimeout(() => {
        lscroll.update();   
    }, 10000);
})