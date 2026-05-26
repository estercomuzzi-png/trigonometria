// --- DIMENSIONI FISSE DEL DISEGNO (allineamento a sinistra) ---
let inizioDisegnoX = 50; 
let altezzaCanvas = 500;
let larghezzaCanvas = 900; 

// Variabile per accumulare l'angolo in modo continuo a 360°
let angoloRotazione = 0; 

function setup() {
  createCanvas(larghezzaCanvas, altezzaCanvas); 
}

function windowResized() {
  resizeCanvas(larghezzaCanvas, altezzaCanvas);
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- ORIGINE GLOBALE DEL LAYOUT ---
  let origineX = inizioDisegnoX + 120; 
  let origineY = height - 100;

  // Scala grafica: 1 unità nel disegno = 2 pixel sulla canvas
  let scala = 2; 

  // --- COORDINATE DEL CENTRO GENERICO C (Giallo) ---
  let cxVisivo = origineX + 220;
  let cyVisivo = origineY - 160;

  // --- PUNTO INIZIALE P E INCREMENTO ANGOLO ---
  let raggio = 140; 
  let angoloIniziale = PI / 6; // 30 gradi
  let xVisivo = cxVisivo + raggio * cos(angoloIniziale);
  let yVisivo = cyVisivo - raggio * sin(angoloIniziale);

  // Giro continuo a 360°
  angoloRotazione += 0.015; 

  // --- APPLICAZIONE DELLA FORMULA GENERALE ---
  // 1. Spostamento (sottrai le coordinate di C)
  let xTemp = xVisivo - cxVisivo;
  let yTemp = yVisivo - cyVisivo;

  // 2. Rotazione
  let xTempRuotato = xTemp * cos(angoloRotazione) - yTemp * sin(angoloRotazione);
  let yTempRuotato = xTemp * sin(angoloRotazione) + yTemp * cos(angoloRotazione);

  // 3. Contro-spostamento (riaggiungi le coordinate di C)
  let xRuotatoVisivo = xTempRuotato + cxVisivo;
  let yRuotatoVisivo = yTempRuotato + cyVisivo;

  // Calcolo dei valori matematici puliti arrotondati
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
  let puntiRiferimentoY = [100, 200, 300]; 

  // Tacchetti e numeri asse X
  textAlign(CENTER, TOP);
  for (let p of puntiRiferimentoX) {
    line(origineX + p, origineY - 4, origineX + p, origineY + 4);
    text(p / scala, origineX + p, origineY + 8);
  }

  // Tacchetti e numeri asse Y (CORRETTO: CENTER in maiuscolo)
  textAlign(RIGHT, CENTER);
  for (let p of puntiRiferimentoY) {
    line(origineX - 4, origineY - p, origineX + 4, origineY - p);
    text(p / scala, origineX - 8, origineY - p);
  }

  // --- 2. LINEE DI PROIEZIONE TRATTEGGIATE ---
  drawingContext.setLineDash([4, 4]); 
  strokeWeight(1);

  // Proiezioni del Centro C (Gialle opache)
  stroke(255, 255, 100, 80);
  line(cxVisivo, cyVisivo, cxVisivo, origineY);
  line(cxVisivo, cyVisivo, origineX, cyVisivo);

  // Proiezioni di P (Bianche)
  stroke(255, 80); 
  line(xVisivo, yVisivo, xVisivo, origineY); 
  line(xVisivo, yVisivo, origineX, yVisivo); 

  // Proiezioni di P' (Rosse)
  stroke(255, 100, 100, 80); 
  line(xRuotatoVisivo, yRuotatoVisivo, xRuotatoVisivo, origineY); 
  line(xRuotatoVisivo, yRuotatoVisivo, origineX, yRuotatoVisivo); 

  drawingContext.setLineDash([]); 

  // --- 3. DISEGNO DEGLI ASSI CARTESIANI VISIVI ---
  stroke(100); 
  strokeWeight(1.5);
  line(inizioDisegnoX, origineY, width, origineY); // Asse X
  line(origineX, height, origineX, 0); // Asse Y

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
  
  stroke(100, 255, 100); // Verde statico 30°
  arc(cxVisivo, cyVisivo, raggio, raggio, -PI / 6, 0);
  
  stroke(100, 100, 255); // Blu dinamico continuo
  let angleNormalizzato = angoloRotazione % TWO_PI;
  arc(cxVisivo, cyVisivo, raggio, raggio, -angoloIniziale - angleNormalizzato, -angoloIniziale);

  // --- 6. DISEGNO DEI PUNTI ---
  noStroke();
  fill(255, 255, 100); // Centro C Giallo
  ellipse(cxVisivo, cyVisivo, 14, 14);

  fill(255); // Punto iniziale P
  ellipse(xVisivo, yVisivo, 12, 12);
  
  fill(255, 100, 100); // Punto ruotato P'
  ellipse(xRuotatoVisivo, yRuotatoVisivo, 14, 14);

  // --- 7. TESTO E COORDINATE ---
  textSize(20);
  fill(255);
  textAlign(LEFT, CENTER);
  text("O(0, 0)", origineX + 12, origineY + 18);
  
  fill(255, 255, 100); 
  text("C(" + c_X + ", " + c_Y + ")", cxVisivo + 12, cyVisivo - 15);
  
  fill(255);
  textSize(16);
  text("P(" + p1_X + ", " + p1_Y + ")", xVisivo + 12, yVisivo - 12);
  
  fill(255, 100, 100);
  textSize(18);
  text("P'(" + p2_X + ", " + p2_Y + ")", xRuotatoVisivo + 12, yRuotatoVisivo + 12);
  
  fill(100, 255, 100);
  textSize(15);
  text("30°", cxVisivo + (raggio / 1.7) * cos(-PI / 12), cyVisivo - (raggio / 1.7) * sin(-PI / 12));
  
  fill(100, 100, 255);
  let gradiEffettivi = degrees(angleNormalizzato);
  text("θ = " + nf(gradiEffettivi, 1, 1) + "°", cxVisivo + (raggio / 2.3) * cos(-angoloIniziale - angleNormalizzato/2), cyVisivo - (raggio / 2.3) * sin(-angoloIniziale - angleNormalizzato/2));
}