window.addEventListener('load', function() {

    let container = document.querySelector('.container');

    fetch('/endpoints/iframes')
    .then(response => {
        return response.json();
    })
    .then(iframes => {

        for(let i = 0; i < iframes.length; i++){
            container.innerHTML += `<div id="${iframes[i].id}"> ${iframes[i].iframe} <a href="/admin/removeVideo/${iframes[i].id}" id="link-${iframes[i].id}"> <button>Eliminar</button> </a> </div>`;
            /*let videoDiv = document.querySelector("#"+iframes[i].id);

            videoDiv.innderHTML += ``;*/
        }
    })
    .catch(error => {
        return error;
    })
})