// --- DIMENSIONI FISSE DEL DISEGNO ---
const LARGHEZZA_TRIANGOLO = 205;
const SPAZIO_INTERMEDIO = 120; 
const LARGHEZZA_LEGENDA = 220;

function setup() {
  let larghezzaCanvas = document.body.clientWidth || window.innerWidth;
  // MODIFICATO: Ridotta ulteriormente l'altezza a 300px perché il triangolo è più in alto
  createCanvas(larghezzaCanvas, 300); 
}

function windowResized() {
  let larghezzaCanvas = document.body.clientWidth || window.innerWidth;
  resizeCanvas(larghezzaCanvas, 300);
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- PUNTO DI PARTENZA FISSO A SINISTRA ---
  let inizioDisegnoX = 50; 

  // --- COORDINATE DEGLI ELEMENTI ---
  
  // --- 1. TRIANGOLO (Spostato ulteriormente in su di 40px per un allineamento perfetto) ---
  let xA = inizioDisegnoX; 
  let yA = 260;                      // MODIFICATO: Alzata la base (era 300)
  let xB = xA + LARGHEZZA_TRIANGOLO; 
  let yB = 260;                      // MODIFICATO: Alzata la base (era 300)
  let xC = xA; 
  let yC = 90;                       // MODIFICATO: Alzato il vertice alto (era 130)

  // --- Quadratino angolo retto ---
  noStroke();
  fill(128); 
  rect(xA, yA - 18, 18, 18); 

  // --- Disegno del triangolo ---
  stroke(255); 
  strokeWeight(3); 
  noFill();
  triangle(xA, yA, xB, yB, xC, yC);

  // --- Lettere sui lati ---
  noStroke();
  fill(255);
  textSize(26); 

  // Lato a (verticale)
  textAlign(RIGHT, CENTER);
  text("a", xA - 15, (yA + yC) / 2);

  // Lato b (orizzontale)
  textAlign(CENTER, TOP);
  text("b", (xA + xB) / 2, yA + 10);

  // Lato c (ipotenusa)
  textAlign(LEFT, CENTER);
  text("c", (xB + xC) / 2 + 15, (yB + yC) / 2 - 15);

  // --- Angoli greci (α e β) ---
  textSize(16); 

  // Angolo alpha (α)
  textAlign(CENTER, CENTER);
  text("α", xB - 28, yB - 12);

  // Angolo beta (β)
  textAlign(CENTER, CENTER);
  text("β", xC + 12, yC + 35);


  // --- 2. LEGENDA (Posizione ottimale invariata, ora il triangolo le è simmetrico) ---
  let boxX = xB + SPAZIO_INTERMEDIO; 
  let boxY = 100; // Calibrato l'inizio della legenda per centrarla col nuovo triangolo
  let boxW = LARGHEZZA_LEGENDA;
  let boxH = 130;

  // Bordo bianco del riquadro
  stroke(255);
  strokeWeight(1.5);
  noFill();
  rect(boxX, boxY, boxW, boxH);

  // Testo interno alla legenda
  noStroke();
  fill(255);
  
  textSize(16);
  textAlign(LEFT, TOP);
  text("Rispetto ad α:", boxX + 18, boxY + 18);

  textSize(15);
  text("-  a = Cateto opposto", boxX + 18, boxY + 48);
  text("-  b = Cateto adiacente", boxX + 18, boxY + 73);
  text("-  c = Ipotenusa", boxX + 18, boxY + 98);
}