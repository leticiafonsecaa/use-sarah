const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Pasta onde o arquivo do banco vai ficar
const pastaBanco = path.join(__dirname, '..', '..', 'database');
fs.mkdirSync(pastaBanco, { recursive: true });

// Abre (ou cria) o arquivo do banco
const db = new Database(path.join(pastaBanco, 'sarah.db'));

// Cria a tabela de produtos se ela ainda não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    nome           TEXT    NOT NULL,
    descricao      TEXT    NOT NULL DEFAULT '',
    preco_centavos INTEGER NOT NULL CHECK (preco_centavos > 0),
    categoria      TEXT    NOT NULL CHECK (categoria IN ('signature', 'essence')),
    imagem         TEXT,
    visivel        INTEGER NOT NULL DEFAULT 1,
    criado_em      TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;