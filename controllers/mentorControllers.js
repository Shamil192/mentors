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
    console.log(error);
  }
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
    console.log(error);
  }
}

async function mentorSignOut(req, res) {
  req.session.destroy(() => {
    res.clearCookie(req.app.get("cookieName"));
    res.redirect("/");
  });
}


async function mentorProfile(req, res) {
  const mentorId = req.params.id
  const mentor = await Mentor.findOne({ _id: mentorId })
  res.render('mentors/mentorLC', { mentor });
};


async function mentorShowAll(req, res) {
  const mentorAll = await Mentor.find();
  res.render("mentors/mentorAll", { mentorAll });
}

async function searchMentors(req, res) {
  const mentors = await Mentor.find({ name: req.body.name })
  console.log()

  res.json(mentors)
}

module.exports = {
  mentorSignUpRender,
  mentorSignUp,
  mentorSignInRender,
  mentorSignIn,
  mentorSignOut,
  mentorProfile,
  mentorShowAll,
  searchMentors,
};
