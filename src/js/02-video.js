import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

function handleTimeUpdate(data) {
  const time = data.seconds;

  localStorage.setItem(STORAGE_KEY, time);
}

const playbackTime = localStorage.getItem(STORAGE_KEY);

if (playbackTime) {
  player.setCurrentTime(playbackTime);
}
