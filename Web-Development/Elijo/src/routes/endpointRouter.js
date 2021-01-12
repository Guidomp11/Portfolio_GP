const express = require('express');
const router = express.Router();
const endpointController = require('../controllers/endpointController.js');
const hasAcces = require('../middlewares/hasAccess');


router.get('/careers/:universityOwner', endpointController.getCareers);
router.get('/courses/:instituteOwner', endpointController.getCourses);

router.get('/institute', endpointController.getInstitutes);
router.get('/university', endpointController.getUniversities);

router.get('/byRegion/:region', endpointController.getInstitutionByRegion)

router.get('/institute/:instituteID', endpointController.getSpecificInstitutes);
router.get('/university/:universityID', endpointController.getSpecificUniversities);
router.get('/course/:courseID', endpointController.getSpecificCourse);
router.get('/career/:careerID', endpointController.getSpecificCareer);

router.get('/institute/:instituteID/opinions', endpointController.getInstituteOpinions);
router.get('/university/:universityID/opinions', endpointController.getUniversityOpinions);
router.get('/institute/study/:courseID/opinions', endpointController.getCourseOpinions);
router.get('/university/study/:careerID/opinions', endpointController.getCareerOpinions);

router.get('/user/', hasAcces, endpointController.getActualUser);
router.get('/interests', endpointController.getInterestsTable);

// **QUESTIONS**
router.get('/questions', endpointController.getQuestions);

router.get('/institute/:instituteID/questions', endpointController.getInstituteQuestions);
router.get('/university/:universityID/questions', endpointController.getUniversityQuestions);
router.get('/university/study/:careerID/questions', endpointController.getCareerQuestions);
router.get('/institute/study/:courseID/questions', endpointController.getCourseQuestions);


// **ANSWERS**
router.get('/answers', endpointController.getAnswers);

router.get('/institute/:instituteID/answers', endpointController.getInstituteAnswers);
router.get('/courses/:courseID/answers', endpointController.getCourseAnswers);
router.get('/university/:universityID/answers', endpointController.getUniversityAnswers);
router.get('/careers/:careerID/answers', endpointController.getCareerAnswers);



// **TIPS**
router.get('/tips', endpointController.getTips);

router.get('/institute/:instituteID/tips', endpointController.getInstituteTips);
router.get('/university/:universityID/tips', endpointController.getUniversityTips);
router.get('/careers/:careerID/tips', endpointController.getCareerTips);
router.get('/courses/:courseID/tips', endpointController.getCourseTips);

//OPINION FROM USER TO ELIJO
router.post('/sendOpinion', endpointController.onNewOpinion);
//PUBLISH QUESTION
router.post('/publishQuestion', endpointController.publishQuestion);

router.get('/meetusers', endpointController.getMeetUsers);
router.post('/meetusers/filter', endpointController.getMeetUsersFiltered);

router.post('/useremails', endpointController.getEmails);

//STUDENT TYPE CHANGE
router.get('/changeStudentType', endpointController.changeStudentType);

module.exports = router;