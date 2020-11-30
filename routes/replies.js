// const router = require("express").Router();
const router = require("express").Router();
const ctrl = require("../controllers");

router.post("/byquestion/",ctrl.replies.create1);//This is the way to take add a reply that is connected to question
/* Example of what the body should look like for this route
{
    "reply": "Wow thats a terrible question",
    "questId": "5fc1cd745676274a9e97e531"
}
*/ 

router.get("/",ctrl.replies.index);
router.get("/:id",ctrl.replies.show);
router.post("/",ctrl.replies.create);
router.put("/:id",ctrl.replies.update);
router.delete("/:id",ctrl.replies.destroy);

module.exports = router;