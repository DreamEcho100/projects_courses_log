const { Router } = require("express");

const router = new Router();

router.get("/", (request, response) => {
  response.json({
    generation: request.app.locals.engine.generation.newDragon(),
  });
});

module.exports = router;
