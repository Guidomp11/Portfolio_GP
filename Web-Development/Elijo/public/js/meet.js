let inputsChecked = [];
const usersPerPage = 9;
let usersForPagination = [];
let actualPage = 0;

//#region HANDLES
function reinsert(data, toInner){
    let tempInput = data;

    toInner.removeChild(tempInput);
    toInner.prepend(tempInput);
}

function handleUniversityInput(inputRef){
    let inputUniversity = document.querySelectorAll('#university');

    for(let i = 0; i < inputUniversity.length; i++){
        if(inputUniversity[i].value == inputRef){
            addInputChecked(`university, ${inputUniversity[i].value}`);
            let universityDiv = document.querySelector('#universitiesParent');
        
            reinsert(inputUniversity[i].parentNode, universityDiv);    
        }
    }
}

function handleCareerInput(inputRef){
    let inputCareer = document.querySelectorAll('#career');

    for(let i = 0; i < inputCareer.length; i++){
        if(inputCareer[i].value == inputRef){
            addInputChecked(`career,${inputCareer[i].value}`)
            let careerDiv = document.querySelector('#careerDiv');
        
            reinsert(inputCareer[i].parentNode, careerDiv);
        }
    }
    
}

function handleInstituteInput(inputRef){
    let inputInstitute = document.querySelectorAll('#institutes');

    for(let i = 0; i < inputInstitute.length; i++){
        if(inputInstitute[i].value == inputRef){
            addInputChecked(`institute, ${inputInstitute[i].value}`);
            let institutesDiv = document.querySelector('#institutesDiv')
        
            reinsert(inputInstitute[i].parentNode, institutesDiv);
        }
    }
    
}

function handleCourseInput(inputRef){
    let courseInput = document.querySelectorAll('#courses');
    for(let i = 0; i < courseInput.length; i++){
        if(courseInput[i].value == inputRef){
            addInputChecked(`course,${courseInput[i].value}`);
            let courseDiv = document.querySelector('#courseDiv');
        
            reinsert(courseInput[i].parentNode, courseDiv);
        }
    }
    
}

function handleInterestInput(inputRef){
    let interestInput = document.querySelectorAll('#interest');
    
    for(let i = 0; i < interestInput.length; i++){
        if(interestInput[i].value == inputRef){
            addInputChecked(`interest,${interestInput[i].value}`);
            let interestDiv = document.querySelector('#interestDiv');
            reinsert(interestInput[i].parentNode, interestDiv);
            return;
        }
    }
    
}

function handleYearInput(inputRef){
    let yearInput = document.querySelectorAll('#year');

    for(let i = 0; i < yearInput.length; i++){
        if(yearInput[i].value == inputRef){
            addInputChecked(`year,${yearInput[i].value}`);
            let yearDiv = document.querySelector('#yearDiv');
            reinsert(yearInput[i].parentNode, yearDiv);
            return;
        }
    }
}

function handleGenreInput(inputRef){
    let genreInput = document.querySelectorAll('#genre');

    for(let i = 0; i < genreInput.length; i++){
        if(genreInput[i].value == inputRef){
            addInputChecked(`genre, ${genreInput[i].value}`);
            let genreDiv = document.querySelector('#genreDiv');
            reinsert(genreInput[i].parentNode, genreDiv);
            return;
        }        
    }
}

function handleRegionInput(inputRef){
    let regionInput = document.querySelectorAll('#meetProvince');

    for(let i = 0; i < regionInput.length; i++){
        if(regionInput[i].value == inputRef){
            addInputChecked(`province,${regionInput[i].value}`);
            let regionDiv = document.querySelector('#regionCard');
            reinsert(regionInput[i].parentNode, regionDiv);
        }
    }
}

function handleAgeInput(inputRef){
    let ageInput = document.querySelectorAll('#age');

    for(let i = 0; i < ageInput.length; i++){
        if(ageInput[i].value == inputRef){
            addInputChecked(`age,${ageInput[i].value}`);
            let ageDiv = document.querySelector('#ageDiv');
            reinsert(ageInput[i].parentNode, ageDiv);   
        }
    }    
}

//#endregion
function addInputChecked(data){
    console.log(data);
    if(inputsChecked.length == 0){
        inputsChecked.push(data)
    } else {
        if(inputsChecked.includes(data)){
            inputsChecked = inputsChecked.filter(function(elemento){
                return elemento != data
            })
        } else {
            inputsChecked.push(data)
        }
    }
}

function fetchUsers(){
    fetch('/endpoints/meetusers').then(res => res.json())
    .then(users => {
        if(users.length <= 0){
            usersContainer.innerHTML = '<h2 class="text-center">No se encontraron usuarios.</h2>';
        }else{
            makeMeetPagination(users);
            changeMeetPage(0);
        }        
    })
}

function fillUsersContainer(users){
    let usersContainer = document.querySelector('#users-container');
    let usersDataContainer;
    
    usersContainer.innerHTML = '';

    for(let i = 0; i < users.length; i++){
        usersContainer.innerHTML += `
            <div class="col-10 col-md-3 estudiante">
                <img src="/images/users/${users[i].photo}" alt="">
                <h3>${users[i].name}</h3> 
                <div id="user-studies-data"></div>
                <a href="/meet/detail/${users[i].id}"><button> Ver Perfil</button></a>
            </div>
        `;
        
        usersDataContainer = document.querySelectorAll('#user-studies-data');
        if(users[i].User_careers.length > 0){
            usersDataContainer[i].innerHTML += `
                <p>${users[i].User_careers[0].name}</p>
                <p>${users[i].User_careers[0].Universities.name}</p>
            `;
        }else if(users[i].User_courses.length > 0){
            usersDataContainer[i].innerHTML += `
                <p>${users[i].User_courses[0].name}</p>
                <p>${users[i].User_courses[0].Institutes.name}</p>
            `;
        }
        
    }

    let paginationContainer = document.querySelector('.meetPaginationContainer');
    paginationContainer.innerHTML = '';

    if(actualPage > 0){
        paginationContainer.innerHTML += `
        <div class="btn-container-meet  meet-to-left">
        <button class="before-btn" onclick="changeMeetPage(-1)">Anterior</button>
        </div>
        `;
    }
    if(actualPage < usersForPagination.length-1){
        paginationContainer.innerHTML += `
        <div class="btn-container-meet  meet-to-right">
        <button class="after-btn" onclick="changeMeetPage(1)">Siguiente</button>
        </div>
        `;
    }    
}

