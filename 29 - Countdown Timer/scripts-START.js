let countdown;

const buttons = document.querySelectorAll('.timer__controls > .timer__button');
const leftTime = document.querySelector('.display > .display__time-left');
const endTime = document.querySelector('.display > .display__end-time');
const form = document.customForm;
const input = form.minutes;

function timer(time) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + time * 1000;

  displayLeftTime(time);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
    }

    displayLeftTime(secondsLeft);
  }, 1000);
}

function displayLeftTime(seconds) {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const msg = `${mm}:${ss < 10 ? '0' : ''}${ss}`;

  leftTime.textContent = msg;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hh = end.getHours();
  const mm = end.getMinutes();
  const msg = `Be Back At ${hh > 12 ? hh - 12 : hh}:${mm < 10 ? '0' : ''}${mm}`;

  endTime.textContent = msg;
}

buttons.forEach((button) =>
  button.addEventListener('click', () => timer(Number(button.dataset.time)))
);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mins = input.value;

  console.log(+mins);

  if (!isNaN(mins)) {
    timer(mins * 60);
  }

  input.value = '';
});
