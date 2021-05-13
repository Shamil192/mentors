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
} = require('../controllers/mentorControllers');
const { checkAuth } = require('../middleware/resLocals');

mentorRouter.route('/showall')
  .get(mentorShowAll)
  .post(searchMentors)


mentorRouter.route('/signup')
  .get(mentorSignUpRender)
  .post(mentorSignUp)

mentorRouter.route('/signin')
  .get(mentorSignInRender)
  .post(mentorSignIn)

mentorRouter.route('/signout')
  .get(mentorSignOut)

mentorRouter.route('/:id')
  .get(checkAuth, mentorProfile)

mentorRouter.route('/delete/:id')
  .get(mentorDeleteProfile)

mentorRouter.route('/edit/:id')
  .get(mentorEditRender)
  .post(mentorEdit)

module.exports = mentorRouter
