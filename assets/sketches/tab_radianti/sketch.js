// Array con i valori notevoli per la conversione
const conversioni = [
  { gradi: "0°", radPi: "0", radDec: "0.00" },
  { gradi: "30°", radPi: "π / 6", radDec: "0.52" },
  { gradi: "45°", radPi: "π / 4", radDec: "0.79" },
  { gradi: "60°", radPi: "π / 3", radDec: "1.05" },
  { gradi: "90°", radPi: "π / 2", radDec: "1.57" },
  { gradi: "120°", radPi: "2π / 3", radDec: "2.09" },
  { gradi: "135°", radPi: "3π / 4", radDec: "2.36" },
  { gradi: "150°", radPi: "5π / 4", radDec: "2.62" },
  { gradi: "180°", radPi: "π", radDec: "3.14" },
  { gradi: "270°", radPi: "3π / 2", radDec: "4.71" },
  { gradi: "360°", radPi: "2π", radDec: "6.28" }
];

function setup() {
  createCanvas(1100, 500);
}

function draw() {
  background(0);
  textFont('Helvetica');

  // Titolo della tabella
  fill(255); noStroke(); textSize(20);
  text("Conversione Angoli: Gradi ➔ Radianti", 40, 45);

  // Intestazione Colonne
  let colX1 = 60, colX2 = 220, colX3 = 420;
  let startY = 100;
  let rigaAltezza = 35;

  fill(140, 145, 160); textSize(14);
  text("Gradi (°)", colX1, startY);
  text("Radianti (Forma π)", colX2, startY);
  text("Radianti (Decimali)", colX3, startY);

  // Linea separatrice intestazione
  stroke(50); strokeWeight(1);
  line(40, startY + 10, 560, startY + 10);

  // Tracciamento delle righe della tabella
  for (let i = 0; i < conversioni.length; i++) {
    let y = startY + 40 + (i * rigaAltezza);

    // Controlla se il mouse si trova sopra la riga corrente per evidenziarla
    let mouseSuRiga = mouseY > y - 22 && mouseY < y + 13 && mouseX > 40 && mouseX < 560;

    if (mouseSuRiga) {
      noStroke(); fill(239, 71, 111, 40); // Sfondo rosa/rosso leggero per l'evidenziazione
      rect(40, y - 22, 520, rigaAltezza, 4);
      fill(239, 71, 111); // Testo colorato in evidenza
      textSize(15);
    } else {
      fill(220); // Colore testo standard
      textSize(15);
    }

    // Stampa dei dati nelle rispettive colonne
    noStroke();
    text(conversioni[i].gradi, colX1, y);
    text(conversioni[i].radPi, colX2, y);
    text(conversioni[i].radDec, colX3, y);

    // Sottile linea di divisione tra le righe
    stroke(35);
    line(40, y + 13, 560, y + 13);
  }
}