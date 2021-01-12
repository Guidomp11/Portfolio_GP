function removeInterest(id){
    let interestsContainer = document.querySelector('#interestsContainer');
    interestsContainer.removeChild(interestsContainer.childNodes[id]);
}

window.addEventListener('load', function(){
    let interestsInput = document.querySelector('#interests');
    let form = document.querySelector('#userForm');
    let submitBtn = document.querySelector('#submitBtn');
    let interestsContainer = document.querySelector('#interestsContainer');
    let addInterestButton = document.querySelector('#interestButton');
    
    //#region COUNTING OLDER INTERESTS
    let olderInterests = document.querySelectorAll('#oldInterests');
    for(let i = 0; i < olderInterests.length; i++){
        olderInterests[i].id = i+1;
    }
    let interestsCounter = olderInterests.length;
    //#endregion
    
    //#region ADDING BUTTON
    //CUANDO SE TOCA EL BOTON DE AGREGAR
    if(addInterestButton != null){
        addInterestButton.addEventListener('click', event => {
            //AGREGO AL CONTAINER DE BOTONES UN BOTON CON UN ID TEMPROAL
            //'<i class="far fa-times-circle pl-2"></i>'   + 
            interestsContainer.innerHTML += '<button id="tempID">' + interestsInput.value + '</button>';
            //interestsContainer.innerHTML += '<input id="tempID">';
            //GETTEO EL ID TEMPROAL PARA MODIFICARLE LAS COSA SCON LA INFO QUE QUIERO
            let tempIdBtn = document.querySelector('#tempID');
            //tempIdBtn.id = interestsInput.value;
            interestsCounter++;
            tempIdBtn.id = interestsCounter;
            tempIdBtn.name = 'interests';
            tempIdBtn.value = interestsInput.value;
            tempIdBtn.classList.add('interest-btn');
            console.log('go');
            interestsInput.value = '';
            interestsInput.innerHTML = '';
        });
    }    
    //#endregion
    
    //#region BUTTON REMOVER
    document.addEventListener('click', event => {
        if(interestsContainer != null && event.target.localName == 'button'){
            for(let i = 0; i < interestsContainer.childNodes.length; i++){
                console.log(event.target);
                if(interestsContainer.childNodes[i].id == event.target.id){
                    removeInterest(i);
                }
            }   
        }
    });
    //#endregion
    
    //#region PREVENT DEFAULT FORM
    form.addEventListener('submit', event => {
        event.preventDefault();
    });
    //#endregion
    
    //#region INPUT CREATOR 
    submitBtn.addEventListener('click', event => {
        if(interestsContainer != null && interestsContainer.childNodes.length > 0){
            let aux_array = [];
            for(let i = 0; i < interestsContainer.childNodes.length; i++){ //COPIO EL interestsContainer.childNodes EN OTRO ARRAY PARA MANEJARLO MEJOR
                if(interestsContainer.childNodes[i].value != undefined){
                    aux_array.push(interestsContainer.childNodes[i].value);
                }
            }
            
            let makeUnique = aux_array.filter(function(item, index, aux_array) { //BORRO LOS REPETIDOS
                return aux_array.indexOf(item) === index;
            })
            
            for(let i = 0; i < makeUnique.length; i++){//RECORRO PARA CREAR LOS INPUTS CON EL ARRAY CON VALORES UNICOS
                if(makeUnique[i] != null && makeUnique != ''){//VERIFICACION POR LAS DUDAS
                    interestsContainer.innerHTML += `<input id="input${i}" name="interests" value="${makeUnique[i]}">`
                    let tempIdBtn = document.querySelector('#input'+i);
                    tempIdBtn.style.visibility = 'hidden';
                }
            }
        }
        
        let emailInput = document.querySelector('.email-input');
        if(emailInput != null && !emailInput.classList.contains('email-error')){
            form.submit();
        }        
    });
    //#endregion
});