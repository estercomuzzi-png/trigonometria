// --- DIMENSIONI FISSE DEL DISEGNO (Allineamento uniforme a sinistra) ---
let inizioDisegnoX = 0; 

// Variabile per accumulare l'angolo in modo continuo a 360°
let angoloRotazione = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); 
  textFont('Helvetica');

  // --- ORIGINE GLOBALE SPOSTATA IN BASSO DI 60px ---
  let origineX = 220; 
  let origineY = 350; // MODIFICATO: Impostato a 350px (290 + 60) per il bilanciamento ideale

  // Scala grafica: 1 unità nel disegno = 2 pixel sulla canvas
  let scala = 2; 

  // --- COORDINATE DEL CENTRO GENERICO C (Giallo) ---
  let cxVisivo = origineX + 220;
  let cyVisivo = origineY - 160;

  // --- PUNTO INIZIALE P E INCREMENTO ANGOLO ---
  let raggio = 160; 
  let angoloIniziale = PI / 6; 
  let xVisivo = cxVisivo + raggio * cos(angoloIniziale);
  let yVisivo = cyVisivo - raggio * sin(angoloIniziale);

  angoloRotazione += 0.015; 

  // --- APPLICAZIONE DELLA FORMULA GENERALE ---
  let xTemp = xVisivo - cxVisivo;
  let yTemp = yVisivo - cyVisivo;
  let xTempRuotato = xTemp * cos(angoloRotazione) - yTemp * sin(angoloRotazione);
  let yTempRuotato = xTemp * sin(angoloRotazione) + yTemp * cos(angoloRotazione);
  let xRuotatoVisivo = xTempRuotato + cxVisivo;
  let yRuotatoVisivo = yTempRuotato + cyVisivo;

  let c_X = Math.round((cxVisivo - origineX) / scala);
  let c_Y = Math.round(-(cyVisivo - origineY) / scala);
  let p1_X = Math.round((xVisivo - origineX) / scala);
  let p1_Y = Math.round(-(yVisivo - origineY) / scala);
  let p2_X = Math.round((xRuotatoVisivo - origineX) / scala);
  let p2_Y = Math.round(-(yRuotatoVisivo - origineY) / scala);

  // --- 1. RIFERIMENTI NUMERICI FISSI SULLE COORDINATE ---
  stroke(60); 
  strokeWeight(1);
  fill(120);  
  textSize(11);

  let puntiRiferimentoX = [100, 200, 300, 400]; 
  let puntiRiferimentoY = [100, 200]; 

  textAlign(CENTER, TOP);
  for (let p of puntiRiferimentoX) {
    line(origineX + p, origineY - 4, origineX + p, origineY + 4);
    text(p / scala, origineX + p, origineY + 8);
    line(origineX - p, origineY - 4, origineX - p, origineY + 4);
    text("-" + (p / scala), origineX - p, origineY + 8);
  }

  textAlign(RIGHT, CENTER);
  for (let p of puntiRiferimentoY) {
    line(origineX - 4, origineY - p, origineX + 4, origineY - p);
    text(p / scala, origineX - 8, origineY - p);
    line(origineX - 4, origineY + p, origineX + 4, origineY + p);
    text("-" + (p / scala), origineX - 8, origineY + p);
  }

  // --- 2. LINEE DI PROIEZIONE TRATTEGGIATE ---
  drawingContext.setLineDash([4, 4]); 
  strokeWeight(1);

  stroke(255, 255, 100, 80);
  line(cxVisivo, cyVisivo, cxVisivo, origineY);
  line(cxVisivo, cyVisivo, origineX, cyVisivo);

  stroke(255, 80); 
  line(xVisivo, yVisivo, xVisivo, origineY); 
  line(xVisivo, yVisivo, origineX, yVisivo); 

  stroke(255, 100, 100, 80); 
  line(xRuotatoVisivo, yRuotatoVisivo, xRuotatoVisivo, origineY); 
  line(xRuotatoVisivo, yRuotatoVisivo, origineX, yRuotatoVisivo); 

  drawingContext.setLineDash([]); 

  // --- 3. DISEGNO DEGLI ASSI CARTESIANI VISIVI SIMMETRICI ---
  stroke(100); 
  strokeWeight(1.5);
  line(inizioDisegnoX, origineY, width, origineY); 
  
  let estensioneY = 280;
  line(origineX, origineY - estensioneY, origineX, origineY + estensioneY); 

  // --- 4. DISEGNO DEGLI ELEMENTI VISIVI (VETTORI) ---
  stroke(255, 150); 
  strokeWeight(2); 
  line(cxVisivo, cyVisivo, xVisivo, yVisivo);
  
  stroke(255, 100, 100); 
  strokeWeight(3);
  line(cxVisivo, cyVisivo, xRuotatoVisivo, yRuotatoVisivo);

  // --- 5. ARCHI DEGLI ANGOLI ---
  strokeWeight(2);
  noFill(); 
  
  stroke(100, 255, 100); 
  arc(cxVisivo, cyVisivo, raggio, raggio, -PI / 6, 0);
  
  stroke(100, 100, 255); 
  let angleNormalizzato = angoloRotazione % TWO_PI;
  arc(cxVisivo, cyVisivo, raggio, raggio, -angoloIniziale - angleNormalizzato, -angoloIniziale);

  // --- 6. DISEGNO DEI PUNTI (UNIFORMATI) ---
  noStroke();
  fill(255, 255, 100); 
  ellipse(cxVisivo, cyVisivo, 14, 14);

  fill(255); 
  ellipse(xVisivo, yVisivo, 14, 14);
  
  fill(255, 100, 100); 
  ellipse(xRuotatoVisivo, yRuotatoVisivo, 14, 14);

  // --- 7. TESTO E COORDINATE ---
  textSize(20);
  fill(255);
  textAlign(LEFT, CENTER);
  text("O(0, 0)", origineX + 12, origineY + 18);
  
  fill(255, 255, 100); 
  text("C(" + c_X + ", " + c_Y + ")", cxVisivo + 12, cyVisivo - 15);
  
  fill(255);
  textSize(18); 
  text("P(" + p1_X + ", " + p1_Y + ")", xVisivo + 12, yVisivo - 12);
  
  fill(255, 100, 100);
  textSize(18);
  text("P'(" + p2_X + ", " + p2_Y + ")", xRuotatoVisivo + 12, yRuotatoVisivo + 12);
  
  fill(100, 255, 100);
  textSize(16);
  text("30°", cxVisivo + (raggio / 1.7) * cos(-PI / 12), cyVisivo - (raggio / 1.7) * sin(-PI / 12));
  
  fill(100, 100, 255);
  let gradiEffettivi = degrees(angleNormalizzato);
  text("θ = " + nf(gradiEffettivi, 1, 1) + "°", cxVisivo + (raggio / 2.3) * cos(-angoloIniziale - angleNormalizzato/2), cyVisivo - (raggio / 2.3) * sin(-angoloIniziale - angleNormalizzato/2));
}