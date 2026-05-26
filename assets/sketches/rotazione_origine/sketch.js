// --- DIMENSIONI FISSE DEL DISEGNO (Ricalibrate e uniformate) ---
let inizioDisegnoX = 0; // Allineato al margine assoluto

// Variabile per accumulare l'angolo in modo continuo
let angoloRotazione = 0; 

// VARIABILE DI CONTROLLO: true = il punto ruota, false = il movimento è in pausa
let inMovimento = true; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

// FUNZIONE DI P5.JS: Intercetta il clic del mouse ovunque sulla tela
function mousePressed() {
  // Inverte lo stato (interruttore play/pausa)
  inMovimento = !inMovimento;
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- ORIGINE REINQUADRATA PER UN CERCHIO GRANDE ED ALLINEATO ---
  let origineX = 220; // Spostato abbastanza a destra per contenere il raggio da 160
  let origineY = 290; // Centrare l'asse Y simmetrico nello schermo

  // Scala grafica di riferimento originale (1 unità sul grafico = 2 pixel)
  let scala = 2; 

  // --- IMPOSTAZIONE DIRETTA DEL PUNTO FISSO P(70, 40) ---
  let p1_X = 70; // Coordinate fisse richieste sulla scala del grafico
  let p1_Y = 40; 

  // Convertiamo le coordinate del grafico in pixel relativi rispetto all'origine
  let xTemp = p1_X * scala;
  let yTemp = -p1_Y * scala; // Segno meno perché l'asse Y nei pixel del browser è invertito

  // Calcoliamo il raggio effettivo di P dall'origine usando il teorema di Pitagora
  let raggio = sqrt(xTemp * xTemp + yTemp * yTemp);

  // Calcoliamo l'angolo iniziale effettivo di P per poter disegnare correttamente l'arco di θ
  let angoloIniziale = atan2(-yTemp, xTemp);

  // Sottraiamo l'angolo invece di sommarlo per la rotazione in SENSO ANTIORARIO
  if (inMovimento) {
    angoloRotazione -= 0.015; 
  }

  // Calcolo delle nuove coordinate ruotate (Formule Trigonometriche)
  let xRuotato = origineX + xTemp * cos(angoloRotazione) - yTemp * sin(angoloRotazione);
  let yRuotato = origineY + xTemp * sin(angoloRotazione) + yTemp * cos(angoloRotazione);

  // Valori matematici effettivi del punto ruotato P' da mostrare (espressi nella scala del grafico)
  let p2_X = Math.round((xRuotato - origineX) / scala);
  let p2_Y = Math.round(-(yRuotato - origineY) / scala);

  // Coordinate assolute del punto fisso P sullo schermo
  let x = origineX + xTemp;
  let y = origineY + yTemp;

  // --- 1. RIFERIMENTI NUMERICI FISSI (PROPORZIONATI AL PIANO GRANDE) ---
  stroke(60); 
  strokeWeight(1);
  fill(120);  
  textSize(11);

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
  line(inizioDisegnoX, origineY, width, origineY); 
  
  let estensioneY = 280;
  line(origineX, origineY - estensioneY, origineX, origineY + estensioneY); 

  // --- CIRCONFERENZA DI GUIDA (Tracciato esterno basato sul raggio esatto di P) ---
  stroke(50);
  strokeWeight(1);
  noFill();
  ellipse(origineX, origineY, raggio * 2, raggio * 2);

  // --- 4. RAGGI VETTORI ---
  stroke(255); // Bianco per P
  strokeWeight(3); 
  line(origineX, origineY, x, y);
  
  stroke(255, 100, 100); // Rosso per P'
  line(origineX, origineY, xRuotato, yRuotato);

  // --- 5. ARCHI DEGLI ANGOLI ---
  strokeWeight(2);
  noFill(); 
  
  // Linea verde per l'angolo iniziale di P
  stroke(100, 255, 100); 
  arc(origineX, origineY, raggio, raggio, -angoloIniziale, 0);
  
  // Linea blu per l'angolo theta dinamico continuo
  stroke(100, 100, 255); 
  let angoloVisualizzato = abs(angoloRotazione % TWO_PI);
  arc(origineX, origineY, raggio, raggio, -angoloIniziale - angoloVisualizzato, -angoloIniziale);

  // --- 6. DISEGNO DEI PUNTI GRANDI ORIGINALI ---
  noStroke();
  fill(255); // Punto P
  ellipse(x, y, 14, 14);
  
  fill(255, 100, 100); // Punto P'
  ellipse(xRuotato, yRuotato, 14, 14);

  // --- 7. ETICHETTE E TESTI SUL PIANO ---
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
  let gradiIniziali = degrees(angoloIniziale);
  text(nf(gradiIniziali, 1, 1) + "°", origineX + (raggio / 1.8) * cos(-angoloIniziale / 2), origineY - (raggio / 1.8) * sin(-angoloIniziale / 2));
  
  // MODIFICATO: L'etichetta "θ = ..." adesso segue dinamicamente l'arco ruotando in senso antiorario a metà dell'apertura corrente
  fill(100, 100, 255);
  let gradiEffettivi = degrees(angoloVisualizzato);
  let angoloMedioScritta = -angoloIniziale - (angoloVisualizzato / 2);
  text("θ = " + nf(gradiEffettivi, 1, 1) + "°", origineX + (raggio / 2.3) * cos(angoloMedioScritta), origineY + (raggio / 2.3) * sin(angoloMedioScritta));


  // --- 8. BLOCCO SCRITTE RIPOSIZIONATO (IN ALTO E A DESTRA) ---
  let colonnaDatiX = 490; 
  let rigaY = 60;         
  
  textAlign(LEFT, TOP);
  noStroke();
  
  // Dati dinamici del Punto Fisso P
  textSize(15);
  fill(100, 255, 100); 
  text(`Punto Fisso P: x = ${p1_X}, y = ${p1_Y}`, colonnaDatiX, rigaY);
  
  // Dati dinamici del Punto Ruotato P'
  fill(255, 100, 100); 
  text(`Punto Ruotato P': x' = ${p2_X}, y' = ${p2_Y}`, colonnaDatiX, rigaY + 30);
  
  // Stato Interattivo Corrente
  textSize(13);
  if (inMovimento) {
    fill(46, 213, 115); 
    text("● STATO: IN ROTAZIONE CONTINUA", colonnaDatiX, rigaY + 80);
    fill(130);
    textSize(12);
    text("(Fai clic sullo schermo per mettere in pausa)", colonnaDatiX, rigaY + 105);
  } else {
    fill(255, 159, 67); 
    text("▮▮ STATO: IN PAUSA", colonnaDatiX, rigaY + 80);
    fill(130);
    textSize(12);
    text("(Fai clic sullo schermo per riprendere)", colonnaDatiX, rigaY + 105);
  }
}