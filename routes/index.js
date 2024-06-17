var express = require("express");
var axios = require("axios");
var router = express.Router();

router.get("/health", function (req, res) {
  res.end("ok");
});

router.post("/signin", async function (req, res) {
  try {
    const data = {
      email: req.body?.email,
      password: req.body?.password,
      returnSecureToken: true,
    };

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`;

    const response = await axios.post(url, data);

    const { idToken, localId, expiresIn } = response.data;

    return res.json({ idToken, localId, expiresIn });
  } catch (err) {
    const error = err?.response?.data?.error;

    if (error.code === 400) {
      res.status(error.code);

      return res.json({
        error: {
          message: "Invalid login credentials.",
        },
      });
    }

    res.status(500);

    return res.json({
      error: {
        message: "Oops! some error occurred.",
      },
    });
  }
});

router.post("/signup", async function (req, res) {
  try {
    const data = {
      email: req.body?.email,
      password: req.body?.password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`;

    const response = await axios.post(url, data);

    const { idToken, localId, expiresIn } = response.data;

    return res.json({ data: { idToken, localId, expiresIn } });
  } catch (err) {
    const error = err?.response?.data?.error;

    if (error.code === 400) {
      if (error.message === "EMAIL_EXISTS") {
        res.status(error.code);

        return res.json({
          error: {
            message: "Email already exists.",
          },
        });
      }

      res.status(error.code);

      return res.json({
        error: {
          message: "Error during sign up.",
        },
      });
    }

    res.status(500);

    return res.json({
      error: {
        message: "Oops! some error occurred.",
      },
    });
  }
});

router.get("/ingredients", async function (req, res) {
  try {
    const { data } = await axios.get(
      `${process.env.FIREBASE_BASE_URL}/ingredients.json`
    );

    if (data) {
      return res.json({ ...data });
    }

    res.status(404);

    return res.json({
      error: {
        message: "Ingredients not found.",
      },
    });
  } catch (err) {
    res.status(500);

    return res.json({
      error: {
        message: "Oops! some error occurred.",
      },
    });
  }
});

module.exports = router;
