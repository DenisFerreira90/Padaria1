// Função para calcular o valor
function calcularValor() {
    var precoQuilo = parseFloat(document.getElementById('precoQuilo').value);
    var quantidadeGramas = parseFloat(document.getElementById('quantidadeGramas').value);

    if (isNaN(precoQuilo) || isNaN(quantidadeGramas)) {
        document.getElementById('result').innerHTML = 'Preencha os valores corretamente.';
    } else {
        var valorTotal = (precoQuilo / 1000) * quantidadeGramas; // Converter preço para grama
        document.getElementById('result').innerHTML = 'O valor é R$ ' + valorTotal.toFixed(2);
    }
}

// Função para exibir a ajuda
function exibirAjuda() {
    alert('Esta é uma calculadora simples que permite calcular o valor com base no preço por grama. Insira o preço por quilo e a quantidade de gramas e clique em "Calcular". O resultado será exibido abaixo.');
}





