import { init } from "./Player.js";
import { channels } from "./ch.js";

const template =
    '<div class="shaka-container-custom" data-hash="hash-route"><div data-shaka-player-container>' +
    '<video autoplay data-shaka-player id="id-video" class="video-stream"></video>' +
    '</div></div>';

var multicast =  function() {
    const mainMulticast = document.getElementById('app-multicast');
    let name = '';
    let url = '';
    let html = '';
    let vid;

    function chargeAllChanels() {
        channels.forEach((element, index) => {
            name = element.name + 'ax';
            html = template.replace('id-video', name).replace('hash-route', '#' + element.name);

            mainMulticast.innerHTML += html;
        });
    }
    
    function initChanels() {
        channels.forEach((element, index) => {
            name = element.name + 'ax';
            url = element.url;
            vid = document.getElementById(name);
            
            init(url, vid);

            vid.muted = true;
        });
    }

    return {
        charge() {
            chargeAllChanels();
        },
        init() {
            initChanels();
        }
    };
}

const multicastConst = multicast();
multicastConst.charge();

document.addEventListener('shaka-ui-loaded', async e => {
    multicastConst.init();
});