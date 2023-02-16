const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.body;
let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

btnStop.disabled = true;

function onBtnStartClick(event)  {
    timerId = setInterval(changeColorOfBody, 1000);

    event.target.disabled = true;
    btnStop.disabled = false;
}

function onBtnStopClick(event)  {
    clearInterval(timerId);
    
    event.target.disabled = true;
    btnStart.disabled = false;
}

function changeColorOfBody() {
        const colorRandom = getRandomHexColor();

        bodyEl.style.backgroundColor = colorRandom;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}