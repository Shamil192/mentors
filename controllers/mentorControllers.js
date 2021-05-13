const Mentor = require("../models/mentor");
const bcrypt = require("bcrypt");
function mentorSignUpRender(req, res) {
  res.render("mentors/mentorSignUp");
}
async function mentorSignUp(req, res) {
  const { name, email, password, experience } = req.body
  try {
    if (
      name &&
      email &&
      password &&
      experience

    ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newMentor = await Mentor.create({
        name,
        email,
        password: hashedPassword,
        competencies: "React",
        experience,
        payPerHour: 1000,
        role: "mentor"
      });
      if (newMentor) {
        req.session.mentor = {
          id: newMentor._id,
          role: "mentor",
        };
        res.redirect(`/mentor/${newMentor._id}`);

      }
    }
  } catch (error) {

    const newError = new Error(error);
    return res.render('mentors/mentorSignUp', { error: newError.message });
  }

  return res.redirect('/');
}
function mentorSignInRender(req, res) {
  res.render("mentors/mentorSignIn");
}
async function mentorSignIn(req, res) {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const currentMentor = await Mentor.findOne({ email });
      if (
        currentMentor &&
        (await bcrypt.compare(password, currentMentor.password))
      ) {
        req.session.mentor = {
          id: currentMentor._id,
          role: "mentor",
        };
        if (currentMentor) {
          res.redirect(`/mentor/${currentMentor._id}`);
        }
      }
    }
  } catch (error) {

    const newError = new Error(error);
    return res.render('mentors/mentorSignIn', { error: newError.message });
  }

  return res.redirect('/');
}

async function mentorSignOut(req, res) {
  req.session.destroy((err) => {
    if (err) return res.redirect('/');

    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  })
}

async function mentorProfile(req, res) {
  const mentorId = req.params.id
  const mentor = await Mentor.findOne({ _id: mentorId })
  res.render('mentors/mentorLC', { mentor });
};

async function mentorDeleteProfile(req, res) {
  try {
    console.log(req.params.id);
    await Mentor.findByIdAndDelete(req.session.user.id);
    res.redirect('/');
  } catch (error) {
    const newError = new Error(error);
    return res.render('mentors/mentorLC', { error: newError.message });
  }

  return res.redirect(`/mentor/${mentor._id}`);
}
// console.log(mentorDeleteProfile)



async function mentorEditRender(req, res) {
  const a = req.params.id;
  const mentor = await Mentor.findOne({ _id: a });
  res.render("mentors/mentorEdit", { mentor });
  // console.log('-------', mentor)
}
// console.log(mentorEditRender)

async function mentorEdit(req, res) {
  const { name, email, tel, password, domain, experience } = req.body;
  const id = req.session?.mentor?.id
  // console.log(ID);
  const mentor = await Mentor.findOne({ _id: id });
  try {
    await Mentor.findByIdAndUpdate(
      mentor._id,
      { name, email, tel, password, domain, experience },
      { new: true })

    return res.redirect(`/mentor/${mentor._id}`);
  } catch (error) {
    const newError = new Error(error);
    return res.render('mentors/mentorEdit', { error: newError.message });
  }

}
// console.log(mentorEdit)


async function mentorShowAll(req, res) {
  const mentorAll = await Mentor.find();
  res.render("mentors/mentorAll", { mentorAll });
}

async function searchMentors(req, res) {
  const mentors = await Mentor.find({ name: req.body.name })
  console.log(mentors)

  res.json(mentors)
}
module.exports = {
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
};
