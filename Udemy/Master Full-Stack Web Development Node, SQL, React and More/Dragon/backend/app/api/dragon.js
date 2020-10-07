const { Router } = require("express");

const router = new Router();

router.get("/new", (request, response) => {
  response.json({ dragon: request.app.locals.engine.generation.newDragon() });
});

module.exports = router;
