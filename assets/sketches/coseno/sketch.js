let graficoIstruzioniY = 40;

function setup() {
  // Tela responsive basata sulla finestra del browser
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adatta la tela alle nuove dimensions della finestra
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Sfondo nero fisso coerente con lo stile del sito

  // Parametri grafici adattati
  let raggio = 70;             
  let centroX = 140;     
  let centroY = 280;     // Alzato leggermente per fare spazio ai dati sotto
  let graficoX = 280;    

  // MODIFICATO: Calcolo dinamico per far arrivare il grafico quasi al margine destro dello schermo
  let asseX_Lunghezza = width - graficoX - 40;   

  // --- 1. ISTRUZIONI INTERATTIVE (AL MARGINE ASSOLUTO E IN ROSSO COSENO) ---
  fill(255, 107, 107); // MODIFICATO: Cambiato il colore nel rosso della funzione coseno
  noStroke();
  textFont('Helvetica');
  textAlign(LEFT, BASELINE); // Allineato al margine sinistro assoluto
  
  textSize(18);
  text("Esplorazione della Funzione Coseno", 0, 40); // Coordinata X a 0
  
  textSize(13);
  text("• Gira il MOUSE in cerchio attorno al centro goniometrico per regolare l'Angolo (θ)", 0, 65); // Coordinata X a 0
  text("• Osserva lo spostamento sull'asse orizzontale (X) e la proiezione sulla cosinusoide", 0, 85); // Coordinata X a 0

  // --- 2. LOGICA MATEMATICA ROTATORIA FLUIDA ---
  let rad = 0;
  
  // Calcola l'angolo polare basandosi sulla posizione del mouse relativa al centro del cerchio
  if (mouseX !== 0 || mouseY !== 0) {
    // Invertiamo l'asse Y (centroY - mouseY) per compensare i pixel invertiti del browser
    rad = atan2(centroY - mouseY, mouseX - centroX);
    
    // Normalizziamo l'angolo nell'intervallo positivo continuo [0, 2π]
    if (rad < 0) {
      rad += TWO_PI;
    }
  }
         
  let angolo = degrees(rad);
  let valoreCoseno = cos(rad);        
  let valoreSeno = sin(rad);

  // --- 3. DISEGNO: CERCHIO GONIOMETRICO (A SINISTRA) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(centroX - raggio - 20, centroY, centroX + raggio + 20, centroY);
  line(centroX, centroY - raggio - 20, centroX, centroY + raggio + 20);

  // Circonferenza goniometrica
  stroke(100, 110, 125);
  noFill();
  ellipse(centroX, centroY, raggio * 2);

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
    fill(255, 215, 0, 40); // Riempimento oro semitrasparente
    stroke(255, 215, 0);   // Linea d'arco oro lucido
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
  let px = centroX + cos(rad) * raggio;
  let py = centroY - valoreSeno * raggio; 

  // Raggio vettore principale (linea bianca mobile)
  stroke(255);
  strokeWeight(2);
  line(centroX, centroY, px, py);

  // Componente verticale di supporto (Seno in grigio tratteggiato sul cerchio)
  stroke(100, 100, 100, 90);
  strokeWeight(1);
  line(px, centroY, px, py);

  // SEGMENTO DEL COSENO (In rosso/arancione sulla base orizzontale)
  stroke(255, 107, 107);
  strokeWeight(3.5);
  line(centroX, centroY, px, centroY); 

  // VALORI DINAMICI SUL CERCHIO DURANTE LA ROTAZIONE
  noStroke();
  textSize(11);
  // Testo del valore del Coseno (x) posizionato sotto l'asse orizzontale
  fill(255, 107, 107);
  textAlign(CENTER, TOP);
  text("x: " + valoreCoseno.toFixed(2), centroX + (valoreCoseno * raggio) / 2, centroY + 6);

  // Testo del valore del Seno (y) posizionato accanto alla proiezione verticale di supporto
  fill(150, 160, 175);
  textAlign(px > centroX ? LEFT : RIGHT, CENTER);
  text("y: " + valoreSeno.toFixed(2), px > centroX ? px + 8 : px - 8, centroY - (valoreSeno * raggio) / 2);

  // Pallino verde sul punto P della circonferenza
  fill(46, 213, 115);
  noStroke();
  ellipse(px, py, 8, 8);


  // --- 4. DISEGNO: DIAGRAMMA CARTESIANO DEL COSENO (A DESTRA, DINAMICO) ---
  stroke(60, 65, 75);
  strokeWeight(1);
  line(graficoX, centroY, graficoX + asseX_Lunghezza, centroY); 
  line(graficoX, centroY - raggio - 20, graficoX, centroY + raggio + 20); 

  // Tracciamento dei limiti +1 e -1
  fill(100, 110, 125);
  textSize(11);
  textAlign(LEFT, CENTER);
  text("+1.0", graficoX - 35, centroY - raggio);
  text("-1.0", graficoX - 32, centroY + raggio);
  stroke(60, 65, 75, 100);
  line(graficoX, centroY - raggio, graficoX + asseX_Lunghezza, centroY - raggio);
  line(graficoX, centroY + raggio, graficoX + asseX_Lunghezza, centroY + raggio);


  // --- 5. COSTRUZIONE IN DIRETTA DELLA COSINUSOIDE (ADATTATA ALLA LUNGHEZZA RESPONSIVE) ---
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


  // --- 6. LINEE DI PROIEZIONE ASSIALI SULLA CURVA ---
  let ondaX = map(angolo, 0, 360, graficoX, graficoX + asseX_Lunghezza);
  let ondaY = centroY - valoreCoseno * raggio;

  stroke(255, 255, 255, 80);
  strokeWeight(1);
  
  // Proiezione verticale tratteggiata dall'asse X del cerchio goniometrico alla sinusoide
  for (let ly = centroY; ly > ondaY; ly -= 6) {
    line(px, ly, px, ly - 3);
  }
  // Proiezione orizzontale tratteggiata dal punto d'intersezione fino alla posizione corrente dell'onda
  for (let lx = px; lx < ondaX; lx += 6) {
    line(lx, ondaY, lx + 3, ondaY);
  }

  // Pallino rosso sul grafico nel punto d'onda corrente
  fill(255, 107, 107);
  noStroke();
  ellipse(ondaX, ondaY, 10, 10);


  // --- 7. TABELLA VALORI RIPOSIZIONATA (SOTTO IL GRAFICO, ALLINEATA A SINISTRA) ---
  let datiYStart = centroY + raggio + 50; // Calcola lo spazio esatto sotto il grafico (Y ~ 400)
  textAlign(LEFT, TOP);                    // Allineamento coerente a sinistra
  noStroke();
  
  // Titolo della sezione dati
  fill(255);
  textSize(15);
  text("DATI ISTANTANEI:", graficoX, datiYStart); 
  
  // Sviluppo orizzontale dei tre parametri numerici
  textSize(14);
  
  fill(255, 215, 0);
  text(`Angolo θ = ${angolo.toFixed(1)}°`, graficoX + 160, datiYStart);
  
  fill(255, 107, 107);
  text(`Coseno (x) = ${valoreCoseno.toFixed(4)}`, graficoX + 310, datiYStart);
  
  fill(120, 130, 140);
  textSize(12);
  text(`Ampiezza raggio: ${(raggio).toFixed(0)} px`, graficoX + 470, datiYStart + 2);
}