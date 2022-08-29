const router = require("express").Router();
const { User, Post } = require("../models");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const main = require("../utils/email");
const resetPasswordKey = require("../utils/resetPasswordKey");

router.post("/users/register", async (req, res) => {
  const {
    username,
    email,
    // any other properties you need
  } = req.body;

  const dupeUsername = await User.findOne({ where: { username: username } });
  const dupeEmail = await User.findOne({ where: { email: email } });

  if (dupeUsername) {
    res
      .status(409)
      .send(
        "A user already exists with this username! Please try another one."
      );
    return;
  }
  if (dupeEmail) {
    res
      .status(409)
      .send("A user already exists with this email! Please try another one.");
    return;
  }
  if (!dupeUsername && !dupeEmail) {
    User.register(
      new User({
        username,
        email,

        // any other properties you need
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.sendStatus(200);
    return;
  }
  res.sendStatus(500);
});

router.post("/users/login", (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null);
  });
});

router.get("/user", passport.authenticate("jwt"), (req, res) =>
  User.findOne({
    where: { id: req.user.id },
    // , include: [User]
  })
    .then((userData) => res.json(userData))
    .catch((err) => console.log(err))
);

router.get(
  "/users/:username",
  passport.authenticate("jwt"),
  async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      include: [Post],
    });

    const publicPosts = await user.posts.filter(
      (post) => post.isDraft !== true
    );

    const totalResults = {
      username: user.username,
      posts: publicPosts,
      bio: user.bio,
    };
    res.json(totalResults);
  }
);

router.put("/users/bio", passport.authenticate("jwt"), async (req, res) => {
  try {
    const bioUpdate = await User.update(req.body, {
      where: { id: req.user.id },
    });
    const updatedUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    res.json(updatedUser.bio);
  } catch {
    console.log(err);
    res.json(500);
  }
});

//route to send email to user who forgot password
router.post("/users/forgot", async (req, res) => {
  const newResetPasswordKey = {
    resetPasswordKey: resetPasswordKey(10),
  };

  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(404).send("user with that email not found");
    return;
  }
  const updateUser = await User.update(newResetPasswordKey, {
    where: { email: req.body.email },
  });
  const email = await main(user.email, newResetPasswordKey.resetPasswordKey);
  res
    .status(200)
    .send(
      "An email has been sent! Please make sure to check your spam folder :))"
    );
});

router.put("/users/password", async (req, res) => {
  const user = await User.findOne({
    where: { resetPasswordKey: req.body.resetPasswordKey },
  });

  if (!user) {
    res.status(404).send("update password failed. User not found.");
    return;
  }

  if (user.username === req.body.username) {
    User.resetPassword(
      req.body.username,
      req.body.newPassword,
      req.body.resetPasswordKey,
      (err, user) => {
        if (err) {
          console.log(err);

          res
            .status(500)
            .send(
              "an error occurred with updating your password. Please make sure you put all info in correctly"
            );

          return;
        } else {
          res.status(200).send("password successfully changed!");
          return;
        }
      }
    );
  }
});

module.exports = router;
