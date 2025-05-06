const pool = require("../config/database");

const getAllExames = async (tipo_exame) => {
    if(!tipo_exame){
    const result = await pool.query("SELECT * FROM exames");
    return result.rows;
    } else {
        const result = await pool.query("SELECT * FROM exames WHERE tipo_exame ILIKE $1", [`%${tipo_exame}`])
        return result.rows;
    }
};

const getExameById = async (id) => {
    const result = await pool.query("SELECT * FROM exames WHERE id = $1", [id]);
    return result.rows[0];
};

const createExame = async (tipo_exame) => {
    const result = await pool.query(
        "INSERT INTO exames (tipo_exame) VALUES ($1, $2) RETURNING *",
        [tipo_exame]
    );
    return result.rows[0];
};

const updateExame = async (id, tipo_exame) => {
    const result = await pool.query(
        "UPDATE exames SET tipo_exame = $1 WHERE id = $3 RETURNING *",
        [tipo_exame, id]
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



module.exports = {getAllExames, getExameById, createExame, updateExame, deleteExame};