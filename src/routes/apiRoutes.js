const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const validator = require("../middlewares/validator");

router.post("/orders", validator.validateOrder, apiController.createOrder);
router.get("/orders", apiController.getOrders);

module.exports = router;
