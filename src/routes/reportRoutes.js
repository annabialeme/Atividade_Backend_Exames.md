const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController")
const apiKeyMiddleware = require("../config/apiKey");

router.get("/report/csv", reportController.exportExameCSV);
router.get("/report/pdf", reportController.exportExamePDF);
router.use(apiKeyMiddleware);

module.exports = router;