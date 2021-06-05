import { DateTime } from "luxon";

window.addEventListener('load', () =>{
    // @see https://github.com/moment/luxon
    setInterval(() => {
        const time = document.querySelector(".locale__time output");
        const timezone = time.getAttribute("data-timezone");
        const nowTime = DateTime.now().setZone(timezone);
        time.innerHTML = nowTime.toFormat("HH:mm:ss");
    }, 1000);
});