function qs(element) {
    return document.querySelector(element)
};

function previewImg(){
    console.log('hola');
    let oFReader = new FileReader();
    let input = document.querySelectorAll("#inputSeleccionarArchivo");
    oFReader.readAsDataURL(input[0].files[0]);

    oFReader.onload = function (oFREvent) {
        let img = document.querySelectorAll(".userImg");
        img[0].src = oFREvent.target.result;
    };
}

window.addEventListener('load', function() {
    
    let botonSeleccionarImg = qs('#visualBtn');
    let inputSeleccionarArchivo = qs('.inputSeleccionarArchivo');

    botonSeleccionarImg.addEventListener('click', function() {
        inputSeleccionarArchivo.click()
    })
})