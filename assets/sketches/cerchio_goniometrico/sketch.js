const RAGGIO = 140; // Raggio visivo del cerchio in pixel (rappresenta R = 1)

function setup() {
  createCanvas(900, 500); // Dimensione standard dei precedenti progetti
}

function draw() {
  background(0); // Sfondo nero fisso puro
  textFont('Helvetica');

  // --- 1. ISTRUZIONI INTERATTIVE (STILE PRECEDENTI) ---
  fill(148, 161, 178);
  noStroke();
  textSize(18);
  text("Il Cerchio Goniometrico Interattivo", 40, 40);
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 40, 65);

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  // L'angolo dipende dalla posizione X del mouse sullo schermo (mappato tra 0 e 360 gradi)
  let gradi = map(mouseX, 0, width, 0, 360);
  gradi = constrain(gradi, 0, 360); 
  let radianti = radians(gradi);
  
  // Calcolo dei valori trigonometrici reali
  let cosVal = cos(radianti);
  let sinVal = sin(radianti);
  let tanVal = tan(radianti);

  // --- 3. TABELLA VALORI AGGIORNATA DINAMICAMENTE (A SINISTRA) ---
  let infoX = 40;
  fill(255);
  textSize(16);
  text("Dati Istantanei:", infoX, 120);
  
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${gradi.toFixed(1)}°  (${(radianti/PI).toFixed(2)}π rad)`, infoX, 155);
  
  // Voce Coseno (Rosso)
  fill(255, 107, 107);
  text(`Coseno (x) = ${cosVal.toFixed(4)}`, infoX, 190);
  
  // Voce Seno (Verde)
  fill(46, 213, 115);
  text(`Seno (y) = ${sinVal.toFixed(4)}`, infoX, 220);
  
  // Voce Tangente (Giallo con gestione dell'infinito)
  fill(255, 215, 0);
  if (floor(gradi) === 90 || floor(gradi) === 270) {
    text(`Tangente (t) = ±∞ (Non definita)`, infoX, 250);
  } else {
    text(`Tangente (t) = ${tanVal.toFixed(4)}`, infoX, 250);
  }

  // Identità fondamentale mostrata a schermo nello stile della legenda
  fill(120, 130, 140);
  textSize(12);
  text(`Identità fondamentale: cos²θ + sin²θ = 1`, infoX, 300);
  text(`Verifica: (${(cosVal*cosVal).toFixed(3)}) + (${(sinVal*sinVal).toFixed(3)}) = 1.000`, infoX, 320);


  // --- 4. IL CERCHIO GONIOMETRICO (SPOSTATO A DESTRA) ---
  let cx = 600;
  let cy = 260;

  // Convertiamo i valori goniometrici nelle coordinate pixel dello schermo
  let px = cx + cosVal * RAGGIO;
  let py = cy - sinVal * RAGGIO; // Segno meno perché in p5.js l'asse Y va verso il basso

  // Disegno degli Assi Cartesiani (Grigio Scuro)
  stroke(60, 65, 75);
  strokeWeight(1);
  line(cx - RAGGIO - 40, cy, cx + RAGGIO + 40, cy); // Asse X
  line(cx, cy - RAGGIO - 40, cx, cy + RAGGIO + 40, cy + RAGGIO + 40); // Asse Y
  
  // Etichette degli assi cartesiani
  fill(100, 110, 125);
  noStroke();
  textSize(11);
  text("X (Cos)", cx + RAGGIO + 15, cy + 4);
  text("Y (Sin)", cx - 15, cy - RAGGIO - 15);
  text("+1.0", cx + RAGGIO - 10, cy + 18);
  text("+1.0", cx + 8, cy - RAGGIO + 4);

  // Circonferenza unitaria
  stroke(100, 110, 125);
  strokeWeight(2);
  noFill();
  ellipse(cx, cy, RAGGIO * 2);

  // --- 5. COSTRUZIONE GEOMETRICA DEL TRIANGOLO RETTANGOLO ---
  
  // Segmento del COSENO (Asse X, in Rosso)
  stroke(255, 107, 107);
  strokeWeight(3.5);
  line(cx, cy, px, cy);

  // Segmento del SENO (Verticale, in Verde)
  stroke(46, 213, 115);
  strokeWeight(3.5);
  line(px, cy, px, py);

  // Raggio mobile / Ipotenusa (In Bianco)
  stroke(255);
  strokeWeight(2);
  line(cx, cy, px, py);

  // Punto corrente sulla circonferenza P(x, y)
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);

  // --- 6. ARCO DELL'ANGOLO AL CENTRO ---
  noFill();
  stroke(255, 215, 0);
  strokeWeight(1.5);
  // arc() richiede angoli in radianti. In p5 la coordinata Y invertita richiede il segno meno 
  // sui radianti per tracciare la curvatura in senso antiorario standard.
  arc(cx, cy, 45, 45, -radianti, 0);

  // Etichetta letterale dell'angolo θ vicino al vertice centrale
  fill(255, 215, 0);
  noStroke();
  textSize(15);
  let offsetAngolo = radianti / 2;
  text("θ", cx + 32 * cos(offsetAngolo), cy - 32 * sin(offsetAngolo));
}