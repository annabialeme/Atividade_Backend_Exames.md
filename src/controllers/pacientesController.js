const pacientesModel = require("../models/pacientesModel");

const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesModel.getAllPacientes();
    res.json(pacientes);
  } catch (error) {
    console.error("Erro ao buscar todos os pacientes:", error);
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
    console.error("Erro ao buscar paciente:", error);
    res.status(500).json({ message: "Erro ao buscar pacientes." });
  }
};


const createPaciente = async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const novoPaciente = await pacientesModel.createPaciente({ nome, idade });
    res.status(201).json(novoPaciente);
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    res.status(500).json({ message: "Erro ao criar paciente." });
  }
};

const updatePaciente = async (req, res) => {
  try {
    const { nome, idade } = req.body;
    const pacienteAtualizado = await pacientesModel.updatePaciente(req.params.id, { nome, idade });

    if (!pacienteAtualizado) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    res.json(pacienteAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    res.status(500).json({ message: "Erro ao atualizar paciente." });
  }
};


const deletePaciente = async (req, res) => {
  try {
    const resultado = await pacientesModel.deletePaciente(req.params.id);
    res.json(resultado);
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
    res.status(500).json({ message: "Erro ao deletar paciente." });
  }
};

module.exports = {
  getAllPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
};

