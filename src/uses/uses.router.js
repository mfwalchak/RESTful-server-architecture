const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router
  .route("/:useId")
  .get(controller.read)
  // .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);


router
  .route("/")
  .get(controller.list)
  // .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;