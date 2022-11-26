var apiCounter =
{
    namespace: "mundial-qatar2022.000webhostapp.com",
    key: "5bb99897-2184-4a98-be33-a5b63292ea21", 
    value: 0
};

let divCounter = document.querySelector(".visits-counter");
let countReset = 0;
let web = "mundial-qatar2022.000webhostapp.com";

const urlGetKey = "https://api.countapi.xyz/create?namespace=myweb&enable_reset=1"
const urlCurrentApi = "https://api.countapi.xyz/get/namespace/key"
const urlResetApi = "https://api.countapi.xyz/set/namespace/key?value="

function websiteVisits(response) {
    console.log('Total viewwers' + response.value)
    currentViewers();
}

function currentViewers() {
    let url = urlCurrentApi.replace('namespace', apiCounter.namespace).replace('key', apiCounter.key);

    setInterval(function () {
        fetch(url)
            .then(response => response.json())
            .then(function (data) {
                divCounter.innerHTML = 'Visits:' + data.value;
                countReset = data.value
            });
    }, 2000);

    // let urlReset = urlResetApi.replace('namespace', apiCounter.namespace).replace('key', apiCounter.key) + countReset;

    // setInterval(function () {
    //     fetch(urlReset)
    //         .then(response => response.json())
    //         .then(function (data) {
    //             divCounter.innerHTML = 'Viewers:' + (data.old_value + 1);
    //         });
    // }, 10000);
}