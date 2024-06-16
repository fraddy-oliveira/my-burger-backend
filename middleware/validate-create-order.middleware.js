const validateCreateOrderMiddleware = async (req, res, next) => {
  const ingredientsFields = ["bacon", "cheese", "meat", "salad"];

  for (let index = 0; index < ingredientsFields.length; index++) {
    if (
      req.body?.ingredients?.[ingredientsFields[index]] &&
      typeof req.body?.ingredients?.[ingredientsFields[index]] !== "number"
    ) {
      res.status(400);

      return res.json({
        error: {
          message: `Ingredient field (${ingredientsFields[index]}) should be number.`,
        },
      });
    }
  }

  const customerFields = [
    "country",
    "deliveryMethod",
    "email",
    "name",
    "postalCode",
    "street",
  ];

  for (let index = 0; index < customerFields.length; index++) {
    if (!req.body?.customer?.[customerFields[index]]) {
      res.status(400);

      return res.json({
        error: {
          message: `Customer field (${customerFields[index]}) should be number.`,
        },
      });
    }
  }

  if (!req.body?.price) {
    res.status(400);

    return res.json({
      error: {
        message: `Price field (price) is required.`,
      },
    });
  }

  if (req.body?.price && typeof req.body?.price !== "number") {
    res.status(400);

    return res.json({
      error: {
        message: `Price field (price) should be number.`,
      },
    });
  }

  next();
};

module.exports = validateCreateOrderMiddleware;
