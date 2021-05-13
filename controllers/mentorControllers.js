const Mentor = require("../models/mentor");
const bcrypt = require("bcrypt");
function mentorSignUpRender(req, res) {
  res.render("mentors/mentorSignUp");
}
async function mentorSignUp(req, res) {
  const { name, email, tel, password, domain, experience } = req.body
  try {
    if (
      name &&
      email &&
      tel &&
      password &&
      domain &&
      experience

    ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newProfi = await Mentor.create({
        name,
        email,
        tel,
        password: hashedPassword,
        domain,
        competencies: "React",
        experience,
        payPerHour: 1000,
        role: "mentor",
      });
      if (newProfi) {
        req.session.profi = {
          id: newProfi._id,
          role: "mentor",
        };
        res.redirect(`/mentor/${newProfi._id}`);

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
      const currentProfi = await Mentor.findOne({ email });
      if (
        currentProfi &&
        (await bcrypt.compare(password, currentProfi.password))
      ) {
        req.session.profi = {
          id: currentProfi._id,
          role: "mentor",
        };
        if (currentProfi) {
          res.redirect(`/mentor/${currentProfi._id}`);
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
  const profiId = req.params.id
  const mentor = await Mentor.findOne({ _id: profiId })
  res.render('mentors/mentorLC', { mentor });
};
async function mentorDeleteProfile(req, res) {
  try {
    console.log(req.params.id);
    await Mentor.findByIdAndDelete({ _id: req.params.id });

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}
async function mentorEditRender(req, res) {
  const a = req.params.id;
  const currentProfi = await Mentor.findOne({ _id: a });
  res.render("mentors/mentorEdit", { currentProfi });
}
async function mentorEdit(req, res) {
  const { ID, name, email, tel, password, domain, experience } = req.body;
  console.log(ID);
  const currentProfi = await Mentor.findOne({ _id: ID });
  await Mentor.findByIdAndUpdate(
    currentProfi._id,
    { name, email, tel, password, domain, experience },
    { new: true }
  );
  res.redirect(`/mentor/${currentProfi._id}`);
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
  mentorEdit
};
