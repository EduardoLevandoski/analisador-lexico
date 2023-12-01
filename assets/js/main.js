const alfabeto = "abcdefghijklmnopqrstuvwxyz";
dicionario = [];
regras = [];
var regraFinal;
var regraInicial;

document.addEventListener("DOMContentLoaded", function () {
  escreveRegras(null, null, null);
});

window.addEventListener("load", (event) => {
  document
    .getElementById("input-token")
    .addEventListener("keyup", (eventKeyup) => {
      eventKeyup.preventDefault();

      if (eventKeyup.key === "Enter") {
        adicionaPalavra();
      }

      if (eventKeyup.key == "Delete") {
        removePalavra();
      }
    });

  document.addEventListener("keyup", (eventKeyup) => {
    eventKeyup.preventDefault();

    if (eventKeyup.altKey && eventKeyup.key === "1") {
      document.getElementById("input-token").focus();
    }

    if (eventKeyup.altKey && eventKeyup.key === "2") {
      document.getElementById("input-palavra").focus();
    }
  });
});

window.addEventListener("load", (event) => {
  document
    .getElementById("input-palavra")
    .addEventListener("keyup", (eventKeyup) => {
      verificaPalavraTabela(eventKeyup);
    });
});
