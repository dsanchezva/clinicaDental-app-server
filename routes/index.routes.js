const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
})

const treatmentsRoute = require("./treatments.routes")
router.use('/treatments', treatmentsRoute)

const userRoute = require("./user.routes")
router.use('/user', userRoute)

const teamRoute = require("./team.routes")
router.use('/team', teamRoute)

module.exports = router;
