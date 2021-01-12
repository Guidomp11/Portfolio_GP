const db = require('../database/models');

let convertToArray = function(query){
    if(!Array.isArray(query)) {
        query=[query]
    }
    return query;
}

//#region FILTER AGE
function filterByAge(users, query){
    
    query = convertToArray(query);
    
    let newQuery = [];
    for(let i = 0; i < query.length; i++){
        newQuery.push(query[i].split('-'));
        
    } 
    
    console.log(newQuery);

    let usersByAge = [];
    for(let i = 0; i < newQuery.length;i++){
        for(let j = 0; j < users.length; j++){
            if(Number(newQuery[i][0]) <= users[j].age && Number(newQuery[i][1]) >= users[j].age){
                usersByAge.push(users[j]);
            }
            if(newQuery[i][0] == '35' && Number(newQuery[i][0]) <  users[j].age){
                usersByAge.push(users[j]);
            }
        }
    }
    return usersByAge;
}
//#endregion

function filterByUniversity(users, query){
    
    query = convertToArray(query);

    let usersByUniversity = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_careers != undefined){
                for(let k = 0 ; k < users[i].User_careers.length ; k++){
                    if(users[i].User_careers[k].university_id == Number(query[j])){
                        usersByUniversity.push(users[i]);
                    }
                }
            }               
        }
    }
    return usersByUniversity;
}

function filterByCareer(users, query){

    query = convertToArray(query);

    let usersByCareer = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_careers != undefined){
                for(let k = 0 ; k < users[i].User_careers.length ; k++){
                    
                    if(users[i].User_careers[k].dataValues.name == query[j]){
                        usersByCareer.push(users[i]);
                    }
                    
                }
            }
        }
    }
    
    return usersByCareer;
}

function filterByInstitute(users, query){

    query = convertToArray(query);

    let usersByInstitute = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_courses != undefined ){                
                for(let k = 0 ; k < users[i].User_courses.length ; k++){
                    if(users[i].User_courses[k].institute_id == Number(query[j])){    
                        console.log('ok');                    
                        usersByInstitute.push(users[i])
                    }
                }
            }
        }
    }
    
    return usersByInstitute;
}

function filterByCourse(users, query){

    query = convertToArray(query);
    
    let usersByCourse = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].User_courses != undefined){
                for(let k = 0 ; k < users[i].User_courses.length ; k++){
                    if(users[i].User_courses[j].dataValues.name == query[j]){
                        usersByCourse.push(users[i])
                    }
                }
            }
        }
    }
    
    return usersByCourse;
    
}

//#region FILTER GENRE
function filterByGenre(users, query){
    let usersByGenre = [];
    
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < query.length ; j++){
            if(users[i].genre_id == Number(query[j])){
                usersByGenre.push(users[i]);
            }
        }
    }
    return usersByGenre;
}
//#endregion 

//FILTER BY CAREER YEAR
function filterByCareerYear(users, query){
    let usersByYear = [];
    console.log();
    for(let i = 0 ; i < users.length ; i++){
        for(let j = 0 ; j < users[i].User_careers.length ; j++){
            let start_year = users[i].dataValues.User_careers[j].dataValues.user_careers.dataValues.start_year;
            console.log(start_year == Number(query[j]) || start_year == query[j]);
            if(start_year == Number(query[j]) || start_year == query[j]){
                usersByYear.push(users[i])
            }
        }
    }
    return usersByYear;
    //Creo que es  users[i].User_careers[j].user_careers.start_year (no trae start_year ATT!!!)
}
// /FILTER BY CAREER YEAR

//FILTER PROVINCE
function filterByProvince(users, query){

    query = convertToArray(query);
    console.log(query);
    let usersByProvince = [];
    
    for(let i=0; i<users.length; i++){
        for(let j=0; j< query.length; j++){
            if(users[i].province != null && users[i].province.toLowerCase() == query[j].toLowerCase()){
                usersByProvince.push(users[i]);
            }
        }
    }
    return usersByProvince;
}
//END FILTER PROVINCE

function filterByInterest(users, query){
    query = convertToArray(query);
    let usersByInterests = [];

    for(let i=0; i<users.length; i++){
        for(let j=0; j< query.length; j++){
            for(let k = 0; k < users[i].Interest.length; k++){
                
                if(users[i].Interest[k].dataValues.interest_name.toLowerCase() == query[j].toLowerCase()){
                    usersByInterests.push(users[i]);
                }
            }
            
        }
    }
    return usersByInterests;
}

module.exports = function (users, queries){
    let usersFiltered = users;
    console.log(queries);
    if(queries.age.length > 0) usersFiltered = filterByAge(usersFiltered, queries.age);
    
    if(queries.university.length > 0) usersFiltered = filterByUniversity(usersFiltered, queries.university);
    
    if(queries.career.length > 0) usersFiltered = filterByCareer(usersFiltered, queries.career);
    
    if(queries.institutes.length > 0) usersFiltered = filterByInstitute(usersFiltered, queries.institutes);
    
    if(queries.courses.length > 0) usersFiltered = filterByCourse(usersFiltered, queries.courses);
    
    if(queries.genero.length > 0) usersFiltered = filterByGenre(usersFiltered, queries.genero);
    
    if(queries.year.length > 0) usersFiltered = filterByCareerYear(usersFiltered, queries.year);
    
    if(queries.province.length > 0) usersFiltered = filterByProvince(usersFiltered, queries.province);
    
    if(queries.interest.length > 0) usersFiltered = filterByInterest(usersFiltered, queries.interest);
    
    return usersFiltered;
}


