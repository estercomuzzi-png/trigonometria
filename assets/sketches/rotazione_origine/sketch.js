// --- DIMENSIONI FISSE DEL DISEGNO (Ricalibrate e uniformate) ---
let inizioDisegnoX = 0; // Allineato al margine assoluto

// Variabile per accumulare l'angolo in modo continuo
let angoloRotazione = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- ORIGINE REINQUADRATA PER UN CERCHIO GRANDE ED ALLINEATO ---
  let origineX = 220; // Spostato abbastanza a destra per contenere il raggio da 160
  let origineY = 290; // MODIFICATO: Abbassato leggermente a 290 per centrare l'asse Y simmetrico nello schermo

  // Scala grafica di riferimento originale
  let scala = 2; 

  // --- PUNTO INIZIALE E INCREMENTO ANGOLO ---
  let raggio = 160; // Raggio grande originale a 160px
  let angoloIniziale = PI / 6; // 30 gradi
  let x = origineX + raggio * cos(angoloIniziale);
  let y = origineY - raggio * sin(angoloIniziale);

  // Aumentiamo l'angolo costantemente ad ogni frame (velocità di rotazione)
  angoloRotazione += 0.015; 

  // Calcolo delle nuove coordinate (Formule Trigonometriche)
  let xTemp = x - origineX;
  let yTemp = y - origineY;
  let xRuotato = origineX + xTemp * cos(angoloRotazione) - yTemp * sin(angoloRotazione);
  let yRuotato = origineY + xTemp * sin(angoloRotazione) + yTemp * cos(angoloRotazione);

  // Valori matematici effettivi da mostrare (espressi nella scala del grafico)
  let p1_X = Math.round(xTemp / scala);
  let p1_Y = Math.round(-yTemp / scala);
  let p2_X = Math.round((xRuotato - origineX) / scala);
  let p2_Y = Math.round(-(yRuotato - origineY) / scala);

  // --- 1. RIFERIMENTI NUMERICI FISSI (PROPORZIONATI AL RAGGIO 160) ---
  stroke(60); 
  strokeWeight(1);
  fill(120);  
  textSize(11);

  // Punti di riferimento adatti alla scala originale (100 e 200 unità di pixel)
  let puntiRiferimento = [100, 200]; 

  // Tracciamento tacchetti e numeri su Asse X
  textAlign(CENTER, TOP);
  for (let p of puntiRiferimento) {
    line(origineX + p, origineY - 4, origineX + p, origineY + 4);
    text(p / scala, origineX + p, origineY + 8);
    line(origineX - p, origineY - 4, origineX - p, origineY + 4);
    text("-" + (p / scala), origineX - p, origineY + 8);
  }

  // Tracciamento tacchetti e numeri su Asse Y
  textAlign(RIGHT, CENTER);
  for (let p of puntiRiferimento) {
    line(origineX - 4, origineY - p, origineX + 4, origineY - p);
    text(p / scala, origineX - 8, origineY - p);
    line(origineX - 4, origineY + p, origineX + 4, origineY + p);
    text("-" + (p / scala), origineX - 8, origineY + p);
  }

  // --- 2. LINEE DI PROIEZIONE TRATTEGGIATE ---
  drawingContext.setLineDash([4, 4]); 
  strokeWeight(1);

  // Proiezioni del Punto Fisso P (Bianche opache)
  stroke(255, 80); 
  line(x, y, x, origineY); 
  line(x, y, origineX, y); 

  // Proiezioni del Punto Ruotato P' (Rosse opache)
  stroke(255, 100, 100, 80); 
  line(xRuotato, yRuotato, xRuotato, origineY); 
  line(xRuotato, yRuotato, origineX, yRuotato); 

  drawingContext.setLineDash([]); 

  // --- 3. DISEGNO DEGLI ASSI CARTESIANI BILANCIATI ---
  stroke(100); 
  strokeWeight(1.5);
  
  // Asse X esteso a tutta larghezza
  line(inizioDisegnoX, origineY, width, origineY); 
  
  // MODIFICATO: L'asse Y adesso va da (origineY - 280) a (origineY + 280), risultando perfettamente simmetrico sopra e sotto
  let estensioneY = 280;
  line(origineX, origineY - estensioneY, origineX, origineY + estensioneY); 

  // --- 4. RAGGI VETTORI ---
  stroke(255); // Bianco per P
  strokeWeight(3); 
  line(origineX, origineY, x, y);
  
  stroke(255, 100, 100); // Rosso per P'
  line(origineX, origineY, xRuotato, yRuotato);

  // --- 5. ARCHI DEGLI ANGOLI ---
  strokeWeight(2);
  noFill(); 
  
  // Linea verde per i 30° iniziali
  stroke(100, 255, 100); 
  arc(origineX, origineY, raggio, raggio, -PI / 6, 0);
  
  // Linea blu per l'angolo theta dinamico continuo
  stroke(100, 100, 255); 
  let angoloVisualizzato = angoloRotazione % TWO_PI;
  arc(origineX, origineY, raggio, raggio, -angoloIniziale - angoloVisualizzato, -angoloIniziale);

  // --- 6. DISEGNO DEI PUNTI GRANDI ORIGINALI ---
  noStroke();
  fill(255); // Punto P
  ellipse(x, y, 14, 14);
  
  fill(255, 100, 100); // Punto P'
  ellipse(xRuotato, yRuotato, 14, 14);

  // --- 7. ETICHETTE E TESTI CHIARI ---
  textSize(20);
  fill(255);
  textAlign(LEFT, CENTER);
  text("O(0, 0)", origineX + 12, origineY + 18);
  
  textSize(18);
  text("P(" + p1_X + ", " + p1_Y + ")", x + 12, y - 12);
  
  fill(255, 100, 100);
  text("P'(" + p2_X + ", " + p2_Y + ")", xRuotato + 12, yRuotato + 12);
  
  fill(100, 255, 100);
  textSize(16);
  text("30°", origineX + (raggio / 1.8) * cos(-PI / 12), origineY - (raggio / 1.8) * sin(-PI / 12));
  
  fill(100, 100, 255);
  let gradiEffettivi = degrees(angoloVisualizzato);
  text("θ = " + nf(gradiEffettivi, 1, 1) + "°", origineX + (raggio / 2.3) * cos(-angoloIniziale - angoloVisualizzato/2), origineY - (raggio / 2.3) * sin(-angoloIniziale - angoloVisualizzato/2));
}