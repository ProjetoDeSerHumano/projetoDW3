CREATE TABLE  IF NOT EXISTS Autor (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL, 
    Nacionalidade VARCHAR(50),
    Removido BOOLEAN NOT NULL DEFAULT FALSE
);

---

CREATE TABLE  IF NOT EXISTS Leitor (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL, 
    Email VARCHAR(100) UNIQUE,
    Telefone VARCHAR(20)
    Removido BOOLEAN NOT NULL DEFAULT FALSE 
);

---

CREATE TABLE IF NOT EXISTS Livro (
    ID SERIAL PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    AutorID INT NOT NULL, 
    DataPublicacao DATE NOT NULL, 
    EdicaoCusto DECIMAL(6, 2) NOT NULL, 
    Removido BOOLEAN NOT NULL DEFAULT FALSE, 
    FOREIGN KEY (AutorID) REFERENCES Autor(ID)
);

---

CREATE TABLE  IF NOT EXISTS Emprestimo (
    ID SERIAL PRIMARY KEY,
    LeitorID INT NOT NULL,
    LivroID INT NOT NULL, 
    DataEmprestimo DATE NOT NULL,
    DataDevolucaoPrevista DATE, 
    Status VARCHAR(50) NOT NULL,
    Removido BOOLEAN NOT NULL DEFAULT FALSE, 
    FOREIGN KEY (LeitorID) REFERENCES Leitor(ID),
    FOREIGN KEY (LivroID) REFERENCES Livro(ID)
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

insert into usuarios values
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;