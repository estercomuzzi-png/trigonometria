let graficoIstruzioniY = 40;

function setup() {
  // Tela stabile (1100x500)
  createCanvas(1100, 500);
}

function draw() {
  background(0); // Sfondo nero fisso

  // --- 1. ISTRUZIONI INTERATTIVE (A SINISTRA) ---
  fill(148, 161, 178);
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT); 
  textSize(18);
  text("Esplorazione della Funzione Tangente", 5, 40); 
  textSize(13);
  text("• Muovi il MOUSE a destra e sinistra per cambiare l'Angolo (θ)", 5, 65);
  // Testo mandato a capo per evitare sovrapposizioni
  text("• Osserva l'intersezione del raggio sulla retta x = raggio", 5, 85);
  text("  e la proiezione sulla tangentoide", 5, 102);

  // --- 2. LOGICA MATEMATICA CORRENTE ---
  let angolo = map(mouseX, 0, width, 0, 360);
  angolo = constrain(angolo, 0, 360); 
  let rad = radians(angolo);          
  let valoreTangente = tan(rad);      

  // --- PARAMETRI GRAFICI ADATTATI ---
  let raggio = 70;             
  let asseX_Lunghezza = 400;   
  
  let centroX = 140;     
  let centroY = 320;     
  let graficoX = 280;    

  // --- SOGLIA MASSIMA DI ALTEZZA ANTI-SOVRAPPOSIZIONE ---
  // Impedisce alla grafica di salire sopra Y = 160 (lasciando i testi totalmente liberi)
  let altezzaMassimaGrafica = 150; 
  let limiteSuperioreY = centroY - altezzaMassimaGrafica;
  let limiteInferioreY = centroY + altezzaMassimaGrafica;

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
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
  line(centroX + raggio, limiteSuperioreY, centroX + raggio, limiteInferioreY);

  // Calcolo della posizione del punto P sulla circonferenza
  let px = centroX + cos(rad) * raggio;
  let py = centroY - sin(rad) * raggio; 

  // Raggio vettore principale (linea bianca mobile)
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // Calcolo Y geometrico della tangente
  let tangenteY = centroY - valoreTangente * raggio;

  // Mostra la geometria interattiva della tangente solo se rientra nei limiti verticali sicuri
  let visibile = (tangenteY >= limiteSuperioreY && tangenteY <= limiteInferioreY);

  if (visibile) {
    // PROLUNGAMENTO DEL RAGGIO (Tratteggiato)
    stroke(255, 255, 255, 60);
    strokeWeight(1);
    line(centroX, centroY, centroX + raggio, tangenteY);

    // Segmento della Tangente (In giallo sulla retta verticale fissa)
    stroke(255, 215, 0); 
    strokeWeight(3.5);
    line(centroX + raggio, centroY, centroX + raggio, tangenteY);
    strokeWeight(1); 
  }

  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DELLA TANGENTE (A DESTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, limiteSuperioreY, graficoX, limiteInferioreY); 

  // Tracciamento dei limiti grafici di riferimento
  stroke(60, 65, 75, 80);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA TANGENTOIDE ---
  stroke(255, 215, 0, 150); 
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let a = 0; a <= angolo; a++) {
    if (floor(a) === 90 || floor(a) === 270) {
      endShape();
      beginShape();
      continue; 
    }
    
    let xCurva = map(a, 0, 360, graficoX, graficoX + asseX_Lunghezza);
    let yCurva = centroY - tan(radians(a)) * raggio;
    
    // Disegna la curva troncando il disegno esattamente ai limiti di sicurezza verticali
    if (yCurva >= limiteSuperioreY && yCurva <= limiteInferioreY) {
      vertex(xCurva, yCurva);
    }
  }
  endShape();


  // --- 6. LINEA DI PROIEZIONE DIRETTISSIMA (TRATTEGGIATA) ---
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + asseX_Lunghezza);
  
  // La linea di proiezione e il pallino mobile sul grafico appaiono solo se non superano la soglia critica
  if (visibile) {
    stroke(255, 255, 255, 80);
    strokeWeight(1);
    for (let lx = centroX + raggio; lx < ondaX; lx += 6) {
      line(lx, tangenteY, lx + 3, tangenteY);
    }
    
    // Pallino giallo sul grafico nel punto corrente
    fill(255, 215, 0);
    noStroke();
    ellipse(ondaX, tangenteY, 10, 10);
  }


  // --- 7. TABELLA VALORI (IN ALTO AL CENTRO) ---
  let posCentroX = width / 2; 
  textAlign(CENTER);          
  
  fill(255);
  textSize(16);
  text(`Dati Istantanei:`, posCentroX, 40); 
  textSize(15);
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, posCentroX, 65);
  
  // Controllo testuale per il valore asintotico
  if (floor(angolo) === 90 || floor(angolo) === 270) {
    fill(255, 71, 87); 
    text(`Tangente (t) = ±∞ (Non definita)`, posCentroX, 90);
  } else {
    fill(255, 215, 0);
    text(`Tangente (t) = ${valoreTangente.toFixed(4)}`, posCentroX, 90);
  }
  
  fill(120, 130, 140);
  textSize(12);
  text(`Fattore scala: ${(raggio).toFixed(0)} pixel`, posCentroX, 115);
}