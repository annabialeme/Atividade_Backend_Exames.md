const pacientesModel = require("../models/pacientesModel");

const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await pacientesModel.getAllPacientes();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pacientes." });
    }
};

const getPaciente = async (req, res) => {
    try {
        const paciente = await pacientesModel.getPacienteById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente não encontrado." });
        }
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar paciente." });
    }
};

const createPaciente = async (req, res) => {
    try {
        const { name, idade } = req.body;
        const newPaciente = await pacientesModel.createPaciente(name, idade);
        res.status(201).json(newPaciente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar paciente." });
    }
};

const updatePaciente = async (req, res) => {
    try {
        const { name, idade } = req.body;
        const updatedPaciente = await pacientesModel.updatePaciente(req.params.id, name, idade);
        if (!updatedPaciente) {
            return res.status(404).json({ message: "Paciente não encontrado." });
        }
        res.json(updatedPaciente);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar paciente." });
    }
};

const deletePaciente = async (req, res) => {
    try {
        const message = await pacientesModel.deletePaciente(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar paciente." });
    }
};

module.exports = { getAllPacientes, getPaciente, createPaciente, updatePaciente, deletePaciente };