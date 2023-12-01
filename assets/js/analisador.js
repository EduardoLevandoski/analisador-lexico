function verificaPalavraTabela(event) {
  escreveRegras(null, false, null);
  var inputValue = document.getElementById("input-palavra").value;
  var span = document.getElementById("valida-palavra");

  if (inputValue === "" || inputValue === "undefined") {
    defineSpan(span, null);
    return;
  }

  const palavras = inputValue.split(" ");
  var validacao = true;
  var ultimaRegra = null;

  for (let i = 0; i < palavras.length; i++) {
    var palavra = palavras[i];
    var regraAtual = regraInicial;

    for (let j = 0; j < palavra.length; j++) {
      var letra = palavra[j];

      if (!alfabeto.includes(letra) || !verificaLetra(regraAtual, letra)) {
        validacao = false;
        ultimaRegra = regraAtual;
        break;
      }

      ultimaRegra = regraAtual;
      regraAtual = retornaRegraLetra(regraAtual, letra);
    }

    if (
      event.which === 32 &&
      regraAtual.descricao !== regraFinal.descricao &&
      palavra !== "undefined" &&
      palavra !== ""
    ) {
      validacao = false;
      ultimaRegra = regraAtual;
    }
  }

  defineSpan(span, validacao);

  if (validacao) {
    var ultimaPalavra = palavras[palavras.length - 1];
    var ultimaLetra = ultimaPalavra.charAt(ultimaPalavra.length - 1);
    escreveRegras(ultimaRegra, true, ultimaLetra);
  } else {
    escreveRegras(
      ultimaRegra,
      false,
      null,
    );
  }
}
