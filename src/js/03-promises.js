import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {

    return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay }); // Fulfill
        } else {
          reject({ position, delay }); // Reject
        }
      }, delay);
    });
  
}

formEl.addEventListener('submit', onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();

  const STEP = Number(formEl.elements.step.value);
  const AMOUNT = Number(formEl.elements.amount.value);
  let delay = Number(formEl.elements.delay.value);
  let position = 1;

  while (position <= AMOUNT) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delay += STEP;
    position += 1;
  }
}
