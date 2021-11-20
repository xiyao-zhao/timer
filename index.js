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
const endTime = document.querySelector(".endTime");

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

hoursDropdown.addEventListener("change", (e) => {
    hourValue = e.target.value;
    render(hour, e.target.value);
})
minDropdown.addEventListener("change", (e) => {
    minValue = e.target.value;
    render(min, e.target.value);
})
secDropdown.addEventListener("change", (e) => {
    secValue = e.target.value;
    render(sec, e.target.value);
})

// Count the end time
function getEndTime() {
    let date = new Date(new Date().getTime() + ((hourValue * 60 * 60 * 1000) + (minValue * 60 * 1000) + (secValue * 1000)));
    pTag = date.getHours().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + " : " + 
            date.getMinutes().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
}

// Handle events on clicking Start button
// When the Start button isn't clicked, pause button isn't available
let pauseAvailable = false;
const alarm = new Audio("Alarm-ringtone.mp3");

function setIntervalCallBack() {
    if(+(sec.innerHTML) === 0 && +(min.innerHTML) === 0 && +(hour.innerHTML) === 0) {
        sec.innerHTML = 0;
        min.innerHTML = 0;
        hour.innerHTML = 0;
        clearInterval(interval);
        alarm.play();
    } else if (+(sec.innerHTML) !== 0) {
        sec.innerHTML--
    } else if (+(sec.innerHTML) === 0) {
        sec.innerHTML = 59;
        if (+(min.innerHTML) === 0 && +(hour.innerHTML !== 0)) {
            min.innerHTML = 59;
            +(hour.innerHTML)--;
        } else min.innerHTML--;
    }; 
}

function clickStartHandler() {
    // If user doesn't select any option, or all values are zero, return
    if (+(sec.innerHTML) === 0 && +(min.innerHTML) === 0 && +(hour.innerHTML) === 0) {
        return;
    };
    // Toggle Pause button between available and unavailable
    pauseAvailable = !pauseAvailable;
    // After click the Start button, Cancel button is available
    cancleBtn.disabled = false;
    
    // If click Start button
    if(pauseAvailable) {
        render(startBtn, "Pause");
        getEndTime();
        render(endTime, pTag);
        startBtn.classList.add("pause");
        dropdowns.style.display = "none";
        display.style.display = "inline";
        interval = setInterval(setIntervalCallBack, 1000);
        // If click Pause button
    } else {
        render(startBtn, "Start");
        startBtn.classList.remove("pause");
        clearInterval(interval);
    }   
}

startBtn.addEventListener("click", clickStartHandler);

cancleBtn.addEventListener("click", () => {
    display.style.display = "none";
    dropdowns.style.display = "flex";
    clearInterval(interval);
    // Reset the timer to user selected values
    render(sec, secValue);
    render(min, minValue);
    render(hour, hourValue);

    render(startBtn, "Start");
    startBtn.classList.remove("pause");
    pauseAvailable = false;
    alarm.pause();
    
})

