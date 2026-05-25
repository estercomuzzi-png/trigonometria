let raggio = 80;       // Dimensione del cerchio goniometrico
let centroX = 250;     // Posizione X del centro del cerchio
let centroY = 320;     // Allineato verticalmente alle proporzioni degli altri grafici
let graficoX = 450;    // Punto di partenza del grafico a destra

function setup() {
  // Stessa tela responsive basata sul modello iniziale
  createCanvas(900, 500);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- 1. ISTRUZIONI INTERATTIVE (CONGRUENTI CON LO STILE) ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textSize(18);
  text("Esplorazione della Funzione Tangente", 40, 40);
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 40, 65);
  text("• Osserva l'intersezione del raggio sulla retta x = raggio e la proiezione sulla tangentoide", 40, 85);

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  let valoreTangente = tan(rad);      

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  // Assi del cerchio (Stile scuro uniformato)
  stroke(60, 65, 75);
  strokeWeight(1);
  line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
  line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

  // Circonferenza goniometrica
  stroke(100, 110, 125);
  noFill();
  ellipse(centroX, centroY, raggio * 2);

  // Retta verticale fissa di riferimento della tangente (x = raggio)
  stroke(60, 65, 75);
  line(centroX + raggio, centroY - 150, centroX + raggio, centroY + 150);

  // Calcolo della posizione del punto P sulla circonferenza
  let px = centroX + cos(rad) * raggio;
  let py = centroY - sin(rad) * raggio; 

  // Raggio vettore principale (linea bianca mobile)
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // PROLUNGAMENTO DEL RAGGIO (Tratteggiato)
  let tangenteY = centroY - valoreTangente * raggio;
  stroke(255, 255, 255, 60);
  strokeWeight(1);
  line(centroX, centroY, centroX + raggio, tangenteY);

  // Segmento della Tangente (In giallo sulla retta verticale fissa)
  stroke(255, 215, 0); 
  strokeWeight(3.5);
  line(centroX + raggio, centroY, centroX + raggio, tangenteY);
  strokeWeight(1); 

  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DELLA TANGENTE (A DESTRA) ---
  let asseX_Lunghezza = 400;

  // Asse X e Asse Y del grafico
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, centroY - 150, graficoX, centroY + 150); 

  // Tracciamento dei limiti grafici di riferimento asintotici (opzionali ma utili per stile)
  stroke(60, 65, 75, 80);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA TANGENTOIDE ---
  stroke(255, 215, 0, 150); // Giallo semitrasparente per la curva passata
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    // Interruzione del tratto a 90° e 270° per evitare asintoti grafici uniti
    if (floor(a) === 90 || floor(a) === 270) {
      endShape();
      beginShape();
      continue; 
    }
    
    let xCurva = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
    let yCurva = centroY - tan(radians(a)) * raggio;
    
    // Disegna solo se rimane nei confini visivi della sezione verticale
    if (yCurva > centroY - 150 && yCurva < centroY + 150) {
      vertex(xCurva, yCurva);
    }
  }
  endShape();


  // --- 6. LINEA DI PROIEZIONE DIRETTISSIMA (TRATTEGGIATA) ---
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + asseX_Lunghezza);
  stroke(255, 255, 255, 80);
  strokeWeight(1);
  
  // Tratteggio manuale che collega geometricamente la tangente al grafico cartesiano
  if (tangenteY > centroY - 150 && tangenteY < centroY + 150) {
    for (let lx = centroX + raggio; lx < ondaX; lx += 6) {
      line(lx, tangenteY, lx + 3, tangenteY);
    }
    
    // Pallino giallo sul grafico nel punto corrente
    fill(255, 215, 0);
    noStroke();
    ellipse(ondaX, tangenteY, 10, 10);
  }


  // --- 7. TABELLA VALORI AGGIORNATA DINAMICAMENTE (A DESTRA) ---
  fill(255);
  textSize(16);
  text(`Dati Istantanei:`, 710, 50);
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, 710, 80);
  
  fill(255, 215, 0);
  // Controllo testuale per il valore asintotico
  if (floor(angolo) === 90 || floor(angolo) === 270) {
    text(`Tangente (t) = ±∞`, 710, 110);
  } else {
    text(`Tangente (t) = ${valoreTangente.toFixed(4)}`, 710, 110);
  }
  
  // Nota didattica sul raggio di riferimento
  fill(120, 130, 140);
  textSize(12);
  text(`Raggio base: ${raggio} pixel`, 710, 145);
}