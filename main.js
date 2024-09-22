const songs = [{
    id: 1,
    audioSrc: 'assets/audio/beyonce.mp3',
    coverSrc: 'assets/img/lemonade.png',
    artist: 'Beyonce',
    song: 'Don\'t Hurt Yourself',
}, {
    id: 2,
    audioSrc: 'assets/audio/dontstartnow.mp3',
    coverSrc: 'assets/img/dontstartnow.png',
    artist: 'Dua Lipa',
    song: 'Don\'t Start Now',
}];

const mainImgEl = document.querySelector('.main-img');
const audio = document.querySelector('audio');
const authorEl = document.querySelector('.author');
const songEl = document.querySelector('.song');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const progressEl = document.querySelector('.progress');
const endTimeEl = document.querySelector('.end-time');
const currenTimeEl = document.querySelector('.current-time');
const coverImgEl = document.querySelector('.cover-img');

let duration = 0;
let currentProgess = 0;
let currentSong = songs[0];
let isPlaying = false;
let isSeeking = false;

function initPlayer() {
    audio.addEventListener('loadedmetadata', () => {
        duration = audio.duration;
        endTimeEl.innerHTML = calculateDuration(audio.duration);
    });

    audio.addEventListener('ended', () => {
        currentSong = findNextSong();
        updatePlayer();
        audio.play();
    });

    audio.addEventListener('timeupdate', (e) => {
        currenTimeEl.innerHTML = calculateCurrentTime(audio.currentTime);

        if (!isSeeking) {
            progressEl.value = audio.currentTime / duration * 100;
        }
    });

    playBtn.addEventListener('click', () => {
        isPlaying ? pause() : play();
    });

    playNextBtn.addEventListener('click', () => {
        currentSong = findNextSong();
        pause();
        updatePlayer();
        play();
    });


    playPrevBtn.addEventListener('click', () => {
        currentSong = findPevSong();
        pause();
        updatePlayer();
        play();
    });

    progressEl.addEventListener('change', (e) => {
        audio.currentTime = duration * progressEl.value / 100;
    });

    progressEl.addEventListener('mousedown', () => {
        isSeeking = true;
    });

    progressEl.addEventListener('mouseup', () => {
        isSeeking = false;
    });
}

function updatePlayer() {
    currentProgess = 0;
    currenTimeEl.innerHTML = '00:00';
    coverImgEl.src = currentSong.coverSrc;
    mainImgEl.src = currentSong.coverSrc;
    authorEl.innerHTML = currentSong.artist;
    songEl.innerHTML = currentSong.song;

    audio.src = currentSong.audioSrc;
}

function play() {
    isPlaying = true;
    audio.play()

    if (isPlaying) {
        playBtn.classList.add('pause');
        coverImgEl.classList.add('pause');
    } else {
        playBtn.classList.remove('pause');
        coverImgEl.classList.remove('pause');
    }
}

function pause() {
    isPlaying = false;
    audio.pause()

    if (isPlaying) {
        playBtn.classList.add('pause');
        coverImgEl.classList.add('pause');
    } else {
        playBtn.classList.remove('pause');
        coverImgEl.classList.remove('pause');
    }
}

function findNextSong() {
    if (currentSong.id === 1) {
        return songs[1];
    }

    return songs[0];
}

function findPevSong() {
    if (currentSong.id === 1) {
        return songs[1];
    }

    return songs[0];
}

function calculateDuration(length) {
    let minutes = Math.floor(length / 60);
    let seconds_int = length - minutes * 60;
    let seconds_str = seconds_int.toString();
    let = seconds = seconds_str.substr(0, 2);
    let time = minutes + ':' + seconds;

    return time;
}

function calculateCurrentTime(currentTime) {
    let current_minute = parseInt(currentTime / 60) % 60;
    let current_seconds_long = currentTime % 60;
    let current_seconds = current_seconds_long.toFixed();
    let current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}

initPlayer();
updatePlayer();