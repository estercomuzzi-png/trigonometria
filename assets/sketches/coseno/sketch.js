let graficoIstruzioniY = 40;

function setup() {
  // Tela responsive basata sull'esempio - Dimensioni invariate
  createCanvas(1100, 500);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- 1. ISTRUZIONI INTERATTIVE (A SINISTRA - CON ANDATA A CAPO) ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT); // Allineamento a sinistra per le istruzioni
  textSize(18);
  text("Esplorazione della Funzione Coseno", 5, 40); 
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 5, 65);
  // Spezzato in due righe per evitare la sovrapposizione con il centro
  text("• Osserva lo spostamento sull'asse orizzontale (X)", 5, 85);
  text("  e la proiezione sulla cosinusoide", 5, 102);

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  let valoreCoseno = cos(rad);        

  // --- PARAMETRI GRAFICI ADATTATI ---
  let raggio = 70;             
  let asseX_Lunghezza = 400;   
  
  let centroX = 140;     
  let centroY = 320;     
  let graficoX = 280;    

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
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
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, centroY - raggio - 20, graficoX, centroY + raggio + 20); 

  // Tracciamento dei limiti +1 e -1
  fill(100, 110, 125);
  textSize(11);
  text("+1.0", graficoX - 30, centroY - raggio + 4);
  text("-1.0", graficoX - 25, centroY + raggio + 4);
  stroke(60, 65, 75, 100);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA COSINUSOIDE ---
  stroke(255, 107, 107, 150); 
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
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + asseX_Lunghezza);
  let ondaY = centroY - valoreCoseno * raggio;

  stroke(255, 255, 255, 80);
  strokeWeight(1);
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


  // --- 7. TABELLA VALORI (RIPRISTINATA IN ALTO AL CENTRO) ---
  let posCentroX = width / 2; // Centro esatto dello schermo (550px)
  textAlign(CENTER);          // Allineamento centrato simmetrico come richiesto
  
  fill(255);
  textSize(16);
  text(`Dati Istantanei:`, posCentroX, 40); 
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, posCentroX, 65);
  fill(255, 107, 107);
  text(`Coseno (x) = ${valoreCoseno.toFixed(4)}`, posCentroX, 90);
  
  fill(120, 130, 140);
  textSize(12);
  text(`Ampiezza onda: ${(raggio).toFixed(0)} pixel`, posCentroX, 115);
}