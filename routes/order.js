var express = require("express");
var axios = require("axios");
var validateCreateOrderMiddleware = require("../middleware/validate-create-order.middleware");
var authMiddleware = require("../middleware/auth.middleware");

var router = express.Router();

router.get("/", authMiddleware, async function (req, res) {
  try {
    const { data } = await axios.get(
      `${process.env.FIREBASE_BASE_URL}/orders.json?auth=${req.authToken}`
    );

    const orders = Object.keys(data)
      .map((key) => ({
        customer: data[key]["customer"],
        ingredients: data[key]["ingredients"],
        price: data[key]["price"],
        user_id: data[key]["user_id"],
      }))
      .filter((o) => o.user_id === req.user.user_id);

    return res.json({
      data: orders,
    });
  } catch (err) {
    if (err.response.status === 401) {
      res.status(err.response.status);

      return res.json({
        error: {
          message: "Auth token is invalid.",
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

router.post(
  "/",
  authMiddleware,
  validateCreateOrderMiddleware,
  async function (req, res) {
    try {
      const ingredients = {
        bacon: req.body?.ingredients?.bacon,
        cheese: req.body?.ingredients?.cheese,
        meat: req.body?.ingredients?.meat,
        salad: req.body?.ingredients?.salad,
      };

      const customer = {
        country: req.body?.customer?.country,
        deliveryMethod: req.body?.customer?.deliveryMethod,
        email: req.body?.customer?.email,
        name: req.body?.customer?.name,
        postalCode: req.body?.customer?.postalCode,
        street: req.body?.customer?.street,
      };

      const { data } = await axios.post(
        `${process.env.FIREBASE_BASE_URL}/orders.json?auth=${req.authToken}`,
        {
          customer,
          ingredients,
          price: req.body?.price,
          user_id: req.user.user_id,
        }
      );

      return res.json({ data });
    } catch (err) {
      if (err.response.status === 401) {
        res.status(err.response.status);

        return res.json({
          error: {
            message: "Auth token is invalid.",
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
  }
);

module.exports = router;
