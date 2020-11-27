// const router = require("express").Router();
const router = require("express").Router();
const ctrl = require("../controllers");


router.get("/",ctrl.replies.index);
router.get("/:id",ctrl.replies.show);
router.post("/",ctrl.replies.create);
router.put("/:id",ctrl.replies.update);
router.delete("/:id",ctrl.replies.destroy);

module.exports = router;