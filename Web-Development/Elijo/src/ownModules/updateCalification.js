const db = require('../database/models');

module.exports = (toUpdate, id) => {
    switch(toUpdate){
        case 'University':
                updateUniversity(id);
                break;
            case 'Institute':
                updateInstitute(id);
                break;
            case 'Career':
                updateCareer(id);
                break;
            case 'Course':
                updateCourse(id);
                break;
    }
}

function updateCareer(id){
    db.Calification.findAll({
        where:{
            career_id: id
        }
    })
    .then(response => {
        let total = response.length;
        let sum = response.reduce((accumulator, element) => (accumulator+=element.calification), 0)
        let newQualification = sum/total;

        db.Career.update({calification: newQualification},{where: {id: id}})
        .then(success => (true))
        .catch(success => (false))
    })
}

function updateCourse(id){
    db.Calification.findAll({
        where:{
            course_id: id
        }
    })
    .then(response => {
        let total = response.length;
        let sum = response.reduce((accumulator, element) => (accumulator+=element.calification), 0)
        let newQualification = sum/total;

        db.Course.update({calification: newQualification},{where: {id: id}})
        .then(success => (true))
        .catch(success => (false))
    })
}

function updateInstitute(id){
    db.Calification.findAll({
        where:{
            institute_id: id
        }
    })
    .then(response => {
        let total = response.length;
        let sum = response.reduce((accumulator, element) => (accumulator+=element.calification), 0)
        let newQualification = sum/total;

        db.Institute.update({calification: newQualification},{where: {id: id}})
        .then(success => (true))
        .catch(success => (false))
    })
}

function updateUniversity(id){
    console.log('1');
    db.Calification.findAll({
        where:{
            university_id: id
        }
    })
    .then(response => {
        console.log('2');
        let total = response.length;
        let sum = response.reduce((accumulator, element) => (accumulator+=element.calification), 0)
        let newQualification = sum/total;
        console.log(newQualification);
        db.University.update({calification: newQualification},{where: {id: id}})
        .then(success => {
            console.log(success);
            return true;
        })
        .catch(success => (false))
    })
}