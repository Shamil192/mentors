const mentorRouter = require('express').Router();

const {
  mentorSignUpRender,
  mentorSignUp,
  mentorSignInRender,
  mentorSignIn,
  mentorSignOut,
  mentorProfile

  // profiShowAll,
  // profiDeleteProfile,
  // profiEditRender,
  // profiEdit
} = require('../controllers/mentorControllers')

mentorRouter.route('/signup')
  .get(mentorSignUpRender)
  .post(mentorSignUp)

mentorRouter.route('/signin')
  .get(mentorSignInRender)
  .post(mentorSignIn)

mentorRouter.route('/mentor/signout')
  .get(mentorSignOut)

// mentorRouter.route('/showall')
//   .get(profiShowAll)

mentorRouter.route('/:id')
  .get(mentorProfile)

// mentorRouter.route('/delete/:id')
//   .get(profiDeleteProfile)

// mentorRouter.route('/edit/:id')
//   .get(profiEditRender)
//   .post(profiEdit)

module.exports = mentorRouter
