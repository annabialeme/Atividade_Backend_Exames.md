const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController")

router.get("/report/csv", reportController.exportExameCSV);

router.get("/report/pdf", reportController.exportExamePDF)

module.exports = router;