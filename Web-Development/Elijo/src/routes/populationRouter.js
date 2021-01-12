const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const isAdmin = require('../middlewares/isAdmin');

const populationController = require('../controllers/populationController');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/logos'));
    },
    filename: function(req, file, cb){
        cb(null, req.body.logoInput + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});





router.get('/formsDb', (req, res) => res.render('populationMenu') );
router.get('/universitiesMenu', isAdmin, populationController.showLoadedUniversities);
router.get('/institutesMenu', isAdmin, populationController.showLoadedInstitutes);




router.get('/university', isAdmin, populationController.showUniversityForm);
router.post('/university', isAdmin, upload.any(), populationController.saveNewUniversity);
router.get('/addUniversityLocation/:universityId', isAdmin, populationController.showUniversityLocations);
router.post('/addUniversityLocation/:universityId', isAdmin, populationController.saveUniversityLocations);
router.get('/addCareerAsignature/:universityId', isAdmin, populationController.showCareerAndAsignatureForm);
router.post('/addCareerAsignature/:universityId', isAdmin, populationController.addCareerAndASignatures);


router.get('/institute', isAdmin, populationController.showInstituteForm);
router.post('/institute', isAdmin, upload.any(), populationController.saveNewInstitute);
router.get('/addCourse/:instituteID', isAdmin, populationController.showCourseForm);
router.post('/addCourse/:instituteID', isAdmin, populationController.saveNewCourse);

module.exports = router;