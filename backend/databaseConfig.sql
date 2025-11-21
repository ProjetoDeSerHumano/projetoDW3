--Tabela 1: Autor
CREATE TABLE  IF NOT EXISTS Autor (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL, 
    Nacionalidade VARCHAR(50),
    Removido BOOLEAN NOT NULL DEFAULT FALSE
);

--Tabela 2: Livro (Relacionamento 1:N com Autores - 1 autor pode escrever vários livros/1 livro só pode ser escrito por 1 autor nesse caso simplificado)
CREATE TABLE IF NOT EXISTS Livro (
    ID SERIAL PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    AutorID INT NOT NULL, 
    DataPublicacao DATE NOT NULL, 
    EdicaoCusto DECIMAL(6, 2) NOT NULL, 
    Removido BOOLEAN NOT NULL DEFAULT FALSE, 
    FOREIGN KEY (AutorID) REFERENCES Autor(ID)
);

--Tabela 3: Leitor
CREATE TABLE  IF NOT EXISTS Leitor (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL, 
    Email VARCHAR(100) UNIQUE,
    Telefone VARCHAR(20),
    Removido BOOLEAN NOT NULL DEFAULT FALSE 
);

--Tabela 4: Emprestimo (Relacionamento N:N entre Livro e Cliente - 1 Cliente pode pegar vários livros/1 livro pode ser pego por vários clientes)
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

--Tabela 5: Usuários
CREATE EXTENSION if NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

--INSERT na tabela usuarios para teste
INSERT INTO usuarios values
    (default, 'admin', crypt('admin', gen_salt('bf')), false), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf')), false) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;