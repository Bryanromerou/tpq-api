// const router = require("express").Router();
const router = require("express").Router();
const ctrl = require("../controllers");


router.get("/",ctrl.questions.index);
router.get("/:id",ctrl.questions.show);
router.post("/",ctrl.questions.create);

module.exports = router;