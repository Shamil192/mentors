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

const { checkAuth, checkMyPage, checkEdit } = require('../middleware/resLocals');

var multer = require('multer')

const { v4 } = require('uuid');
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },

  filename: function (req, file, cb) {
    const newFileName = v4() + '.' + file.originalname.split('.')[1]
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
  .get(checkEdit, mentorDeleteProfile)

mentorRouter.route('/edit/:id')
  .get(checkEdit, mentorEditRender)
  .post(upload.single('avatar'), checkEdit, mentorEdit)

module.exports = mentorRouter
