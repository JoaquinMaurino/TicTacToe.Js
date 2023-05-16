const boardGame = document.getElementById("boardGame");
const infoDisplay = document.getElementById("info");
const btnReset = document.getElementById("reset");

//Array con 9 strings vacios, que van a ser las celdas
const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "Circle";
infoDisplay.textContent = "Circle goes first";

//Funcion que crea una celda(div, con la clase 'square') por cada componente del array => startCells
//tambien les otorga un evento click que ejecuta la funcion addGo
function createCells() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    boardGame.append(cellElement);
  });
}
createCells();

//Funcion que crea un div y lo inserta dentro de la celda clickeada
function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "Circle" ? "Cross" : "Circle";
  infoDisplay.textContent = `It is ${go}´s turn now`;
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allCells = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allCells[cell].firstChild?.classList.contains("Circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      infoDisplay.style.color = "blue";
      infoDisplay.style.scale = 1.4;
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
      btnReset.classList.remove("hide");
    }
  });
  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allCells[cell].firstChild?.classList.contains("Cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      infoDisplay.style.color = "red";
      infoDisplay.style.scale = 1.4;
      allCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
      btnReset.classList.remove("hide");
    }
  });
  if (
    Array.from(allCells).every((cell) => cell.firstChild !== null)
  ) {
    infoDisplay.textContent = "It's a draw!";
    infoDisplay.style.color = "green";
    infoDisplay.style.scale = 1.4;
    btnReset.classList.remove("hide");
  }
}

btnReset.addEventListener("click", () => {
  location.reload();
});
