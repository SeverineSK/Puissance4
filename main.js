var joueurRed = "R";
var joueurYellow = "Y";
var joueuractu = joueurRed;

var perdu = false;
var jeu;
var colonnesactu;

var rows = 6;
var colonnes = 7;



window.onload = function () {
  setJeu();
};


function setJeu() {
  jeu = [];
  colonnesactu = [5, 5, 5, 5, 5, 5, 5];

  for (let a = 0; a < rows; a++) {
    let row = [];
    for (let b = 0; b < colonnes; b++) {
      row.push(" ");

      let cases = document.createElement("div");
      cases.id = a.toString() + "-" + b.toString();
      cases.classList.add("cases");
      cases.addEventListener("click", setPiece);
      document.getElementById("jeu").append(cases);
    }
    jeu.push(row);
  }
}

function setPiece() {
  if (perdu) {
    return;
  }

  let cords = this.id.split("-");
  let a = parseInt(cords[0]);
  let b = parseInt(cords[1]);

  a = colonnesactu[b];
  if (a < 0) {
    return;
  }

  // vérifier si la colonne est pleine
  let colonnePleine = true;
  for (let i = 0; i < rows; i++) {
    if (jeu[i][b] === " ") {
      colonnePleine = false;
      break;
    }
  }
  
  if (colonnePleine) {
    alert("Game Over");
    perdu = true;
    return;
  }

  jeu[a][b] = joueuractu;
  let cases = document.getElementById(a.toString() + "-" + b.toString());
  if (joueuractu == joueurRed) {
    cases.classList.add("red-piece");
    joueuractu = joueurYellow;
  } else {
    cases.classList.add("yellow-piece");
    joueuractu = joueurRed;
  }

  a -= 1;
  colonnesactu[b] = a;

  checkWinner();
}

function checkWinner() {
  // gagner à l'horizontal
  for (let a = 0; a < rows; a++) {
    for (let b = 0; b < colonnes - 3; b++) {
      if (jeu[a][b] != " ") {
        if (
          jeu[a][b] == jeu[a][b + 1] &&
          jeu[a][b + 1] == jeu[a][b + 2] &&
          jeu[a][b + 2] == jeu[a][b + 3]
        ) {
          setWinner(a, b);
          return;
        }
      }
    }
  }

  //gagner à la verticale
  for (let b = 0; b < colonnes; b++) {
    for (let a = 0; a < rows - 3; a++) {
      if (jeu[a][b] != " ") {
        if (
          jeu[a][b] == jeu[a + 1][b] &&
          jeu[a + 1][b] == jeu[a + 2][b] &&
          jeu[a + 2][b] == jeu[a + 3][b]
        ) {
          setWinner(a, b);
          return;
        }
      }
    }
  }

  //gagner à la diagonal gauche
  for (let a = 0; a < rows - 3; a++) {
    for (let b = 0; b < colonnes - 3; b++) {
      if (jeu[a][b] != " ") {
        if (
          jeu[a][b] == jeu[a + 1][b + 1] &&
          jeu[a + 1][b + 1] == jeu[a + 2][b + 2] &&
          jeu[a + 2][b + 2] == jeu[a + 3][b + 3]
        ) {
          setWinner(a, b);
          return;
        }
      }
    }
  }

  //gagner à la diagonal droite
  for (let a = 3; a < rows; a++) {
    for (let b = 0; b < colonnes - 3; b++) {
      if (jeu[a][b] != " ") {
        if (
          jeu[a][b] == jeu[a - 1][b + 1] &&
          jeu[a - 1][b + 1] == jeu[a - 2][b + 2] &&
          jeu[a - 2][b + 2] == jeu[a - 3][b + 3]
        ) {
          setWinner(a, b);
          return;
        }
      }
    }
  }
}


function setWinner(a, b) {
  let winner = document.getElementById("winner");
  if (jeu[a][b] == joueurRed) {
    winner.innerText = "Red WINNER";
    A++;
    pointRed.innerHTML = A;
    localStorage.setItem(A);
    
  } else {
    winner.innerText = "Yellow WINNER";
    B++;
    pointYellow.innerHTML = B;
    localStorage.setItem(A);
  }
  perdu = true;
}



const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function() {
  window.location.reload();
});

restartBtn.addEventListener("click", function() {
  window.location.href = 'index.html'; 
});

let joueurRedPoints = 0;
let joueurYellowPoints = 0;joueurRedPoints++;
