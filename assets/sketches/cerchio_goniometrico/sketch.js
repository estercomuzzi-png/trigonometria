// Grafico Statico Ottimizzato: Il Cerchio Goniometrico e il Coseno

function setup() {
  // Tela responsive basata sulla finestra del browser
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensions della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- CONFIGURAZIONE DEI DATI STATICI (Angolo fissato a 60°) ---
  let angoloStatico = 60; 
  let rad = radians(angoloStatico);          
  let valoreCoseno = cos(rad);        
  let valoreSeno = sin(rad);

  // --- PARAMETRI GRAFICI COMPATTI (MENO SPAZIO SOPRA E SOTTO) ---
  let raggio = 70;             
  let centroX = 140;           // Allineamento a sinistra a 140px
  let centroY = 160;           // Alzato a 160px per ridurre lo spazio sopra e sotto

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

  // --- 5. PUNTI E TESTI SUL CERCHIO ---
  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);
  
  // Testo vicino al punto P
  fill(240);
  textSize(13);
  text("P", px + 8, py - 4);


  // --- 6. SCRITTE ALLINEATE A SINISTRA SOTTO IL CERCHIO (MOLTO PIÙ IN BASSO) ---
  let scritteYStart = centroY + raggio + 120; // MODIFICATO: Spostate molto più in basso (+120px)
  let scritteXStart = centroX - raggio;       // Coordinata X allineata al bordo sinistro del cerchio
  
  textAlign(LEFT, TOP);                       // MODIFICATO: Ripristinato l'allineamento a sinistra
  noStroke();
  textSize(13); 

  // Riga 1: Punto P (Testo Verde)
  fill(46, 213, 115);
  text("Punto P sulla circonferenza", scritteXStart, scritteYStart); 

  // Riga 2: Coseno (Testo Rosso - Interlinea ben spaziata a +25px)
  fill(255, 107, 107);
  text("Segmento Coseno cos(θ)", scritteXStart, scritteYStart + 25); 

  // Riga 3: Angolo (Testo Oro - Interlinea ben spaziata a +50px)
  fill(255, 215, 0);
  text("Angolo θ (60°)", scritteXStart, scritteYStart + 50); 
}