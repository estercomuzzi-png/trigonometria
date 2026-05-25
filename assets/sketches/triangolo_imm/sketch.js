// Coordinate dei vertici del triangolo basate sull'immagine
let xA = 245; // Angolo retto (in basso a sinistra)
let yA = 400;
let xB = 560; // Angolo alpha (in basso a destra)
let yB = 400;
let xC = 245; // Angolo beta (in alto a sinistra)
let yC = 140;

function setup() {
  createCanvas(900, 500); // Dimensione standard uniformata
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- 1. ANGOLO RETTO (Quadratino grigio pieno) ---
  noStroke();
  fill(128); // Grigio medio come nell'immagine
  rect(xA, yA - 24, 24, 24);

  // --- 2. DISEGNO DEL TRIANGOLO ---
  stroke(255); // Linea bianca
  strokeWeight(3); // Spessore marcato ad alta qualità
  noFill();
  triangle(xA, yA, xB, yB, xC, yC);

  // --- 3. LETTERE SUI LATI ---
  noStroke();
  fill(255);
  textSize(32); // Font grande per le lettere dei lati

  // Lato a (verticale)
  textAlign(RIGHT, CENTER);
  text("a", xA - 15, (yA + yC) / 2);

  // Lato b (orizzontale)
  textAlign(CENTER, TOP);
  text("b", (xA + xB) / 2, yA + 10);

  // Lato c (ipotenusa)
  textAlign(LEFT, CENTER);
  text("c", (xB + xC) / 2 + 20, (yB + yC) / 2 - 15);

  // --- 4. ANGOLI GRECI (α e β) - PIÙ PICCOLI E CENTRATI ---
  textSize(18); // Dimensione ridotta come richiesto

  // Angolo alpha (α) - Bilanciato e centrato geometricamente dentro la punta destra
  textAlign(CENTER, CENTER);
  text("α", xB - 35, yB - 14);

  // Angolo beta (β) - Bilanciato e centrato geometricamente dentro la punta superiore
  textAlign(CENTER, CENTER);
  text("β", xC + 14, yC + 45);


  // --- 5. RIQUADRO LEGENDA (A DESTRA) ---
  let boxX = 545;
  let boxY = 95;
  let boxW = 220;
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