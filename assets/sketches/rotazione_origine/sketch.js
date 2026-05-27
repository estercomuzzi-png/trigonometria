// --- DIMENSIONI FISSE DEL DISEGNO (Ricalibrate e uniformate) ---
let inizioDisegnoX = 0; // Allineato al margine assoluto

// Variabile per accumulare l'angolo in modo continuo
let angoloRotazione = 0; 

// VARIABILE DI CONTROLLO: true = il punto ruota, false = il movimento è in pausa
let inMovimento = true; 

function setup() {
  let larghezzaCanvas = document.body.clientWidth || window.innerWidth;
  // MODIFICATO: Altezza ridotta a 370px per adattarsi al grafico rimpicciolito del 20%
  createCanvas(larghezzaCanvas, 370); 
}

function windowResized() {
  let larghezzaCanvas = document.body.clientWidth || window.innerWidth;
  resizeCanvas(larghezzaCanvas, 370);
}

// FUNZIONE DI P5.JS: Intercetta il clic del mouse ovunque sulla tela
function mousePressed() {
  // Inverte lo stato (interruttore play/pausa)
  inMovimento = !inMovimento;
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- ORIGINE REINQUADRATA E COMPATTATA (-20%) ---
  let origineX = 180; // Spostata a sinistra (era 220)
  let origineY = 200; // Spostata molto più in su (era 290) per eliminare il vuoto

  // MODIFICATO: Scala ridotta del 20% (da 2 a 1.6)
  let scala = 1.6; 

  // --- IMPOSTAZIONE DIRETTA DEL PUNTO FISSO P(70, 40) ---
  let p1_X = 70; 
  let p1_Y = 40; 

  // Convertiamo le coordinate del grafico in pixel relativi rispetto all'origine
  let xTemp = p1_X * scala;
  let yTemp = -p1_Y * scala; 

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

  // --- 1. RIFERIMENTI NUMERICI FISSI (PROPORZIONATI AL PIANO -20%) ---
  stroke(60); 
  strokeWeight(1);
  fill(120);  
  textSize(10);

  // Punti di riferimento ricalcolati sulla nuova scala
  let puntiRiferimento = [80, 160]; 

  // Tracciamento tacchetti e numeri su Asse X
  textAlign(CENTER, TOP);
  for (let p of puntiRiferimento) {
    line(origineX + p, origineY - 4, origineX + p, origineY + 4);
    text(Math.round(p / scala), origineX + p, origineY + 8);
    line(origineX - p, origineY - 4, origineX - p, origineY + 4);
    text("-" + Math.round(p / scala), origineX - p, origineY + 8);
  }

  // Tracciamento tacchetti e numeri su Asse Y
  textAlign(RIGHT, CENTER);
  for (let p of puntiRiferimento) {
    line(origineX - 4, origineY - p, origineX + 4, origineY - p);
    text(Math.round(p / scala), origineX - 8, origineY - p);
    line(origineX - 4, origineY + p, origineX + 4, origineY + p);
    text("-" + Math.round(p / scala), origineX - 8, origineY + p);
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
  
  // MODIFICATO: Accorciata l'estensione verticale degli assi (era 280)
  let estensioneY = 220;
  line(origineX, origineY - estensioneY, origineX, origineY + estensioneY); 

  // --- CIRCONFERENZA DI GUIDA ---
  stroke(50);
  strokeWeight(1);
  noFill();
  ellipse(origineX, origineY, raggio * 2, raggio * 2);

  // --- 4. RAGGI VETTORI ---
  stroke(255); 
  strokeWeight(2.5); 
  line(origineX, origineY, x, y);
  
  stroke(255, 100, 100); 
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

  // --- 6. DISEGNO DEI PUNTI ---
  noStroke();
  fill(255); 
  ellipse(x, y, 11, 11); // Leggermente più piccoli per proporzione
  
  fill(255, 100, 100); 
  ellipse(xRuotato, yRuotato, 11, 11);

  // --- 7. ETICHETTE E TESTI SUL PIANO ---
  textSize(16);
  fill(255);
  textAlign(LEFT, CENTER);
  text("O(0, 0)", origineX + 10, origineY + 15);
  
  textSize(15);
  text("P(" + p1_X + ", " + p1_Y + ")", x + 10, y - 10);
  
  fill(255, 100, 100);
  text("P'(" + p2_X + ", " + p2_Y + ")", xRuotato + 10, yRuotato + 10);
  
  // Etichetta del Raggio R
  textSize(14);
  textAlign(CENTER, CENTER);
  fill(255);
  let vicinoX_P = origineX + (x - origineX) * 0.85;
  let vicinoY_P = origineY + (y - origineY) * 0.85;
  text("R", vicinoX_P, vicinoY_P + 12);
  
  // Scritta gradi dello spicchio verde
  fill(100, 255, 100);
  textSize(13); 
  let gradiIniziali = degrees(angoloIniziale);
  let distanzaTestoFisso = raggio * 0.42; 
  let angoloMedioVerde = angoloIniziale / 2; 
  
  let posX_Verde = origineX + distanzaTestoFisso * cos(angoloMedioVerde) - 8;
  let posY_Verde = origineY - distanzaTestoFisso * sin(angoloMedioVerde) + 6;
  text(nf(gradiIniziali, 1, 1) + "°", posX_Verde, posY_Verde);

  // Etichetta theta dinamico
  textSize(14);
  fill(100, 100, 255);
  let gradiEffettivi = degrees(angoloVisualizzato);
  let angoloMedioScritta = -angoloIniziale - (angoloVisualizzato / 2);
  text("θ = " + nf(gradiEffettivi, 1, 1) + "°", origineX + (raggio / 2.3) * cos(angoloMedioScritta), origineY + (raggio / 2.3) * sin(angoloMedioScritta));

  // --- 8. BLOCCO SCRITTE RIPOSIZIONATO (Spostato a sinistra per seguire il grafico) ---
  let colonnaDatiX = 410; // Spostato a sinistra (era 490) per non lasciare troppo vuoto
  let rigaY = 40;         
  
  textAlign(LEFT, TOP);
  noStroke();
  
  textSize(14);
  fill(100, 255, 100); 
  text(`Punto Fisso P: x = ${p1_X}, y = ${p1_Y}`, colonnaDatiX, rigaY);
  
  fill(255, 100, 100); 
  text(`Punto Ruotato P': x' = ${p2_X}, y' = ${p2_Y}`, colonnaDatiX, rigaY + 24);
  
  textSize(12);
  if (inMovimento) {
    fill(46, 213, 115); 
    text("● STATO: IN ROTAZIONE CONTINUA", colonnaDatiX, rigaY + 65);
    fill(130);
    textSize(11);
    text("(Fai clic sullo schermo per mettere in pausa)", colonnaDatiX, rigaY + 85);
  } else {
    fill(255, 159, 67); 
    text("▮▮ STATO: IN PAUSA", colonnaDatiX, rigaY + 65);
    fill(130);
    textSize(11);
    text("(Fai clic sullo schermo per riprendere)", colonnaDatiX, rigaY + 85);
  }
}