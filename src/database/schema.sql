CREATE DATABASE exames;

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    idade INTEGER
);

CREATE TABLE exames (
    id SERIAL PRIMARY KEY,
    tipo_exame VARCHAR(100) NOT NULL,
    paciente_id INTEGER REFERENCES pacientes(id) ON DELETE SET NULL
);

INSERT INTO pacientes (name, idade) VALUES 
    ('Anna Leme', '17'),
    ('Beatriz', '17'),
    ('Walisson', '22'),
    ('Gabriel', '4');
  

INSERT INTO exames (tipo_exame, paciente_id) VALUES 
    ('Exame de Sangue', 1),
    ('Exame de Urina', 2),
    ('Tomografia', 3),
    ('Radiografia', 4);
