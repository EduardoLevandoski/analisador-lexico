function adicionaPalavra() {
  var palavra = document.getElementById("input-token").value;

  limpaCampos();

  if (!validaPalavra(palavra)) {
    return;
  }

  adicionaPalavraAoDicionario(palavra);
  escreveDicionario();
  criaRegra(palavra);
  escreveRegras(null, null, null);
}

function removePalavra() {
  var palavraRemover = document.getElementById("input-token").value;

  if (palavraRemover === "") {
    return;
  }

  removePalavraDoDicionario(palavraRemover);
  escreveDicionario();
  limpaRegras();

  dicionario.forEach(function (palavra) {
    criaRegra(palavra);
  });

  escreveRegras(null, null, null);
  limpaCampos();
}

function escreveDicionario() {
  var dicionarioHtml = document.getElementById("dicionario");
  dicionarioHtml.innerHTML = "";

  dicionario.forEach(function (item, index) {
    var button = document.createElement("button");
    button.innerHTML = item;
    button.className = "btn label-btn";

    button.addEventListener("click", function () {
      removePalavraDoDicionario(index);
    });

    dicionarioHtml.appendChild(button);
  });
}

function removePalavraDoDicionario(index) {
  if (index !== -1) {
    dicionario.splice(index, 1);
    escreveDicionario();

    limpaRegras();
    dicionario.forEach(function (palavra) {
      criaRegra(palavra);
    });

    limpaCampos();
    escreveRegras(null, null, null);
  }
}

function criaRegra(palavra) {

  console.log("----------------------------------");
  console.log(palavra);
  console.log("----------------------------------");

  if (typeof regraInicial === "undefined" || regraInicial === null) {
    regraInicial = {
      descricao: "q0",
      listaRegras: [],
    };

    regras.push(regraInicial);
  }

  var ultimaRegra = regraInicial;

  for (let i = 0; i < palavra.length; i++) {
    var letra = palavra[i];
    var proximaRegra = retornaRegraLetra(ultimaRegra, letra);

    if (proximaRegra === null) {
      var novaRegra = criaNovaRegra();

      ultimaRegra.listaRegras.push({
        letra: letra,
        regra: novaRegra,
      });

      ultimaRegra = novaRegra;
    } else {
      ultimaRegra = proximaRegra;
    }

    if (i === palavra.length - 1) {
      regraFinal = ultimaRegra;
      regraFinal.descricao += "*";
    }
  }

  console.log("Regras:");
  console.log(regras);
}

function criaNovaRegra() {
  var desc = "q" + regras.length;
  var novaRegra = {
    descricao: desc,
    listaRegras: [],
  };

  regras.push(novaRegra);
  return novaRegra;
}

function escreveRegras(regraAtual, validacao, letraAtual) {
  var regrasDiv = document.getElementById("regras");

  var tabelaAtual = document.getElementById("regrasTabela");
  if (tabelaAtual) {
    tabelaAtual.remove();
  }

  var tabela = document.createElement("table");
  tabela.className = "table";
  tabela.id = "regrasTabela";

  var tabelaHeader = document.createElement("thead");
  var tabelaRow = document.createElement("tr");

  for (var i = 0; i <= 26; i++) {
    var campoTabela = document.createElement("th");
    if (i == 0) campoTabela.innerHTML = " ";
    else campoTabela.textContent = String.fromCharCode(64 + i);
    tabelaRow.appendChild(campoTabela);
  }

  tabelaHeader.appendChild(tabelaRow);
  tabela.appendChild(tabelaHeader);
  regrasDiv.appendChild(tabela);

  var tabelaBody = document.createElement("tbody");

  for (let i = 0; i < regras.length; i++) {
    var tabelaBodyRow = document.createElement("tr");
    for (let j = -1; j < alfabeto.length; j++) {
      var regra = regras[i];
      var campoTabela = document.createElement(j < 0 ? "th" : "td");
      var campoTabelaTexto;
      if (j < 0) {
        campoTabela.style.backgroundColor = "rgb(130, 150, 200)";
        campoTabelaTexto = document.createTextNode(regra.descricao);
      } else {
        var regraDesc = retornaRegraDesc(regra, alfabeto[j]);
        campoTabelaTexto = document.createTextNode(regraDesc);
        if (regraAtual != null) {
          var indexLetra = retornaIndexLetra(letraAtual);
          if (regra.descricao === regraAtual.descricao && indexLetra === j) {
            defineCampo(campoTabela, validacao, false);
          } else if (
            regra.descricao === regraAtual.descricao ||
            indexLetra === j
          ) {
            defineCampo(campoTabela, validacao, true);
          }
        }
      }
      campoTabela.appendChild(campoTabelaTexto);
      tabelaBodyRow.appendChild(campoTabela);
    }
    tabelaBody.appendChild(tabelaBodyRow);
  }

  tabela.appendChild(tabelaBody);
}
