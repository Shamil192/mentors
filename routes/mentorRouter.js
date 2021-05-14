const mentorRouter = require('express').Router();
const {
  mentorSignUpRender,
  mentorSignUp,
  mentorSignInRender,
  mentorSignIn,
  mentorSignOut,
  mentorProfile,
  mentorDeleteProfile,
  mentorEditRender,
  mentorEdit,
  mentorShowAll,
  searchMentors,
  searchMentorsMain,
} = require('../controllers/mentorControllers');

const { checkAuth, checkAdmin, checkMyPage } = require('../middleware/resLocals');



var multer = require('multer')

const { v4 } = require('uuid');




var storage = multer.diskStorage({


  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },


  filename: function (req, file, cb) {
    // console.log(' file ==>', file);
    const newFileName = v4() + '.' + file.originalname.split('.')[1]
    // console.log(' file ==>', newFileName);
    cb(null, newFileName)
  }


})

var upload = multer({ storage })


mentorRouter.route('/showall')
  .get(mentorShowAll)
  .post(searchMentors)

mentorRouter.route('/showall/serch')
  .post(searchMentorsMain)


mentorRouter.route('/signup')
  .get(mentorSignUpRender)
  .post(upload.single('avatar'), mentorSignUp)

mentorRouter.route('/signin')
  .get(mentorSignInRender)
  .post(mentorSignIn)

mentorRouter.route('/signout')
  .get(mentorSignOut)

mentorRouter.route('/:id')
  .get(checkMyPage, mentorProfile)

mentorRouter.route('/delete/:id')
  .get(checkAuth, checkMyPage, checkAdmin, mentorDeleteProfile)

mentorRouter.route('/edit/:id')
  .get(mentorEditRender)
  .post(checkAuth, checkMyPage, checkAdmin, mentorEdit)

module.exports = mentorRouter
