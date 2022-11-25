import { init } from "./Player.js";
import { channels } from "./ch.js";

const main = document.getElementById('app');
const btn = document.getElementById('change');
const vid = document.getElementById('video');

let count = 0;

// functions =============================================
const detectIndex = (hash) => {
    let nameChannel = hash.slice(1);
    return channels.findIndex(el => el.name === nameChannel);
}

const changeChannel = (arr, i = 0) => location.hash = arr[i].name;

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

// add shaka-player ===========================================
document.addEventListener('shaka-ui-loaded', async e => {
    location.hash = channels[count].name
    let { hash } = location;

    let val = validHash(hash);
    typeof val === 'string'
        ? init(val, vid)
        : main.insertAdjacentHTML('afterbegin', `<h1>${val.error}</h1>`);
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
        console.log('play')
        count++;
        changeChanel();
    }
    if (e.key === 'ArrowLeft') {
        count--;
        changeChanel();
    }
    if (e.key === ' ') {
        if(vid.paused)
            playVid();
        else
            pauseVid();
    }
})
btn.addEventListener('click', e => {
    count++;
    change();
});

function changeChanel() {
    if (count >= channels.length) count = 0;
    changeChannel(channels, count);
}

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
} 