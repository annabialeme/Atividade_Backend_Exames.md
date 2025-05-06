const pool = require("../config/database");

const getExame = async () => {
    const result = await pool.query(
        `SELECT exames.*, exames.name AS exames_name 
        FROM exames 
        LEFT JOIN exames ON exames.pacientes_id = exames.id`
    );
    return result.rows;
};

const getAllExames = async () => {
    const result = await pool.query("SELECT * FROM exames");
    return result.rows
}

const getExameById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM exames
        WHERE id = $1`, [id]
    );
    return result.rows[0];
};

const createExame = async (id, exame, paciente_id, photo) => {
    const result = await pool.query(
        "INSERT INTO exames (exame, paciente_id, photo) VALUES ($1, $2) RETURNING *",
        [exame, paciente_id, photo]
    );
    return result.rows[0];
};

const updateExame = async (id, exame) => {
    const result = await pool.query(
        "UPDATE exames SET exame = $1 WHERE id = $2 RETURNING *",
        [exame, id]
    );
    return result.rows[0];
};

const deleteExame = async (id) => {
    const result = await pool.query("DELETE FROM exames WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Exame não encontrado." };
    }

    return { message: "Exame deletado com sucesso." };
};



module.exports = {getExame, getAllExames,getExameById, createExame, updateExame, deleteExame};