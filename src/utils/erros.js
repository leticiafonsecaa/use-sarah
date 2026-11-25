// Erro usado quando o dado enviado não respeita uma regra de negócio
class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
  }
}

module.exports = { ErroDeValidacao };