const pool = require("../config/database");

const getAllPacientes = async () => {
    const result = await pool.query("SELECT * FROM pacientes");
    return result.rows
}

const getPacienteById = async (id) => {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
    return result.rows[0];
};

const createPaciente = async (name, idade) => {
    const result = await pool.query(
        "INSERT INTO pacientes (name, idade) VALUES ($1, $2) RETURNING *",
        [name, idade]
    );
    return result.rows[0];
};

const updatePaciente = async (id, name, idade) => {
    const result = await pool.query(
        "UPDATE pacientes SET name = $1, idade = $2, WHERE id = $3 RETURNING *",
        [name, idade, id]
    );
    return result.rows[0];
};

const deletePaciente = async (id) => {
    const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Paciente não encontrado." };
    }

    return { message: "Paciente deletado com sucesso." };
};

module.exports = { getAllPacientes, getPacienteById, createPaciente, updatePaciente, deletePaciente};