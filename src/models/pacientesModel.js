const pool = require("../config/database");

const pool = require("../config/database");

const getPaciente = async () => {
    const result = await pool.query(
        `SELECT pacientes.*, pacientes.name AS pacientes_name 
        FROM pacientes 
        LEFT JOIN pacientes ON pacientes.paciente_id = pacientes.id`
    );
    return result.rows;
};

const getAllPacientes = async () => {
    const result = await pool.query("SELECT * FROM pacientes");
    return result.rows
}

const getPacienteById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM pacientes
        WHERE id = $1`, [id]
    );
    return result.rows[0];
};

const createPaciente = async (id, name, idade, paciente_id, photo) => {
    const result = await pool.query(
        "INSERT INTO pacientes (name, idade, paciente_id, photo) VALUES ($1, $2, $3) RETURNING *",
        [name, idade, paciente_id, photo]
    );
    return result.rows[0];
};

const updatedPaciente = async (id, name, idade, paciente_id) => {
    const result = await pool.query(
        "UPDATE pacientes SET name = $1, idade = $2, paciente_id = $3 WHERE id = $4 RETURNING *",
        [name, idade, paciente_id, id]
    );
    return result.rows[0];
};

const deletePaciente = async (id) => {
    const result = await pool.query("DELETE FROM pacientes WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Paciente não encontradp." };
    }

    return { message: "Paciente deletado com sucesso." };
};

module.exports = { getPaciente, getAllPacientes, getPacienteById, createPaciente, updatedPaciente, deletePaciente};