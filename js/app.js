import { init } from "./Player.js";
import { channels } from "./ch.js";

const main = document.getElementById('app');
const vid = document.getElementById('video');
const btnNext = document.getElementById('next-channel');
const btnPrev = document.getElementById('prev-channel');
const channelName = document.getElementById('channel');
const messageContainer = document.getElementById('message-channel');

let count = 0;

// functions =============================================
const detectIndex = (hash) => {
    let nameChannel = hash.slice(1);
    return channels.findIndex(el => el.name === nameChannel);
}

const validHash = (hash) => {
    // saque esté canal del if hash === '#directvSports'
    if (hash === '#tycSports' || hash === '#tvPublica' || hash === '#dSports' || hash === '#deporTv' || hash === '#azteca7') {
        count = detectIndex(hash);
        let { url } = channels[count];
        return url;
    }
    if (hash === '') return { error: 'No pasaste ningun hash' }

    return { error: 'error esté hash NO ES VALIDO' }
}

const setLoading = () => {
    messageContainer.innerHTML = 'Cargando...';
    messageContainer.style.display = 'block';
    messageContainer.style.backgroundColor = 'rgba(0,255,0,0.3)';
}

// add shaka-player ===========================================
document.addEventListener('shaka-ui-loaded', async e => {
    location.hash = channels[count].name
    let { hash } = location;

    let val = validHash(hash);
    typeof val === 'string'
        ? init(val, vid)
        : main.insertAdjacentHTML('afterbegin', `<h1>${val.error}</h1>`);

    channelName.innerHTML = channels[count].name.toUpperCase();
});

// detect hash in load DOM =========================================
document.addEventListener('DOMContentLoaded', e => {
    let { hash } = location;

    let val = validHash(hash);
    typeof val === 'string'
        ? init(val, vid)
        : console.error(val.error);
});

// detect change hash ===============================================
window.addEventListener('hashchange', e => {
    let { hash } = e.target.location;
    let index = detectIndex(hash);
    let { url } = channels[index];
    init(url, vid)
});

// change channel =================================================
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        count++;
        changeChannel();
    }
    if (e.key === 'ArrowLeft') {
        count--;
        changeChannel();
    }
    if (e.key === ' ') {
        if (vid.paused)
            playVid();
        else
            pauseVid();
    }
})

const nextChannel = () => {
    count++;
    changeChannel();
}

const prevChannel = () => {
    count--;
    changeChannel();
}

btnNext.addEventListener('click', e => {
    nextChannel();
});

btnPrev.addEventListener('click', e => {
    prevChannel();
});

function changeChannel() {
    if (count === -1) count = channels.length - 1
    if (count >= channels.length) count = 0;
    location.hash = channels[count].name;

    channelName.innerHTML = channels[count].name;

    channelName.classList.toggle("hide-after-show");
    channelName.classList.toggle("hide-after-show-second");
    setLoading();
}

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
} 