const exameModel = require("../models/examesModel");

const getAllExames = async (req, res) => {
    try {
        const {tipo_exame} = req.query;
        const exames = await exameModel.getAllExames(tipo_exame);
        res.json(exames);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar exames." });
    }
};

const getExame = async (req, res) => {
    try {
        const exame = await exameModel.getExameById(req.params.id);
        if (!exame) {
            return res.status(404).json({ message: "Exame não encontrado." });
        }
        res.json(exame);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar exame." });
    }
};

const createExame = async (req, res) => {
    try {
        const { tipo_exame } = req.body;
        const newExame = await exameModel.createExame(tipo_exame);
        res.status(201).json(newExame);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar exame." });
    }
};

const updateExame = async (req, res) => {
    try {
        const { tipo_exame } = req.body;
        const updatedExame = await exameModel.updateExame(req.params.id, tipo_exame);
        if (!updatedExame) {
            return res.status(404).json({ message: "Exame não encontrado." });
        }
        res.json(updatedExame);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar exame." });
    }
};

const deleteExame = async (req, res) => {
    try {
        const message = await exameModel.deleteExame(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar exame." });
    }
};

module.exports = { getAllExames, getExame, createExame, updateExame, deleteExame };