const pool = require("../config/database");

const getAllPacientes = async (tipo_exame) => {
    if(!tipo_exame){
    const result = await pool.query("SELECT * FROM pacientes");
    return result.rows;
    } else {
        const result = await pool.query("SELECT * FROM pacientes WHERE tipo_exame ILIKE $1", [`%${tipo_exame}`])
        return result.rows;
    }
};

const getPacienteById = async (id) => {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [id]);
    return result.rows[0];
};

const createPaciente = async (name, idade, tipo_exame) => {
    const result = await pool.query(
        "INSERT INTO pacientes (name, idade, tipo_exame) VALUES ($1, $2, $3) RETURNING *",
        [name, idade, tipo_exame]
    );
    return result.rows[0];
};

const updatePaciente = async (id, name, idade, tipo_exame, paciente_id) => {
    const result = await pool.query(
        "UPDATE pacientes SET name = $1, idade = $2, tipo_exame = $3, paciente_id = $4 WHERE id = $5 RETURNING *",
        [name, idade, tipo_exame, paciente_id, id]
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