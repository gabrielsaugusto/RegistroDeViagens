-- Criando o banco de dados
CREATE TABLE IF NOT EXISTS viagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destino TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data TEXT,
    avaliacao INTEGER
)

-- Comando para executar e criar o banco
-- sqlite3 database/diario.db < database/setup.sql 
