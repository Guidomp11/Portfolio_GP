function qs(element) {
    return document.querySelector(element)
};

function btnAction(id, btn){
    switch(id){
        case 'carreraElijo':
            helpBtn1.classList.remove('d-none');
            btn.remove();
            break;
        case 'dondeEstudio':
            helpBtn2.classList.remove('d-none');
            btn.remove();
            break;
        case 'hablarConEstudiantes':
            helpBtn3.classList.remove('d-none');
            btn.remove();
            break;
        case 'queCursoHacer':
            helpBtn4.classList.remove('d-none');
            btn.remove();
            break;
        default:
    }
}

function checkBtnSelectedEvent(btn){
    if(btn != null){
        btn.addEventListener('click', function(){
            btnAction(btn.id, btn);
        });
    }
}

window.addEventListener('load', function(){

    

    let helpBtn1 = qs('#helpBtn1');
    let helpBtn2 = qs('#helpBtn2');
    let helpBtn3 = qs('#helpBtn3');
    let helpBtn4 = qs('#helpBtn4');

    let helpSelectBtn1;
    let helpSelectBtn2;
    let helpSelectBtn3;
    let helpSelectBtn4;

    let orderList = qs('.orderList');
    
    helpBtn1.addEventListener('click', function(){
        orderList.classList.add('orderListOpen');
        orderList.innerHTML += '<button id="carreraElijo">Qué carrera elijo <i class="far fa-times-circle"></i></button>';        
        helpBtn1.classList.add('d-none');
    });
    helpBtn2.addEventListener('click', function(){
        orderList.classList.add('orderListOpen');
        orderList.innerHTML += '<button id="dondeEstudio">Dónde estudiar <i class="far fa-times-circle"></i></button>';
        helpBtn2.classList.add('d-none');
    });
    helpBtn3.addEventListener('click', function(){
        orderList.classList.add('orderListOpen');
        orderList.innerHTML += '<button id="hablarConEstudiantes">Hablar con un estudiante <i class="far fa-times-circle"></i></button>';
        helpBtn3.classList.add('d-none');
    });
    helpBtn4.addEventListener('click', function(){
        orderList.classList.add('orderListOpen');
        orderList.innerHTML += '<button id="queCursoHacer">¿Qué cursos hacer? <i class="far fa-times-circle"></i></button>';
        helpBtn4.classList.add('d-none');
    });

    $(orderList).bind('DOMSubtreeModified DOMNodeInserted DOMNodeRemoved', function(event){

        if(event.target.children[0] != undefined || event.target.children[0] != null){
            helpSelectBtn1 = event.target.children[0];
            checkBtnSelectedEvent(helpSelectBtn1);
        }

        if(event.target.children[1] != undefined || event.target.children[1] != null){
            helpSelectBtn2 = event.target.children[1];
            checkBtnSelectedEvent(helpSelectBtn2);
        }

        if(event.target.children[2] != undefined || event.target.children[2] != null){
            helpSelectBtn3 = event.target.children[2];
            checkBtnSelectedEvent(helpSelectBtn3);
        }

        if(event.target.children[3] != undefined || event.target.children[3] != null){
            helpSelectBtn4 = event.target.children[3];
            checkBtnSelectedEvent(helpSelectBtn4);
        }

        
    });
});