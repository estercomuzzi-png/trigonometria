// Grafico Statico Ottimizzato: Il Cerchio Goniometrico e il Coseno
// Dimensioni ridotte a 300x300 per integrarsi perfettamente nella colonna senza tagliarsi

function setup() {
  // Tela quadrata compatta per non essere tagliata dal layout della pagina
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- CONFIGURAZIONE DEI DATI STATICI (Angolo fissato a 60°) ---
  let angoloStatico = 60; 
  let rad = radians(angoloStatico);          
  let valoreCoseno = cos(rad);        
  let valoreSeno = sin(rad);

  // --- PARAMETRI GRAFICI ADATTATI AL NUOVO CANVAS ---
  let raggio = 90;             // Raggio leggermente più grande per una visibilità ottimale
  let centroX = width / 2;     // Centrato perfettamente nello spazio da 300px (150px)
  let centroY = height / 2;    // Centrato perfettamente nello spazio da 300px (150px)

  // --- 1. DISEGNO ASSI CARTESIANI DEL CERCHIO ---
  stroke(60, 65, 75);
  strokeWeight(1);
  // Asse X del cerchio
  line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
  // Asse Y del cerchio
  line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

  // Etichette degli assi
  fill(100, 110, 125);
  noStroke();
  textSize(12);
  textFont('Helvetica');
  text("X", centroX + raggio + 25, centroY + 4);
  text("Y", centroX - 4, centroY - raggio - 25);

  // --- 2. CIRCONFERENZA GONIOMETRICA ---
  stroke(100, 110, 125);
  noFill();
  strokeWeight(1);
  ellipse(centroX, centroY, raggio * 2);

  // Calcolo della posizione del punto P sulla circonferenza
  let px = centroX + valoreCoseno * raggio;
  let py = centroY - valoreSeno * raggio; 

  // Linee tratteggiate di proiezione geometrica per il punto P
  stroke(100, 110, 125, 120);
  strokeWeight(1);
  // Proiezione verticale verso l'asse X
  line(px, py, px, centroY);
  // Proiezione orizzontale verso l'asse Y
  line(px, py, centroX, py);

  // --- 3. RAGGIO VETTORE (Linea bianca fissa dell'angolo) ---
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // Arco dell'angolo θ (Theta)
  noFill();
  stroke(255, 215, 0); // Colore oro per l'angolo
  strokeWeight(1.5);
  arc(centroX, centroY, 35, 35, -rad, 0);

  // --- 4. SEGMENTO DEL COSENO (Evidenziato in rosso sull'asse X) ---
  stroke(255, 107, 107);
  strokeWeight(4);
  line(centroX, centroY, px, centroY); 

  // --- 5. PUNTI E TESTI ---
  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);
  
  // Testo vicino al punto P
  fill(240);
  textSize(13);
  text("P", px + 8, py - 4);
}