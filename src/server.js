// Importa as bibliotecas que vamos usar
const express = require('express');
const path = require('path');

// Cria o aplicativo (o servidor)
const app = express();

// Porta onde o site vai rodar (3000 se nenhuma outra for definida)
const PORT = process.env.PORT || 3000;

// Entrega os arquivos da pasta "public" (HTML, CSS, imagens)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Liga o servidor
app.listen(PORT, () => {
  console.log(`Site da Sarah rodando na porta ${PORT}`);
});