CREATE DATABASE exames;

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    idade TEXT,
    tipo_exame VARCHAR(100) NOT NULL
);

CREATE TABLE exames (
    id SERIAL PRIMARY KEY,
    exame VARCHAR(100) NOT NULL,
    paciente_id INTEGER REFERENCES pacientes(id) ON DELETE SET NULL
);

INSERT INTO pacientes (name, idade, tipo_exame) VALUES 
    ('Anna Leme', '17', 'Exame de Sangue'),
    ('Beatriz', '17', 'Exame de Urina'),
    ('Walisson', '22', 'Tomografia'),
    ('Melissa', '4', 'Papanicolau');
  

INSERT INTO exames (exame, paciente_id) VALUES 
    ('Exames Laboratoriais', 1),
    ('Exames Laboratoriais', 2),
    ('Exame de Imagem', 3),
    ('Exame Específico', 4);