function sendFilters(){
    let dataToSend = {
        university: [],
        career: [],
        institutes: [],
        courses: [],
        interest: [],
        year: [],
        genero: [],
        age: [],
        province: []
    };

    for(let i = 0; i < inputsChecked.length; i++){
        let tempData = inputsChecked[i].split(',');
        switch(tempData[0]){
            case 'university':
                dataToSend.university.push(tempData[1]);
                break;
            case 'career':
                dataToSend.career.push(tempData[1]);
                break;
            case 'institute':
                dataToSend.institutes.push(tempData[1]);
                break;
            case 'course':
                dataToSend.courses.push(tempData[1]);
                break;
            case 'interest':
                dataToSend.interest.push(tempData[1]);
                break;
            case 'year':
                dataToSend.year.push(tempData[1]);
                break;
            case 'genre':
                dataToSend.genero.push(tempData[1]);
                break;
            case 'age':
                dataToSend.age.push(tempData[1]);
                break;
            case 'province':
                dataToSend.province.push(tempData[1]);
                break;
        }
    }
    console.log(dataToSend);
    fetch('/endpoints/meetusers/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    }).then(res => res.json())
    .then(usersFiltered => {
        let usersContainer = document.querySelector('#users-container');
        let paginationContainer = document.querySelector('.meetPaginationContainer');
        if(usersFiltered.length <= 0){
            usersContainer.innerHTML = '<h2 class="text-center">No se encontraron usuarios.</h2>';
            paginationContainer.innerHTML = '';
        }else{
            makeMeetPagination(usersFiltered);
            changeMeetPage(0);
        }     
    })
}

function makeMeetPagination(results){
    let amountOfPages = Math.ceil(results.length / usersPerPage);
    let index = 0;
    let condition = usersPerPage;
    usersForPagination = [];
    for(let i = 0; i < amountOfPages; i++){
        let page = [];
        for(let j = index; j <= condition - 1; j++){
            if(results[j] != undefined){
                page.push(results[j]);
            }
        }
        condition += usersPerPage;
        index += usersPerPage;
        usersForPagination.push(page);
    }
}

function changeMeetPage(moveTo){
    if(usersForPagination[actualPage] == null || usersForPagination[actualPage] == undefined) return ;
    (moveTo > 0) ? actualPage++ : actualPage--;
    if(moveTo == 0) actualPage = 0;

    fillUsersContainer(usersForPagination[actualPage]);
}

window.addEventListener('load', function() {
    fetchUsers();

    let btnFilter = document.querySelector('.btn-filter');
    let divFilter = document.querySelector('.div-filter');
    let header = document.querySelector('header');
    let arrow = document.querySelector('.arrow');
    let pcmenu = document.querySelector('.pcMenu');
    let formFilter = document.querySelector('.filter-form');

    let sleepBackground = document.querySelector('.sleep-background');
    
    btnFilter.addEventListener('click', function(){
        if(divFilter.classList.contains('slide-in')){
            divFilter.classList.remove('slide-in')
            divFilter.classList.add('slide-out')
            header.classList.remove('move-up')
        }else{
            divFilter.classList.remove('slide-out')
            divFilter.classList.add('slide-in')
            header.classList.add('move-up')
            pcmenu.classList.add('d-none')
        }
        
    });
    
    arrow.addEventListener('click', function(){
        if(divFilter.classList.contains('slide-in')){
            divFilter.classList.remove('slide-in')
            divFilter.classList.add('slide-out')
            header.classList.remove('move-up')
            pcmenu.classList.remove('d-none')

        }else{
            divFilter.classList.remove('slide-out')
            divFilter.classList.add('slide-in')
            header.classList.add('move-up')
        }
    })
    
    if(screen.width > 768){  
        window.addEventListener('click', function(){
            clearInterval(meetInterval);
            sleepBackground.classList.add('d-none');
            sleepBackground.classList.remove('active');
        })

        let meetInterval = setInterval(function(){
            sleepBackground.classList.remove('d-none');
            sleepBackground.classList.add('active');
        }, 10000)
    }

    formFilter.addEventListener('submit', function(e){        
        e.preventDefault();        
        if(inputsChecked.length > 0) {
            sendFilters();
        }
        divFilter.classList.remove('slide-in')
        divFilter.classList.add('slide-out')
        header.classList.remove('move-up')
        pcmenu.classList.remove('d-none')
    });


    let regionCard = document.querySelector('#regionCard')
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(response => {
        return response.json()
    })
    .then(provinces => {
        provinces.provincias.sort((a, b) => a.nombre < b.nombre ? -1 : a.nombre === b.nombre ? 0 : 1)
        for(let i = 0; i < provinces.provincias.length; i++){
            regionCard.innerHTML += `<label for=""><input onclick="handleRegionInput('${provinces.provincias[i].nombre}')" type="checkbox" name="province" value="${provinces.provincias[i].nombre}" id="meetProvince">${provinces.provincias[i].nombre}</label>`
        }
    })
})