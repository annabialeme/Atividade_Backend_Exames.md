const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController")
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

router.get("/report/csv", reportController.exportExameCSV);
router.get("/report/pdf", reportController.exportExamePDF);


module.exports = router;