document.addEventListener('click', function handleClick(event) {
    let elementClass = event.target.className;

    if (elementClass !== '' && elementClass === 'shaka-scrim-container') {
        let element = event.target.parentElement.parentElement.parentElement;

        console.log(element.dataset.hash)

        window.location.href = "/" + element.dataset.hash;
    }
});