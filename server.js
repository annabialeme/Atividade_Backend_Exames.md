require("dotenv").config();
const express = require("express");
const cors = require("cors");
const examesRoutes = require("./src/routes/examesRoutes");
const pacientesRoutes = require("./src/routes/pacientesRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api", examesRoutes);
app.use("/api", pacientesRoutes);
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});