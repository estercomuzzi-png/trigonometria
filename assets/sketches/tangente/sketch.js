let graficoIstruzioniY = 40;

function setup() {
  // Tela responsive basata sulla finestra del browser per evitare tagli verticali
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensioni della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso coerente con lo stile del sito

  // Parametri grafici adattati
  let raggio = 70;             
  
  let centroX = 140;     
  let centroY = 320;     // MODIFICATO: Spostato più in basso (da 250 a 320) per abbassare tutto il grafico
  let graficoX = 280;    

  // MODIFICATO: Calcolo dinamico per far arrivare il grafico quasi al margine destro dello schermo
  let asseX_Lunghezza = width - graficoX - 40;   

  // --- SOGLIA MASSIMA DI ALTEZZA ANTI-SOVRAPPOSIZIONE ---
  let altezzaMassimaGrafica = 150; 
  let limiteSuperioreY = centroY - altezzaMassimaGrafica;
  let limiteInferioreY = centroY + altezzaMassimaGrafica;

  // --- 1. ISTRUZIONI INTERATTIVE (AL MARGINE ASSOLUTO E IN GIALLO TANGENTE) ---
  fill(255, 215, 0); // MODIFICATO: Cambiato il colore nel giallo oro della funzione tangente
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT, BASELINE); // Allineato al margine sinistro assoluto
  
  textSize(18);
  text("Esplorazione della Funzione Tangente", 0, 40); // Coordinata X a 0
  
  textSize(13);
  text("• Gira il MOUSE in cerchio attorno al centro goniometrico per regolare l'Angolo (θ)", 0, 65); // Coordinata X a 0
  text("• Osserva l'intersezione del raggio sulla retta x = raggio e la proiezione sulla tangentoide", 0, 85); // Coordinata X a 0

  // --- 2. LOGICA MATEMATICA ROTATORIA FLUIDA ---
  let rad = 0;
  
  // Calcola l'angolo polare basandosi sulla posizione del mouse relativa al centro del cerchio
  if (mouseX !== 0 || mouseY !== 0) {
    // Invertiamo l'asse Y (centroY - mouseY) per compensare i pixel dello schermo
    rad = atan2(centroY - mouseY, mouseX - centroX);
    
    // Normalizziamo l'angolo nell'intervallo positivo continuo [0, 2π]
    if (rad < 0) {
      rad += TWO_PI;
    }
  }
         
  let angolo = degrees(rad);
  let valoreTangente = tan(rad);      
  let valoreSeno = sin(rad);
  let valoreCoseno = cos(rad);

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
  line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

  // Circonferenza goniometrice
  stroke(100, 110, 125);
  noFill();
  ellipse(centroX, centroY, raggio * 2);

  // Retta verticale fissa di riferimento della tangente (x = raggio)
  stroke(60, 65, 75);
  line(centroX + raggio, limiteSuperioreY, centroX + raggio, limiteInferioreY);

  // VALORI FISSI SUI QUATTRO QUADRANTI
  fill(80, 90, 100);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text("0°", centroX + raggio + 15, centroY);
  text("90°", centroX, centroY - raggio - 12);
  text("180°", centroX - raggio - 20, centroY);
  text("270°", centroX, centroY + raggio + 12);

  // --- DISEGNO DELL'ARCO DI ROTAZIONE (SETTORE ORO) ---
  if (angolo > 0) {
    fill(255, 215, 0, 30); // Riempimento oro semitrasparente leggero
    stroke(255, 215, 0, 180);   
    strokeWeight(1.5);
    // Disegnamo l'arco invertendo l'angolo per assecondare la coordinata matematica dello schermo
    arc(centroX, centroY, 35, 35, -rad, 0, PIE);
    
    // Posizionamento dinamico della lettera greca "θ" a metà dell'apertura angolare
    push();
    noStroke();
    fill(255, 215, 0);
    textSize(12);
    textAlign(CENTER, CENTER);
    let metaAngolo = rad / 2;
    let tx = centroX + cos(metaAngolo) * 32;
    let ty = centroY - sin(metaAngolo) * 32;
    text("θ", tx, ty);
    pop();
  }

  // Calcolo della posizione del punto P sulla circonferenza
  let px = centroX + valoreCoseno * raggio;
  let py = centroY - valoreSeno * raggio; 

  // Raggio vettore principale (linea bianca mobile)
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // Calcolo Y geometrico della tangente
  let tangenteY = centroY - valoreTangente * raggio;

  // Mostra la geometria interattiva della tangente solo se rientra nei limiti verticali sicuri
  let visibile = (tangenteY >= limiteSuperioreY && tangenteY <= limiteInferioreY);

  if (visibile) {
    // PROLUNGAMENTO DEL RAGGIO (Tratteggiato sia in avanti che all'indietro per II e III quadrante)
    stroke(255, 255, 255, 60);
    strokeWeight(1);
    line(centroX, centroY, centroX + raggio, tangenteY);

    // Segmento della Tangente (In giallo oro sulla retta verticale fissa)
    stroke(255, 215, 0); 
    strokeWeight(3.5);
    line(centroX + raggio, centroY, centroX + raggio, tangenteY);
    strokeWeight(1); 

    // VALORE DINAMICO DELLA TANGENTE SUL CERCHIO
    noStroke();
    fill(255, 215, 0);
    textSize(11);
    textAlign(LEFT, CENTER);
    // Mostra il testo "t: valore" accanto al segmento giallo della tangente
    let arrotondatoAngolo = floor(angolo);
    if (arrotondatoAngolo !== 90 && arrotondatoAngolo !== 270) {
      text("t: " + valoreTangente.toFixed(2), centroX + raggio + 8, centroY - (valoreTangente * raggio) / 2);
    }
  }

  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DELLA TANGENTE (A DESTRA, DINAMICO) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, limiteSuperioreY, graficoX, limiteInferioreY); 

  // Tracciamento dei limiti grafici di riferimento (+1 e -1)
  fill(100, 110, 125);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("+1.0", graficoX - 35, centroY - raggio);
  text("-1.0", graficoX - 32, centroY + raggio);
  stroke(60, 65, 75, 80);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA TANGENTOIDE (ADATTATA ALLA LUNGHEZZA RESPONSIVE) ---
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
  
  if (visibile) {
    stroke(255, 255, 255, 80);
    strokeWeight(1);
    for (let lx = centroX + raggio; lx < ondaX; lx += 6) {
      line(lx, tangenteY, lx + 3, tangenteY);
    }
    
    // Pallino giallo sul grafico nel punto corrente della tangentoide
    fill(255, 215, 0);
    noStroke();
    ellipse(ondaX, tangenteY, 10, 10);
  }


  // --- 7. TABELLA VALORI RIPOSIZIONATA (SOTTO IL GRAFICO, ALLINEATA A SINISTRA) ---
  let datiYStart = limiteInferioreY + 35;  // Calcola lo spazio esatto sotto la quota limite del grafico
  textAlign(LEFT, TOP);                    // Allineamento coerente a sinistra per i blocchi di testo
  noStroke();
  
  // Titolo della sezione dati
  fill(255);
  textSize(15);
  text("DATI ISTANTANEI:", graficoX, datiYStart); 
  
  // Sviluppo orizzontale in riga dei tre parametri numerici
  textSize(14);
  
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, graficoX + 160, datiYStart);
  
  // Controllo testuale e cambio colore dinamico per il valore asintotico a 90° e 270°
  if (floor(angolo) === 90 || floor(angolo) === 270) {
    fill(255, 71, 87); 
    text(`Tangente (t) = ±∞ (Non def.)`, graficoX + 310, datiYStart);
  } else {
    fill(255, 215, 0);
    text(`Tangente (t) = ${valoreTangente.toFixed(4)}`, graficoX + 310, datiYStart);
  }
  
  fill(120, 130, 140);
  textSize(12);
  text(`Fattore scala: ${(raggio).toFixed(0)} px`, graficoX + 490, datiYStart + 2);
}