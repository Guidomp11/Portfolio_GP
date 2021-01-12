function fetchRegions(){
    let regionSelect = document.querySelectorAll('#regionSelect');
    
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(response => {
        return response.json()
    })
    .then(provinces => {
        for(let j = 0; j < regionSelect.length; j++){
            provinces.provincias.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre === b.nombre ? 0 : 1)
            for(let i = 0; i < provinces.provincias.length; i++){
                regionSelect[j].innerHTML +=`<option value="${provinces.provincias[i].nombre}">  ${provinces.provincias[i].nombre} </option>`
            }
        }
        
    })
}

window.addEventListener('load', function(){
    let locationContainer = document.querySelector('#locationData');
    let locationsAmount = document.querySelector('#amount');


    locationsAmount.addEventListener('change', (event) => {
        locationContainer.innerHTML = '';
        for(let i = 0; i < locationsAmount.value; i++){
            locationContainer.innerHTML += `
            <div id="location">
                <h4 class="mt-3 ">Direccion</h4>
                <input required name="address" type="text" placeholder="Av Figueroa Alcorta 1401">
                <h4 class="mt-3 ">Provincia:</h4>
                <select required name="province" type="text" placeholder="CABA" id="regionSelect"><option value="" hidden>Seleccione una region</select>
                <h4 class="mt-3 ">Pais:</h4>
                <input required name="country" type="text" placeholder="Argentina">
                <h4 class="mt-3 ">Codigo postal:</h4>
                <input required name="zip_code" type="number" placeholder="1440">
            </div>
            `;
        }
        fetchRegions();
    });
});