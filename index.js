const hoursDropdown = document.querySelector("#hours");
const minDropdown = document.querySelector("#min");
const secDropdown = document.querySelector("#sec");
const dropdowns = document.querySelector('.dropdowns');
const startBtn = document.querySelector(".right");
const cancleBtn = document.querySelector(".left");
const timerInterface = document.querySelector(".timer");
const hour = document.querySelector(".h");
const min = document.querySelector(".m");
const sec = document.querySelector(".s");
const display = document.querySelector(".display");

// Render 0-99 on hours dropdown, 0-59 on min and sec dropdown
const render = (element, content) => {
    element.innerHTML = content;
}

let hoursOption = "";
let min_secOption = "";
for (let i = 0; i < 100; i++) {
    hoursOption += `<option value=${i}>${i}</option>`;
}
for (let i = 0; i < 60; i++) {
    min_secOption += `<option value=${i}>${i}</option>`;
}

render(hoursDropdown, hoursOption);
render(minDropdown, min_secOption);
render(secDropdown, min_secOption);

// Get the selected hours, min, sec value
let hourValue = 0;
let minValue = 0;
let secValue = 0;
let pTag = "";

hoursDropdown.addEventListener("change", (e) => render(hour, e.target.value));
minDropdown.addEventListener("change", (e) => render(min, e.target.value));
secDropdown.addEventListener("change", (e) => render(sec, e.target.value));

// Handle events on clicking Start button
let pauseAvailable = false;

function setIntervalCallBack() {
    if (+(sec.innerHTML) === 0) {
        sec.innerHTML = 59;
        if (+(min.innerHTML) === 0 && +(hour.innerHTML !== 0)) {
            min.innerHTML = 59;
            +(hour.innerHTML)--;
        } else min.innerHTML--;
    } else {
        +(sec.innerHTML)--;
    }; 
}

function clickStartHandler() {
    cancleBtn.disabled = false;
    pauseAvailable = !pauseAvailable;

    if(pauseAvailable) {
        render(startBtn, "Pause");
        startBtn.classList.add("pause");
        dropdowns.style.display = "none";
        display.style.display = "inline";
        setInterval(setIntervalCallBack, 1000);
    } else {
        render(startBtn, "Start");
        startBtn.classList.remove("pause");
        
    }   
}

startBtn.addEventListener("click", clickStartHandler);

