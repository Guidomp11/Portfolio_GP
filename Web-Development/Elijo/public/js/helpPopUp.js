function qs(element) {
    return document.querySelector(element)
};

function btnAction(id, btn){
    switch(id){
        case 'carreraElijov2':
            console.log(helpBtn1v2.id);
            helpBtn1v2.classList.remove('d-none');
            btn.remove();
            break;
        case 'dondeEstudiov2':
            helpBtn2v2.classList.remove('d-none');
            btn.remove();
            break;
        case 'hablarConEstudiantesv2':
            helpBtn3v2.classList.remove('d-none');
            btn.remove();
            break;
        case 'queCursoHacerv2':
            helpBtn4v2.classList.remove('d-none');
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

    let helpBtn1v2 = qs('#helpBtn1v2');
    let helpBtn2v2 = qs('#helpBtn2v2');
    let helpBtn3v2 = qs('#helpBtn3v2');
    let helpBtn4v2 = qs('#helpBtn4v2');

    let helpSelectBtn1;
    let helpSelectBtn2;
    let helpSelectBtn3;
    let helpSelectBtn4;

    let orderListv2 = qs('.orderListv2');
    
    helpBtn1v2.addEventListener('click', function(){
        orderListv2.classList.add('orderListOpen');
        orderListv2.innerHTML += '<button id="carreraElijov2">Qué carrera elijo <i class="far fa-times-circle"></i></button>';        
        helpBtn1v2.classList.add('d-none');
    });
    helpBtn2v2.addEventListener('click', function(){
        orderListv2.classList.add('orderListOpen');
        orderListv2.innerHTML += '<button id="dondeEstudiov2">Dónde estudiar <i class="far fa-times-circle"></i></button>';
        helpBtn2v2.classList.add('d-none');
    });
    helpBtn3v2.addEventListener('click', function(){
        orderListv2.classList.add('orderListOpen');
        orderListv2.innerHTML += '<button id="hablarConEstudiantesv2">Hablar con un estudiante <i class="far fa-times-circle"></i></button>';
        helpBtn3v2.classList.add('d-none');
    });
    helpBtn4v2.addEventListener('click', function(){
        orderListv2.classList.add('orderListOpen');
        orderListv2.innerHTML += '<button id="queCursoHacerv2">¿Qué cursos hacer? <i class="far fa-times-circle"></i></button>';
        helpBtn4v2.classList.add('d-none');
    });

    $(orderListv2).bind('DOMSubtreeModified DOMNodeInserted DOMNodeRemoved', function(event){
        
        if(event.target.children[0] != undefined || event.target.children[0] != null){
            helpSelectBtn1v2 = event.target.children[0];
            checkBtnSelectedEvent(helpSelectBtn1v2);
        }

        if(event.target.children[1] != undefined || event.target.children[1] != null){
            helpSelectBtn2v2 = event.target.children[1];
            checkBtnSelectedEvent(helpSelectBtn2v2);
        }

        if(event.target.children[2] != undefined || event.target.children[2] != null){
            helpSelectBtn3v2 = event.target.children[2];
            checkBtnSelectedEvent(helpSelectBtn3v2);
        }

        if(event.target.children[3] != undefined || event.target.children[3] != null){
            helpSelectBtn4v2 = event.target.children[3];
            checkBtnSelectedEvent(helpSelectBtn4v2);
        }

        
    });
});