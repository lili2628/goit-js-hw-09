import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputDateEl = document.querySelector('#datetime-picker');

btnStart.setAttribute('disabled', true);

function updateClockface({ days, hours, mins, secs }) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${mins}`;
    secondsEl.textContent = `${secs}`;
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const currentDate = Date.now();
        
        if (selectedDates[0] > currentDate) {
            btnStart.removeAttribute('disabled');
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        };
    },
}

flatpickr("#datetime-picker", options);

const fpCalendar = inputDateEl._flatpickr;
class Timer {
    constructor({ onTickTimer, onTickCalendarAndStartBtn }) {
        this.intervalId = null;
        this.onTickTimer = onTickTimer;
        this.onTickCalendarAndStartBtn = onTickCalendarAndStartBtn;
        //this.isActive = false;
    }

    start() {
        //if (this.isActive) {
        //    return;
        //}
        //this.isActive = true;
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const backTime =  fpCalendar.selectedDates[0] - currentTime;
            const timeComponents = this.convertMs(backTime);

            this.onTickTimer(timeComponents);
            //updateClockface(timeComponents);
            if (backTime >= '0' && backTime < '1000') {
                clearInterval(this.intervalId);
            };
        }, 1000);
        this.onTickCalendarAndStartBtn();
    }

    //stop() {
        //clearInterval(this.intervalId);
        //this.isActive = false;


    convertMs(ms) {
  // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    addLeadingZero(value){
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTickTimer: updateClockface,
    onTickCalendarAndStartBtn: disabledCalendarAndStartBtn,

});

btnStart.addEventListener('click', timer.start.bind(timer));


function updateClockface({ days, hours, minutes, seconds }) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
}

function disabledCalendarAndStartBtn () {
    btnStart.setAttribute('disabled', true);
    inputDateEl.setAttribute('disabled', true);

}

