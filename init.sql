-- Crear tabla de equipos y roles
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL, -- 'lider' o 'asesor'
    equipo VARCHAR(50) NOT NULL, -- 'NATURGY BAN CAU', 'NATURGY ENERGIA SAN JUAN', 'NATURGY NOA CAU', 'TODOS'
    nombre_completo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nominas (
    id SERIAL PRIMARY KEY,
    legajo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    lider VARCHAR(100) NOT NULL,
    turno VARCHAR(10) NOT NULL,
    equipo VARCHAR(50) NOT NULL
);

-- Insertar Líderes
INSERT INTO usuarios (usuario, password, rol, equipo, nombre_completo) VALUES
('kparra', 'Adminkary2026*', 'lider', 'TODOS', 'Karina Parra'),
('lherrera', 'Adminlei2026*', 'lider', 'TODOS', 'Leila Herrera')
ON CONFLICT (usuario) DO NOTHING;

-- Insertar Asesores BAN CAU
INSERT INTO usuarios (usuario, password, rol, equipo, nombre_completo) VALUES
('mquintana', 'OperMeli2026*', 'asesor', 'NATURGY BAN CAU', 'Quintana Melisa'),
('aescobar', 'OperAri2026*', 'asesor', 'NATURGY BAN CAU', 'Escobar Ariana Lucia'),
('aherbas', 'OperAle2026*', 'asesor', 'NATURGY BAN CAU', 'Herbas Alejandra'),
('frios', 'OperFran2026*', 'asesor', 'NATURGY BAN CAU', 'Rios Gian Franco Gabriel'),
('lganino', 'OperLucho2026*', 'asesor', 'NATURGY BAN CAU', 'Ganino Luciano Ian'),
('carce', 'OperCande2026*', 'asesor', 'NATURGY BAN CAU', 'Arce Candela'),
('arios', 'OperAxel2026*', 'asesor', 'NATURGY BAN CAU', 'Rios Axel Rodrigo'),
('fruiz', 'OperFlor2026*', 'asesor', 'NATURGY BAN CAU', 'Ruiz Dominguez Florencia Azul'),
('vgarcia', 'OperVicky2026*', 'asesor', 'NATURGY BAN CAU', 'Garcia Victoria Maria'),
('vgonzalez', 'OperVane2026*', 'asesor', 'NATURGY BAN CAU', 'Gonzalez Vanesa'),
('nbogado', 'OperNadu026*', 'asesor', 'NATURGY BAN CAU', 'Bogado Barreto Nadia Noemi'),
('sgonzalez', 'OperSan2026*', 'asesor', 'NATURGY BAN CAU', 'Gonzalez Sandra')
ON CONFLICT (usuario) DO NOTHING;

-- Insertar Nómina Oficial BAN
INSERT INTO nominas (legajo, nombre, lider, turno, equipo) VALUES
('21740', 'Quintana Melisa', 'Parra Karina', 'TM', 'NATURGY BAN CAU'),
('22432', 'Escobar Ariana Lucia', 'Parra Karina', 'TT', 'NATURGY BAN CAU'),
('22436', 'Herbas Alejandra', 'Parra Karina', 'TT', 'NATURGY BAN CAU'),
('22438', 'Rios Gian Franco Gabriel', 'Parra Karina', 'TM', 'NATURGY BAN CAU'),
('22434', 'Ganino Luciano Ian', 'Herrera Leila', 'TM', 'NATURGY BAN CAU'),
('22439', 'Arce Candela', 'Herrera Leila', 'TM', 'NATURGY BAN CAU'),
('22440', 'Rios Axel Rodrigo', 'Herrera Leila', 'TM', 'NATURGY BAN CAU'),
('22441', 'Ruiz Dominguez Florencia Azul', 'Herrera Leila', 'TT', 'NATURGY BAN CAU'),
('22442', 'Garcia Victoria Maria', 'Herrera Leila', 'TT', 'NATURGY BAN CAU'),
('23827', 'Gonzalez Vanesa', 'Herrera Leila', 'TM', 'NATURGY BAN CAU'),
('23759', 'Bogado Barreto Nadia Noemi', 'Herrera Leila', 'TM', 'NATURGY BAN CAU'),
('311198', 'Gonzalez Sandra', 'Herrera Leila', 'TM', 'NATURGY BAN CAU')
ON CONFLICT (legajo) DO NOTHING;