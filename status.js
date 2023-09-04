// Defina uma classe ou função construtora para criar objetos
function LaunchHandler() {
    this.status = "Pendente";
}

// Adicione métodos ao protótipo da classe ou função construtora
LaunchHandler.prototype.iniciarLancamento = function() {
    this.status = "Iniciando o lançamento";
};

// Crie uma instância do objeto
const launch_handler = new LaunchHandler();

// Agora você pode usar o objeto e seus métodos/propriedades
console.log("Status antes do lançamento:", launch_handler.status);
launch_handler.iniciarLancamento();
console.log("Status após o lançamento:", launch_handler.status);
