import { DateTime } from "luxon";

window.addEventListener('load', () =>{
    // @see https://github.com/moment/luxon
    
    const time = document.querySelector(".locale__time output");
    if (time !== null) {
        const checkAttribute = time.hasAttribute("data-timezone");
        if (checkAttribute) {
            setInterval(() => {
                    const timezone = time.getAttribute("data-timezone");
                    const nowTime = DateTime.now().setZone(timezone);
                    time.innerHTML = nowTime.toFormat("HH:mm:ss");  
                }, 1000);
        } 
        else {
            return;
        }
    }
});