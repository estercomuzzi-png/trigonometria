let raggio = 90;       // Dimensione del cerchio goniometrico
let centroX = 250;     // Posizione X del centro del cerchio
let centroY = 320;     // Abbassato leggermente per allinearsi alle proporzioni dell'esempio
let graficoX = 450;    // Punto di partenza del grafico dell'onda (a destra)

function setup() {
  // Stessa tela responsive basata sull'esempio del Seno
  createCanvas(900, 500);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- 1. ISTRUZIONI INTERATTIVE (CONGRUENTI CON L'ESEMPIO) ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textSize(18);
  text("Esplorazione della Funzione Coseno", 40, 40);
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 40, 65);
  text("• Osserva lo spostamento sull'asse orizzontale (X) e la proiezione sulla cosinusoide", 40, 85);

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  let valoreCoseno = cos(rad);        

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  // Assi del cerchio (Uniformati allo stile scuro dell'esempio)
  stroke(60, 65, 75);
  strokeWeight(1);
  line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
  line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

  // Circonferenza goniometrica
  stroke(100, 110, 125);
  noFill();
  ellipse(centroX, centroY, raggio * 2);

  // Calcolo della posizione del punto P sulla circonferenza
  let px = centroX + cos(rad) * raggio;
  let py = centroY - sin(rad) * raggio; 

  // Raggio vettore principale (linea bianca mobile)
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // SEGMENTO DEL COSENO (In rosso/arancione sulla base orizzontale)
  stroke(255, 107, 107);
  strokeWeight(3.5);
  line(centroX, centroY, px, centroY); 
  strokeWeight(1); 

  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DEL COSENO (A DESTRA) ---
  let asseX_Lunghezza = 400;

  // Asse X e Asse Y del grafico
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, centroY - raggio - 20, graficoX, centroY + raggio + 20); 

  // Tracciamento dei limiti +1 e -1 responsive sull'asse delle ordinate
  fill(100, 110, 125);
  textSize(11);
  text("+1.0", graficoX - 30, centroY - raggio + 4);
  text("-1.0", graficoX - 25, centroY + raggio + 4);
  stroke(60, 65, 75, 100);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA COSINUSOIDE ---
  stroke(255, 107, 107, 150); // Rosso semitrasparente per l'onda passata
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    let xCurva = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
    let yCurva = centroY - cos(radians(a)) * raggio;
    vertex(xCurva, yCurva);
  }
  endShape();


  // --- 6. LINEA DI PROIEZIONE DIRETTISSIMA ---
  // Unisce la fine del segmento del coseno (px) sul cerchio al rispettivo punto d'onda
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + 400);
  let ondaY = centroY - valoreCoseno * raggio;

  stroke(255, 255, 255, 80);
  strokeWeight(1);
  // Effetto tratteggio manuale programmato coerente con il primo codice
  for (let ly = centroY; ly > ondaY; ly -= 6) {
    line(px, ly, px, ly - 3);
  }
  for (let lx = px; lx < ondaX; lx += 6) {
    line(lx, ondaY, lx + 3, ondaY);
  }

  // Pallino rosso sul grafico nel punto d'onda corrente
  fill(255, 107, 107);
  noStroke();
  ellipse(ondaX, ondaY, 10, 10);


  // --- 7. TABELLA VALORI AGGIORNATA DINAMICAMENTE (A DESTRA) ---
  fill(255);
  textSize(16);
  text(`Dati Istantanei:`, 710, 50);
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, 710, 80);
  fill(255, 107, 107);
  text(`Coseno (x) = ${valoreCoseno.toFixed(4)}`, 710, 110);
  
  // Nota didattica sull'ampiezza fisica
  fill(120, 130, 140);
  textSize(12);
  text(`Ampiezza onda: ${raggio} pixel`, 710, 145);
}