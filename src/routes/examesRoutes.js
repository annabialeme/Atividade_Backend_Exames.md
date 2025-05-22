const express = require("express");
const router = express.Router();
const examesController = require("../controllers/examesController.js");
const upload = require("../config/upload.js");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

router.get("/exames", examesController.getAllExames);
router.get("/exames/:id", examesController.getExame);
router.post("/exames", upload.single("photo"), examesController.createExame);
router.put("/exames/:id", examesController.updateExame);
router.delete("/exames/:id", examesController.deleteExame);


module.exports = router;