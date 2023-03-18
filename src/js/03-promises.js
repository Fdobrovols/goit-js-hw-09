import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function onFormSubmit(e) {
  e.preventDefault();

  // Отримуємо значення полів форми
  let { amount, step, delay } = e.currentTarget.elements;
  const obj = {
    amount: Number(amount.value),
    step: Number(step.value),
    delay: Number(delay.value),
  };

  generatePromises(obj);
}

// Генерування проміса
function generatePromises({ amount, step, delay }) 
{
  for (let i = 0; i <= amount; i += 1) 
  {
    createPromise(i, delay)
      .then(({position, delay}) =>
       {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => 
      {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => form.reset());
    delay += step;
  }

 
}

function createPromise(position, delay) 
{
  return new Promise((resolve, reject) => 
  {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => 
    {
      if (shouldResolve) 
      {
        resolve({position, delay});
      } else 
      {
        reject({position, delay});
      }
    }, delay);
  });
}

// Hendler
form.addEventListener('submit', onFormSubmit);

/*
// бібліотека для сповіщень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const formRefs = {
  delay: formEl.elements.delay,
  step: formEl.elements.step,
  amount: formEl.elements.amount,
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => 
  {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const { delay, step, amount } = formRefs;

  for (let i = 1; i <= Number(amount.value); i += 1) {
    const delayValue = Number(delay.value) + i * Number(step.value);
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`👌 Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`🙏 Rejected promise ${position} in ${delay}ms`);
      });
  }
}
*/ 