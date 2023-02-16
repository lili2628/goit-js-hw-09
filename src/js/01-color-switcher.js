const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.body;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

btnStop.setAttribute('disabled', true);

function onBtnStartClick(event)  {
    timerId = setInterval(changeColorOfBody, 1000);

    event.target.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');
}

function onBtnStopClick(event)  {
    clearInterval(timerId);
    
    event.target.setAttribute('disabled', true);
    btnStart.removeAttribute('disabled');
}


function changeColorOfBody() {
        const colorRandom = getRandomHexColor();

        bodyEl.style.backgroundColor = colorRandom;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}