const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

const updateButton = (e) => {
  const icon = e.currentTarget.paused ? '►' : '❚❚';
  toggle.textContent = icon;
};

const skip = (e) => {
  const skipTime = parseInt(e.currentTarget.dataset.skip);
  video.currentTime += skipTime;
};

const handleRangeUpdate = (e) => {
  const current = e.currentTarget;
  video[current.name] = current.value;
};

const handleProgress = (e) => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  console.log(e);
  const scrubTime = (e.offsetX / e.currentTarget.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
