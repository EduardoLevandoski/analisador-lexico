function limpaRegras() {
  regras = [];
  regraInicial = null;
  regraFinal = null;
}

function limpaCampos() {
  document.getElementById("input-token").value = "";
  document.getElementById("input-palavra").value = "";

  var span = document.getElementById("valida-palavra");
  span.className = "default";
  span.innerText = "-";
}

function defineSpan(span, valida) {
  if (valida === true) {
    span.innerText = "Válido";
    span.className = "valido";
  } else if (valida === false) {
    span.innerText = "Inválido";
    span.className = "invalido";
  } else {
    span.innerText = "-";
    span.className = "default";
  }
}

function defineCampo(campo, validacao, destaca) {
  if (validacao) {
    campo.className = destaca ? "destacaCampoLight" : "destacaCampo";
  } else {
    campo.className = destaca
      ? "destacaCampoInvalidoLight"
      : "destacaCampoInvalido";
  }
}

function retornaRegraLetra(regra, letra) {
  return regra.listaRegras.find((item) => item.letra === letra)?.regra || null;
}

function retornaRegraDesc(regra, letra) {
  return (
    regra.listaRegras.find((item) => item.letra === letra)?.regra.descricao ||
    "-"
  );
}

function retornaIndexLetra(letra) {
  return alfabeto.indexOf(letra);
}

function verificaLetra(regra, letra) {
  return regra.listaRegras.some((item) => item.letra === letra);
}

function validaPalavra(palavra) {
  if (palavra === "") {
    return;
  }

  if (dicionario.includes(palavra)) {
    return false;
  }

  for (let i = 0; i < palavra.length; i++) {
    var letra = palavra[i];
    if (!alfabeto.includes(letra)) {
      alert(
        "Não é possível incluir uma palavra com letras que não estão no alfabeto!"
      );
      return false;
    }
  }

  return true;
}

function adicionaPalavraAoDicionario(palavra) {
  dicionario.push(palavra);
}

function removePalavraDoDicionario(palavraRemover) {
  var index = dicionario.indexOf(palavraRemover);
  if (index !== -1) {
    dicionario.splice(index, 1);
  }
}
