const db = require('../database/models');

module.exports = (id, target) => {
    if(target == 'Career'){
        updateCareerStats(id);
    }else{
        updateCourseStats(id);
    }
}

function updateCareerStats(id){
    db.Career_stat.findAll({
        where: {
            career_id: id
        }
    })
    .then(response => {
        let total = response.length;

        let difficultySum = response.reduce((accumulator, element) => (accumulator+=element.difficulty_amount), 0)
        let difficultyAvg = difficultySum/total;

        let jobExitSum = response.reduce((accumulator, element) => (accumulator+=element.job_exit_amount), 0)
        let jobExitAvg = jobExitSum/total;

        let studyAmountSum = response.reduce((accumulator, element) => (accumulator+=element.study_hours_amount), 0)
        let studyAmountAvg = studyAmountSum/total;

        let updatedObj = {
            difficulty: difficultyAvg,
            job_exit: jobExitAvg,
            study_hours: studyAmountAvg
        }

        console.log(updatedObj);

        db.Career.update({
            difficulty: difficultyAvg,
            job_exit: jobExitAvg,
            study_hours: studyAmountAvg
        }, {where: {id: id}})
        .then(success => (true))
        .catch(err => (false))
    })
}

function updateCourseStats(id){
    db.Course_stat.findAll({
        where: {
            course_id: id
        }
    })
    .then(response => {
        let total = response.length;

        let difficultySum = response.reduce((accumulator, element) => (accumulator+=element.difficulty_amount), 0)
        let difficultyAvg = difficultySum/total;

        let jobExitSum = response.reduce((accumulator, element) => (accumulator+=element.job_exit_amount), 0)
        let jobExitAvg = jobExitSum/total;

        let studyAmountSum = response.reduce((accumulator, element) => (accumulator+=element.study_hours_amount), 0)
        let studyAmountAvg = studyAmountSum/total;

        let updatedObj = {
            difficulty_amount: difficultyAvg,
            job_exit_amount: jobExitAvg,
            study_hours_amount: studyAmountAvg
        }

        db.Course.update(updatedObj, {where: {id: id}})
        .then(success => (true))
        .catch(err => (false))
    })
}