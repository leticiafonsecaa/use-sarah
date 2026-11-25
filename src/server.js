const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Arquivos públicos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.use('/api/produtos', require('./routes/produtoRoutes'));

app.listen(PORT, () => {
  console.log(`Site da Sarah rodando na porta ${PORT}`);
});